import React from "react";

import Dropdown from "./components/Dropdown";
import * as styles from "./style.scss";

class PageHome extends React.Component {
  render() {
    return (
      <div className={styles.home_page}>
        <div className={styles.background_image} />
        <div className={styles.course_search}>
          <Dropdown />
        </div>
      </div>
    );
  }
}

export default PageHome;
