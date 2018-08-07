import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";

import * as styles from "./style.scss";

const Login = props => (
  <Popup modal closeOnDocumentClick={false} open={props.open}>
    <div className={styles.header}>Login</div>
    <div className={styles.description}>
      <div>Login to unlock all features such as rating a course!</div>
      <div>More features are on the way!</div>
    </div>
    <div className={styles.section}>
      <div className={styles.email_container}>
        <input className={styles.email} placeholder="Email" />
      </div>
      <div className={styles.password_container}>
        <input
          className={styles.password}
          type="password"
          placeholder="Password"
        />
      </div>
    </div>
    <div className={styles.section}>
      No account?{" "}
      <span className={styles.signUp} onClick={() => props.openSignUp()}>
        Create one
      </span>.
    </div>
    <div className={styles.action}>
      <button className={styles.highlight}>Login</button>
      <button onClick={props.closePopup}>Close</button>
    </div>
  </Popup>
);

Login.propTypes = {
  open: PropTypes.bool.isRequired,
  openSignUp: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired
};

export default Login;
