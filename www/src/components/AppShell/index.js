import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@redux/store";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import * as styles from "./style.scss";

const AppShell = props => (
  <Provider store={store}>
    <Router>
      <div className={styles.container}>
        <NavBar />
        <div className={styles.children}>{props.children}</div>
        <Footer />
      </div>
    </Router>
  </Provider>
);

AppShell.propTypes = {
  children: PropTypes.element.isRequired
};

export default AppShell;
