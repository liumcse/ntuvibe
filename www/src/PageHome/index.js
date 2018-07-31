import React from "react";
import NavBar from "src/components/NavBar";

import Dropdown from "./components/Dropdown";
import * as styles from "./style.scss";

class PageHome extends React.PureComponent {
  render() {
    return (
      <div className={styles.home_page}>
        <div className={styles.background_image} />
        <div className={styles.container}>
          <NavBar />
          <div className={styles.course_search}>
            <Dropdown />
          </div>
        </div>
        <div className={styles.footer}>&copy; 2018 NTUVibe. You are cute</div>
      </div>
    );
  }
}

export default PageHome;
