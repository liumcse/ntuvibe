import React from "react";
import ReactTable from "react-table";
import PropTypes from "prop-types";

import * as styles from "./style.scss";

const Timetable = props => {
  const data = [
    {
      name: "Tanner Linsley",
      age: 26,
      friend: {
        name: "Jason Maurer",
        age: 23
      }
    }
  ];

  const columns = [
    {
      Header: "Index",
      accessor: "name" // String-based value accessors!
    },
    {
      Header: "Age",
      accessor: "age"
      // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    },
    {
      id: "friendName", // Required because our accessor is not a string
      Header: "Friend Name",
      accessor: d => d.friend.name // Custom value accessors!
    },
    {
      Header: "Friend Age", // Custom header components!
      accessor: "friend.age"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.table}>
        <ReactTable minRows={3} data={data} columns={columns} />
      </div>
    </div>
  );
};

Timetable.propTypes = {
  title: PropTypes.string.isRequired
};

export default Timetable;
