// @flow
import * as React from "react";
import { timestampToDate } from "src/utils";

import * as styles from "./style.scss";

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
  let weeks = [];
  let start = remark[0];
  for (let i = 1; i < remark.length; i++) {
    if (i === remark.length - 1) {
      // reach the end
      if (start === remark[i - 1]) {
        weeks.push(remark[i - 1]);
        weeks.push(remark[i]);
      } else {
        weeks.push(
          start
            .toString()
            .concat(" - ")
            .concat(remark[i])
        );
      }
    } else if (remark[i] !== remark[i - 1] + 1) {
      // detect a gap, insert dash and reassign start
      weeks.push(
        start === remark[i - 1]
          ? start
          : start
              .toString()
              .concat(" - ")
              .concat(remark[i - 1])
      );
      start = remark[i];
    } else {
      // do nothing, keep the start
    }
  }

  const weekOutput = weeks.join(", ");
  if (!weekOutput || weekOutput === "1 - 13") return null;
  else return "Week ".concat(weekOutput);
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

const parseDataToTable = data => {
  for (const schedule of (data && data["schedules"]) || []) {
    if (!data[schedule["index"]]) {
      data[schedule["index"]] = [];
    }
    data[schedule["index"]].push(schedule);
  }
  delete data["schedules"];
  data["update_time"] = data["last_update"]["_seconds"];
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
  // const viewAllDOM = document.querySelector("#click-to-view-all");
  const fadeDOM = document.querySelector("#timetable-fade");
  const tableDOM = document.querySelector("#timetable");
  // viewAllDOM.style.display = "none";
  fadeDOM.style.display = "none";
  tableDOM.style.maxHeight = "none";
};

const ClassSchedule = ({ data, currentOffering }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Schedule ({currentOffering || "Current Semester"})
      </div>
      <div id="timetable" className={styles.table_container}>
        <div id="timetable-fade" onClick={viewAll} />
        {/* <div id="click-to-view-all" className={styles.expand} onClick={viewAll}>
          Click to view all
        </div> */}
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
            {parseDataToTable(data)}
          </tbody>
        </table>
      </div>
      <div className={styles.last_update}>
        Class schedule was last updated on{" "}
        {timestampToDate(parseInt(data.update_time, 10))} from{" "}
        <a href="https://wish.wis.ntu.edu.sg/webexe/owa/aus_schedule.main">
          ntu.edu.sg
        </a>
        .
      </div>
    </div>
  );
};

export default ClassSchedule;
