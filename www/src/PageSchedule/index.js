import React from "react";
import NavBar from "src/components/NavBar";

import * as tools from "./utils";
import * as styles from "./style.scss";

class PageSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  handleInput = event => {
    this.setState({ input: event.target.value });
  };

  generateOutput = () => {
    const outputTextarea = document.querySelector("." + styles.outputArea);
    const input = this.state.input;
    const tokenStream = tools.tokenize(input);

    console.log(tokenStream);
    // const lexer = new tools.Lexer(tokenStream);
    // while (!lexer.isEOF()) {
    //   console.log("consuming...", lexer.consume());
    // }
    tools.parseToJSON(tokenStream);
    // write to output
    outputTextarea.value = "success";
  };

  render() {
    return (
      <div className={styles.container}>
        <NavBar />
        <div className={styles.innerContainer}>
          <textarea
            className={styles.inputArea}
            onChange={this.handleInput}
            spellCheck={false}
            data-gramm_editor="false" /* disable grammarly*/
          />
          <textarea
            className={styles.outputArea}
            spellCheck={false}
            readOnly
            data-gramm_editor="false" /* disable grammarly*/
          />
        </div>
        <button onClick={this.generateOutput} className={styles.generate}>
          Generate
        </button>
      </div>
    );
  }
}

export default PageSchedule;
