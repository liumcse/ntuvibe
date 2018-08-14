import React from "react";
import { Link } from "react-router-dom";
import NavBar from "src/components/NavBar";
import SiteMetaHelmet from "src/components/SiteMetaHelmet";

import Dropdown from "./components/Dropdown";
import * as styles from "./style.scss";

class PageHome extends React.PureComponent {
  render() {
    return (
      <div className={styles.home_page}>
        <SiteMetaHelmet
          title="NTUVibe - come join this vibrant online NTU community!"
          url="https://ntuvibe.com"
          description="NTUVibe is a knowledge sharing platform for students at Nanyang Technological University to view course information and course reviews."
        />
        <div className={styles.background_image} />
        <div className={styles.container}>
          <NavBar />
          <div className={styles.course_search}>
            <Dropdown />
          </div>
          <div className={styles.button_container}>
            <span className={styles.badge}>PRO TIP</span> Use ARROW keys to
            navigate and press ENTER to go to that page 🚀
          </div>
          <div className={styles.footer}>
            <a style={{ visibility: "hidden" }} href="/sitemap">
              Sitemap
            </a>
            &copy; 2018 NTUVibe &#183; Stay cute
            <br />We&#39;re not affiliated with Nanyang Technological
            University.
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
