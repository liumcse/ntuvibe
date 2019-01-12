import React from "react";
import { withRouter } from "react-router";
import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import * as styles from "./styles.scss";

class PageBrowse extends React.Component {
  searchCourses = e => {
    if (e.keyCode !== 13) return false; // if key is not ENTER
    const { history } = this.props;
    const query = encodeURIComponent(e.target.value);
    // use replace instead of push to make sure go back still works
    history.replace({
      ...history.location,
      pathname: "/browse",
      search: "?search=".concat(query)
    });
  };

  componentDidMount() {
    // TODO: add keydown listener to search
    const searchDOM = document.querySelector(".".concat(styles.search));
    searchDOM.addEventListener("keydown", this.searchCourses);
  }

  componentWillUnmount() {
    const searchDOM = document.querySelector(".".concat(styles.search));
    searchDOM.removeEventListener("keydown", this.searchCourses);
  }

  render() {
    return (
      <div className={styles.container}>
        <NavBar />
        <div className={styles.innerContainer}>
          <div className={styles.leftContainer}>
            <input className={styles.search} placeholder="Search..." />
          </div>
          <div className={styles.rightContainer}>
            lalala
          </div>
        </div>
        <Footer />
      </div>  
    );
  }
}

export default withRouter(PageBrowse);
