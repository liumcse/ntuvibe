import React from "react";
import Popup from "reactjs-popup";
import Button from "antd/lib/button";
import * as styles from "./style.scss";
import { message } from "antd";

type Props = {
  import: string => void,
  trigger: any
};

class ImportSchedule extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      importing: false
    };
  }

  import = () => {
    this.setState({ importing: true });
    const input = document.querySelector("." + styles.input).value;
    if (!input) {
      message.warning("Input is empty!");
      this.setState({ importing: false });
    } else {
      try {
        this.props.import(input).then(() => {
          this.setState({ importing: false });
        });
      } catch (error) {
        alert(
          "We are sorry, but we can't import your schedule. Make sure you copied everything on the \"Print\\Check Registered Course\" page.\nIf the problem persists, we appreciate if you can send us a feedback.\nBy the way, have you tried Chrome? Vibe doesn't work well on IE or Microsoft Edge :("
        );
        this.setState({ importing: false });
      }
    }
  };

  render() {
    return (
      <Popup modal trigger={this.props.trigger}>
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
            <Button
              type="primary"
              className={styles.button}
              onClick={() => this.import()}
            >
              {"Import" + (this.state.importing ? "ing..." : "")}
            </Button>
          </div>
        </div>
      </Popup>
    );
  }
}

export default ImportSchedule;
