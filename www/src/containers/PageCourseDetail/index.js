// @flow
import React from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router";

import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import RatingBar from "./components/RatingBar";
import ClassSchedule from "./components/ClassSchedule";
import ExamSchedule from "./components/ExamSchedule";
import SiteMetaHelmet from "src/components/SiteMetaHelmet";

import {
  remove_trailing_newline,
  cap_first_letter,
  prettify_offering
} from "src/utils";
import { logPageview, logCourseVisit } from "src/tracking";
import type {
  CourseDetail,
  CourseRating,
  CourseComments,
  CourseSchedule,
  ExamSchedule as CourseExamSchedule
} from "src/FlowType/courses";

import Menu from "./components/Menu";
import CommentList from "./components/CommentList";
import {
  clearCourseInformation,
  fetchCourseDetail,
  fetchCourseRating,
  fetchCourseComments,
  fetchCourseSchedule,
  fetchUserCourseComment,
  fetchExamSchedule,
  showModal
} from "@redux/actions";

import no from "src/assets/svgs/no.svg";
import yes from "src/assets/svgs/yes.svg";
import exam from "src/assets/svgs/exam.svg";

import * as styles from "./style.scss";

const NO_DESCRIPTION =
  "This course has no description. Sad to see this happened...";
const NO_RATING = "No rating yet";

const RATING_THRESHOLD = 0; // we don't set threshold - yet

