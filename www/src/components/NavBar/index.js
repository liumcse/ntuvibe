import React from "react";
import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { popupTrigger, fetchProfile, userLogout } from "src/redux/actions";
import login from "./assets/login.svg";
import vibe from "src/brand/logo.png";
import blog from "./assets/blog.svg";
import help from "./assets/help.svg";
import home from "./assets/home.svg";

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

const HomeButton = () => (
  <div
    style={{
      display: "inline-block",
      background: "url(".concat(home).concat(") no-repeat"),
      backgroundSize: "contain",
      height: "1.25rem",
      width: "1.25rem",
      marginBottom: "-0.15rem"
    }}
  />
);

const BlogButton = () => (
  <div
    style={{
      display: "inline-block",
      background: "url(".concat(blog).concat(") no-repeat"),
      backgroundSize: "contain",
      height: "1.25rem",
      width: "1.25rem"
    }}
  />
);

const HelpButton = () => (
  <div
    style={{
      display: "inline-block",
      background: "url(".concat(help).concat(") no-repeat"),
      backgroundSize: "contain",
      height: "1.25rem",
      width: "1.25rem"
    }}
  />
);

const LoginButtonM = () => (
  <img
    src={login}
    style={{ height: "1.25rem", width: "1.25rem", cursor: "pointer" }}
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
        src={
          props.avatar ||
          "https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/6rZOCAVe_400x400.jpg?alt=media&token=7b928473-d476-4075-82bf-0ab6d905bdc1"
        }
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
    setTimeout(() => {
      location.reload();
    }, 500);
  };

  render() {
    const { popupTrigger } = this.props;
    const { profile } = this.props;
    return (
      <div className={styles.navbar_container}>
        <div className={styles.navbar_mobile}>
          <div className={styles.item}>
            <Link to="/">
              <HomeButton />
            </Link>
          </div>
          <div className={styles.item}>
            <a href="https://medium.com/@ntuvibe">
              <BlogButton />
            </a>
          </div>
          <div className={styles.item}>
            <Link to="/help">
              <HelpButton />
            </Link>
          </div>
          {!profile ? (
            <div className={styles.item} onClick={() => popupTrigger(1)}>
              <LoginButtonM />
            </div>
          ) : (
            <div className={styles.item}>
              <Avatar url={profile.avatar} logout={this.handleLogout} />
            </div>
          )}
        </div>
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
              <a href="https://medium.com/@ntuvibe">BLOG</a>
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
