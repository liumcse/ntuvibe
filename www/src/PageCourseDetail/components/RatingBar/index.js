// @flow

import React from "react";
import * as styles from "./style.scss";

type Props = {
  label: string,
  usefulValue: string,
  easyValue: string
};

const RatingBar = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>Useful</div>
      <div className={styles.bar_container}>
        <div className={styles.back_bar} />
        <div
          className={styles.front_bar}
          style={{ width: props.usefulValue }}
        />
      </div>
      <div className={styles.digit}>{props.usefulValue}</div>
      <div className={styles.label}>Easy</div>
      <div className={styles.bar_container}>
        <div className={styles.back_bar} />
        <div className={styles.front_bar} style={{ width: props.easyValue }} />
      </div>
      <div className={styles.digit}>{props.easyValue}</div>
    </div>
  );
};

export default RatingBar;
