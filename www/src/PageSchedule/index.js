import React from "react";
import NavBar from "src/components/NavBar";

import * as styles from "./style.scss";

class PageSchedule extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <NavBar />
        Hello, World!
      </div>
    );
  }
}

export default PageSchedule;
