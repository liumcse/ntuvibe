import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { popupTrigger } from "src/redux/actions";

import Dropdown from "./components/Dropdown";

import * as styles from "./style.scss";

class Menu extends React.PureComponent {
  render() {
    const { popupTrigger } = this.props;
    return (
      <div className={styles.menu}>
        {/* <div className={styles.item}>Information</div>
        <div className={styles.item}>Schedule</div>
        <div className={styles.item}>Course Comments</div> */}
        <div className={styles.search}>
          <div className={styles.dropdown}>
            <Dropdown />
          </div>
        </div>
        <div className={styles.action} onClick={() => popupTrigger(3)}>
          Rate the Course
        </div>
        {/* <div className={styles.action + " " + styles.item}>
          Rate an Instructor
        </div> */}
      </div>
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
