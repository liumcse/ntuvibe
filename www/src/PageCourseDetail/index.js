// @flow
import React from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router";

import NavBar from "src/components/NavBar";
import Footer from "./components/Footer";
import RatingBar from "./components/RatingBar";
import Timetable from "./components/Timetable";
import ExamSchedule from "./components/ExamSchedule";

import type {
  CourseDetail,
  CourseRating,
  CourseComments
} from "src/FlowType/courses";

import * as styles from "./style.scss";
import Menu from "./components/Menu";
import CommentList from "./components/CommentList";
import {
  fetchCourseDetail,
  fetchCourseRating,
  fetchCourseComments
} from "../redux/actions";

import no from "./assets/no.svg";
import yes from "./assets/yes.svg";

type Props = {
  // from redux
  fetchCourseDetail: string => void,
  fetchCourseRating: string => void,
  fetchCourseComments: string => void,
  courseDetail: CourseDetail,
  courseRating: CourseRating,
  courseComments: CourseComments,
  // from router
  match: Object,
  location: Object,
  history: Object
};

type HeadingProps = {
  code: string,
  rating: string,
  title: string
};

const Heading = (props: HeadingProps) => (
  <div className={styles.heading}>
    <div className={styles.heading_row}>
      <div className={styles.course_code}>{props.code}</div>
      <div className={styles.rating_overall}>{props.rating}</div>
    </div>
    <div className={styles.heading_course_title}>{props.title}</div>
  </div>
);

class PageCourseDetail extends React.Component<Props> {
  componentDidMount() {
    const {
      match: {
        params: { courseCode }
      }
    } = this.props;

    this.props.fetchCourseDetail(courseCode.toUpperCase()); // do we really put the upper case here?
    this.props.fetchCourseRating(courseCode.toUpperCase()); // do we really put the upper case here?
    this.props.fetchCourseComments(courseCode.toUpperCase()); // do we really put the upper case here?
  }

  render() {
    const { courseDetail, courseRating, courseComments } = this.props;

    if (!courseDetail || !courseRating || !courseComments) {
      return "Loading...";
    } else {
      const {
        title,
        description,
        AU,
        prerequisite,
        remark,
        asUE,
        asPE
      } = courseDetail;
      const { overall, useful, easy } = courseRating;

      return (
        <div className={styles.page_course_detail}>
          <NavBar />
          <Menu />
          <div className={styles.content}>
            <Heading
              code={this.props.match.params.courseCode}
              rating={overall}
              title={title}
            />
            <div className={styles.row_box}>
              <div className={styles.course_info}>
                <div className={styles.course_description}>{description}</div>
                <div className={styles.requirement}>
                  <div className={styles.label}>Prerequisites</div>
                  <div className={styles.requirement_content}>
                    {prerequisite}
                  </div>
                </div>
                <div className={styles.requirement}>
                  <div className={styles.label}>Remarks</div>
                  <div className={styles.requirement_content}>{remark}</div>
                </div>
              </div>
              <div className={styles.middle_placeholder} />
              <div className={styles.course_info_right}>
                <div className={styles.rating_useful}>
                  <RatingBar label={"Useful"} value={useful} />
                </div>
                <div className={styles.rating_easy}>
                  <RatingBar label={"Easy"} value={easy} />
                </div>
                <div className={styles.au}>{AU.concat(" ").concat("AU")}</div>
                <div className={styles.availability}>
                  <div>
                    <img src={asUE ? yes : no} />Read as Unrestricted Elective
                  </div>
                  <div>
                    <img src={asPE ? yes : no} />Read as General Education
                    Prescribed Elective
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.table}>
              <Timetable title={"Schedule (Current Semester)"} />
            </div>
            <div className={styles.table}>
              <ExamSchedule title={"Final Exam"} />
            </div>
            <div className={styles.header}>Course Comments</div>
            <div className={styles.comment_list}>
              <CommentList comments={courseComments.data || []} />
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  const { course } = state;
  return {
    courseDetail: course && course.courseDetail,
    courseRating: course && course.courseRating,
    courseComments: course && course.courseComments
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCourseDetail: courseCode => dispatch(fetchCourseDetail(courseCode)),
  fetchCourseRating: courseCode => dispatch(fetchCourseRating(courseCode)),
  fetchCourseComments: courseCode => dispatch(fetchCourseComments(courseCode))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageCourseDetail)
);
