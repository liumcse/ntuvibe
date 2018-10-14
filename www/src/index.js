import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import * as ROUTES from "src/routes";
import { logPageview } from "src/tracking";
import ReactGA from "react-ga";
import PageHome from "@containers/PageHome";
import PageCourseDetail from "@containers/PageCourseDetail";
import PageHelp from "@containers/PageHelp";
import PageTransient from "@containers/PageTransient";
import PageUserSetting from "@containers/PageUserSetting";
import PageSitemap from "@containers/PageSitemap";
import PageAbout from "@containers/PageAbout";
import PageScheduler from "@containers/PageScheduler";
import ModalContainer from "@containers/ModalContainer";
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
          </Router>
        </React.Fragment>
      </Provider>
    );
  }
}

ReactGA.initialize("UA-113348736-2");
ReactDOM.render(<App />, document.getElementById("app"));
