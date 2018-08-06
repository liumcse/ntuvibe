import React from "react";
import * as styles from "./style.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCourseList } from "src/redux/actions";

class PageSitemap extends React.Component {
  componentDidMount() {
    this.props.fetchCourseList();
  }
  render() {
    const { courseList } = this.props;
    if (!courseList) {
      return null;
    } else {
      let courseListDOM = [];
      courseList.forEach((snippet, index) => {
        const snippetDOM = (
          <div key={index}>
            <Link to={`/courses/${snippet.code.toLowerCase()}`}>
              {snippet.title}
            </Link>
          </div>
        );
        courseListDOM.push(snippetDOM);
      });
      return (
        <div className={styles.sitemap}>
          <h1>Sitemap</h1>
          <div className={styles.container}>
            <div>
              <Link to="/">HOME</Link>
            </div>
            <div>
              <Link to="/help">HELP</Link>
            </div>
            {courseListDOM}
          </div>
          <h6>&copy; NTUVibe</h6>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  const { course } = state;
  return {
    courseList: course && course.courseList
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCourseList: () => dispatch(fetchCourseList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageSitemap);
