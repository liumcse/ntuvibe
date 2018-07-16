import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import * as ROUTES from "./routes";
import * as styles from "./style.scss";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PageHome from "./PageHome/index";
import PageCourseDetail from "./PageCourseDetail";

import "react-select/dist/react-select.css";
import "./styles/app.scss";
import "normalize.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className={styles.app_container}>
          <NavBar />
          <Switch>
            <Route exact path={ROUTES.ROUTE_HOME} component={PageHome} />
            <Route exact path={ROUTES.ROUTE_COURSE_PAGE} component={PageCourseDetail} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);