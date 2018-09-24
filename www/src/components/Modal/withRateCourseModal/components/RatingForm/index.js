// @flow
import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Alert from "antd/lib/alert";
import Select from "antd/lib/select";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import { submitCourseRating, fetchUserCourseComment } from "src/redux/actions";

import * as styles from "./style.scss";

const Option = Select.Option;
const { TextArea } = Input;

type Props = {
  visible: boolean,
  courseCode: string,
  // from redux
  courseComment: Object,
  submitCourseRating: () => void,
  courseRatingSubmission: Object,
  // from router
  match: Object,
  location: Object,
  history: Object
};

class RatingForm extends React.Component<Props> {
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
    const {
      match: {
        params: { courseCode: courseCode }
      }
    } = this.props;
    // validate
    const { easy, useful, like, comment } = this.state;
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
    if (
      courseComment &&
      courseComment !== undefined &&
      Object.keys(courseComment).length > 0
    ) {
      const { easy, useful, like, comment_content } = courseComment;
      this.setState({
        easy: easy && easy.toString(),
        useful: useful && useful.toString(),
        like: like && like.toString(),
        comment: comment_content
      });
    }
  };

  componentDidMount() {
    this.rehydrate();
  }

  render() {
    return (
      <React.Fragment>
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
          <Select
            style={{ width: "100%" }}
            onChange={this.handleEasyChange}
            value={this.state.easy}
          >
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
          <Select
            style={{ width: "100%" }}
            onChange={this.handleUsefulChange}
            value={this.state.useful}
          >
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
          <Select
            style={{ width: "100%" }}
            onChange={this.handleLikeChange}
            value={this.state.like}
          >
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
          value={this.state.comment}
          style={{ marginTop: "1rem" }}
          autosize={{ minRows: 3 }}
          onChange={this.handleInput}
        />
        <div
          style={{ marginTop: "1rem", fontSize: "0.85rem", textAlign: "right" }}
        >
          You are free to{" "}
          <a target="_blank" href="/">
            stay anonymous
          </a>{" "}
          🤡
        </div>
        <div style={{ marginTop: "1rem", textAlign: "right" }}>
          <Button type="primary" onClick={this.submit}>
            Post
          </Button>
        </div>
      </React.Fragment>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RatingForm)
);
