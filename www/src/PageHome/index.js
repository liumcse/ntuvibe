import React from "react";
import { Link } from "react-router-dom";
import NavBar from "src/components/NavBar";
import SiteMetaHelmet from "src/components/SiteMetaHelmet";

import Search from "src/components/Search";

import * as styles from "./style.scss";
import * as theme from "./theme.scss";

class PageHome extends React.PureComponent {
  render() {
    return (
      <div className={styles.home_page}>
        <SiteMetaHelmet
          title="NTUVibe - come join this vibrant online NTU community!"
          url="https://ntuvibe.com"
          description="NTUVibe is a knowledge sharing platform for students at Nanyang Technological University to view course information and course reviews."
        />
        {/* <div className={styles.background_image} /> */}
        <div className={styles.container}>
          <NavBar />
          <div className={styles.searchContainer}>
            <Search theme={theme} />
          </div>
          <div className={styles.tip}>
            <span className={styles.badge}>PRO TIP</span> Use{" "}
            <span className={styles.emphasize}>ARROW</span> keys to navigate and
            press <span className={styles.emphasize}>ENTER</span> to go to that
            page 🚀
          </div>
          <div className={styles.tipM}>
            <span className={styles.badge}>KICKSTART</span> Enter{" "}
            <span className={styles.emphasize}>HE9091</span> and see what would
            happen 🚀
          </div>
          <div className={styles.fbLike}>
            <div
              className="fb-like"
              data-href="https://ntuvibe.com"
              data-layout="button_count"
              data-action="like"
              data-size="large"
              data-show-faces="false"
              data-share="false"
            />
            <div className={styles.fbPage}>
              How can we do better? Tell us at{" "}
              <a
                href="https://facebook.com/ntuvibe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook Page
              </a>
              !
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.line}>
              &copy; 2018 NTUVibe &#183; Stay cute
            </div>
            <div className={styles.line}>
              We&#39;re not affiliated with Nanyang Technological University.
            </div>
            <div className={styles.links}>
              <Link to="/sitemap">Sitemap</Link>
              <Link to="/about">About</Link>
              <a
                href="https://medium.com/@ntuvibe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </a>
              <Link to="/help">Help</Link>
              <a
                href="https://facebook.com/ntuvibe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </div>
          </div>
          <div className={styles.credit}>
            Photo by{" "}
            <a href="https://www.instagram.com/david_lequn_chen/">Chen Lequn</a>
          </div>
        </div>
      </div>
    );
  }
}

export default PageHome;
