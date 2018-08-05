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
          <div className={styles.button_container}>
            <span className={styles.badge}>PRO TIP</span> Use ALT keys to
            navigate and press ENTER to go to that page 🚀
          </div>
          <div className={styles.footer}>
            &copy; 2018 NTUVibe &#183; Stay cute<br />We&#39;re not affiliated
            with Nanyang Technological University.
          </div>
        </div>
      </div>
    );
  }
}

export default PageHome;
