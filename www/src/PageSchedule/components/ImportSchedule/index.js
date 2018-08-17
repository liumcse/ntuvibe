import React from "react";
import Popup from "reactjs-popup";
import * as styles from "./style.scss";

class ImportSchedule extends React.PureComponent {
  import = () => {
    const input = document.querySelector("." + styles.input).value;
    this.props.import(input);
    this.props.close();
  };

  render() {
    return (
      <Popup modal closeOnDocumentClick trigger={this.props.trigger}>
        <div className={styles.container}>
          <div className={styles.header}>Import new schedule</div>
          <div className={styles.inputContainer}>
            <textarea
              className={styles.input}
              placeholder="Past all text you copied from registered courses page into here..."
              spellCheck={false}
              data-gramm_editor="false" /* disable grammarly*/
            />
          </div>
          <div className={styles.importButtonContainer}>
            <button className={styles.button} onClick={this.import}>
              Import
            </button>
          </div>
        </div>
      </Popup>
    );
  }
}

export default ImportSchedule;
