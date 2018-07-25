import React from "react";
import { Link } from "react-router-dom";

import login from "./assets/login.svg";

import * as styles from "./style.scss";
import Login from "../Login";
import Signup from "../Signup";

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

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false,
      signupOpen: false
    };
  }

  closePopup = () => {
    this.setState({ loginOpen: false, signupOpen: false });
  };

  openLogin = () => {
    this.setState({ loginOpen: true });
  };

  switchToSignup = () => {
    this.setState({ loginOpen: false, signupOpen: true });
  };

  render() {
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
            <div className={styles.navbar_elements_right_text}>
              <Link to="#">EXPLORE</Link>
            </div>
            <div className={styles.navbar_elements_right_text}>
              <Link to="#">PLAN</Link>
            </div>
            <div className={styles.navbar_elements_right_text}>
              <Link to="#">HELP</Link>
            </div>
            <div className={styles.rightButton} onClick={this.openLogin}>
              {rightButton}
            </div>
          </div>
        </div>

        <Login
          open={this.state.loginOpen}
          closePopup={this.closePopup}
          switchToSignup={this.switchToSignup}
        />
        <Signup open={this.state.signupOpen} closePopup={this.closePopup} />
      </div>
    );
  }
}

export default NavBar;
