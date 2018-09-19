// @flow
import React from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";
import Input from "antd/lib/input";

import * as styles from "./style.scss";

const Option = Select.Option;
const { TextArea } = Input;

type Props = {
  visible: boolean,
  hideModal: () => void
};

class RateCourse extends React.PureComponent<Props> {
  // constructor(props) {
  //   this.state = {
  //     visible: props.
  //   }
  // }

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <Modal
        title="RATE A COURSE"
        visible={this.props.visible}
        onCancel={this.props.hideModal}
        footer={[
          <Button key="back">Cancel</Button>,
          <Button key="submit" type="primary">
            Submit
          </Button>
        ]}
      >
        <div className={styles.container}>
          <div className={styles.label}>
            In terms of difficulty, I find this course
          </div>
          <Select style={{ width: "100%" }}>
            <Option value="100" style={{ color: "#28a745" }}>
              Easy
            </Option>
            <Option value="50" style={{ color: "#c99027" }}>
              Average
            </Option>
            <Option value="0" style={{ color: "#cb2431" }}>
              Difficult
            </Option>
          </Select>
          <div className={styles.label}>
            Is what I learned useful? My answer would be
          </div>
          <Select style={{ width: "100%" }}>
            <Option value="100" style={{ color: "#28a745" }}>
              Useful
            </Option>
            <Option value="50" style={{ color: "#c99027" }}>
              Not sure
            </Option>
            <Option value="0" style={{ color: "#cb2431" }}>
              Not useful
            </Option>
          </Select>
          <div className={styles.label}>
            In general, my experience with this course was
          </div>
          <Select style={{ width: "100%" }}>
            <Option value="100" style={{ color: "#28a745" }}>
              Positive
            </Option>
            <Option value="50" style={{ color: "#c99027" }}>
              Neutral
            </Option>
            <Option value="0" style={{ color: "#cb2431" }}>
              Negative
            </Option>
          </Select>
        </div>
        <TextArea
          placeholder="Your comment. This is optional (but highly appreciated!)"
          style={{ marginTop: "1rem" }}
          autosize={{ minRows: 3 }}
        />
        <div style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
          <a target="_blank" href="/">
            We protect your privacy & your right to stay anonymous
          </a>
        </div>
      </Modal>
    );
  }
}

export default RateCourse;
