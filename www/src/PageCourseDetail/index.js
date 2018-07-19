import React from "react";

import SideBar from "./components/SideBar";
import RatingBar from "./components/RatingBar";
import Timetable from "./components/Timetable";

import * as styles from "./style.scss";
import CommentList from "./components/CommentList";

import no from "./assets/no.svg";
import yes from "./assets/yes.svg";

const Heading = () => (
  <div className={styles.heading}>
    <div className={styles.heading_row}>
      <div className={styles.course_code}>CZ2007</div>
      <div className={styles.rating_overall}>80%</div>
    </div>
    <div className={styles.heading_course_title}>Introduction to Databases</div>
  </div>
);

const Footer = () => (
  // eslint-disable-next-line
  <div className={styles.footer}>© 2018 NTUVibe 🏝 · You're cute</div>
);

class PageCourseDetail extends React.Component {
  componentDidMount() {
    console.log("Mounted, should do something, right!");
  }

  render() {
    return (
      <div className={styles.page_course_detail}>
        <div className={styles.sidebar}>
          <SideBar />
        </div>
        <div className={styles.content}>
          <Heading />
          <div className={styles.row_box}>
            <div className={styles.course_info}>
              <div className={styles.course_description}>
                Overview of Database Management Systems (DBMS);
                Entity-Relationship Data Model; Relational Data Model;
                Functional Dependencies (FD) and Normalization; Relational
                Algebra; Structured Query Language (SQL); Storage of Relational
                Data; Indexing Techniques; Query Processing and Optimization;
                Transaction Management and Concurrency Control.
              </div>
              <div className={styles.requirement}>
                <div className={styles.label}>Prerequisites</div>
                <div className={styles.requirement_content}>
                  CZ1007 & CZ2001(Corequisite) OR CE1007 & CE2001(Corequisite)
                  OR CE1007 & CZ2001(Corequisite) OR CE2001(Corequisite) &
                  CZ1007
                </div>
              </div>
              <div className={styles.requirement}>
                <div className={styles.label}>Remarks</div>
                <div className={styles.requirement_content}>
                  Not available to students from BCE, BCG, CE, CEEC; not
                  available to students with (Admyr 2004-2010)
                </div>
              </div>
            </div>
            <div className={styles.middle_placeholder} />
            <div className={styles.course_info_right}>
              <div className={styles.rating_useful}>
                <RatingBar label={"Useful"} value={"90%"} />
              </div>
              <div className={styles.rating_easy}>
                <RatingBar label={"Easy"} value={"40%"} />
              </div>
              <div className={styles.au}>3.0 AU</div>
              <div className={styles.availability}>
                <div>
                  <img src={yes} />Read as Unrestricted Elective
                </div>
                <div>
                  <img src={no} />Read as General Education Prescribed Elective
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
            <CommentList />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default PageCourseDetail;
