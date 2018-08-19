// @flow
import React from "react";
import { connect } from "react-redux";
import NavBar from "src/components/NavBar";
import ImportSchedule from "./components/ImportSchedule";
import SiteMetaHelmet from "src/components/SiteMetaHelmet";
import Footer from "./components/Footer";

import { requireLogin } from "src/utils";
import { logPageview, logScheduleGeneration } from "src/tracking";
import {
  saveSchedule,
  fetchUserSchedule,
  updateSchedule
} from "src/redux/actions";

import BigCalendar from "react-big-calendar";
import moment from "moment";
import calendar from "./assets/calendar.svg";
import * as tools from "./utils";
import * as styles from "./style.scss";
import "!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const calendarIcon = (
  <img src={calendar} style={{ height: "1.5rem", width: "1.5rem" }} />
);

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
      calendarEvents: null
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
    // generate calendar events from schedule in redux
    // if (this.props.schedule) {
    //   this.generateCalendar(this.props.schedule);
    // }
    logPageview();
    this.props.fetchUserSchedule();
  }

  componentWillUnmount() {
    // clear schedule
    this.props.saveSchedule(null);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.schedule !== this.props.schedule) {
      this.generateCalendar(this.props.schedule);
    }
  }

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
    const icsContent = tools.generateICS(JSON.parse(schedule));
    this.download(icsContent, "ClassSchedule.ics", "text/plain");
  };

  importSchedule = input => {
    const tokenStream = tools.tokenize(input);
    const json = tools.parseToJSON(tokenStream);
    this.props.saveSchedule(JSON.stringify(json)); // write to redux as string
    logScheduleGeneration();
  };

  generateCalendar = schedule => {
    if (!schedule) return null;
    const calendarEvents = tools.generateCalendarEvent(JSON.parse(schedule)); // get as string, parse to jSON
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
          alert("Success!");
        } else {
          alert("Something went wrong...");
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    const { calendarEvents } = this.state;
    return (
      <div className={styles.container}>
        <SiteMetaHelmet
          url="https://ntuvibe.com/scheduler"
          title="Scheduler - NTUVibe"
          description="Create your beautiful class schedule and add to your calendar!"
        />
        <NavBar />
        <div className={styles.innerContainer}>
          <div className={styles.textContainer}>
            <div className={styles.header}>{calendarIcon} Scheduler</div>
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
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/Screen%20Shot%202018-08-18%20at%202.51.45%20PM.png?alt=media&token=ab0bed0f-200a-4d58-9809-d057000676d0"
                    width="100%"
                  />
                  <div>
                    A weekly class schedule that can be added to your calendar
                  </div>
                </div>
                <div className={styles.picItem}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/Screen%20Shot%202018-08-18%20at%202.54.22%20PM.png?alt=media&token=9e163ca1-d184-44fd-b2a0-297af14b278e"
                    width="100%"
                  />
                  <div>By simple copy & paste</div>
                </div>
              </div>
              <div className={styles.text}>
                <span className={styles.tryItOut}>Try it out</span>
              </div>
              <div className={styles.text}>
                <div className={styles.stepContainer}>
                  <span className={styles.step}>1</span>
                  <a
                    href="https://sso.wis.ntu.edu.sg/webexe88/owa/sso_redirect.asp?t=1&app=https://wish.wis.ntu.edu.sg/pls/webexe/aus_stars_check.check_subject_web2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Log in to Check/Print Courses Registered
                  </a>
                </div>
                <div className={styles.stepContainer}>
                  <span className={styles.step}>2</span> Go to the current
                  semester
                </div>
                <div className={styles.stepContainer}>
                  <span className={styles.step}>3</span> Select all and copy
                </div>
              </div>
              <div
                className={styles.text}
                style={{ color: "#7d7d7d", fontSize: "0.9rem" }}
              >
                You only have to do once, and Vibe will do the rest (truly yours
                :p)
              </div>
              <div className={styles.text}>
                <ImportSchedule
                  import={this.importSchedule}
                  trigger={
                    <button className={styles.import}>
                      Import your schedule
                    </button>
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
            {tools.calculateAcademicWeek() ? (
              <div className={styles.weekContainer}>
                <div className={styles.weekIndicator}>
                  💪 Today falls in{" "}
                  <span className={styles.week}>
                    {tools.calculateAcademicWeek()}
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
                max={END_TIME}
                defaultView={BigCalendar.Views.WORK_WEEK}
                defaultDate={new Date()}
              />
            </div>
            <div
              className={styles.text.concat(" ").concat(styles.calendarHint)}
              style={{
                color: "#7d7d7d",
                fontSize: "0.9rem"
              }}
            >
              On PC, you can download the whole semester into your calendar!
            </div>
            <div className={styles.toolbar}>
              <button
                className={styles.addToCalendar}
                onClick={this.downloadCalendar}
              >
                Download to your calendar
              </button>
              <button
                className={styles.sync}
                onClick={() => requireLogin(this.updateSchedule)}
              >
                Save and sync
              </button>
              <button
                onClick={this.clearSchedule}
                style={{ backgroundColor: "crimson", color: "white" }}
              >
                Re-import
              </button>
            </div>{" "}
          </div>
        </div>
        <Footer />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageScheduler);
