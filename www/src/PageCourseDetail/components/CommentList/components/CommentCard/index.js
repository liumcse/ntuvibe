import React from "react";

import * as styles from "./style.scss";

const Badge = props => {
  const value = props.value;
  const label = props.label;
  switch (value) {
    case 1:
      return (
        <div className={styles.badge + " " + styles.badge_bad}>{label}</div>
      );
    case 2:
      return (
        <div className={styles.badge + " " + styles.badge_moderate}>
          {label}
        </div>
      );
    default:
      return (
        <div className={styles.badge + " " + styles.badge_good}>{label}</div>
      );
  }
};

class CommentCard extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.profile_avatar} />
        </div>
        <div className={styles.box}>
          <div className={styles.box_left}>
            <div className={styles.username}>Some guy</div>
            <div className={styles.glance}>
              A Computer Science student on June 13th, 2018
            </div>
            <div className={styles.content}>
              <p>
                Probably one of the best courses I’ve taken in NTU so far, if
                not the best.
              </p>
              <p>
                I’m using MySQL every day! Says me from another parallel
                universe.
              </p>
              <p>Actually I think Firebase rocks.</p>
            </div>
          </div>
          <div className={styles.box_right}>
            <Badge value={1} label={"Easy"} />
            <Badge value={3} label={"Useful"} />
            <Badge value={2} label={"Like"} />
          </div>
        </div>
      </div>
    );
  }
}

export default CommentCard;
