import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Loadable from "react-loadable";

import * as ROUTES from "@routes";
import { logPageview } from "src/tracking";
import ReactGA from "react-ga";
// import PageResetPassword from "@routes/PageResetPassword";
// import PageHome from "@routes/PageHome";
// import PageCourseDetail from "@routes/PageCourseDetail";
// import PageHelp from "@routes/PageHelp";
// import PageTransient from "@routes/PageTransient";
// import PageUserSetting from "@routes/PageUserSetting";
// import PageSitemap from "@routes/PageSitemap";
// import PageAbout from "@routes/PageAbout";
// import PageScheduler from "@routes/PageScheduler";
// import PageBrowser from "@routes/PageBrowser";
import ModalContainer from "@routes/ModalContainer";
import store from "src/redux/store";

import "./styles/app.scss";
import "normalize.css";
import "antd/dist/antd.less";

const AsyncPageResetPassword = Loadable({
  loader: () => import("@routes/PageResetPassword"),
  loading: () => <div>Loading...</div>
});

const AsyncPageUserSetting = Loadable({
  loader: () => import("@routes/PageUserSetting"),
  loading: () => <div>Loading...</div>
});

const AsyncPageCourseDetail = Loadable({
  loader: () => import("@routes/PageCourseDetail"),
  loading: () => <div>Loading...</div>
});

const AsyncPageHelp = Loadable({
  loader: () => import("@routes/PageHelp"),
  loading: () => <div>Loading...</div>
});

const AsyncPageTransient = Loadable({
  loader: () => import("@routes/PageTransient"),
  loading: () => <div>Loading...</div>
});

const AsyncPageSitemap = Loadable({
  loader: () => import("@routes/PageSitemap"),
  loading: () => <div>Loading...</div>
});

const AsyncPageAbout = Loadable({
  loader: () => import("@routes/PageAbout"),
  loading: () => <div>Loading...</div>
});

const AsyncPageScheduler = Loadable({
  loader: () => import("@routes/PageScheduler"),
  loading: () => <div>Loading...</div>
});

const AsyncPageHome = Loadable({
  loader: () => import("@routes/PageHome"),
  loading: () => <div>Loading...</div>
});

const AsyncPageBrowser = Loadable({
  loader: () => import("@routes/PageBrowser"),
  loading: () => <div>Loading...</div>
});

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
              <Route exact path={ROUTES.ROUTE_HOME} component={AsyncPageHome} />
              <Route
                exact
                path={ROUTES.ROUTE_COURSE_PAGE}
                component={AsyncPageCourseDetail}
              />
              <Route exact path={ROUTES.ROUTE_HELP} component={AsyncPageHelp} />
              <Route
                exact
                path={ROUTES.ROUTE_CREATE_ACCOUNT}
                component={AsyncPageTransient}
              />
              <Route
                exact
                path={ROUTES.ROUTE_RESET_PASSWORD}
                component={AsyncPageResetPassword}
              />
              <Route
                exact
                path={ROUTES.ROUTE_USER_SETTING}
                component={AsyncPageUserSetting}
              />
              {/* <Route exact path={ROUTES.ROUTE_SIGN_UP} component={PageSignUp} /> */}
              <Route
                exact
                path={ROUTES.ROUTE_SITEMAP}
                component={AsyncPageSitemap}
              />
              <Route
                exact
                path={ROUTES.ROUTE_ABOUT}
                component={AsyncPageAbout}
              />
              <Route
                exact
                path={ROUTES.ROUTE_SCHEDULER}
                component={AsyncPageScheduler}
              />
              <Route
                exact
                path={ROUTES.ROUTE_BROWSER}
                component={AsyncPageBrowser}
              />
              {/* fallback */}
              <Route path={"/"} component={AsyncPageHome} />
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
