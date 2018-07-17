import React from "react";
import { Link } from "react-router-dom";

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

// const facebook = <div className={styles.facebook} />

const NavBar = () => {
  return (
    <div className={styles.navbar_container}>
      <div className={styles.navbar_elements}>
        <div>
          <Link to="/">{logo}</Link>
        </div>
        <div style={{ borderBottom: "2px white solid" }}>HOME</div>
        <div>EXPLORE</div>
        <div>PLAN</div>
        <div>HELP</div>
        {/* <div>{facebook}</div> */}
      </div>
    </div>
  );
};

export default NavBar;
