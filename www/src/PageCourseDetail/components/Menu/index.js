// @flow
import React from "react";
import { withRouter } from "react-router";

import RateCourse from "src/components/Modal/RateCourse";
import Button from "antd/lib/button";
// eslint-disable-next-line
import Icon from "antd/lib/icon";

import Search from "src/components/Search";

import * as styles from "./style.scss";
import * as theme from "./dropdown-theme.scss";

type Props = {
  // match: Object,
  // location: Object,
  // history: Object
};

class Menu extends React.PureComponent<Props> {
  state = { visible: false };

  showModal = () => {
    this.setState({ visible: true });
  };

  hideModal = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <React.Fragment>
        <RateCourse visible={this.state.visible} hideModal={this.hideModal} />
        <div className={styles.menu}>
          <div className={styles.search}>
            <Search theme={theme} />
          </div>
          <div className={styles.actions}>
            <div className={styles.action}>
              <Button type="primary" onClick={this.showModal}>
                Rate the course
              </Button>
            </div>
          </div>
        </div>
        <Button
          className={styles.roundButton}
          style={{ position: "fixed", display: "none" }}
          onClick={this.showModal}
          type="primary"
          shape="circle"
          size="large"
          icon="edit"
        />
      </React.Fragment>
    );
  }
}

export default Menu;
