import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import * as ROUTES from "./routes";
import * as styles from "./style.scss";
import Popups from "./components/Popups";
import PageHome from "./PageHome/index";
import PageCourseDetail from "./PageCourseDetail";
import PageHelp from "./PageHelp";
import PageLimbo from "./PageLimbo";
import PageSitemap from "./PageSitemap";
import store from "./redux/store";

import "react-select/dist/react-select.css";
import "./styles/app.scss";
import "normalize.css";

class App extends React.PureComponent {
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
              <Route exact path={ROUTES.ROUTE_HELP} component={PageHelp} />
              <Route
                exact
                path={ROUTES.ROUTE_CREATE_ACCOUNT}
                component={PageLimbo}
              />
              <Route
                exact
                path={ROUTES.ROUTE_SITEMAP}
                component={PageSitemap}
              />
              {/* fallback */}
              <Route path={"/"} component={PageHome} />
            </Switch>
            <Popups />
          </div>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
