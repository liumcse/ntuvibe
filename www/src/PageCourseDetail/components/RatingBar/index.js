// @flow

import React from "react";

import * as styles from "./style.scss";

type Props = {
  label: string,
  value: string
};

const RatingBar = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>{props.label}</div>
      <div className={styles.bar_container}>
        <div className={styles.back_bar} />
        <div className={styles.front_bar} style={{ width: props.value }} />
      </div>
    </div>
  );
};

export default RatingBar;
