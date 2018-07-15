import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import * as ROUTES from "./routes";
import PageHome from "./PageHome/index";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import "react-select/dist/react-select.css";
import "./styles/app.scss";
import "normalize.css";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Router>
          <Switch>
            <Route exact path={ROUTES.ROUTE_HOME} component={PageHome} />
          </Switch>
        </Router>
        <Footer />
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);