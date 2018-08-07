// @flow
import * as React from "react";

import type { CourseSchedule } from "src/FlowType/courses";

import * as styles from "./style.scss";

type Props = {
  data: CourseSchedule
};

const dayLookup = {
  "1": "Mon",
  "2": "Tue",
  "3": "Wed",
  "4": "Thu",
  "5": "Fri",
  "6": "Sat"
};

const parseRemark = (remark: number[]) => {
  if (remark.includes(-1)) return "Online Course";
  const week = remark.join(", ");
  if (week === "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13") return null;
  else return "Week ".concat(week);
};

const parseDataToTable = (data: CourseSchedule) => {
  const indexList = Object.keys(data);
  let generatedTable = [];
  indexList.forEach((index, indexA) => {
    const scheduleList = data[index];
    if (!scheduleList) return;
    const scheduleCount = scheduleList.length.toString();
    scheduleList.forEach((schedule, indexB) => {
      const { type, group, day, start_time, end_time, venue, weeks } = schedule;
      const rowDOM = (
        <tr key={indexA * 100 + indexB}>
          {indexB === 0 && (
            <td className={styles.index} rowSpan={scheduleCount}>
              {index}
            </td>
          )}
          <td>{type}</td>
          <td>{group}</td>
          <td>{dayLookup[day]}</td>
          <td>{start_time}</td>
          <td>{end_time}</td>
          <td>{venue || "N.A."}</td>
          <td>{parseRemark(weeks)}</td>
        </tr>
      );
      generatedTable.push(rowDOM);
    });
  });
  return generatedTable;
};

const Timetable = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Schedule (Current Semester)</div>
      <div className={styles.table_container}>
        <table>
          <tbody>
            <tr>
              <th>Index</th>
              <th>Type</th>
              <th>Group</th>
              <th>Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Location</th>
              <th>Remark</th>
            </tr>
            {parseDataToTable(props.data)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
