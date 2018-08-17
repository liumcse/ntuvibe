import React from "react";
import NavBar from "src/components/NavBar";

import BigCalendar from "react-big-calendar";
import moment from "moment";
import * as tools from "./utils";
import * as styles from "./style.scss";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const events = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1)
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10)
  },

  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 10, 0, 0, 0)
  },
  {
    id: 5,
    title: "Conference",
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: "Big conference for important people"
  },
  {
    id: 6,
    title: "Meeting",
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting"
  },
  {
    id: 7,
    title: "Lunch",
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: "Power lunch"
  },
  {
    id: 8,
    title: "Meeting",
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0)
  },
  {
    id: 9,
    title: "Happy Hour",
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: "Most important meal of the day"
  },
  {
    id: 10,
    title: "Dinner",
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0)
  },
  {
    id: 11,
    title: "Birthday Party",
    start: new Date(2015, 3, 13, 7, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0)
  },
  {
    id: 12,
    title: "Late Night Event",
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0)
  },
  {
    id: 12.5,
    title: "Late Same Night Event",
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 17, 23, 30, 0)
  },
  {
    id: 13,
    title: "Multi-day Event",
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0)
  },
  {
    id: 14,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3))
  }
];

class PageSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }
  download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  handleInput = event => {
    this.setState({ input: event.target.value });
  };

  generateOutput = () => {
    // const outputTextarea = document.querySelector("." + styles.outputArea);
    const input = this.state.input;
    const tokenStream = tools.tokenize(input);

    // console.log(tokenStream);
    // const lexer = new tools.Lexer(tokenStream);
    // while (!lexer.isEOF()) {
    //   console.log("consuming...", lexer.consume());
    // }
    const output = tools.parseToJSON(tokenStream);
    // write to output
    const courseResult = tools.generateICS(output);
    console.log(courseResult);

    this.download(courseResult, "Schedule.ics", "text/plain");

    // outputTextarea.value = JSON.stringify(output, null, 2);
  };

  render() {
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
            events={events}
            step={15}
            localizer={moment}
            timeslots={8}
            defaultView={BigCalendar.Views.WEEK}
            defaultDate={new Date(2015, 3, 12)}
          />
        </div>
      </div>
    );
  }
}

export default PageSchedule;
