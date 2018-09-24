// @flow
import React from "react";
// import { withRouter } from "react-router";
// import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import SignUpForm from "./components/SignUpForm";

function withSignUpModal(WrappedComponent) {
  return class extends React.Component {
    state = {
      visible: false
    };

    showModal = () => {
      this.setState({ visible: true });
    };

    hideModal = () => {
      this.setState({ visible: false });
    };

    render() {
      return (
        <React.Fragment>
          <Modal
            centered
            title={"SIGN UP"}
            visible={this.state.visible}
            onCancel={this.hideModal}
            footer={null}
          >
            <SignUpForm hideModal={this.hideModal} />
          </Modal>
          <WrappedComponent showSignUpModal={this.showModal} {...this.props} />
        </React.Fragment>
      );
    }
  };
}

export default withSignUpModal;
