import React from "react";

import * as styles from "./style.scss";
import RateCourse from "../RateCourse";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rateCourseOpen: false,
      rateInstructorOpen: false
    };
  }

  rateCourse = () => {
    this.setState({ rateCourseOpen: true });
  };

  closePopup = () => {
    this.setState({
      rateCourseOpen: false,
      rateInstructorOpen: false
    });
  };

  render() {
    const { rateCourseOpen } = this.state;

    return (
      <div className={styles.menu}>
        <div className={styles.item}>Information</div>
        <div className={styles.item}>Schedule</div>
        <div className={styles.item}>Course Comments</div>
        <div
          className={styles.action + " " + styles.item}
          onClick={() => this.rateCourse()}
        >
          Rate the Course
        </div>
        {/* <div className={styles.action + " " + styles.item}>
          Rate an Instructor
        </div> */}
        <RateCourse open={rateCourseOpen} closePopup={this.closePopup} />
      </div>
    );
  }
}

export default Menu;
