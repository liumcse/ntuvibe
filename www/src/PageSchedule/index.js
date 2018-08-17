import React from "react";
import NavBar from "src/components/NavBar";

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

  render() {
    const { calendarEvents } = this.state;
    return (
      <div className={styles.container}>
        <NavBar />
        <div className={styles.innerContainer}>
          <div className={styles.textContainer}>
            <div className={styles.header}>Where is my class?</div>
            <div className={styles.text}>
              With Vibe, you can create your class schedule and export it to
              your favorite calendar app!
            </div>
            <div className={styles.text}>
              Three steps only: go to stars planner, check course registered,
              copy & paste.
            </div>
            <div className={styles.text}>
              You only have to do once (per semester), and Vibe will do the rest
              for you!
            </div>
            <div className={styles.picContainer}>
              <div className={styles.picItem}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/Screen%20Shot%202018-08-17%20at%206.16.55%20PM.png?alt=media&token=3b363747-c898-48f6-b84f-7e30a0cf6b29"
                  height="280px"
                />
                <div>
                  Log in to{" "}
                  <a href="https://www.ntu.edu.sg/Students/Undergraduate/AcademicServices/CourseRegistration/Pages/default.aspx">
                    stars planner
                  </a>
                  and check registered courses
                </div>
              </div>
              <div>
                <div className={styles.picItem}>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/Screen%20Shot%202018-08-17%20at%206.17.38%20PM.png?alt=media&token=33133d12-1a6d-4f4d-86a9-73a4cbf2708f"
                    height="280px"
                  />
                  <div>Select all text and copy</div>
                </div>
              </div>
              <div>
                <div className={styles.picItem}>
                  <textarea
                    className={styles.input}
                    placeholder="Student Automated Registration System..."
                  />
                  <div>Paste the text here</div>
                </div>
              </div>
            </div>
            <div className={styles.text} style={{ textAlign: "center" }}>
              <button className={styles.import}>
                Import my class schedule
              </button>
            </div>
          </div>
          <div className={styles.calendarContainer}>
            <BigCalendar
              events={calendarEvents || events}
              views={["work_week"]}
              localizer={moment}
              selectable={false}
              step={30}
              timeslots={2}
              min={START_TIME}
              max={END_TIME}
              defaultView={BigCalendar.Views.WORK_WEEK}
              defaultDate={new Date()}
            />
          </div>
          <textarea
            className={styles.inputArea}
            onChange={this.handleInput}
            spellCheck={false}
            data-gramm_editor="false" /* disable grammarly*/
          />
          <button onClick={this.generateOutput} className={styles.generate}>
            Generate
          </button>
        </div>
      </div>
    );
  }
}

export default PageSchedule;
