import React from "react";
import * as styles from "./style.scss";

const Menu = () => {
  return (
    <div className={styles.menu}>
      <div>Information</div>
      <div>Schedule</div>
      <div>Course Comments</div>
      <div className={styles.action}>Rate the Course</div>
      <div className={styles.action}>Rate an Instructor</div>
    </div>
  );
};

export default Menu;
