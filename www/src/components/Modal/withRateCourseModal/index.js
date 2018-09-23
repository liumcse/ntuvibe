// @flow
import React from "react";
import { withRouter } from "react-router";
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

    submit = () => {
      // empty here, we modify this function inside RatingForm
    };

    render() {
      return (
        <React.Fragment>
          <Modal
            centered
            title={"RATE THE COURSE"}
            visible={this.state.visible}
            onCancel={this.hideModal}
            footer={null}
          >
            <RatingForm submit={this.submit} />
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
