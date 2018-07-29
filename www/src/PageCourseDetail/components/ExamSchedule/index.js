import React from "react";
import PropTypes from "prop-types";

import * as styles from "./style.scss";

const ExamSchedule = props => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.table_container}>
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Time</th>
              <th>Duration</th>
            </tr>
            <tr>
              <td>December 5, 2018</td>
              <td>Wednesday</td>
              <td>9:00 am</td>
              <td>2.5 h</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

ExamSchedule.propTypes = {
  title: PropTypes.string.isRequired
};

export default ExamSchedule;
