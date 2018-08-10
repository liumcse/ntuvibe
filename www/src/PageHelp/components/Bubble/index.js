import React from "react";
import * as styles from "./style.scss";

const Bubble = props => {
  return (
    <a className={styles.hyper} href={props.link}>
      <div className={styles.container}>
        <img className={styles.img} src={props.img} alt={props.alt} />
      </div>
    </a>
  );
};

export default Bubble;
