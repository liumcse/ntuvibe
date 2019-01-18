import React from "react";
import moment from "moment";
import Button from "antd/lib/button";
import ExamSchedule from "../ExamSchedule";
import BigCalendar from "react-big-calendar";
import { connect } from "react-redux";
import { requireLogin } from "src/utils";
import * as tools from "../../utils";
import * as styles from "../../style.scss";
import { logCalendarDownload } from "src/tracking";
import { saveSchedule, updateSchedule } from "src/redux/actions";

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

type Props = {
  exam: ?Object,
  schedule: ?string,
  updateScheduleSuccess: ?Object,
  calendarEvents: Object[],
  saveSchedule: Object => void,
  updateSchedule: Object => void
};

class ImportedPage extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const buttonGroup = document.querySelector(".rbc-btn-group").childNodes;
    buttonGroup[0].innerHTML = "This Week";
    buttonGroup[1].innerHTML = "<";
    buttonGroup[2].innerHTML = ">";
  }

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

  download(content, fileName, contentType) {
    let a = document.createElement("a");
    let file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  clearSchedule = () => {
    this.props.saveSchedule(null);
    if (confirm("Are you sure you want to re-import your schedule?")) {
      this.setState({ input: "", calendarEvents: [] });
    }
  };

  downloadCalendar = () => {
    const { schedule } = this.props;
    let icsContent = tools.icsHelper(JSON.parse(schedule), this.props.exam);
    this.download(icsContent, "ClassSchedule.ics", "text/plain");
    logCalendarDownload();
  };

  render() {
    const { calendarEvents } = this.props;
    const { exam } = this.props;
    let latestClass = null;
    if (calendarEvents && calendarEvents.length > 0) {
      latestClass = tools.getLatestClass(calendarEvents);
      latestClass.setFullYear(TODAY.getFullYear());
      latestClass.setMonth(TODAY.getMonth());
      latestClass.setDate(TODAY.getDate());
      latestClass.setHours(latestClass.getHours() + 1);
    }
    return (
      <div className={styles.scheduleContainer}>
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
            events={calendarEvents || []}
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
          calendar in case you want to delete the entire calendar in the future.
        </div>
        <div className={styles.toolbar}>
          <Button
            className={styles.addToCalendar}
            onClick={this.downloadCalendar}
          >
            Download to your calendar
          </Button>
          {exam && (
            <ExamSchedule
              exam={exam}
              trigger={
                <Button type="primary" className={styles.exam}>
                  View Exam Schedule
                </Button>
              }
            />
          )}
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
        </div>{" "}
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
  updateSchedule: form => dispatch(updateSchedule(form))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportedPage);
