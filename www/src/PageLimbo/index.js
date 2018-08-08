// @flow
import React from "react";
import { withRouter } from "react-router";

import * as styles from "./style.scss";

type Props = {
  // from router
  match: Object,
  location: Object,
  history: Object
};

class PageLimbo extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      match: {
        params: { token, email }
      }
    } = this.props;
    const emailParsed = email
      .replace("&", "@")
      .split("!")
      .join(".");

    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <h1 className={styles.header}>Final Step</h1>
          <p>Your token is {token}</p>
          <p>Your Email is {emailParsed}</p>
          <p>
            We would like you to fill in some information to complete your
            registration.
          </p>
          <p>Your information will not be used by 3rd party.</p>
          <div className={styles.inputs}>
            <input placeholder="Email" />
            <input placeholder="Password" type="password" />
            <input placeholder="Display name" />
            <input placeholder="Major" />
          </div>
          <button className={styles.activate}>Activate</button>
        </div>
      </div>
    );
  }
}

export default withRouter(PageLimbo);
