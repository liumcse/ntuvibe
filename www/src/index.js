import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import * as ROUTES from "@routes";
import { logPageview } from "src/tracking";
import ReactGA from "react-ga";
import PageResetPassword from "@routes/PageResetPassword";
import PageHome from "@routes/PageHome";
import PageCourseDetail from "@routes/PageCourseDetail";
import PageHelp from "@routes/PageHelp";
import PageTransient from "@routes/PageTransient";
import PageUserSetting from "@routes/PageUserSetting";
import PageSitemap from "@routes/PageSitemap";
import PageAbout from "@routes/PageAbout";
import PageScheduler from "@routes/PageScheduler";
import PageBrowser from "@routes/PageBrowser";
import ModalContainer from "@routes/ModalContainer";
import store from "src/redux/store";

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
        <React.Fragment>
          <ModalContainer />
          <Router>
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
                path={ROUTES.ROUTE_RESET_PASSWORD}
                component={PageResetPassword}
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
              <Route exact path={ROUTES.ROUTE_BROWSER} component={PageBrowser} />
              {/* fallback */}
              <Route path={"/"} component={PageHome} />
            </Switch>
          </Router>
        </React.Fragment>
      </Provider>
    );
  }
}

// Google Analytics initialization
ReactGA.initialize("UA-113348736-2");
ReactDOM.render(<App />, document.getElementById("app"));
