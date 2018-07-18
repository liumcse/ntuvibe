import React from "react";

import * as styles from "./style.scss";

class CommentCard extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.profile_avatar} />
        </div>
        <div className={styles.box}>
          <div className={styles.box_left}>
            <p>
              Probably one of the best courses I’ve taken in NTU so far, if not
              the best.
            </p>
            <p>
              I’m using MySQL every day! Says me from another parallel universe.
            </p>
            <p>Actually I think Firebase rocks.</p>
          </div>
          <div className={styles.box_right}>
            <div>Easy</div>
            <div>Useful</div>
            <div>Like</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentCard;
