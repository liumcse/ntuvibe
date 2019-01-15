// @flow
import * as React from "react";
import * as styles from "./style.scss";

type Props = {
  number?: string,
  children: any
};

const Card = (props: Props) => (
  <div className={styles.container}>
    {props.number && (
      <div className={styles.numberContainer}>
        <div className={styles.number}>{props.number}</div>
      </div>
    )}
    {props.children}
  </div>
);

export default Card;
