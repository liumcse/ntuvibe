import React from "react";
import { Link } from "react-router-dom";

import fb from "./assets/facebook.svg";

import * as styles from "./style.scss";

const logo = (
  <div
    style={{
      display: "inline-block",
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
          <Link to="/">
            {logo}
            {/* <div className={styles.brand}>Vibe</div> */}
          </Link>
        </div>
        <div className={styles.navbar_elements_right}>
          <div className={styles.navbar_elements_right_text}>
            <Link to="/">HOME</Link>
          </div>
          <div className={styles.navbar_elements_right_text}>
            <Link to="#">EXPLORE</Link>
          </div>
          <div className={styles.navbar_elements_right_text}>
            <Link to="#">PLAN</Link>
          </div>
          <div className={styles.navbar_elements_right_text}>
            <Link to="#">HELP</Link>
          </div>
          <div>{facebook}</div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
