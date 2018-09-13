// @flow
import React from "react";
import Popup from "reactjs-popup";
import Button from "antd/lib/button";
import * as styles from "./style.scss";

type Props = {
  trigger: any
};

class RateCourse extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <Popup modal closeOnDocumentClick trigger={this.props.trigger}>
        {close => (
          <div className={styles.container}>
            <h1>Hello, world!</h1>
            <Button type="primary" onClick={close}>
              Close
            </Button>
          </div>
        )}
      </Popup>
    );
  }
}

export default RateCourse;
