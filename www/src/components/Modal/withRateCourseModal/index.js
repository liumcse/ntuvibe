// @flow
import React from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";

import RatingForm from "./components/RatingForm";

function withRateCourseModal(WrappedComponent) {
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
            title={"RATE THE COURSE"}
            visible={this.state.visible}
            onCancel={this.hideModal}
            footer={[
              <Button key="back" onClick={this.hideModal}>
                Cancel
              </Button>,
              <Button key="post" type="primary" onClick={this.submit}>
                Post
              </Button>
            ]}
          >
            <RatingForm />
          </Modal>
          <WrappedComponent
            showRateCourseModal={this.showModal}
            {...this.props}
          />
        </React.Fragment>
      );
    }
  };
}

export default withRateCourseModal;
