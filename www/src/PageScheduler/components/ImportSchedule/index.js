// @flow
import React from "react";
import Popup from "reactjs-popup";
import * as styles from "./style.scss";

type Props = {
  import: string => void,
  trigger: any
};

class ImportSchedule extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  import = (closePopup: Function): void => {
    const input = document.querySelector("." + styles.input).value;
    if (!input) {
      alert("Hmmm is that empty input?");
    } else {
      try {
        this.props.import(input);
        closePopup();
      } catch (error) {
        alert(
          "We are sorry, but we can't import your schedule. Make sure you copied everything on the \"Print\\Check Registered Course\" page.\nIf the problem persists, we appreciate if you can send us a feedback.\nBy the way, have you tried Chrome? Vibe doesn't work well on IE or Microsoft Edge :("
        );
      }
    }
  };

  render() {
    return (
      <Popup modal closeOnDocumentClick trigger={this.props.trigger}>
        {close => (
          <div className={styles.container}>
            <div className={styles.header}>Import new schedule</div>
            <div className={styles.inputContainer}>
              <textarea
                className={styles.input}
                placeholder="Paste all text you copied from Print/Check Courses Registered into here..."
                spellCheck={false}
                data-gramm_editor="false" /* disable grammarly*/
              />
            </div>
            <div className={styles.importButtonContainer}>
              <button
                className={styles.button}
                onClick={() => this.import(close)}
              >
                Import
              </button>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default ImportSchedule;
