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

class Login extends React.PureComponent<Props> {
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
        title="LOGIN"
        visible={this.props.visible}
        onCancel={this.props.hideModal}
        footer={[
          <Button key="back">Cancel</Button>,
          <Button key="submit" type="primary">
            Login
          </Button>
        ]}
      >
        <div className={styles.container}>
          <div className={styles.label}>
            In terms of difficulty, I find this course
          </div>
          <div className={styles.label}>
            Is what I learned useful? My answer would be
          </div>
          <div className={styles.label}>
            In general, my experience with this course was
          </div>
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

export default Login;
