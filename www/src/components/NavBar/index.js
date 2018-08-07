import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { popupTrigger } from "src/redux/actions";
import login from "./assets/login.svg";
import vibe from "src/brand/logo.png";

import * as styles from "./style.scss";

const brand = (
  <div
    style={{
      display: "inline-block",
      background: "url(".concat(vibe).concat(") no-repeat"),
      backgroundSize: "contain",
      height: "3rem",
      width: "6rem"
    }}
  />
);

const rightButton = (
  <img src={login} style={{ height: "1.5rem", width: "auto" }} />
);

class NavBar extends React.PureComponent {
  render() {
    const { popupTrigger } = this.props;
    return (
      <div className={styles.navbar_container}>
        <div className={styles.navbar_elements}>
          <div className={styles.navbar_elements_left}>
            <Link className={styles.brandLink} to="/">
              <div className={styles.brand}>{brand}</div>
            </Link>
          </div>
          <div className={styles.navbar_elements_right}>
            <div className={styles.navbar_elements_right_text}>
              <Link to="/">HOME</Link>
            </div>
            {/* <div className={styles.navbar_elements_right_text}>
              <Link to="#">EXPLORE</Link>
            </div> */}
            <div className={styles.navbar_elements_right_text}>
              <Link to="#">BLOG</Link>
            </div>
            <div className={styles.navbar_elements_right_text}>
              <Link to="/help">HELP</Link>
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
