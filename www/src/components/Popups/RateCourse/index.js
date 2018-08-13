import React from "react";
import Popup from "reactjs-popup";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { submitCourseRating, fetchUserCourseComment } from "src/redux/actions";

import * as styles from "./style.scss";

class RateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      succeed: false,
      easy: null,
      useful: null,
      like: null,
      comment: ""
    };
  }

  submitRating = () => {
    const { easy, useful, like, comment } = this.state;
    const courseCode = this.props.location.pathname.replace("/courses/", "");
    const notificationDOM = document.querySelector("#notification");
    if (easy === null || useful === null || like === null) {
      notificationDOM.innerHTML = "One or more field is empty...";
      notificationDOM.style.display = "block";
    } else {
      this.setState({ submitting: true });
      const courseRatingForm = new FormData();
      courseRatingForm.append("code", courseCode);
      courseRatingForm.append("easy", easy.toString());
      courseRatingForm.append("like", like.toString());
      courseRatingForm.append("useful", useful.toString());
      courseRatingForm.append("comment", comment);
      this.props.submitCourseRating(courseRatingForm).then(() => {
        const response = this.props.courseRatingSubmission;
        if (!response) {
          notificationDOM.innerHTML =
            "Something went wrong... Is your Internet alright?";
          notificationDOM.style.display = "block";
        } else if (response.success && response.success === true) {
          notificationDOM.innerHTML = "Submitted successfully! Redirecting...";
          notificationDOM.style.color = "$primary";
          notificationDOM.style.display = "block";
          setTimeout(() => {
            this.setState({
              succeed: true,
              easy: null,
              useful: null,
              like: null,
              comment: ""
            });
            location.reload();
          }, 500);
        } else {
          notificationDOM.innerHTML =
            (response && response.error_message) ||
            "Server error... It's not your problem, we will fix it.";
          notificationDOM.style.display = "block";
        }
        this.setState({ submitting: false });
      });
    }
  };

  handleInput = event => {
    this.setState({ comment: event.target.value });
  };

  selectRating = option => {
    switch (option) {
      case 11:
        // easy: positive
        this.setState({ easy: 100 });
        return;
      case 12:
        // easy: neutral
        this.setState({ easy: 50 });
        return;
      case 13:
        // easy: negative
        this.setState({ easy: 0 });
        return;
      case 21:
        // useful: positive
        this.setState({ useful: 100 });
        return;
      case 22:
        // useful: neutral
        this.setState({ useful: 50 });
        return;
      case 23:
        // useful: negative
        this.setState({ useful: 0 });
        return;
      case 31:
        // like: positive
        this.setState({ like: 100 });
        return;
      case 32:
        // like: neutral
        this.setState({ like: 50 });
        return;
      case 33:
        // like: negative
        this.setState({ like: 0 });
        return;
      default:
        return;
    }
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

  componentDidUpdate(prevProps) {
    const prevCourseCode =
      prevProps &&
      prevProps.location &&
      prevProps.location.pathname.replace("/courses/", "");
    const thisCourseCode = this.props.location.pathname.replace(
      "/courses/",
      ""
    );
    const { profile, open } = this.props;
    if (open && !profile) {
      // not logged in
      this.props.openLogin();
    }
    if (prevCourseCode !== thisCourseCode || prevProps.open !== open) {
      this.rehydrate();
    }
  }

  render() {
    const { easy, useful, like } = this.state;
    return (
      <Popup
        modal
        closeOnDocumentClick={false}
        open={this.props.open}
        closePopup={this.props.closePopup}
      >
        <div className={styles.container}>
          <div className={styles.header}>Rate the course</div>
          <div className={styles.section}>
            <div className={styles.sub_header}>Do you find it easy?</div>
            <div className={styles.row}>
              <div
                onClick={() => this.selectRating(11)}
                className={
                  easy === 100
                    ? styles.radio_a.concat(" ").concat(styles.selected)
                    : styles.radio_a
                }
              >
                Positive
              </div>
              <div
                onClick={() => this.selectRating(12)}
                className={
                  easy === 50
                    ? styles.radio_b.concat(" ").concat(styles.selected)
                    : styles.radio_b
                }
              >
                Neutral
              </div>
              <div
                onClick={() => this.selectRating(13)}
                className={
                  easy === 0
                    ? styles.radio_c.concat(" ").concat(styles.selected)
                    : styles.radio_c
                }
              >
                Negative
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sub_header}>Do you find it useful?</div>
            <div className={styles.row}>
              <div
                onClick={() => this.selectRating(21)}
                className={
                  useful === 100
                    ? styles.radio_a.concat(" ").concat(styles.selected)
                    : styles.radio_a
                }
              >
                Positive
              </div>
              <div
                onClick={() => this.selectRating(22)}
                className={
                  useful === 50
                    ? styles.radio_b.concat(" ").concat(styles.selected)
                    : styles.radio_b
                }
              >
                Neutral
              </div>
              <div
                onClick={() => this.selectRating(23)}
                className={
                  useful === 0
                    ? styles.radio_c.concat(" ").concat(styles.selected)
                    : styles.radio_c
                }
              >
                Negative
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sub_header}>Do you like the course?</div>
            <div className={styles.row}>
              <div
                onClick={() => this.selectRating(31)}
                className={
                  like === 100
                    ? styles.radio_a.concat(" ").concat(styles.selected)
                    : styles.radio_a
                }
              >
                Positive
              </div>
              <div
                onClick={() => this.selectRating(32)}
                className={
                  like === 50
                    ? styles.radio_b.concat(" ").concat(styles.selected)
                    : styles.radio_b
                }
              >
                Neutral
              </div>
              <div
                onClick={() => this.selectRating(33)}
                className={
                  like === 0
                    ? styles.radio_c.concat(" ").concat(styles.selected)
                    : styles.radio_c
                }
              >
                Negative
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.sub_header}>
              {/* eslint-disable-next-line */}
          Any thing you'd like to comment on?
            </div>
            <textarea
              onChange={this.handleInput}
              placeholder="Type your comment here... (optional)"
            >
              {this.state.comment || null}
            </textarea>
          </div>
          <div
            id="notification"
            className={styles.section}
            style={{ color: "crimson", display: "none" }}
          />
          <div className={styles.action}>
            <div className={styles.row}>
              <div>
                <button
                  id="submit"
                  disabled={this.state.submitting}
                  onClick={this.submitRating}
                  className={styles.highlight}
                  style={{
                    marginRight: "3rem"
                  }}
                >
                  {this.state.submitting ? "Submitting.." : "Submit"}
                </button>
              </div>
              <div>
                <button onClick={this.props.closePopup}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    );
  }
}

RateCourse.propTypes = {
  submitCourseRating: PropTypes.func.isRequired,
  fetchUserCourseComment: PropTypes.func.isRequired,
  courseRatingSubmission: PropTypes.object,
  profile: PropTypes.object,
  courseComment: PropTypes.object,
  open: PropTypes.bool.isRequired,
  openLogin: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
  // from router
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

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
  )(RateCourse)
);
