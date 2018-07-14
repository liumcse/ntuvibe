import React from 'React';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);