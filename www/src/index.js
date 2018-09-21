import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import * as ROUTES from "./routes";
import { logPageview } from "./tracking";
import ReactGA from "react-ga";
import Popups from "./components/Popups";
import PageHome from "./PageHome/index";
import PageCourseDetail from "./PageCourseDetail";
import PageHelp from "./PageHelp";
import PageTransient from "./PageTransient";
import PageUserSetting from "./PageUserSetting";
// import PageSignUp from "./PageSignUp";
import PageSitemap from "./PageSitemap";
import PageAbout from "./PageAbout";
import PageScheduler from "./PageScheduler";
import store from "./redux/store";

import "./styles/app.scss";
import "normalize.css";
import "antd/dist/antd.less";

class App extends React.PureComponent {
  componentDidMount() {
    logPageview(window.location.pathname);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
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
                component={PageTransient}
              />
              <Route
                exact
                path={ROUTES.ROUTE_USER_SETTING}
                component={PageUserSetting}
              />
              {/* <Route exact path={ROUTES.ROUTE_SIGN_UP} component={PageSignUp} /> */}
              <Route
                exact
                path={ROUTES.ROUTE_SITEMAP}
                component={PageSitemap}
              />
              <Route exact path={ROUTES.ROUTE_ABOUT} component={PageAbout} />
              <Route
                exact
                path={ROUTES.ROUTE_SCHEDULER}
                component={PageScheduler}
              />
              {/* fallback */}
              <Route path={"/"} component={PageHome} />
            </Switch>
            <Popups />
            {/* Modals */}
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactGA.initialize("UA-113348736-2");
ReactDOM.render(<App />, document.getElementById("app"));
