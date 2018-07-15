import React from "react";
import PropTypes from "prop-types";

import * as styles from "./style.scss";

const Bar = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>{props.label}</div>
      <div className={styles.bar_container}>
        <div className={styles.back_bar} />
        <div className={styles.front_bar} style={{width: props.value}}/>
      </div>
    </div>
  );
};

Bar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Bar;