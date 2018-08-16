// @flow
export function tokenize(charStream: string): string[][] {
  if (!charStream) return [];
  // replace tab to space
  const replaceTab = charStream
    .toUpperCase()
    .replace(/\t/g /* regex to replace all tabs */, " ||||| "); // ||||| represents a gap, temporary
  // remove new lines
  const lineStripped = replaceTab.split("\n");
  // remove white spaces
  const spaceStripped = lineStripped.map(value => value.split(" "));
  // filter out empty array
  const emptyRemoved = spaceStripped
    .filter(arr => !(arr.length === 1 && arr[0] === ""))
    .map(arr => arr.filter(value => value !== ""));
  // filter noise
  let start = 0,
    end = emptyRemoved.length - 1;
  for (let i = 0; i < emptyRemoved.length - 1; i++) {
    const content = emptyRemoved[i];
    if (content.includes("REMARK") && content.includes("VENUE")) {
      start = i + 1;
      break;
    }
  }
  // two loops are necessary, prevent overriding start / end
  for (let i = emptyRemoved.length - 1; i >= 0; i--) {
    const content = emptyRemoved[i];
    if (content.includes("TOTAL") && content.includes("AU")) {
      end = i;
      break;
    }
  }
  // remove useless part
  const noiseRemoved = emptyRemoved.slice(start, end);
  // remove gap
  const gapRemoved = noiseRemoved.map(arr =>
    arr
      .join(" ")
      .split("|||||")
      .map(value => value.trim())
  );
  return gapRemoved;
}

// turns out I don't need a complex lexer... lol, but it was fun
export class Lexer {
  constructor(tokenStream: string[][]) {
    this.linePosition = 0;
    this.tokenPosition = 0;

    this.tokenStream = tokenStream;
    this.numberOfLines = tokenStream.length;
  }

  consume = () => {
    if (this.isEOF()) {
      throw "Is EOF!";
    }
    const lineSize = this.tokenStream[this.linePosition].length;
    // jump to next line, if reach the end
    if (this.tokenPosition === lineSize - 1) {
      this.tokenPosition = 0;
      this.linePosition += 1;
    }
    // return token
    return this.tokenStream[this.linePosition][this.tokenPosition++];
  };

  consumeLine = () => {
    if (this.isLastLine()) {
      throw "No more lines!";
    }
    return this.tokenStream[this.linePosition++];
  };

  inspectNext = () => {
    if (this.isEOF()) {
      throw "Is EOF!";
    }
    const lineSize = this.tokenStream[this.linePosition].length;
    if (this.tokenPosition === lineSize - 1) {
      return this.tokenStream[this.linePosition + 1][0];
    }
    // return token
    return this.tokenStream[this.linePosition][this.tokenPosition + 1];
  };

  isLastLine = () => {
    return this.linePosition === this.numberOfLines - 1;
  }

  isEOF = () => {
    return (
      // if it is the last one of the last line
      this.linePosition === this.numberOfLines - 1 &&
      this.tokenPosition === this.tokenStream[this.numberOfLines - 1].length - 1
    );
  };
}

// turns out I don't need this either
// function isCourseCode(token: string): string {
//   const specialCharacterMatch = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
//   const keywordMatch = /(LAB)|(SEM)/;
//   const scheduleMatch = /(^LAB$)|(^LEC\/STUDIO$)|(^TUT$)|(^SEM$)/;
//   const ignoreMatch = /(^PRJ$)|(^DES$)/;
//   if (
//     token.length === 6 &&
//     !specialCharacterMatch.test(token) &&
//     !keywordMatch.test(token) &&
//     !ignoreMatch.test(token) &&
//     !scheduleMatch.test(token) &&
//     /\d/.test(token)
//   ) {
//     return "courseCode";
//   } else {
//     return null;
//   }
// }

export function parseToJSON(tokenStream: string[][]) {
  const lexer = new Lexer(tokenStream);
  // initialize an empty json object
  const output = {};
  let courseCode = null;
  // star processing
  console.log("Start processing");
  while (!lexer.isLastLine()) {
    const line = lexer.consumeLine();
    console.log(line);
    if (line.length === 15) {
      // is course code
      courseCode = line[0];
      output[courseCode] = {}
    } else {
      // is schedule

    }
    // if (classifyToken(token) === "courseCode") {
    //   courseCode = token;
    //   console.log("course code ", courseCode);
    // }
    // if (isCourseCode(token)) console.log(isCourseCode(token), token);
  }
}
