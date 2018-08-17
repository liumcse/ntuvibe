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
  download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  handleInput = event => {
    this.setState({ input: event.target.value });
  };

  generateOutput = () => {
    // const outputTextarea = document.querySelector("." + styles.outputArea);
    const input = this.state.input;
    const tokenStream = tools.tokenize(input);

    // console.log(tokenStream);
    // const lexer = new tools.Lexer(tokenStream);
    // while (!lexer.isEOF()) {
    //   console.log("consuming...", lexer.consume());
    // }
    const output = tools.parseToJSON(tokenStream);
    // write to output
    const courseResult = tools.generateICS(output);
    console.log(courseResult);

    this.download(courseResult, "Schedule.ics", "text/plain");

    // outputTextarea.value = JSON.stringify(output, null, 2);
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
          <button onClick={this.generateOutput} className={styles.generate}>
            Generate
          </button>
        </div>
      </div>
    );
  }
}

export default PageSchedule;
