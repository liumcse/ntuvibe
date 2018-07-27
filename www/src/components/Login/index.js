import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";

import * as styles from "./style.scss";

const Login = props => (
  <Popup
    modal
    closeOnDocumentClick={false}
    open={props.open}
    closePopup={props.closePopup}
  >
    <div className={styles.header}>Login</div>
    <div className={styles.sub_header}>
      Login to gain access to all features including liking and commenting
      courses. More features are on the way!
    </div>
    <div className={styles.section}>
      <div className={styles.row}>
        <div>Email</div>
        <div className={styles.input}>
          <input />
        </div>
      </div>
    </div>
    <div className={styles.section}>
      <div className={styles.row}>
        <div>Password</div>
        <div className={styles.input}>
          <input />
        </div>
      </div>
    </div>
    <div className={styles.sub_header}>
      Or{" "}
      <span className={styles.signup} onClick={props.switchToSignup}>
        sign up here
      </span>{" "}
      within 30 seconds!
    </div>
    <div className={styles.action}>
      <button onClick={props.closePopup}>Close</button>
    </div>
  </Popup>
);

Login.propTypes = {
  open: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  switchToSignup: PropTypes.func.isRequired
};

export default Login;
