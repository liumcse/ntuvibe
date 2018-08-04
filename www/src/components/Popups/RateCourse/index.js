import React from "react";
import Popup from "reactjs-popup";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { submitCourseRating } from "src/redux/actions";

import * as styles from "./style.scss";

class RateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      easy: null,
      useful: null,
      like: null,
      comment: ""
    };
  }

  submitRating = () => {
    const { easy, useful, like, comment } = this.state;
    if (easy === null || useful === null || like === null) {
      alert("No");
    } else {
      const courseRatingForm = new FormData();
      courseRatingForm.append("code", "CZ2007");
      courseRatingForm.append("easy", easy.toString());
      courseRatingForm.append("like", like.toString());
      courseRatingForm.append("useful", useful.toString());
      courseRatingForm.append("comment", comment);
      console.log(courseRatingForm.entries());
      for (let pair of courseRatingForm.entries()) {
        console.log(pair);
      }
      console.log("Submitting...");
      this.props.submitCourseRating(courseRatingForm);
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
              placeholder="Type your comment here..."
            />
          </div>
          <div className={styles.action}>
            <div className={styles.row}>
              <div>
                <button
                  onClick={this.submitRating}
                  className={styles.highlight}
                >
                  Submit
                </button>
              </div>
              <div>
                <button onClick={this.props.closePopup}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    );
  }
}

RateCourse.propTypes = {
  // courseCode: PropTypes.string,isRequired,
  open: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  submitCourseRating: courseRatingForm =>
    dispatch(submitCourseRating(courseRatingForm))
});

export default connect(
  null,
  mapDispatchToProps
)(RateCourse);
