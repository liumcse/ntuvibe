import React from "react";
import { Link } from "react-router-dom";
import * as styles from "./style.scss";
import vibe from "src/brand/logo-color.png";
import { THIS_YEAR } from "src/global";

const Footer = () => (
  // eslint-disable-next-line
  <div className={styles.container}>
    <div className={styles.innerContainer}>
      <div className={styles.text}>
        <span>&copy; {THIS_YEAR} NTUVibe &middot; Stay cute</span>
      </div>
      <div className={styles.links}>
        <Link to="/sitemap">Sitemap</Link>
        <span>|</span>
        <Link to="/about">About</Link>
        <span>|</span>
        <a
          href="https://medium.com/@ntuvibe"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blog
        </a>
        {/* <span>|</span> */}
        {/* <Link to="/help">Help</Link> */}
        <span>|</span>
        <a
          href="https://facebook.com/ntuvibe"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>
      <div className={styles.brand}>
        <img className={styles.img} src={vibe} />
      </div>
    </div>
  </div>
);

export default Footer;
