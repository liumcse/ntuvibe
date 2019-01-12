import React from "react";
import { Link } from "react-router-dom";
import NavBar from "src/components/NavBar";
import SiteMetaHelmet from "src/components/SiteMetaHelmet";
import { THIS_YEAR } from "src/global";
import Search from "src/components/Search";

import * as styles from "./style.scss";
import * as theme from "./dropdown-theme.scss";

class PageHome extends React.PureComponent {
  componentDidMount() {
    // eslint-disable-next-line
    if (window.FB && typeof(window.FB) !== "undefined" && window.FB.XFBML && typeof(window.FB.XFBML) !== "undefined") window.FB.XFBML.parse();  // call this function to re-render FB-like button
  }
  render() {
    return (
      <div className={styles.home_page}>
        <SiteMetaHelmet
          title="NTUVibe - Come Join This Vibrant Online NTU Community!"
          url="https://ntuvibe.com"
          description="NTUVibe is a knowledge sharing platform for students at Nanyang Technological University to view course information and course reviews."
        />
        {/* <div className={styles.background_image} /> */}
        <div className={styles.container}>
          <NavBar />
          <div className={styles.bannerContainer}>
            <a href="#">
              <div>
                <span style={{ color: "red" }}>2</span>
                <span style={{ color: "darkviolet" }}>0</span>
                <span style={{ color: "black" }}>1</span>
                <span style={{ color: "green" }}>9</span>
              </div>
            </a>
          </div>
          <div className={styles.searchContainer}>
            <Search theme={theme} />
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
              New year, new beginning. See{" "}
              <a
                href="https://facebook.com/ntuvibe"
                target="_blank"
                rel="noopener noreferrer"
              >
                what's new
              </a>
              !
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.line}>
              &copy; {THIS_YEAR} NTUVibe &#183; Stay cute
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
              <a
                href="https://facebook.com/ntuvibe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </div>
            <div className={styles.credit}>
              Photo by{" "}
              <a
                href="https://www.instagram.com/david_lequn_chen/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chen Lequn
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageHome;
