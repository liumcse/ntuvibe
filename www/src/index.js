import React from "React";
import ReactDOM from "react-dom";
import PageHome from "./PageHome/index";
import NavBar from "./components/NavBar";

import "react-select/dist/react-select.css";
import "./styles/app.scss";
import "normalize.css";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <PageHome />
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);