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
      email: "",
      password: ""
    };
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    const authForm = new FormData();
    authForm.append("email", email);
    authForm.append("password", password);
    this.props.userLogin(authForm);
  };

  render() {
    return (
      <Popup modal closeOnDocumentClick={false} open={this.props.open}>
        <div className={styles.header}>Login</div>
        <div className={styles.description}>
          <div>Login to unlock all features such as rating a course!</div>
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
        <div className={styles.section}>
          No account?{" "}
          <span
            className={styles.signUp}
            onClick={() => this.props.openSignUp()}
          >
            Create one
          </span>.
        </div>
        <div className={styles.action}>
          <button onClick={this.handleSubmit} className={styles.highlight}>
            Login
          </button>
          <button onClick={this.props.closePopup}>Close</button>
        </div>
      </Popup>
    );
  }
}
Login.propTypes = {
  open: PropTypes.bool.isRequired,
  openSignUp: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  userLogin: authForm => dispatch(userLogin(authForm))
});

export default connect(
  null,
  mapDispatchToProps
)(Login);
