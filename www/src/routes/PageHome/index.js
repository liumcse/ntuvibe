import React from "react";
import { Link } from "react-router-dom";
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
          <div className={styles.bannerContainer}>
            <Link to="/browser">
              <div>
                <span style={{ color: "#ff6578" }}>2</span>
                <span style={{ color: "#ffe619" }}>0</span>
                <span style={{ color: "#498a46" }}>1</span>
                <span style={{ color: "#24b8e8" }}>9</span>
              </div>
            </Link>
          </div>
          <div className={styles.searchContainer}>
            <Search theme={theme} />
          </div>
          <div className={styles.fbLike}>
            {/* <div
              className="fb-like"
              data-href="https://ntuvibe.com"
              data-layout="button_count"
              data-action="like"
              data-size="large"
              data-show-faces="false"
              data-share="false"
            /> */}
            <div className={styles.fbPage}>
              New year, new beginning. Try out{" "}
              <Link to="/browser">Course Browser</Link>!
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageHome;
