import React from 'react';
import * as styles from './style.scss';

class PageHome extends React.Component {
  render() {
    return (
      <div className={styles.home_page}>
        <h1>Hello, world!</h1>
      </div>
    )
  }
}

export default PageHome;