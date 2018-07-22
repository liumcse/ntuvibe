import React from "react";

import * as styles from "./style.scss";
import RateCourse from "../RateCourse";

const Menu = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.item}>Information</div>
      <div className={styles.item}>Schedule</div>
      <div className={styles.item}>Course Comments</div>
      <RateCourse
        trigger={
          <div className={styles.action + " " + styles.item}>
            Rate the Course
          </div>
        }
      />
      <div className={styles.action + " " + styles.item}>
        Rate an Instructor
      </div>
    </div>
  );
};

export default Menu;
