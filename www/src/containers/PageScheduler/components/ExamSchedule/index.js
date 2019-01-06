// @flow
import React from "react";
import * as styles from "./style.scss";

type Props = {
  exam: ?Object
};
class ExamSchedule extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  addZero(src) {
    return ("0" + src).slice(-2);
  }

  render() {
    return (
      <div>
        <table style={styles}>
          <tbody>
            <tr>
              <th>Code</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
            {Object.keys(this.props.exam).map(courseID => {
              let examDuration = this.props.exam[courseID];
              let start = new Date(examDuration.start_time * 1000);
              let end = new Date(examDuration.end_time * 1000);
              return (
                <tr key={courseID}>
                  <td>{courseID}</td>
                  <td>{`${this.addZero(start.getUTCMonth() + 1)}/${this.addZero(
                    start.getDate()
                  )}/${this.addZero(start.getFullYear())}`}</td>
                  <td>{`${this.addZero(start.getHours())}:${this.addZero(
                    start.getMinutes()
                  )} ~ ${this.addZero(end.getHours())}:${this.addZero(
                    end.getMinutes()
                  )}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ExamSchedule;
