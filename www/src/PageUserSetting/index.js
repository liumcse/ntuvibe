import React from "react";
import NavBar from "src/components/NavBar";

import * as styles from "./style.scss";
import SideBar from "./components/SideBar";
import ProfileGrid from "./components/ProfileGrid";

class PageUserSetting extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <NavBar />
        <div className={styles.innerContainer}>
          <div className={styles.sidebar}>
            <SideBar />
          </div>
          <div className={styles.settingContainer}>
            <div className={styles.header}>Public Profile</div>
            <div className={styles.subHeader}>Display name</div>
            <input className={styles.displayNameInput} />
            <div className={styles.hint}>Your display name must be unique.</div>
            <div className={styles.subHeader}>Major</div>
            <input className={styles.majorInput} placeholder="Optional" />
            <div className={styles.subHeader}>Profile Picture</div>
            <div className={styles.hint}>
              For now, you can choose from the following pictures.
            </div>
            <div className={styles.profileGrid}>
              <ProfileGrid />
            </div>
            <div className={styles.save}>
              <button>Update</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageUserSetting;
