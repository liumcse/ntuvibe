import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";

import * as styles from "./style.scss";

const Signup = props => (
  <Popup
    modal
    closeOnDocumentClick={false}
    open={props.open}
    closePopup={props.closePopup}
  >
    <div className={styles.header}>Login</div>
    <div className={styles.sub_header}>
      Sign up using your NTU Email (for students only)!
    </div>
    <div className={styles.sub_header}>
      Your NTU Email is solely used to verify that you are an NTU student. You
      are free to remain anonymous on Vibe, we defend your privacy.
    </div>
    <div className={styles.section}>
      <div className={styles.row}>
        <div>Email</div>
        <div>
          <input />
        </div>
      </div>
    </div>
    <div className={styles.section}>
      <div className={styles.row}>
        <div>Password</div>
        <div>
          <input />
        </div>
      </div>
    </div>
    <div className={styles.action}>
      <button onClick={props.closePopup}>Close</button>
    </div>
  </Popup>
);

Signup.propTypes = {
  open: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired
};

export default Signup;
