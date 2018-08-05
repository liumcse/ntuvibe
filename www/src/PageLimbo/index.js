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

    return (
      <div>
        <h1>Hello!</h1>
        <p>This is where you activate your account</p>
        <p>Your token is {token}</p>
        <p>Your Email is {email}</p>
      </div>
    );
  }
}

export default withRouter(PageLimbo);
