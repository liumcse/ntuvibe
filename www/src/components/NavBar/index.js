import React from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { popupTrigger, fetchProfile, userLogout } from "src/redux/actions";
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

const LoginButton = () => (
  <img
    src={login}
    style={{ height: "1.5rem", width: "1.5rem", cursor: "pointer" }}
  />
);

const Avatar = props => (
  <Popup
    overlayStyle={{ opacity: "0", cursor: "default" }}
    contentStyle={{
      zIndex: "99999",
      maxHeight: "100%",
      width: "auto"
    }}
    trigger={open => (
      <img
        className={styles.avatarImg}
        src={props.avatar || "https://csming.com/static/profile.jpg"}
      />
    )}
    position="bottom right"
    closeOnDocumentClick
  >
    <div className={styles.userMenu}>
      <div onClick={props.logout}>Logout</div>
    </div>
  </Popup>
);

class NavBar extends React.Component {
  componentDidMount() {
    this.props.fetchProfile();
  }

  handleLogout = () => {
    this.props.userLogout();
  };

  render() {
    const { popupTrigger } = this.props;
    const { profile } = this.props;
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
            <div className={styles.navbar_elements_right_text}>
              <Link to="#">BLOG</Link>
            </div>
            <div className={styles.navbar_elements_right_text}>
              <Link to="/help">HELP</Link>
            </div>
            {!profile ? (
              <div
                className={styles.rightButton}
                onClick={() => popupTrigger(1)}
              >
                <LoginButton />
              </div>
            ) : (
              <div className={styles.rightButton}>
                <Avatar url={profile.avatar} logout={this.handleLogout} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  profile: PropTypes.object,
  popupTrigger: PropTypes.func.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { user } = state;
  return {
    profile: user && user.profile
  };
};

const mapDispatchToProps = dispatch => ({
  popupTrigger: option => dispatch(popupTrigger(option)),
  fetchProfile: () => dispatch(fetchProfile()),
  userLogout: () => dispatch(userLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
