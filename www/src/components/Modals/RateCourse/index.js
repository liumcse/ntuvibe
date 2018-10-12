// @flow
import React from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal";

import RatingForm from "./components/RatingForm";

const RateCourse = props => {
  return (
    <Modal
      centered
      title={"RATE THE COURSE"}
      visible
      onCancel={props.hideModal}
      footer={null}
    >
      <RatingForm {...props} />
    </Modal>
  );
};

RateCourse.propTypes = {
  hideModal: PropTypes.func.isRequired
};

export default RateCourse;
