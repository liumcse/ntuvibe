// @flow
import React from "react";
import { connect } from "react-redux";

import Alert from "antd/lib/alert";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Select from "antd/lib/select";
import Input from "antd/lib/input";

import { submitCourseRating, fetchUserCourseComment } from "src/redux/actions";

import * as styles from "./style.scss";

const Option = Select.Option;
const { TextArea } = Input;

type Props = {
  visible: boolean,
  hideModal: () => void,
  courseCode: string,
  // from redux
  courseComment: Object,
  submitCourseRating: () => void,
  courseRatingSubmission: Object
};

class RateCourse extends React.Component<Props> {
  state = {
    easy: null,
    useful: null,
    like: null,
    comment: "",
    // for user feedback
    requested: false,
    showAlert: false,
    alertType: "",
    alertMessage: ""
  };

  submit = () => {
    // validate
    const { easy, useful, like, comment } = this.state;
    const { courseCode } = this.props;
    if (easy === null || useful === null || like === null) {
      this.setState({
        showAlert: true,
        alertType: "error",
        alertMessage: "Your rating is incomplete :("
      });
    } else {
      this.setState({ requested: true });
      const form = new FormData();
      form.append("code", courseCode);
      form.append("easy", easy.toString());
      form.append("like", like.toString());
      form.append("useful", useful.toString());
      form.append("comment", comment);
      this.props.submitCourseRating(form).then(() => {
        const response = this.props.courseRatingSubmission;
        if (!response) {
          alert("Something went wrong... Is your Internet alright?");
          this.setState({
            requested: false,
            showAlert: true,
            alertType: "warning",
            alertMessage: "Something went wrong... Is your Internet alright?"
          });
        } else if (response.success && response.success === true) {
          this.setState({
            requested: true,
            showAlert: true,
            alertType: "success",
            alertMessage: "Your rating has been posted!"
          });
          setTimeout(() => location.reload(), 1000);
        } else {
          this.setState({
            requested: false,
            showAlert: true,
            alertType: "warning",
            alertMessage:
              (response && response.error_message) ||
              "Server error... It's not on you, we will fix it."
          });
        }
      });
    }
  };

  handleEasyChange = value => {
    this.setState({ easy: value });
  };

  handleUsefulChange = value => {
    this.setState({ useful: value });
  };

  handleLikeChange = value => {
    this.setState({ like: value });
  };

  handleInput = event => {
    this.setState({ comment: event.target.value });
  };

  rehydrate = () => {
    const { courseComment } = this.props;
    if (courseComment) {
      const { easy, useful, like, comment_content } = courseComment;
      this.setState({
        easy: easy,
        useful: useful,
        like: like,
        comment: comment_content
      });
    }
  };

  componentDidMount() {
    this.rehydrate();
  }

  render() {
    return (
      <Modal
        centered
        title={"RATE ".concat(this.props.courseCode)}
        visible={this.props.visible}
        onCancel={this.props.hideModal}
        footer={[
          <Button key="back" onClick={this.props.hideModal}>
            Cancel
          </Button>,
          <Button key="post" type="primary" onClick={this.submit}>
            Post
          </Button>
        ]}
      >
        <Alert
          message={this.state.alertMessage}
          type={this.state.alertType}
          style={{
            marginBottom: "1rem",
            display: this.state.showAlert ? "block" : "none"
          }}
        />
        <div className={styles.container}>
          <div className={styles.label}>
            In terms of difficulty, I find this course
          </div>
          <Select style={{ width: "100%" }} onChange={this.handleEasyChange}>
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
            For the course content, I find this course
          </div>
          <Select style={{ width: "100%" }} onChange={this.handleUsefulChange}>
            <Option value="100" style={{ color: "#28a745" }}>
              Useful
            </Option>
            <Option value="50" style={{ color: "#c99027" }}>
              No opinion
            </Option>
            <Option value="0" style={{ color: "#cb2431" }}>
              Not useful
            </Option>
          </Select>
          <div className={styles.label}>
            Overall, my experience with this course was
          </div>
          <Select style={{ width: "100%" }} onChange={this.handleLikeChange}>
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
          defaultValue={this.state.comment}
          style={{ marginTop: "1rem" }}
          autosize={{ minRows: 3 }}
          onChange={this.handleInput}
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

const mapStateToProps = state => {
  const { course, user } = state;
  return {
    courseRatingSubmission: course && course.courseRatingSubmission,
    courseComment: user && user.courseComment,
    profile: user && user.profile
  };
};

const mapDispatchToProps = dispatch => ({
  submitCourseRating: courseRatingForm =>
    dispatch(submitCourseRating(courseRatingForm)),
  fetchUserCourseComment: () => dispatch(fetchUserCourseComment())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateCourse);
