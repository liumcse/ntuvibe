import React from "react";
import * as styles from "./style.scss";

const NavBar = () => {
  return (
    <div className={styles.navbar_container}>
      <div className={styles.navbar_elements}>
        <div>Home</div>
        <div>Exlore</div>
        <div>Help</div>
      </div>
    </div>
  );
};

export default NavBar;