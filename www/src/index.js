import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import * as ROUTES from "./routes";
import * as styles from "./style.scss";
import PageHome from "./PageHome/index";
import PageCourseDetail from "./PageCourseDetail";
import store from "./redux/store";

import "react-select/dist/react-select.css";
import "./styles/app.scss";
import "normalize.css";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className={styles.app_container}>
            <Switch>
              <Route exact path={ROUTES.ROUTE_HOME} component={PageHome} />
              <Route
                exact
                path={ROUTES.ROUTE_COURSE_PAGE}
                component={PageCourseDetail}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
