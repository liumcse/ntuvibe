// @flow
import React from "react";
import Modal from "antd/lib/modal";

import LoginForm from "./components/LoginForm";

export default function withLoginModal(WrappedComponent) {
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
            title="LOGIN"
            visible={this.state.visible}
            onCancel={this.hideModal}
            footer={null}
          >
            <div style={{ margin: "auto" }}>
              <LoginForm hideModal={this.hideModal} />
            </div>
          </Modal>
          <WrappedComponent showLoginModal={this.showModal} {...this.props} />
        </React.Fragment>
      );
    }
  };
}
