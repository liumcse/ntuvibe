import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import RatingBar from "./components/RatingBar";
import Timetable from "./components/Timetable";

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

const Heading = props => (
  <div className={styles.heading}>
    <div className={styles.heading_row}>
      <div className={styles.course_code}>{props.code}</div>
      <div className={styles.rating_overall}>{props.rating}</div>
    </div>
    <div className={styles.heading_course_title}>{props.title}</div>
  </div>
);

const Footer = () => (
  // eslint-disable-next-line
  <div className={styles.footer}>Copyright © 2018 NTUVibe 🏝 · You're cute</div>
);

class PageCourseDetail extends React.Component {
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

  componentDidUpdate() {
    console.log("props", this.props);
  }

  render() {
    const { courseDetail, courseRating, courseComments } = this.props;

    if (!courseDetail || !courseRating || !courseComments) {
      return "Loading...";
    } else {
      const {
        code,
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
          <Menu />
          <div className={styles.content}>
            <Heading code={code} rating={overall} title={title} />
            <div className={styles.row_box}>
              <div className={styles.course_info}>
                <div className={styles.course_description}>
                  {/* Overview of Database Management Systems (DBMS);
                Entity-Relationship Data Model; Relational Data Model;
                Functional Dependencies (FD) and Normalization; Relational
                Algebra; Structured Query Language (SQL); Storage of Relational
                Data; Indexing Techniques; Query Processing and Optimization;
                Transaction Management and Concurrency Control. */}
                  {description}
                </div>
                <div className={styles.requirement}>
                  <div className={styles.label}>Prerequisites</div>
                  <div className={styles.requirement_content}>
                    {/* CZ1007 & CZ2001(Corequisite) OR CE1007 & CE2001(Corequisite)
                    OR CE1007 & CZ2001(Corequisite) OR CE2001(Corequisite) &
                    CZ1007 */}
                    {prerequisite}
                  </div>
                </div>
                <div className={styles.requirement}>
                  <div className={styles.label}>Remarks</div>
                  <div className={styles.requirement_content}>
                    {/* Not available to students from BCE, BCG, CE, CEEC; not
                    available to students with (Admyr 2004-2010) */}
                    {remark}
                  </div>
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
              <Timetable title={"Academic Year 2018/2019 Sem1"} />
            </div>
            <div className={styles.table}>
              <Timetable title={"Final Exam"} />
            </div>
            <div className={styles.header}>Course Comments</div>
            <div className={styles.comment_list}>
              <CommentList comments={courseComments} />
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

Heading.propTypes = {
  code: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

PageCourseDetail.propTypes = {
  // from redux
  fetchCourseDetail: PropTypes.func.isRequired,
  fetchCourseRating: PropTypes.func.isRequired,
  fetchCourseComments: PropTypes.func.isRequired,
  courseDetail: PropTypes.object,
  courseRating: PropTypes.object,
  courseComments: PropTypes.object,
  // from router
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  courseDetail: state && state.courseDetail,
  courseRating: state && state.courseRating,
  courseComments: state && state.courseComments
});

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
