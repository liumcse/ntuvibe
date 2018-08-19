import React from "react";
import * as styles from "./style.scss";
import vibe from "src/brand/logo-color.png";

const brand = (
  <div
    style={{
      display: "inline-block",
      background: "url(".concat(vibe).concat(") no-repeat"),
      backgroundSize: "contain",
      height: "2rem",
      width: "4rem"
    }}
  />
);

const Footer = () => (
  // eslint-disable-next-line

  <div className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.second_row}>
        <div className={styles.brand}>{brand}</div>
        <div className={styles.right}>
          &copy; 2018 NTUVibe &#183; We&#39;re not affiliated with Nanyang
          Technological University.
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
