import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";

import * as styles from "./style.scss";

const SignUp = props => (
  <Popup
    modal
    closeOnDocumentClick={false}
    open={props.open}
    closePopup={props.closePopup}
  >
    <div className={styles.header}>Sign Up</div>
    <div className={styles.description}>
      <div>Create an account to have more fun!</div>
    </div>
    <div className={styles.section}>
      <div className={styles.email_container}>
        <input className={styles.email} placeholder="Email" />
      </div>
    </div>
    <div className={styles.note}>
      <div>A verification Email will be sent to you.</div>
      <div>Your Email is solely to verify that you are an NTU student.</div>
      <div>We defend your privacy ⚔️.</div>
    </div>
    <div className={styles.action}>
      <button onClick={props.closePopup}>Verify</button>
    </div>
  </Popup>
);

SignUp.propTypes = {
  open: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired
};

export default SignUp;
