// @flow
import React from "react";
import Popup from "reactjs-popup";
import { connect } from "react-redux";
import { userSignUp } from "src/redux/actions";

import * as styles from "./style.scss";

type Props = {
  open: boolean,
  closePopup: () => void
};

type State = {
  verificationRequested: boolean,
  emailSent: boolean
};

class SignUp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      verificationRequested: false,
      emailSent: false
    };
  }

  close = () => {
    // reset state before closing up
    this.setState({
      verificationRequested: false,
      emailSent: false
    });
    this.props.closePopup();
  };

  requestVerification = () => {
    this.setState({
      verificationRequested: true
    });
    const form = new FormData();
    const { email } = this.state;
    form.append("email", email);
    this.props.userSignUp(form).then(() => {
      console.log("Success");
    });
    // TODO: write send email logic
    setTimeout(() => {
      console.log("set");
      this.setState({ verificationRequested: false, emailSent: true });
    }, 3000);
  };

  handleInput = event => {
    this.setState({ email: event.target.value });;
  };

  render() {
    const { verificationRequested, emailSent } = this.state;
    return (
      <Popup
        modal
        closeOnDocumentClick={false}
        open={this.props.open}
        closePopup={this.props.closePopup}
      >
        <div className={styles.header}>Sign Up</div>
        <div className={styles.description}>
          <div>Create an account to have more fun!</div>
        </div>
        <div className={styles.section}>
          {emailSent ? (
            <div>
              ☄️ We have sent you an Email. Check your inbox and complete your
              registration!
            </div>
          ) : (
            <div className={styles.email_container}>
              <input
                className={styles.email}
                onChange={this.handleInput}
                placeholder="Email"
              />
            </div>
          )}
        </div>
        <div className={styles.note}>
          <div>A verification Email will be sent to you.</div>
          <div>
            Your Email is solely used to verify that you are an NTU student.
          </div>
          <div>We defend your privacy ⚔️.</div>
        </div>
        <div className={styles.action}>
          {!emailSent && (
            <button
              className={styles.highlight}
              onClick={this.requestVerification}
              disabled={verificationRequested}
            >
              {verificationRequested ? "Sending..." : "Let's Rock!"}
            </button>
          )}
          {(!verificationRequested || emailSent) && (
            <button onClick={this.close}>Close</button>
          )}
        </div>
      </Popup>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userSignUp: form => dispatch(userSignUp(form))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
