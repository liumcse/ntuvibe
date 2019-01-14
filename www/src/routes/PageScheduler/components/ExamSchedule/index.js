import React from "react";
import Popup from "reactjs-popup";
import * as styles from "./style.scss";

type Props = {
  exam: ?Object,
  trigger: any
};
class ExamSchedule extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  addZero(src) {
    return ("0" + src).slice(-2);
  }

  render() {
    return (
      <Popup
        modal
        trigger={this.props.trigger}
        contentStyle={{
          padding: "0 !important",
          border: "red solid 3px !important",
          width: "50vw",
          borderRadius: "10px 10px 0 0",
          overflow: "hidden"
        }}
      >
        <table style={styles.table}>
          <thead>
            <tr>
              <th colSpan="3" className={styles.header}>
                Exam Schedule
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Course</td>
              <td>Date</td>
              <td>Duration</td>
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
      </Popup>
    );
  }
}
export default ExamSchedule;

// // @flow
// import React from "react";
// import Popup from "reactjs-popup";
// import Button from "antd/lib/button";
// import * as styles from "./style.scss";

// type Props = {
//   import: string => void,
//   trigger: any
// };

// class ImportSchedule extends React.PureComponent<Props> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false,
//       importing: false
//     };
//   }

//   import = () => {
//     this.setState({ importing: true });
//     const input = document.querySelector("." + styles.input).value;
//     if (!input) {
//       alert("Hmmm is that empty input?");
//     } else {
//       try {
//         this.props.import(input);
//       } catch (error) {
//         alert(
//           "We are sorry, but we can't import your schedule. Make sure you copied everything on the \"Print\\Check Registered Course\" page.\nIf the problem persists, we appreciate if you can send us a feedback.\nBy the way, have you tried Chrome? Vibe doesn't work well on IE or Microsoft Edge :("
//         );
//       }
//     }
//   };

//   render() {
//     return (
//       <Popup modal trigger={this.props.trigger}>
//         <div className={styles.container}>
//           <div className={styles.header}>Import new schedule</div>
//           <div className={styles.inputContainer}>
//             <textarea
//               className={styles.input}
//               placeholder="Paste all text you copied from Print/Check Courses Registered into here..."
//               spellCheck={false}
//               data-gramm_editor="false" /* disable grammarly*/
//             />
//           </div>
//           <div className={styles.importButtonContainer}>
//             <Button
//               type="primary"
//               className={styles.button}
//               onClick={() => this.import()}
//             >
//               {"Import" + (this.state.importing ? "ing..." : "")}
//             </Button>
//           </div>
//         </div>
//       </Popup>
//     );
//   }
// }

// export default ImportSchedule;