type Props = {
  // modal
  showModal: (string, Object) => void,
  hideModal: () => void,
  // from redux
  fetchCourseDetail: string => void,
  fetchCourseRating: string => void,
  fetchCourseComments: string => void,
  fetchCourseSchedule: string => void,
  fetchExamSchedule: string => void,
  fetchProfile: () => void,
  fetchUserCourseComment: string => void,
  clearCourseInformation: () => void,
  popupTrigger: number => void,
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

const HeadingSkeleton = () => (
  <div className={styles.heading}>
    <div className={styles.heading_row}>
      <div
        className={styles.course_code
          .concat(" ")
          .concat(styles.loading_placeholder)}
      >
        CZ9999
      </div>
      <div
        className={styles.rating_overall
          .concat(" ")
          .concat(styles.loading_placeholder)}
      >
        - %
      </div>
    </div>
    <div className={styles.heading_row}>
      <div
        className={styles.heading_course_title
          .concat(" ")
          .concat(styles.loading_placeholder)}
      >
        SOME COURSE
      </div>
      <div
        className={styles.number_of_rating
          .concat(" ")
          .concat(styles.loading_placeholder)}
      >
        99 ratings
      </div>
    </div>
  </div>
);

const skeleton = (
  <div className={styles.page_course_detail}>
    <NavBar />
    <Menu />
    <div className={styles.content}>
      <div className={styles.section_a}>
        <HeadingSkeleton />
        <div className={styles.row_box}>
          <div className={styles.course_info}>
            <div
              className={styles.course_description
                .concat(" ")
                .concat(styles.loading_placeholder)}
            >
              {NO_DESCRIPTION}
            </div>
            <div className={styles.requirement}>
              <div
                className={styles.label
                  .concat(" ")
                  .concat(styles.loading_placeholder)}
              >
                Prerequisites{" "}
              </div>
              <div
                className={styles.requirement_content
                  .concat(" ")
                  .concat(styles.loading_placeholder)}
              >
                xxxxxxxxxxxxxxxxxxxxxx
              </div>
            </div>

            <div className={styles.requirement}>
              <div
                className={styles.label
                  .concat(" ")
                  .concat(styles.loading_placeholder)}
              >
                Antirequisites
              </div>
              <div
                className={styles.requirement_content
                  .concat(" ")
                  .concat(styles.loading_placeholder)}
              >
                xxxxxxxxxxxxxxxxxxxxxx
              </div>
            </div>
          </div>
          <div className={styles.middle_placeholder} />
          <div className={styles.course_info_right}>
            <div
              style={{ width: "100%" }}
              className={styles.rating
                .concat(" ")
                .concat(styles.loading_placeholder)}
            >
              xxoo
            </div>
            <div
              className={styles.au
                .concat(" ")
                .concat(styles.loading_placeholder)}
            >
              {"-".concat(" AU")}
            </div>
            <div className={styles.availability}>
              <div className={styles.loading_placeholder}>
                Read as Unrestricted Elective
              </div>
              <div className={styles.loading_placeholder}>
                Read as General Education Prescribed Elective
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

class PageCourseDetail extends React.Component<Props> {
  componentDidMount() {
    const {
      match: {
        params: { courseCode }
      }
    } = this.props;
    logPageview();
    logCourseVisit(courseCode);
    this.fetchInformation();
  }

  fetchInformation = () => {
    const {
      match: {
        params: { courseCode }
      }
    } = this.props;
    const code = courseCode.toUpperCase(); // do we really put the upper case here?
    this.props.clearCourseInformation();
    this.props.fetchUserCourseComment(code);
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
    if (prevCourseCode !== courseCode) {
      logPageview();
      logCourseVisit(courseCode);
      this.fetchInformation();
    }
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
      return skeleton;
    }

    const { courseCode } = this.props.match.params;
    const {
      title,
      au,
      constraint,
      description,
      as_ue,
      as_pe,
      offered_semester,
      grade_type
    } = courseDetail; // for courseDetail
    const { count, like, useful, easy } = courseRating; // for courseRating
    const { start_time, end_time, update_time } = examSchedule; // for examSchedule

    return (
      <div className={styles.page_course_detail}>
        <SiteMetaHelmet
          title={`${courseCode.toUpperCase()} - ${cap_first_letter(
            title
          )} - NTUVibe`}
          url={`https://ntuvibe.com/courses/${courseCode}`}
          description={
            (description && remove_trailing_newline(description)) ||
            NO_DESCRIPTION
          }
        />
        <NavBar />
        <Menu
          showModal={() =>
            this.props.showModal("RATE_COURSE", {
              courseCode: courseCode
            })
          }
        />
        <div className={styles.content}>
          <div className={styles.section_a}>
            <div className={styles.heading}>
              <div className={styles.course_code}>
                {courseCode.toUpperCase()}
              </div>
              <div className={styles.rating_overall}>
                {(count && like.toString().concat(" %")) || "- %"}
              </div>
              <div className={styles.heading_course_title}>{title || ""}</div>
              <div className={styles.number_of_rating}>
                {!count || count < RATING_THRESHOLD
                  ? NO_RATING
                  : count.toString().concat(" ratings")}
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.course_info}>
                <div className={styles.course_description}>
                  {(description && remove_trailing_newline(description)) ||
                    NO_DESCRIPTION}
                </div>
                <div className={styles.bottom_left}>
                  {offered_semester &&
                    offered_semester.length > 0 && (
                      <React.Fragment>
                        <div className={styles.label}>Past Offered</div>
                        <div className={styles.requirement_content}>
                          {offered_semester
                            .reverse()
                            .splice(0, 4)
                            .map(offering => prettify_offering(offering))
                            .join(", ")}
                        </div>
                      </React.Fragment>
                    )}
                  {constraint &&
                    constraint.prerequisite &&
                    constraint.prerequisite.length > 0 && (
                      <React.Fragment>
                        <div className={styles.label}>Prerequisites </div>
                        <div className={styles.requirement_content}>
                          {constraint.prerequisite.join("\n")}
                        </div>
                      </React.Fragment>
                    )}
                  {constraint &&
                    constraint.mutex &&
                    constraint.mutex.length > 0 && (
                      <React.Fragment>
                        <div className={styles.label}>Antirequisites</div>
                        <div className={styles.requirement_content}>
                          {constraint.mutex}
                        </div>
                      </React.Fragment>
                    )}
                </div>
              </div>
              <div className={styles.middle_placeholder} />
              <div className={styles.course_info_right}>
                <div className={styles.rating}>
                  <RatingBar
                    usefulValue={
                      (useful && useful.toString().concat("%")) || "0%"
                    }
                    easyValue={(easy && easy.toString().concat("%")) || "0%"}
                  />
                </div>
                <div className={styles.au}>
                  {(au && au.concat(" AU")) || "-".concat(" AU")}
                </div>
                <div className={styles.availability}>
                  <div>
                    <img
                      src={typeof as_ue === "boolean" && (as_ue ? yes : no)}
                    />
                    Read as Unrestricted Elective
                  </div>
                  <div>
                    <img
                      src={typeof as_pe === "boolean" && (as_pe ? yes : no)}
                    />
                    Read as General Education Prescribed Elective
                  </div>
                  <div>
                    <img src={exam} />
                    Grade Type -{" "}
                    {grade_type === 1
                      ? "Pass / Fail"
                      : "Letter Graded (A to F)"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.section_b}>
            <div className={styles.header}>Course Comments</div>
            {courseComments && courseComments.length > 0 ? (
              <div className={styles.comment_list}>
                <CommentList comments={courseComments || []} />
              </div>
            ) : (
              <div className={styles.no_comment}>
                Nobody has published their comments - so you can{" "}
                <span
                  className={styles.beTheFirst}
                  onClick={() =>
                    this.props.showModal("RATE_COURSE", {
                      courseCode: courseCode
                    })
                  }
                >
                  be the first one!
                </span>
              </div>
            )}
          </div>
          <div className={styles.section_c}>
            {courseSchedule &&
              Object.keys(courseSchedule).length > 1 && (
                <div className={styles.table}>
                  <ClassSchedule data={courseSchedule} />
                </div>
              )}
            {start_time &&
              end_time && (
                <div className={styles.table}>
                  <ExamSchedule
                    startTime={start_time}
                    endTime={end_time}
                    updateTime={update_time}
                  />
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
  clearCourseInformation: () => dispatch(clearCourseInformation()),
  fetchCourseDetail: courseCode => dispatch(fetchCourseDetail(courseCode)),
  fetchCourseRating: courseCode => dispatch(fetchCourseRating(courseCode)),
  fetchCourseComments: courseCode => dispatch(fetchCourseComments(courseCode)),
  fetchCourseSchedule: courseCode => dispatch(fetchCourseSchedule(courseCode)),
  fetchExamSchedule: courseCode => dispatch(fetchExamSchedule(courseCode)),
  fetchUserCourseComment: courseCode =>
    dispatch(fetchUserCourseComment(courseCode)),
  showModal: (modalType, modalProps) =>
    dispatch(showModal(modalType, modalProps))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageCourseDetail)
);