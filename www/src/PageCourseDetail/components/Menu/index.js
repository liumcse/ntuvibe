// @flow
import React from "react";

import withRateCourseModal from "src/components/Modal/withRateCourseModal";
import Button from "antd/lib/button";
// eslint-disable-next-line
import Icon from "antd/lib/icon";

import Search from "src/components/Search";

import * as styles from "./style.scss";
import * as theme from "./dropdown-theme.scss";

type Props = {
  showRateCourseModal: () => void
};

class Menu extends React.PureComponent<Props> {
  render() {
    return (
      <React.Fragment>
        <div className={styles.menu}>
          <div className={styles.search}>
            <Search theme={theme} />
          </div>
          <div className={styles.actions}>
            <div className={styles.action}>
              <Button type="primary" onClick={this.props.showRateCourseModal}>
                Rate the course
              </Button>
            </div>
          </div>
        </div>
        <Button
          className={styles.roundButton}
          style={{ position: "fixed", display: "none" }}
          onClick={this.props.showRateCourseModal}
          type="primary"
          shape="circle"
          size="large"
          icon="edit"
        />
      </React.Fragment>
    );
  }
}

export default withRateCourseModal(Menu);
