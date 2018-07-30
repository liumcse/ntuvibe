import React from "react";
import PropTypes from "prop-types";

import * as styles from "./style.scss";

const Timetable = props => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.table_container}>
        <table>
          <tbody>
            <tr>
              <th>Index</th>
              <th>Type</th>
              <th>Group</th>
              <th>Day</th>
              <th>Time</th>
              <th>Location</th>
              <th>Remark</th>
            </tr>
            <tr>
              <td>10220</td>
              <td>Lec/Studio</td>
              <td>CS2</td>
              <td>Thu</td>
              <td>1230-1330</td>
              <td>TCT-LT</td>
              <td></td>
            </tr>
            <tr>
              <td>10220</td>
              <td>Lec/Studio</td>
              <td>CS2</td>
              <td>Mon</td>
              <td>1330-1430</td>
              <td>TCT-LT</td>
              <td></td>
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

Timetable.propTypes = {
  title: PropTypes.string.isRequired
};

export default Timetable;
