import React from "react";

// import top_img from "./assets/top_img.svg";
import info from "./assets/info.svg";
import clock from "./assets/clock.svg";
import comment from "./assets/comment.svg";
import * as styles from "./style.scss";

// const topImg = (
//   <img
//     src={top_img}
//     style={{
//       width: "50%",
//       height: "auto"
//     }}
//   />
// );

class SideBar extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        {/* <div className={styles.top_img}>{topImg}</div> */}
        {/* <div className={styles.header}>GO TO</div> */}
        <div className={styles.column_container}>
          <div>
            <img src={info} />
            <span>Information</span>
          </div>
          <div>
            <img src={clock} />
            <span>Timetable</span>
          </div>
          <div>
            <img src={comment} />
            <span>Comment</span>
          </div>
          <div
            style={{
              width: "100%",
              padding: "0",
              margin: "1.5rem 0"
            }}
          />
          <div className={styles.button}>Rate This Course</div>
        </div>
      </div>
    );
  }
}

export default SideBar;
