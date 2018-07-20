import React from "react";

import * as styles from "./style.scss";
import RateCourse from "../RateCourse";

const Menu = () => {
  return (
    <div className={styles.menu}>
      <div>Information</div>
      <div>Schedule</div>
      <div>Course Comments</div>
      <RateCourse
        trigger={<div className={styles.action}>Rate the Course</div>}
      />
      <div className={styles.action}>Rate an Instructor</div>
    </div>
  );
};

export default Menu;
