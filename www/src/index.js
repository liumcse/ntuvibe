import React from "react";
import ReactDOM from "react-dom";
import { Spin, Icon } from "antd";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import ReactGA from "react-ga";

import * as ROUTES from "@routes";
import { logPageview } from "@tracking";
import ModalContainer from "@routes/ModalContainer";
import AppShell from "@components/AppShell";

import "./styles/app.scss";
import "normalize.css";
import "antd/dist/antd.less";

const LoadingSpinner = () => (
  <Icon type="loading" style={{ fontSize: "4rem", marginBottom: "2rem" }} />
);

const AsyncPageResetPassword = Loadable({
  loader: () => import("@routes/PageResetPassword"),
  loading: () => <LoadingSpinner />
});

const AsyncPageUserSetting = Loadable({
  loader: () => import("@routes/PageUserSetting"),
  loading: () => <LoadingSpinner />
});

const AsyncPageCourseDetail = Loadable({
  loader: () => import("@routes/PageCourseDetail"),
  loading: () => <LoadingSpinner />
});

const AsyncPageHelp = Loadable({
  loader: () => import("@routes/PageHelp"),
  loading: () => <LoadingSpinner />
});

const AsyncPageTransient = Loadable({
  loader: () => import("@routes/PageTransient"),
  loading: () => <LoadingSpinner />
});

const AsyncPageSitemap = Loadable({
  loader: () => import("@routes/PageSitemap"),
  loading: () => <LoadingSpinner />
});

const AsyncPageAbout = Loadable({
  loader: () => import("@routes/PageAbout"),
  loading: () => <LoadingSpinner />
});

const AsyncPageScheduler = Loadable({
  loader: () => import("@routes/PageScheduler"),
  loading: () => <LoadingSpinner />
});

const AsyncPageHome = Loadable({
  loader: () => import("@routes/PageHome"),
  loading: () => <LoadingSpinner />
});

const AsyncPageBrowser = Loadable({
  loader: () => import("@routes/PageBrowser"),
  loading: () => <LoadingSpinner />
});

class App extends React.PureComponent {
  componentDidMount() {
    logPageview(window.location.pathname);
    AsyncPageBrowser.preload();
    AsyncPageScheduler.preload();
    AsyncPageHome.preload();
  }

  render() {
    return (
      <AppShell>
        <ModalContainer />
        <Switch>
          <Route exact path={ROUTES.ROUTE_HOME} component={LoadingSpinner} />
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
          <Route exact path={ROUTES.ROUTE_ABOUT} component={AsyncPageAbout} />
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
      </AppShell>
    );
  }
}

// Google Analytics initialization
ReactGA.initialize("UA-113348736-2");
ReactDOM.render(<App />, document.getElementById("app"));
