import React from "React";
import ReactDOM from "react-dom";
import PageHome from "./PageHome/index";

class App extends React.Component {
    render() {
        return (
            <PageHome />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);