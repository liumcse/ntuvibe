import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";

import { userLogin } from "src/redux/actions";

import * as styles from "./style.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: "",
      verificationRequested: false,
      succeed: false,
      email: "",
      password: ""
    };
  }

  componentDidUpdate() {
    if (this.props.open) {
      document.addEventListener("keydown", this.keydownEvent);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownEvent);
  }

  keydownEvent = event => {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ notification: "Don't leave any blank :p" });
      return;
    } else {
      this.setState({ verificationRequested: true, notification: "" });
    }
    const authForm = new FormData();
    authForm.append("email", email);
    authForm.append("password", password);
    this.props.userLogin(authForm).then(() => {
      const { loginRequest } = this.props;
      if (!loginRequest) {
        this.setState({
          verificationRequested: false,
          notification: "Something went wrong... Please try again later"
        });
      } else {
        const { success, error_message } = loginRequest;
        if (!success) {
          this.setState({
            verificationRequested: false,
            notification: error_message
          });
        } else {
          this.setState({
            verificationRequested: false,
            succeed: true,
            notification: "Login sucessful! Redirecting..."
          });
          setTimeout(() => location.reload(), 1500);
        }
      }
    });
  };

  close = () => {
    document.removeEventListener("keydown", this.keydownEvent);
    this.props.closePopup();
  };

  render() {
    return (
      <Popup modal closeOnDocumentClick={false} open={this.props.open}>
        <div className={styles.header}>Login</div>
        <div className={styles.description}>
          <div>Login to unlock all features such as giving your rating.</div>
          <div>More features are on the way!</div>
        </div>
        <div className={styles.section}>
          <div className={styles.email_container}>
            <input
              onChange={this.handleEmailChange}
              className={styles.email}
              placeholder="Email"
            />
          </div>
          <div className={styles.password_container}>
            <input
              onChange={this.handlePasswordChange}
              className={styles.password}
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div className={styles.noAccount}>
          No account?{" "}
          <span
            className={styles.signUp}
            onClick={() => this.props.openSignUp()}
          >
            Create one
          </span>.
        </div>
        {this.state.notification ? (
          <div className={styles.notification}>{this.state.notification}</div>
        ) : null}
        <div className={styles.action}>
          <button
            onClick={this.handleSubmit}
            className={styles.button.concat(" ").concat(styles.highlight)}
            disabled={this.state.verificationRequested}
          >
            {this.state.verificationRequested ? "Verifying..." : "Login"}
          </button>
          <button className={styles.button} onClick={this.close}>
            Close
          </button>
        </div>
      </Popup>
    );
  }
}
Login.propTypes = {
  open: PropTypes.bool.isRequired,
  openSignUp: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
  loginRequest: PropTypes.object
};

const mapStateToProps = state => {
  const { user } = state;
  return {
    loginRequest: user && user.loginRequest
  };
};

const mapDispatchToProps = dispatch => ({
  userLogin: authForm => dispatch(userLogin(authForm))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
