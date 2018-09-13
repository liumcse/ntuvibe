import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { popupTrigger } from "src/redux/actions";
import RateCourse from "src/components/Popups/_RateCourse";
import Button from "antd/lib/button";

import Search from "src/components/Search";

import * as styles from "./style.scss";
import * as theme from "./theme.scss";

class Menu extends React.PureComponent {
  render() {
    const { popupTrigger } = this.props;
    return (
      <div className={styles.menu}>
        <div className={styles.search}>
          <Search theme={theme} />
        </div>
        <div className={styles.actions}>
          <div className={styles.action}>
            {/* <button className={styles.rateCourse}>Rate the course</button> */}
            <RateCourse
              trigger={<Button type="primary">Rate the course</Button>}
            />
          </div>
        </div>
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
