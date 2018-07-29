import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { popupTrigger } from "src/redux/actions";
import login from "./assets/facebook.svg";

import * as styles from "./style.scss";

const logo = (
  <div
    style={{
      display: "inline-block",
      backgroundColor: "white",
      height: "3rem",
      width: "3rem",
      borderRadius: "10px"
    }}
  />
);

const rightButton = (
  <img src={login} style={{ height: "3rem", width: "auto" }} />
);

class NavBar extends React.PureComponent {
  render() {
    const { popupTrigger } = this.props;
    return (
      <div className={styles.navbar_container}>
        <div className={styles.navbar_elements}>
          <div className={styles.navbar_elements_left}>
            <Link to="/">
              {logo}
              {/* <div className={styles.brand}>Vibe</div> */}
            </Link>
          </div>
          <div className={styles.navbar_elements_right}>
            <div className={styles.navbar_elements_right_text}>
              <Link to="/">HOME</Link>
            </div>
            {/* <div className={styles.navbar_elements_right_text}>
              <Link to="#">EXPLORE</Link>
            </div>
            <div className={styles.navbar_elements_right_text}>
              <Link to="#">PLAN</Link>
            </div> */}
            <div className={styles.navbar_elements_right_text}>
              <Link to="#">HELP</Link>
            </div>
            <div className={styles.rightButton} onClick={() => popupTrigger(1)}>
              {rightButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  popupTrigger: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  popupTrigger: option => dispatch(popupTrigger(option))
});

export default connect(
  null,
  mapDispatchToProps
)(NavBar);
