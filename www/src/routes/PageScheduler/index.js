// @flow
import React from "react";
import { connect } from "react-redux";
import Button from "antd/lib/button";
import ImportSchedule from "./components/ImportSchedule";
// import ExamSchedule from "./components/ExamSchedule";
import SiteMetaHelmet from "src/components/SiteMetaHelmet";

import { requireLogin } from "src/utils";
import {
  logPageview,
  logScheduleGeneration,
  logCalendarDownload
} from "src/tracking";
import {
  saveSchedule,
  fetchUserSchedule,
  updateSchedule
} from "src/redux/actions";

import BigCalendar from "react-big-calendar";
import moment from "moment";
import * as utils from "./utils";
import * as styles from "./style.scss";
import "!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css";
import { message } from "antd";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

// today
const TODAY = new Date();
// earliest class
const START_TIME = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth(),
  TODAY.getDate(),
  8,
  30,
  0
);
// latest class
const END_TIME = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth(),
  TODAY.getDate(),
  22,
  30,
  0
);

const events = [];

type Props = {
  schedule: ?string,
  updateScheduleSuccess: ?Object,
  saveSchedule: Object => void,
  fetchUserSchedule: () => void,
  updateSchedule: Object => void
};

class PageScheduler extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      calendarEvents: null,
      exam: null
    };
  }

  download(content, fileName, contentType) {
    let a = document.createElement("a");
    let file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  componentDidMount() {
    // change the button text
    const buttonGroup = document.querySelector(".rbc-btn-group").childNodes;
    buttonGroup[0].innerHTML = "This Week";
    buttonGroup[1].innerHTML = "<";
    buttonGroup[2].innerHTML = ">";
    logPageview();
    this.props.fetchUserSchedule();
  }

  componentWillUnmount() {
    // clear schedule
    this.props.saveSchedule(null);
  }

  componentDidUpdate(prevProps) {
    if (this.props.schedule && prevProps.schedule !== this.props.schedule) {
      utils.examTime(JSON.parse(this.props.schedule)).then(exam =>
        this.setState({ exam }, () => {
          this.generateCalendar();
        })
      );
    }
  }

  calendarEventRenderer = ({ event }) => (
    <span style={{ lineHeight: "0.75rem" }}>
      <strong>{event.title}</strong>
      {` ${event.type} (${event.group})\n`}
      {event.location}
    </span>
  );

  clearSchedule = () => {
    this.props.saveSchedule(null);
    if (confirm("Are you sure you want to re-import your schedule?")) {
      this.setState({ input: "", calendarEvents: null });
    }
  };

  handleInput = event => {
    this.setState({ input: event.target.value });
  };

  downloadCalendar = () => {
    const { schedule } = this.props;
    let icsContent = utils.icsHelper(JSON.parse(schedule), this.state.exam);
    this.download(icsContent, "ClassSchedule.ics", "text/plain");
    logCalendarDownload();
  };
  x = () => {
    this;
  };
  importSchedule = input => {
    const tokenStream = utils.tokenize(input);
    const json = utils.parseToJSON(tokenStream);
    this.props.saveSchedule(JSON.stringify(json));
    const examTimePromise = utils.examTime(json).then(exam =>
      this.setState({ exam }, () => {
        this.generateCalendar();
      })
    );
    logScheduleGeneration();
    return examTimePromise;
  };

  generateCalendar = () => {
    if (!this.props.schedule || !this.state.exam) return null;
    const calendarEvents = utils.calendarHelper(
      JSON.parse(this.props.schedule),
      this.state.exam
    );
    this.setState({ calendarEvents: calendarEvents });
  };

  updateSchedule = () => {
    const { schedule } = this.props;
    const form = new FormData();
    form.append("schedule", schedule);
    this.props
      .updateSchedule(form)
      .then(() => {
        const { updateScheduleSuccess } = this.props;
        if (updateScheduleSuccess && updateScheduleSuccess.success) {
          message.success("Success!");
        } else {
          message.error("Something went wrong...");
        }
      })
      .catch(error => console.log(error)); // eslint-disable-line
  };

  render() {
    const { calendarEvents } = this.state;
    let latestClass = null;
    if (calendarEvents) {
      latestClass = utils.getLatestClass(calendarEvents);
      latestClass.setFullYear(TODAY.getFullYear());
      latestClass.setMonth(TODAY.getMonth());
      latestClass.setDate(TODAY.getDate());
      latestClass.setHours(latestClass.getHours() + 1);
    }
    return (
      <div className={styles.container}>
        <SiteMetaHelmet
          url="https://ntuvibe.com/scheduler"
          title="Scheduler - NTUVibe"
          description="Create a beautiful timetable personalized for you."
        />
        <div className={styles.innerContainer}>
          <div className={styles.textContainer}>
            <div className={styles.headerContainer} />
            <div
              className={styles.instructionContainer}
              style={{ display: !calendarEvents ? "block" : "none" }}
            >
              <div className={styles.text}>
                Create your <span className={styles.beautiful}>beautiful</span>{" "}
                class schedule and add to your calendar!
              </div>
              <div className={styles.picContainer}>
                <div className={styles.picItem}>
                  <img src="/instruct_1.png" width="100%" />
                  <div>
                    A weekly class schedule that can be added to your calendar
                  </div>
                </div>
                <div className={styles.picItem}>
                  <img src="/instruct_2.png" width="100%" />
                  <div>
                    By simple copy &amp; paste from{" "}
                    <a
                      href="https://sso.wis.ntu.edu.sg/webexe88/owa/sso_redirect.asp?t=1&app=https://wish.wis.ntu.edu.sg/pls/webexe/aus_stars_check.check_subject_web2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Check/Print Courses Registered
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.text} style={{ textAlign: "center" }}>
                <ImportSchedule
                  import={this.importSchedule}
                  trigger={
                    <Button type="primary" className={styles.import}>
                      Create Now
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
          <div
            className={styles.scheduleContainer}
            style={{
              display: calendarEvents
                ? "block"
                : "none" /* display only when imported */
            }}
          >
            {utils.calculateAcademicWeek() ? (
              <div className={styles.weekContainer}>
                <div className={styles.weekIndicator}>
                  💪 Today falls in{" "}
                  <span className={styles.week}>
                    {utils.calculateAcademicWeek()}
                  </span>
                </div>
              </div>
            ) : null}
            <div className={styles.calendarContainer}>
              <BigCalendar
                eventPropGetter={event => ({ className: event.category })}
                events={calendarEvents || events}
                views={["work_week"]}
                localizer={moment}
                selectable={false}
                step={60}
                timeslots={1}
                min={START_TIME}
                max={latestClass || END_TIME}
                defaultView={BigCalendar.Views.WORK_WEEK}
                defaultDate={new Date()}
                components={{
                  event: this.calendarEventRenderer
                }}
              />
            </div>
            <div
              className={styles.text.concat(" ").concat(styles.calendarHint)}
              style={{ color: "#7d7d7d", fontSize: "0.9rem" }}
            >
              On PC, you can download the whole semester into your calendar!
            </div>
            <div
              className={styles.text}
              style={{
                marginTop: "1.5rem",
                color: "#00772c",
                fontSize: "0.9rem"
              }}
            >
              REMINDER: On your calendar app, please add your schedule to a new
              calendar in case you want to delete the entire calendar in the
              future.
            </div>
            <div className={styles.toolbar}>
              <Button
                className={styles.addToCalendar}
                onClick={this.downloadCalendar}
              >
                Download to your calendar
              </Button>
              <Button
                type="primary"
                className={styles.sync}
                onClick={() => requireLogin(this.updateSchedule)}
              >
                Save and sync
              </Button>
              <Button
                type="danger"
                onClick={this.clearSchedule}
                style={{ backgroundColor: "crimson", color: "white" }}
              >
                Re-import
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return {
    schedule: user && user.schedule,
    updateScheduleSuccess: user && user.updateScheduleSuccess
  };
};

const mapDispatchToProps = dispatch => ({
  saveSchedule: schedule => dispatch(saveSchedule(schedule)),
  fetchUserSchedule: () => dispatch(fetchUserSchedule()),
  updateSchedule: form => dispatch(updateSchedule(form))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageScheduler);
