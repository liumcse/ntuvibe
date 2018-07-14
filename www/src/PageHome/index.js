import React from "react";
import * as styles from "./style.scss";

class PageHome extends React.Component {
  render() {
    return (
      <div className={styles.home_page}>
        <div className={styles.background_image} />
        <span className={styles.search}>Hello, world!</span>
      </div>
    );
  }
}

export default PageHome;