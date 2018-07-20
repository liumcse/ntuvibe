import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";

import * as styles from "./style.scss";

const contentStyle = {
  border: "none",
  fontVariant: "none",
  cursor: "default"
};

const overlayStyle = {
  cursor: "default"
};

const RateCourse = props => (
  <Popup
    trigger={props.trigger}
    modal
    closeOnDocumentClick={false}
    contentStyle={contentStyle}
    overlayStyle={overlayStyle}
  >
    <div className={styles.container}>
      <div className={styles.header}>Rate the course</div>
      <div>Do you find it easy?</div>
      <div>Do you find it useful?</div>
      <div>To be honest, do you like it?</div>
      <div>
        Anything you would like to comment on this course? (This is optional,
        checkout <a href="#">How to Write Course Comment</a> if you don't know
        where to start)
      </div>
    </div>
  </Popup>
);

RateCourse.propTypes = {
  trigger: PropTypes.object.isRequired
};

export default RateCourse;
