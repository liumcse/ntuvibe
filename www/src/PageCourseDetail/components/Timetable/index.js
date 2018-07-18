import React from "react";
// import ReactTable from "react-table";
import PropTypes from "prop-types";

import * as styles from "./style.scss";

const Timetable = props => {
  //   const data = [
  //     {
  //       index: "10000",
  //       type: "LEC",
  //       group: "SS",
  //       day: "THU",
  //       time: "0900 AM",
  //       location: "Hive",
  //       remark: "This is an example"
  //     },
  //     {
  //       index: "20000",
  //       type: "TUT",
  //       group: "XX",
  //       day: "FRI",
  //       time: "0800 AM",
  //       location: "Porter",
  //       remark: "This is an example"
  //     }
  //   ];

  //   const columns = [
  //     {
  //       accessor: "index",
  //       Header: "Index"
  //     },
  //     {
  //       accessor: "type",
  //       Header: "Type"
  //     },
  //     {
  //       accessor: "group",
  //       Header: "Group"
  //     },
  //     {
  //       accessor: "day",
  //       Header: "Day"
  //     },
  //     {
  //       accessor: "time",
  //       Header: "Time"
  //     },
  //     {
  //       accessor: "location",
  //       Header: "Location"
  //     },
  //     {
  //       accessor: "remark",
  //       Header: "Remark"
  //     }
  //   ];

  //   return (
  //     <div className={styles.container}>
  //       <div className={styles.title}>{props.title}</div>
  //       <div className={styles.table}>
  //         <ReactTable minRows={3} data={data} columns={columns} />
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.table_container}>
        <table>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Berglunds snabbköp</td>
            <td>Christina Berglund</td>
            <td>Sweden</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Königlich Essen</td>
            <td>Philip Cramer</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
          <tr>
            <td>North/South</td>
            <td>Simon Crowther</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Paris spécialités</td>
            <td>Marie Bertrand</td>
            <td>France</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

Timetable.propTypes = {
  title: PropTypes.string.isRequired
};

export default Timetable;
