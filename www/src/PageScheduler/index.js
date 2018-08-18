import React from "react";
import NavBar from "src/components/NavBar";
import ImportSchedule from "./components/ImportSchedule";
import Footer from "./components/Footer";

import { requireLogin } from "src/utils";

import BigCalendar from "react-big-calendar";
import moment from "moment";
import * as tools from "./utils";
import * as styles from "./style.scss";
import "!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css";

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

class PageScheduler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      json: null,
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
    console.log(buttonGroup);
    buttonGroup[0].innerHTML = "This Week";
    buttonGroup[1].innerHTML = "<";
    buttonGroup[2].innerHTML = ">";
  }

  clearSchedule = () => {
    if (confirm("Are you sure you want to clear your schedule?")) {
      this.setState({ input: "", json: null, calendarEvents: null });
    }
  };

  handleInput = event => {
    this.setState({ input: event.target.value });
  };

  downloadCalendar = () => {
    const { json } = this.state;
    const icsContent = tools.generateICS(json);
    this.download(icsContent, "ClassSchedule.ics", "text/plain");
  };

  importSchedule = input => {
    const tokenStream = tools.tokenize(input);
    const json = tools.parseToJSON(tokenStream);
    // write to output
    // const courseResult = tools.generateICS(json);
    const calendarEvents = tools.generateCalendarEvent(json);
    this.setState({ calendarEvents: calendarEvents, json: json });
  };

  uploadSchedule = () => {
    console.log("You look beautiful");
  };

  render() {
    const { calendarEvents } = this.state;
    return (
      <div className={styles.container}>
        <NavBar />
        <div className={styles.innerContainer}>
          <div className={styles.textContainer}>
            <div className={styles.header}>Scheduler</div>
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
                  <a href="http://www.ntu.edu.sg/Students/Undergraduate/AcademicServices/CourseRegistration/Pages/default.aspx">
                    Log in to STARS Planner
                  </a>
                </div>
                <div className={styles.stepContainer}>
                  <span className={styles.step}>2</span> Check your course
                  registered
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
              <div className={styles.weekIndicator}>
                💪 Today falls in{" "}
                <span className={styles.week}>
                  {tools.calculateAcademicWeek()}
                </span>
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
            <div className={styles.toolbar}>
              <button
                className={styles.addToCalendar}
                onClick={this.downloadCalendar}
              >
                Add to your calendar
              </button>
              <button
                className={styles.sync}
                onClick={() => requireLogin(this.uploadSchedule)}
              >
                Sync to all devices
              </button>
              <button
                onClick={this.clearSchedule}
                style={{ backgroundColor: "crimson", color: "white" }}
              >
                Clear schedule
              </button>
            </div>{" "}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default PageScheduler;
