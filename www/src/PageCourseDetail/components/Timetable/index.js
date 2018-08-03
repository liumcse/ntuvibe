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
          <td>
            {weeks &&
              weeks.length > 0 &&
              (weeks.includes(-1)
                ? "Online Course"
                : "Week ".concat(weeks.join(", ")))}
          </td>
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
            {/* <tr>
              <td>10220</td>
              <td>Lec/Studio</td>
              <td>CS2</td>
              <td>Thu</td>
              <td>1230-1330</td>
              <td>TCT-LT</td>
              <td />
            </tr>
            <tr>
              <td>10220</td>
              <td>Lec/Studio</td>
              <td>CS2</td>
              <td>Mon</td>
              <td>1330-1430</td>
              <td>TCT-LT</td>
              <td />
            </tr>
            <tr>
              <td>10220</td>
              <td>TUT</td>
              <td>SS1</td>
              <td>Mon</td>
              <td>1430-1530</td>
              <td>TR+37</td>
              <td>Week 2-13</td>
            </tr>
            <tr>
              <td>10220</td>
              <td>LAB</td>
              <td>SS1</td>
              <td>Tue</td>
              <td>1230-1330</td>
              <td>SWLAB2</td>
              <td>Week 2,4,6,8,10,12</td>
            </tr>
            <tr>
              <td>10220</td>
              <td>LAB</td>
              <td>SS1</td>
              <td>Tue</td>
              <td>1330-1430</td>
              <td>SWLAB2</td>
              <td>Week 2,4,6,8,10,12</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
