// @flow
import React from "react";
import Modal from "antd/lib/modal";

import LoginForm from "./components/LoginForm";

const Login = props => {
  return (
    <Modal
      centered
      title="LOGIN"
      visible
      onCancel={props.hideModal}
      footer={null}
    >
      <div style={{ margin: "auto" }}>
        <LoginForm {...props} />
      </div>
    </Modal>
  );
};

export default Login;
