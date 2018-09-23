// @flow
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { popupTrigger, fetchProfile, userLogout } from "src/redux/actions";
import withLoginModal from "src/components/Modal/withLoginModal";
import login from "./assets/login.svg";
import vibe from "src/brand/logo-color.png";
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

type Props = {
  // from modal
  showLoginModal: () => void,
  // from redux
  profile: Object,
  fetchProfile: () => void,
  userLogout: () => void
};

class NavBar extends React.Component<Props> {
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
    // const { popupTrigger } = this.props;
    const { profile } = this.props;
    return (
      <React.Fragment>
        <div className={styles.navbar_container}>
          {/* <Login visible={this.state.visible} hideModal={this.hideModal} /> */}
          <div className={styles.navbar_mobile}>
            <div className={styles.item}>
              <Link to="/">
                <img className={styles.nav_button} src={home} />
              </Link>
            </div>
            {!profile ? (
              <div className={styles.item} onClick={this.props.showLoginModal}>
                <img
                  src={login}
                  style={{
                    height: "1.25rem",
                    width: "1.25rem",
                    cursor: "pointer"
                  }}
                />
              </div>
            ) : (
              <div className={styles.item}>
                <Link to="/users/setting">
                  <img
                    className={styles.avatarImg}
                    src={
                      profile.avatar ||
                      "https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/6rZOCAVe_400x400.jpg?alt=media&token=7b928473-d476-4075-82bf-0ab6d905bdc1"
                    }
                  />
                </Link>
              </div>
            )}
            <div className={styles.item}>
              <Link to="/scheduler">
                <img className={styles.nav_button} src={calendar} />
              </Link>
            </div>
          </div>
          <div className={styles.navbar_elements}>
            <div className={styles.navbar_elements_left}>
              <Link className={styles.brandLink} to="/">
                <div className={styles.brand}>{brand}</div>
              </Link>
            </div>
            <div className={styles.navbar_elements_right}>
              <div className={styles.navbar_elements_right_text}>
                <Link to="/">Home</Link>
              </div>
              <div className={styles.navbar_elements_right_text}>
                <Link to="/scheduler">Scheduler</Link>
              </div>
              <div className={styles.navbar_elements_right_text}>
                <a
                  href="https://medium.com/@ntuvibe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog
                </a>
              </div>
              {!profile ? (
                <div
                  className={styles.rightButton}
                  onClick={this.props.showLoginModal}
                >
                  <img
                    src={login}
                    style={{
                      height: "1.5rem",
                      width: "1.5rem",
                      cursor: "pointer"
                    }}
                  />
                </div>
              ) : (
                <div className={styles.rightButton}>
                  <Link to="/users/setting">
                    <img
                      className={styles.avatarImg}
                      src={
                        profile.avatar ||
                        "https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/6rZOCAVe_400x400.jpg?alt=media&token=7b928473-d476-4075-82bf-0ab6d905bdc1"
                      }
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

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
)(withLoginModal(NavBar));
