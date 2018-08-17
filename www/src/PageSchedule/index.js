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
            defaultDate={new Date() /* now */}
          />
        </div>
      </div>
    );
  }
}

export default PageSchedule;
