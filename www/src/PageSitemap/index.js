import React from "react";
import * as styles from "./style.scss";
import { connect } from "react-redux";

import { fetchCourseList } from "src/redux/actions";

const BASE_URL = "https://ntuvibe.com";

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
          <a
            key={index}
            href={`${BASE_URL}/courses/${snippet.code.toLowerCase()}`}
          >
            {snippet.title}
          </a>
        );
        courseListDOM.push(snippetDOM);
      });
      return (
        <div className={styles.sitemap}>
          <h1>Sitemap</h1>
          <div className={styles.container} id="links">
            <a href={BASE_URL}>HOME</a>
            <a href={`${BASE_URL}/help`}>HELP</a>
            {courseListDOM}
          </div>
          <h5>&copy; NTUVibe</h5>
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
