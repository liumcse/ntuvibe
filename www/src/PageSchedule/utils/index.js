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
      end = i - 1;
      break;
    }
  }
  // remove useless part
  const noiseRemoved = emptyRemoved.slice(start, end + 1);
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
    if (!this.hasNextLine()) {
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

  hasNextLine = () => {
    return this.linePosition !== this.numberOfLines;
  };

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
  // helper function
  const processWeek = (week: string): string[] => {
    const split = week.replace("TEACHING WK", "").split(",");
    const processedWeek = [];
    split.forEach(value => {
      if (value.includes("-")) {
        const splitDash = value.split("-");
        const start = parseInt(splitDash[0], 10);
        const end = parseInt(splitDash[1], 10);
        for (let i = start; i <= end; i++) {
          processedWeek.push(i);
        }
      } else {
        processedWeek.push(parseInt(value, 10));
      }
    });
    // include recess week calculation.
    const result = processedWeek.map(value => (value > 7 ? value + 1 : value));
    return result;
  };

  const processSchedule = (schedule: string[]): Object => {
    if (!schedule) return null;
    if (schedule[5] === "ONLINE COURSE") return null;
    else {
      const time = schedule[3].split("-");
      const start_time = time[0];
      const end_time = time[1];
      return {
        class_type: schedule[0],
        group: schedule[1],
        day: schedule[2],
        start_time: start_time,
        end_time: end_time,
        venue: schedule[4],
        remark: processWeek(schedule[5])
      };
    }
  };

  const lexer = new Lexer(tokenStream);
  // initialize an empty json object
  const output = {};
  let courseCode = null;
  // star processing
  while (lexer.hasNextLine()) {
    const line = lexer.consumeLine();
    if (line.length === 15) {
      // is course code
      courseCode = line[0];
      output[courseCode] = {
        ...output[courseCode],
        title: line[1],
        au: line[2],
        course_type: line[3],
        su: line[4],
        ger_type: line[5],
        index_number: line[6],
        status: line[7],
        choice: line[8],
        schedule: [processSchedule(line.splice(9, 15))]
      };
    } else {
      // is schedule
      output[courseCode].schedule.push(processSchedule(line));
    }
  }

  return output;
}
