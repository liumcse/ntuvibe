import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";

import * as styles from "./style.scss";

const RateCourse = props => (
  <Popup
    modal
    closeOnDocumentClick={false}
    open={props.open}
    closePopup={props.closePopup}
  >
    <div className={styles.container}>
      <div className={styles.header}>Rate the course</div>
      <div className={styles.section}>
        <div className={styles.sub_header}>Do you find it easy?</div>
        <div className={styles.row}>
          <div className={styles.radio_a}>Positive</div>
          <div className={styles.radio_b}>Neutral</div>
          <div className={styles.radio_c}>Negative</div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.sub_header}>Do you find it useful?</div>
        <div className={styles.row}>
          <div className={styles.radio_a}>Positive</div>
          <div className={styles.radio_b}>Neutral</div>
          <div className={styles.radio_c}>Negative</div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.sub_header}>Do you like the course?</div>
        <div className={styles.row}>
          <div className={styles.radio_a}>Positive</div>
          <div className={styles.radio_b}>Neutral</div>
          <div className={styles.radio_c}>Negative</div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.sub_header}>
          {/* eslint-disable-next-line */}
          Any thing you'd like to comment on?
        </div>
        <textarea placeholder="Type your comment here..." />
      </div>
      <div className={styles.action}>
        <div className={styles.row}>
          <div>
            <button className={styles.highlight}>Submit</button>
          </div>
          <div>
            <button onClick={props.closePopup}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </Popup>
);

RateCourse.propTypes = {
  open: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired
};

export default RateCourse;
