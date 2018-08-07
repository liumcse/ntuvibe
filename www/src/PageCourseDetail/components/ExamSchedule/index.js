// @flow
import React from "react";
import {
  timestampToDate,
  timestampToDay,
  timestampToTime,
  timestampToDuration
} from "src/utils";

import * as styles from "./style.scss";

type Props = {
  startTime: number,
  endTime: number
};

const ExamSchedule = (props: Props) => {
  const { startTime, endTime } = props;
  return (
    <div className={styles.container}>
      <div className={styles.title}>Final Exam</div>
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
              <td>{timestampToDate(startTime)}</td>
              <td>{timestampToDay(startTime)}</td>
              <td>{timestampToTime(startTime)}</td>
              <td>{timestampToDuration(startTime, endTime)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamSchedule;
