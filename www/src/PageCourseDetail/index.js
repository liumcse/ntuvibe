// @flow
import React from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router";

import NavBar from "src/components/NavBar";
import Footer from "./components/Footer";
import RatingBar from "./components/RatingBar";
import Timetable from "./components/Timetable";
import ExamSchedule from "./components/ExamSchedule";

import { remove_trailing_newline } from "src/utils";
import type {
  CourseDetail,
  CourseRating,
  CourseComments,
  CourseSchedule,
  ExamSchedule as CourseExamSchedule
} from "src/FlowType/courses";

import * as styles from "./style.scss";
import Menu from "./components/Menu";
import CommentList from "./components/CommentList";
import {
  fetchCourseDetail,
  fetchCourseRating,
  fetchCourseComments,
  fetchCourseSchedule,
  fetchExamSchedule
} from "../redux/actions";

import no from "./assets/no.svg";
import yes from "./assets/yes.svg";

const NO_DESCRIPTION =
  "This course has no description. I don't know why this would happen either...";
const NO_RATING = "Hide rating due to insufficient submission";

const RATING_THRESHOLD = 3;

type Props = {
  // from redux
  fetchCourseDetail: string => void,
  fetchCourseRating: string => void,
  fetchCourseComments: string => void,
  fetchCourseSchedule: string => void,
  fetchExamSchedule: string => void,
  courseDetail: CourseDetail,
  courseRating: CourseRating,
  courseComments: CourseComments,
  courseSchedule: CourseSchedule,
  examSchedule: CourseExamSchedule,
  // from router
  match: Object,
  location: Object,
  history: Object
};

type HeadingProps = {
  code: string,
  rating: string,
  title: string,
  count: number
};

const Heading = (props: HeadingProps) => (
  <div className={styles.heading}>
    <div className={styles.heading_row}>
      <div className={styles.course_code}>{props.code.toUpperCase()}</div>
      <div className={styles.rating_overall}>{props.rating}</div>
    </div>
    <div className={styles.heading_row}>
      <div className={styles.heading_course_title}>{props.title}</div>
      <div className={styles.number_of_rating}>
        {!props.count || props.count < RATING_THRESHOLD
          ? NO_RATING
          : props.count.toString().concat(" ratings")}
      </div>
    </div>
  </div>
);

class PageCourseDetail extends React.Component<Props> {
  componentDidMount() {
    this.fetchInformation();
  }

  fetchInformation = () => {
    const {
      match: {
        params: { courseCode }
      }
    } = this.props;
    const code = courseCode.toUpperCase(); // do we really put the upper case here?

    this.props.fetchCourseDetail(code);
    this.props.fetchCourseRating(code);
    this.props.fetchCourseComments(code);
    this.props.fetchCourseSchedule(code);
    this.props.fetchExamSchedule(code);
  };

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { courseCode }
      }
    } = this.props;
    const prevCourseCode = prevProps.match.params.courseCode || courseCode;
    if (prevCourseCode !== courseCode) this.fetchInformation();
  }

  // eslint-disable-next-line
  render() {
    const {
      courseDetail,
      courseRating,
      courseComments,
      courseSchedule,
      examSchedule
    } = this.props;
    if (
      !courseDetail ||
      !courseRating ||
      !courseComments ||
      !examSchedule ||
      !courseSchedule
    ) {
      return "Waiting for response...";
    }

    const { courseCode } = this.props.match.params;
    const { title, au, constraint, description, as_ue, as_pe } = courseDetail; // for courseDetail
    const { count, like, useful, easy } = courseRating; // for courseRating
    const { start_time, end_time } = examSchedule; // for examSchedule

    return (
      <div className={styles.page_course_detail}>
        <NavBar />
        <Menu />
        <div className={styles.content}>
          <div className={styles.section_a}>
            <Heading
              count={count}
              code={courseCode}
              rating={(like && like.toString().concat(" %")) || "- %"}
              title={title || ""}
            />
            <div className={styles.row_box}>
              <div className={styles.course_info}>
                <div className={styles.course_description}>
                  {(description && remove_trailing_newline(description)) ||
                    NO_DESCRIPTION}
                </div>
                {constraint &&
                  constraint.prerequisite &&
                  constraint.prerequisite.length > 0 && (
                    <div className={styles.requirement}>
                      <div className={styles.label}>Prerequisites </div>
                      <div className={styles.requirement_content}>
                        {constraint.prerequisite.join("\n")}
                      </div>
                    </div>
                  )}
                {constraint &&
                  constraint.mutex &&
                  constraint.mutex.length > 0 && (
                    <div className={styles.requirement}>
                      <div className={styles.label}>Antirequisites</div>
                      <div className={styles.requirement_content}>
                        {constraint.mutex}
                      </div>
                    </div>
                  )}
              </div>
              <div className={styles.middle_placeholder} />
              <div className={styles.course_info_right}>
                <div className={styles.rating_useful}>
                  <RatingBar
                    label={"Useful"}
                    value={(useful && useful.toString().concat("%")) || "0%"}
                  />
                </div>
                <div className={styles.rating_easy}>
                  <RatingBar
                    label={"Easy"}
                    value={(easy && easy.toString().concat("%")) || "0%"}
                  />
                </div>
                <div className={styles.au}>
                  {(au && au.concat(" ").concat("AU")) || "-"}
                </div>
                <div className={styles.availability}>
                  <div>
                    <img
                      src={typeof as_ue === "boolean" && (as_ue ? yes : no)}
                    />Read as Unrestricted Elective
                  </div>
                  <div>
                    <img
                      src={typeof as_pe === "boolean" && (as_pe ? yes : no)}
                    />Read as General Education Prescribed Elective
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.section_b}>
            {courseSchedule &&
              Object.keys(courseSchedule).length > 0 && (
                <div className={styles.table}>
                  <Timetable data={courseSchedule} />
                </div>
              )}
            {start_time &&
              end_time && (
                <div className={styles.table}>
                  <ExamSchedule startTime={start_time} endTime={end_time} />
                </div>
              )}
          </div>
          <div className={styles.section_c}>
            <div className={styles.header}>Course Comments</div>
            {courseComments && courseComments.length > 0 ? (
              <div className={styles.comment_list}>
                <CommentList comments={courseComments || []} />
              </div>
            ) : (
              <div className={styles.placeholder}>
                Nobody has published their comments - so you can be the first one!
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { course } = state;
  return {
    courseDetail: course && course.courseDetail,
    courseRating: course && course.courseRating,
    courseComments: course && course.courseComments,
    courseSchedule: course && course.courseSchedule,
    examSchedule: course && course.examSchedule
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCourseDetail: courseCode => dispatch(fetchCourseDetail(courseCode)),
  fetchCourseRating: courseCode => dispatch(fetchCourseRating(courseCode)),
  fetchCourseComments: courseCode => dispatch(fetchCourseComments(courseCode)),
  fetchCourseSchedule: courseCode => dispatch(fetchCourseSchedule(courseCode)),
  fetchExamSchedule: courseCode => dispatch(fetchExamSchedule(courseCode))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageCourseDetail)
);
