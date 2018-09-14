import React from "react";
import RateCourse from "src/components/Popups/_RateCourse";
import Button from "antd/lib/button";

import Search from "src/components/Search";

import * as styles from "./style.scss";
import * as theme from "./theme.scss";

class Menu extends React.PureComponent {
  render() {
    return (
      <div className={styles.menu}>
        <div className={styles.search}>
          <Search theme={theme} />
        </div>
        <div className={styles.actions}>
          <div className={styles.action}>
            <RateCourse
              trigger={<Button type="primary">Rate the course</Button>}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
