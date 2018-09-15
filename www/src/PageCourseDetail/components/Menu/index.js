import React from "react";
import RateCourse from "src/components/Popups/_RateCourse";
import Button from "antd/lib/button";
import Icon from "antd/lib/icon";

import Search from "src/components/Search";

import * as styles from "./style.scss";
import * as theme from "./dropdown-theme.scss";

class Menu extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
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
        <RateCourse
          trigger={
            <Button
              className={styles.roundButton}
              style={{ position: "fixed", display: "none" }}
              type="primary"
              shape="circle"
              size="large"
              icon="edit"
            />
          }
        />
      </React.Fragment>
    );
  }
}

export default Menu;
