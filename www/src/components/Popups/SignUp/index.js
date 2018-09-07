// @flow
import React from "react";
import Popup from "reactjs-popup";
import { connect } from "react-redux";
import { userSignUp } from "src/redux/actions";

import * as styles from "./style.scss";

type Props = {
  open: boolean,
  closePopup: () => void,
  userSignUp: any => void
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
      this.requestVerification();
    }
  };

  close = () => {
    // reset state before closing up
    this.setState({
      verificationRequested: false,
      emailSent: false
    });
    document.removeEventListener("keydown", this.keydownEvent);
    this.props.closePopup();
  };

  requestVerification = () => {
    const email = this.state.email && this.state.email.toLowerCase();
    if (
      !email.split("@") ||
      !(
        email.split("@").includes("ntu.edu.sg") ||
        email.split("@").includes("e.ntu.edu.sg")
      )
    ) {
      alert("Please enter a valid NTU Email");
      return;
    }
    this.setState({
      verificationRequested: true
    });
    const form = new FormData();
    form.append("email", email);
    this.props
      .userSignUp(form)
      .then(() => {
        this.setState({ verificationRequested: false, emailSent: true });
      })
      .catch();
    // TODO: handle exception
  };

  handleInput = event => {
    this.setState({ email: event.target.value });
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
              ☄️ We have sent you an Email. Check your inbox (or spam folder...
              😢) and complete your registration!
            </div>
          ) : (
            <div className={styles.email_container}>
              <input
                className={styles.email}
                onChange={this.handleInput}
                placeholder="your-ntu-email@e.ntu.edu.sg"
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
              className={styles.button.concat(" ").concat(styles.highlight)}
              onClick={this.requestVerification}
              disabled={verificationRequested}
            >
              {verificationRequested ? "Sending..." : "Let's Rock!"}
            </button>
          )}
          {(!verificationRequested || emailSent) && (
            <button className={styles.button} onClick={this.close}>
              Close
            </button>
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
