// @flow
import React from "react";
import Modal from "antd/lib/modal";
import PasswordResetForm from "./components/PasswordResetForm";

const PasswordReset = props => {
  return (
    <Modal
      centered
      title={"PASSWORD RESET"}
      visible
      onCancel={props.hideModal}
      footer={null}
    >
      <PasswordResetForm {...props} />
    </Modal>
  );
};

export default PasswordReset;
