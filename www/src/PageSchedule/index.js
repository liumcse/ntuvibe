import React from "react";
import NavBar from "src/components/NavBar";
import ImportSchedule from "./components/ImportSchedule";

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

class PageSchedule extends React.Component {
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
    console.log(buttonGroup);
    buttonGroup[0].innerHTML = "This Week";
    buttonGroup[1].innerHTML = "<";
    buttonGroup[2].innerHTML = ">";
  }

  handleInput = event => {
    this.setState({ input: event.target.value });
  };

  generateOutput = () => {
    // const outputTextarea = document.querySelector("." + styles.outputArea);
    const input = this.state.input;
    const tokenStream = tools.tokenize(input);
    const json = tools.parseToJSON(tokenStream);
    // write to output
    const courseResult = tools.generateICS(json);
    const calendarEvents = tools.generateCalendarEvent(json);
    this.setState({ calendarEvents: calendarEvents });
    // console.log(courseResult);

    // this.download(courseResult, "ClassSchedule.ics", "text/plain");

    // outputTextarea.value = JSON.stringify(output, null, 2);
  };

  importSchedule = input => {
    const tokenStream = tools.tokenize(input);
    const json = tools.parseToJSON(tokenStream);
    // write to output
    // const courseResult = tools.generateICS(json);
    const calendarEvents = tools.generateCalendarEvent(json);
    this.setState({ calendarEvents: calendarEvents });
  };

  render() {
    const { calendarEvents } = this.state;
    return (
      <div className={styles.container}>
        <NavBar />
        <div className={styles.innerContainer}>
          <div className={styles.textContainer}>
            <div className={styles.header}>Where is my class?</div>
            <div className={styles.text}>
              Every morning, we ask ourselves - do I have classes today? Where
              and when?
            </div>
            <div className={styles.text}>
              With Vibe, you can create your class schedule and export it to
              your favorite calendar app!
            </div>
            <div className={styles.text}>
              You only have to import once (per semester), and Vibe will do the
              rest for you (truly yours :p)
            </div>
            <div
              className={styles.instructionContainer}
              style={{ display: !calendarEvents ? "block" : "none" }}
            >
              <div className={styles.picContainer}>
                <div className={styles.picItem}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/Screen%20Shot%202018-08-17%20at%206.16.55%20PM.png?alt=media&token=3b363747-c898-48f6-b84f-7e30a0cf6b29"
                    width="100%"
                  />
                  <div>
                    Log in to{" "}
                    <a href="https://www.ntu.edu.sg/Students/Undergraduate/AcademicServices/CourseRegistration/Pages/default.aspx">
                      stars planner
                    </a>{" "}
                    and check registered courses
                  </div>
                </div>
                <div className={styles.picItem}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/Screen%20Shot%202018-08-17%20at%206.17.38%20PM.png?alt=media&token=33133d12-1a6d-4f4d-86a9-73a4cbf2708f"
                    width="100%"
                  />
                  <div>Select all text and copy</div>
                </div>
              </div>
              <div className={styles.text} style={{ textAlign: "center" }}>
                <ImportSchedule
                  import={this.importSchedule}
                  trigger={
                    <button className={styles.import}>
                      Import new schedule
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
                : "block" /* display only when imported */
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
              <button className={styles.addToCalendar}>
                Add to your calendar
              </button>
              <button className={styles.openInPDF}>Open in PDF</button>
              <ImportSchedule
                import={this.importSchedule}
                trigger={
                  <button
                    style={{ backgroundColor: "crimson", color: "white" }}
                  >
                    Re-import schedule
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageSchedule;
