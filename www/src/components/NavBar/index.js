import React from "react";
import { Link } from "react-router-dom";

import fb from "./assets/facebook.svg";

import * as styles from "./style.scss";

const logo = (
  <div
    style={{
      backgroundColor: "white",
      height: "3rem",
      width: "3rem",
      borderRadius: "10px"
    }}
  />
);

const facebook = (
  <a href="https://www.facebook.com">
    <img src={fb} style={{ height: "3rem", width: "auto" }} />
  </a>
);

const NavBar = () => {
  return (
    <div className={styles.navbar_container}>
      <div className={styles.navbar_elements}>
        <div className={styles.navbar_elements_left}>
          <Link to="/">{logo}</Link>
        </div>
        <div className={styles.navbar_elements_right}>
          <div className={styles.navbar_elements_right_text}>HOME</div>
          <div className={styles.navbar_elements_right_text}>EXPLORE</div>
          <div className={styles.navbar_elements_right_text}>PLAN</div>
          <div className={styles.navbar_elements_right_text}>HELP</div>
          <div>{facebook}</div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
