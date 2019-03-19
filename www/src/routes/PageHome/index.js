import React from "react";
import { Link } from "react-router-dom";
import SiteMetaHelmet from "src/components/SiteMetaHelmet";
// eslint-disable-next-line no-unused-vars
import { THIS_YEAR } from "src/global";
import Search from "src/components/Search";
import * as styles from "./style.scss";
import * as theme from "./dropdown-theme.scss";

class PageHome extends React.PureComponent {
  render() {
    return (
      <div className={styles.home_page}>
        <SiteMetaHelmet title="NTUVibe" url="https://ntuvibe.com" />
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
          {/* <div className={styles.fbLike}>
            <div className={styles.fbPage}>
              <a
                href="/developers"
                style={{
                  borderBottom: "2px solid black",
                  color: "black"
                }}
              >
                We are looking for developers 👋
              </a>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default PageHome;
