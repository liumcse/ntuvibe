// @flow
import React from "react";
import Modal from "antd/lib/modal";
import SignUpForm from "./components/SignUpForm";

const SignUp = props => {
  return (
    <Modal
      centered
      title={"SIGN UP"}
      visible
      onCancel={props.hideModal}
      footer={null}
    >
      <SignUpForm {...props} />
    </Modal>
  );
};

export default SignUp;
