import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { popupTrigger, fetchProfile, userLogout } from "src/redux/actions";
import login from "./assets/login.svg";
import vibe from "src/brand/logo-color.png";
import blog from "./assets/blog.svg";
import calendar from "./assets/calendar.svg";
import home from "./assets/home.svg";

import * as styles from "./style.scss";

const brand = (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      background: "url(".concat(vibe).concat(") no-repeat"),
      backgroundSize: "contain",
      height: "2.8rem",
      width: "5.6rem",
      marginBottom: "0.5rem"
    }}
  />
);

const HomeButton = () => <img className={styles.nav_button} src={home} />;

const BlogButton = () => <img className={styles.nav_button} src={blog} />;

const CalendarButton = () => (
  <img className={styles.nav_button} src={calendar} />
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
  <Link to="/users/setting">
    <img
      className={styles.avatarImg}
      src={
        props.avatar ||
        "https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/6rZOCAVe_400x400.jpg?alt=media&token=7b928473-d476-4075-82bf-0ab6d905bdc1"
      }
    />
  </Link>
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
          {!profile ? (
            <div className={styles.item} onClick={() => popupTrigger(1)}>
              <LoginButtonM />
            </div>
          ) : (
            <div className={styles.item}>
              <Avatar avatar={profile.avatar} />
            </div>
          )}
          <div className={styles.item}>
            <Link to="/scheduler">
              <CalendarButton />
            </Link>
          </div>
          {/* <div className={styles.item}>
            <a href="https://medium.com/@ntuvibe">
              <BlogButton />
            </a>
          </div> */}
        </div>
        <div className={styles.navbar_elements}>
          <div className={styles.navbar_elements_left}>
            <Link className={styles.brandLink} to="/">
              <div className={styles.brand}>{brand}</div>
            </Link>
          </div>
          <div className={styles.navbar_elements_right}>
            <div className={styles.navbar_elements_right_text}>
              <Link to="/">
                <HomeButton /> Home
              </Link>
            </div>
            <div className={styles.navbar_elements_right_text}>
              <Link to="/scheduler">
                <CalendarButton /> Scheduler
              </Link>
            </div>
            <div className={styles.navbar_elements_right_text}>
              <a
                href="https://medium.com/@ntuvibe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BlogButton /> Blog
              </a>
            </div>
            {/* <div className={styles.navbar_elements_right_text}>
              <Link to="/help">HELP</Link>
            </div> */}
            {!profile ? (
              <div
                className={styles.rightButton}
                onClick={() => popupTrigger(1)}
              >
                <LoginButton />
              </div>
            ) : (
              <div className={styles.rightButton}>
                <Avatar avatar={profile.avatar} />
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
