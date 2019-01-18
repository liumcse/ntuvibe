// @flow
import React from "react";
import { connect } from "react-redux";
import Button from "antd/lib/button";
import NavBar from "src/components/NavBar";
import ImportSchedule from "./components/ImportSchedule";
import SiteMetaHelmet from "src/components/SiteMetaHelmet";
import Footer from "src/components/Footer";
import ImportedPage from "./components/ImportedPage";

import { logPageview, logScheduleGeneration } from "src/tracking";
import { saveSchedule, fetchUserSchedule } from "src/redux/actions";

import * as tools from "./utils";
import * as styles from "./style.scss";
import "!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css";

// const calendarIcon = (
//   <img src={calendar} style={{ height: "1.5rem", width: "1.5rem" }} />
// );

// today
// const TODAY = new Date();
// earliest class
// const START_TIME = new Date(
//   TODAY.getFullYear(),
//   TODAY.getMonth(),
//   TODAY.getDate(),
//   8,
//   30,
//   0
// );
// // latest class
// const END_TIME = new Date(
//   TODAY.getFullYear(),
//   TODAY.getMonth(),
//   TODAY.getDate(),
//   22,
//   30,
//   0
// );

// const events = [];

type Props = {
  schedule: ?string,
  fetchUserSchedule: () => void,
  saveSchedule: Object => void
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

  componentDidMount() {
    // change the button text

    logPageview();
    this.props.fetchUserSchedule();
    // eslint-disable-next-line
    if (
      window.FB &&
      typeof window.FB !== "undefined" &&
      window.FB.XFBML &&
      typeof window.FB.XFBML !== "undefined"
    )
      window.FB.XFBML.parse(); // call this function to re-render FB-like button
  }

  componentWillUnmount() {
    // clear schedule
    this.props.saveSchedule(null);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.schedule !== this.props.schedule) {
      if (this.props.schedule)
        tools.examTime(JSON.parse(this.props.schedule)).then(exam =>
          this.setState({ exam }, () => {
            this.generateCalendar();
          })
        );
      else this.setState({ calendarEvents: [] });
    }
  }

  calendarEventRenderer = ({ event }) => (
    <span style={{ lineHeight: "0.75rem" }}>
      <strong>{event.title}</strong>
      {` ${event.type} (${event.group})\n`}
      {event.location}
    </span>
  );

  importSchedule = input => {
    const tokenStream = tools.tokenize(input);
    const json = tools.parseToJSON(tokenStream);
    this.props.saveSchedule(JSON.stringify(json));
    tools.examTime(json).then(exam =>
      this.setState({ exam }, () => {
        this.generateCalendar();
      })
    );
    logScheduleGeneration();
  };

  generateCalendar = () => {
    if (!this.props.schedule || !this.state.exam) return null;
    const calendarEvents = tools.calendarHelper(
      JSON.parse(this.props.schedule),
      this.state.exam
    );
    this.setState({ calendarEvents: calendarEvents });
  };

  placeholderPage = () => (
    <div
      style={{
        height: "80vh",
        display: !this.state.calendarEvents ? "block" : "none"
      }}
    />
  );

  unimportedPage = () => (
    <div className={styles.instructionContainer}>
      <div className={styles.text}>
        Create your <span className={styles.beautiful}>beautiful</span> class
        schedule and add to your calendar!
      </div>
      <div className={styles.picContainer}>
        <div className={styles.picItem}>
          <img src="/instruct_1.png" width="100%" />
          <div>A weekly class schedule that can be added to your calendar</div>
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
              Import your schedule
            </Button>
          }
        />
      </div>
    </div>
  );

  render() {
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
            <div className={styles.headerContainer}>
              {/* <div className={styles.header}>
          <div>{calendarIcon}</div> Scheduler
        </div>
        
        {/* <div
          className={"fb-like".concat(" " + styles.fbLike)}
          data-href="https://ntuvibe.com"
          data-layout="button_count"
          data-action="like"
          data-size="large"
          data-show-faces="false"
          data-share="false"
        /> */}
            </div>
            {!this.state.calendarEvents ? (
              this.placeholderPage()
            ) : this.state.calendarEvents.length === 0 ? (
              this.unimportedPage()
            ) : (
              <ImportedPage
                calendarEvents={this.state.calendarEvents}
                exam={this.state.exam}
              />
            )}
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
    schedule: user && user.schedule
  };
};

const mapDispatchToProps = dispatch => ({
  saveSchedule: schedule => dispatch(saveSchedule(schedule)),
  fetchUserSchedule: () => dispatch(fetchUserSchedule())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageScheduler);
