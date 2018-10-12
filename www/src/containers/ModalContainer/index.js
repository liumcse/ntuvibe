import React from "react";
import { connect } from "react-redux";
import RateCourse from "@components/Modals/RateCourse";
import Login from "@components/Modals/Login";
import SignUp from "@components/Modals/SignUp";
import {
  showModal,
  hideModal,
  submitCourseRating,
  fetchProfile,
  userLogin,
  userSignUp
} from "@redux/actions";

const ModalContainer = props => {
  switch (props.modalType) {
    case "LOGIN":
      return (
        <Login
          {...props.modalProps}
          hideModal={props.hideModal}
          loginRequest={props.loginRequest}
          fetchProfile={props.fetchProfile}
          userLogin={props.userLogin}
          showSignUpModal={() => props.showModal("SIGN_UP")}
        />
      );
    case "RATE_COURSE":
      return (
        <RateCourse
          {...props.modalProps}
          hideModal={props.hideModal}
          courseComment={props.courseComment}
          submitCourseRating={props.submitCourseRating}
          courseRatingSubmission={props.courseRatingSubmission}
        />
      );
    case "SIGN_UP":
      return (
        <SignUp
          {...props.modalProps}
          hideModal={props.hideModal}
          userSignUp={props.userSignUp}
        />
      );
    default:
      return null;
  }
};

const mapStateToProps = state => {
  const { modal, user } = state;
  return {
    modalType: modal && modal.modalType,
    modalProps: modal && modal.modalProps, // for future use if need to pass props
    courseComment: user && user.courseComment,
    courseRatingSubmission: user && user.courseRatingSubmission,
    loginRequest: user && user.loginRequest
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showModal: (modalType, modalProps) =>
      dispatch(showModal(modalType, modalProps)),
    hideModal: () => dispatch(hideModal()),
    submitCourseRating: courseRatingForm =>
      dispatch(submitCourseRating(courseRatingForm)),
    fetchProfile: () => dispatch(fetchProfile()),
    userLogin: authForm => dispatch(userLogin(authForm)),
    userSignUp: form => dispatch(userSignUp(form))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContainer);
