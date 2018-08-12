// @flow
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import { validateActivation, userActivate, userLogin } from "src/redux/actions";

import * as styles from "./style.scss";

type Props = {
  // from router
  match: Object,
  location: Object,
  history: Object
};

class PageTransient extends React.Component<Props> {
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
      username: "",
      password: "",
      major: "",
      redirect: false
    };
  }

  componentDidMount() {
    this.props.validateActivation(this.token, this.email).then(() => {
      const { validation } = this.props;
      if (!validation || !validation.success) {
        this.setState({ redirect: true });
      }
    });
  }

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleMajor = event => {
    this.setState({ major: event.target.value });
  };

  handleSubmit = () => {
    const { token, email, username, password, major } = this.state;
    if (!username || !password || !major) {
      alert("Please fill in all areas!");
    } else {
      const form = new FormData();
      form.append("token", token);
      form.append("email", email);
      form.append("username", username);
      form.append("password", password);
      form.append("major", major);
      this.props
        .userActivate(form)
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
          <h1 className={styles.header}>Final Step</h1>
          <p>
            Congratulations! You are just one step away from creating your
            account!
          </p>
          <p>
            We&#39;d like you to fill in some information to complete your
            registration.
          </p>
          <p>Your information will not be shared with the 3rd party 💪.</p>
          <div className={styles.inputs}>
            <input className={styles.email} readOnly value={this.email} />
            <input
            className={styles.password}
              onChange={this.handlePassword}
              placeholder="Password (avoid using your NTU password)"
              type="password"
            />
            <input
            className={styles.username}
              onChange={this.handleUsername}
              placeholder="Display name (must be unique!)"
            />
            <input className={styles.major} onChange={this.handleMajor} placeholder="Major (optional)" />
          </div>
          <button onClick={this.handleSubmit} className={styles.activate}>
            Activate
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state;
  return {
    validation: user && user.validation,
    activation: user && user.activation
  };
};

const mapDispatchToProps = dispatch => ({
  validateActivation: (token, email) =>
    dispatch(validateActivation(token, email)),
  userActivate: form => dispatch(userActivate(form)),
  userLogin: form => dispatch(userLogin(form))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageTransient)
);
