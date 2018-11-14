// @flow
import React from "react";
import Button from "antd/lib/button";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import { validatePasswordReset, userResetPassword, userLogin } from "src/redux/actions";

import * as styles from "./style.scss";

type Props = {
  // from redux
  userLogin: Object => void,
  // from router
  match: Object,
  location: Object,
  history: Object
};

class PageResetPassword extends React.Component<Props> {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { token, email }
      }
    } = this.props;
    this.token = token;
    this.email = email
      .replace("&", "@")
      .split("!")
      .join(".");
    this.state = {
      token: this.token,
      email: this.email,
      password: "",
      passwordAgain: "",
      redirect: false
    };
  }

  componentDidMount() {
    this.props.validatePasswordReset(this.token, this.email).then(() => {
      const { passwordResetValidation } = this.props;
      if (!passwordResetValidation || !passwordResetValidation.success) {
        this.setState({ redirect: true });
      }
    });
  }

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  handlePasswordAgain = event => {
    this.setState({ passwordAgain: event.target.value });
  };

  handleSubmit = () => {
    const { token, email, password, passwordAgain } = this.state;
    if (!password || !passwordAgain) {
      alert("Please fill in all areas!");
    } else if (password !== passwordAgain) {
      alert("Two password inputs are different!");
    } else {
      const form = new FormData();
      form.append("token", token);
      form.append("email", email);
      form.append("password", password);
      this.props
        .userResetPassword(form)
        .then(() => {
          const loginForm = new FormData();
          loginForm.append("email", email);
          loginForm.append("password", password);
          this.props.userLogin(loginForm).then(() => {
            this.setState({ redirect: true });
          });
        })
        .catch(() => {
          this.setState({ redirect: true });
        });
      // TODO: handle exception
    }
  };

  render() {
    if (this.state.redirect) {
      // invalid token or Email, redirect
      return <Redirect to="/" />;
    }
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <h1 className={styles.header}>Forgot Password?</h1>
          <p>
            Fret not! Type in your new password here to reset!
          </p>
          <div className={styles.inputs}>
            <input className={styles.email} readOnly value={this.email} />
            <input
              className={styles.password}
              onChange={this.handlePassword}
              placeholder="Password"
              type="password"
            />
            <input
              className={styles.password}
              onChange={this.handlePasswordAgain}
              placeholder="Password Again"
              type="password"
            />
          </div>
          <div className={styles.hint}>
            We use sophisticated encryption technology - not a single person in
            the world can see your password.
          </div>
          <Button
            type="primary"
            onClick={this.handleSubmit}
          >
            Reset Password
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return {
    passwordResetValidation: user && user.passwordResetValidation,
  };
};

const mapDispatchToProps = dispatch => ({
  validatePasswordReset: (token, email) =>
    dispatch(validatePasswordReset(token, email)),
  userResetPassword: form => dispatch(userResetPassword(form)),
  userLogin: form => dispatch(userLogin(form))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageResetPassword)
);
