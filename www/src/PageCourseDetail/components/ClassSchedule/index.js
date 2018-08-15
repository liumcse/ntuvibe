// @flow
import * as React from "react";

import type { CourseSchedule } from "src/FlowType/courses";

import * as styles from "./style.scss";

type Props = {
  data: CourseSchedule
};

type WeekdayProps = {
  day: number
};

const Weekday = (props: WeekdayProps) => {
  const day = props.day;
  return (
    <div className={styles.weekdayContainer}>
      <span className={day === 1 ? styles.highlight : undefined}>M</span>
      <span className={day === 2 ? styles.highlight : undefined}>T</span>
      <span className={day === 3 ? styles.highlight : undefined}>W</span>
      <span className={day === 4 ? styles.highlight : undefined}>Th</span>
      <span className={day === 5 ? styles.highlight : undefined}>F</span>
      <span className={day === 6 ? styles.highlight : undefined}>S</span>
    </div>
  );
};

const parseRemark = (remark: number[]) => {
  if (remark.includes(-1)) return "Online Course";
  const week = remark.join(", ");
  if (week === "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13") return null;
  else if (week === "2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13")
    return "Week 2 - 13";
  else return "Week ".concat(week);
};

const compareWeeks = (weekA, weekB) => {
  if (weekA.length !== weekB.length) return false;
  for (let i = 0; i < weekA.length; i++) {
    if (weekA[i] !== weekB[i]) return false;
  }
  return true;
};

// eslint-disable-next-line
const mergeRedundantSchedule = scheduleList => {
  const newScheduleList = [];
  let lastSchedule = null;

  for (let i = 0; i < scheduleList.length; i++) {
    const thisSchedule = scheduleList[i];
    const {
      type,
      group,
      day,
      start_time,
      end_time,
      venue,
      weeks
    } = thisSchedule;

    if (!lastSchedule) {
      newScheduleList.push(thisSchedule);
      lastSchedule = thisSchedule;
      continue;
    }
    const last_type = lastSchedule.type;
    const last_group = lastSchedule.group;
    const last_day = lastSchedule.day;
    const last_end_time = lastSchedule.end_time;
    const last_venue = lastSchedule.venue;
    const last_weeks = lastSchedule.weeks;
    if (
      type === last_type &&
      group === last_group &&
      day === last_day &&
      venue === last_venue &&
      compareWeeks(weeks, last_weeks)
    ) {
      // the two schedule can most likely be merged
      if (start_time === last_end_time) {
        // merge it
        newScheduleList[newScheduleList.length - 1].end_time = end_time;
      }
    } else {
      newScheduleList.push(thisSchedule);
      lastSchedule = thisSchedule;
    }
  }

  return newScheduleList;
};

const parseDataToTable = (data: CourseSchedule) => {
  const indexList = Object.keys(data);
  let indexToggle = false;
  let generatedTable = [];
  indexList.forEach((index, indexA) => {
    let scheduleList = data[index];
    if (!scheduleList) return;
    // merge redundant schedule
    scheduleList = mergeRedundantSchedule(scheduleList);
    // start parsing
    const scheduleCount = scheduleList.length.toString();
    scheduleList.forEach((schedule, indexB) => {
      const { type, group, day, start_time, end_time, venue, weeks } = schedule;
      let indexRow = null;
      if (indexB === 0) {
        indexToggle = !indexToggle;
        indexRow = (
          <td
            className={indexToggle ? styles.indexA : styles.indexB}
            rowSpan={scheduleCount}
          >
            {index.padStart(5, "0")}
          </td>
        );
      }
      const rowDOM = (
        <tr key={indexA * 100 + indexB}>
          {indexRow}
          <td>{type}</td>
          <td>{group}</td>
          <td>
            <Weekday day={day} />
          </td>
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

const viewAll = () => {
  const viewAllDOM = document.querySelector("#click-to-view-all");
  const tableDOM = document.querySelector("#timetable");
  const fadeDOM = document.querySelector("#timetable-fade");
  viewAllDOM.style.display = "none";
  fadeDOM.style.display = "none";
  tableDOM.style.maxHeight = "none";
};

const ClassSchedule = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Schedule (Current Semester)</div>
      <div id="timetable" className={styles.table_container}>
        <div id="timetable-fade" onClick={viewAll} />
        <div id="click-to-view-all" className={styles.expand} onClick={viewAll}>
          Click to view all
        </div>
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

export default ClassSchedule;
