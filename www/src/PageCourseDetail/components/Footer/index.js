import React from "react";
import * as styles from "./style.scss";
import vibe from "src/brand/logo.png";

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
      <div className={styles.first_row}>
        <div className={styles.col}>
          <div className={styles.header}>Make it Better</div>
          <div className={styles.content}>
            Vibe is supported by students at Nanyang Technological University.
            Wanna make it better? Take a look at our repo at Github.
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.header}>Know the Story</div>
          <div className={styles.content}>
            Launched in 2018, Vibe was built by N students during their summer
            break. Why did they create it and what are their goals?
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.header}>Be a Patron</div>
          <div className={styles.content}>
            Vibe will not be around without generous donations from our patrons.
            Every day it costs to run, and $1 can make a difference.
          </div>
        </div>
      </div>
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
