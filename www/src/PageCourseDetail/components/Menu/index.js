import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { popupTrigger } from "src/redux/actions";
import Button from "antd/lib/button";
import Icon from "antd/lib/icon";

import Search from "src/components/Search";

import * as styles from "./style.scss";
import * as theme from "./dropdown-theme.scss";

class Menu extends React.PureComponent {
  render() {
    const { popupTrigger } = this.props;
    return (
      <React.Fragment>
        <div className={styles.menu}>
          <div className={styles.search}>
            <Search theme={theme} />
          </div>
          <div className={styles.actions}>
            <div className={styles.action} onClick={() => popupTrigger(3)}>
              {/* <button className={styles.rateCourse}>Rate the course</button> */}
              <Button type="primary">Rate the course</Button>
            </div>
          </div>
        </div>
        <Button
          className={styles.roundButton}
          onClick={() => popupTrigger(3)}
          style={{ position: "fixed", display: "none" }}
          type="primary"
          shape="circle"
          size="large"
          icon="edit"
        />
      </React.Fragment>
    );
  }
}

Menu.propTypes = {
  popupTrigger: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  popupTrigger: option => dispatch(popupTrigger(option))
});

export default connect(
  null,
  mapDispatchToProps
)(Menu);
