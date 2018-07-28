import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { popupTrigger } from "src/redux/actions";
import Login from "./Login";
import SignUp from "./SignUp";
import RateCourse from "./RateCourse";

class Popups extends React.Component {
  render() {
    const {
      loginOpen,
      signUpOpen,
      rateCourseOpen,
      close,
      openSignUp
    } = this.props;
    return (
      <React.Fragment>
        <Login open={loginOpen} closePopup={close} openSignUp={openSignUp} />
        <SignUp open={signUpOpen} closePopup={close} />
        <RateCourse open={rateCourseOpen} closePopup={close} />
      </React.Fragment>
    );
  }
}

Popups.propTypes = {
  loginOpen: PropTypes.bool.isRequired,
  signUpOpen: PropTypes.bool.isRequired,
  rateCourseOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  openSignUp: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { popup } = state;
  return {
    loginOpen: popup.loginOpen,
    signUpOpen: popup.signUpOpen,
    rateCourseOpen: popup.rateCourseOpen
  };
};

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(popupTrigger(0)),
  openSignUp: () => dispatch(popupTrigger(2))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popups);
