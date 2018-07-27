import React from "react";
import * as styles from "./style.scss";

const copyright = "© 2018 NTUVibe 🏝 · You're cute";

const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <div className={styles.footer_elements}>
        <div>{copyright}</div>
      </div>
    </div>
  );
};

export default Footer;
