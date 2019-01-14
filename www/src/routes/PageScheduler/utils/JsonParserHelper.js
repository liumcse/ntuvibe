import { Lexer } from "./config";

export function parseToJSON(tokenStream) {
  // helper function
  const processWeek = week => {
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

  const processSchedule = schedule => {
    if (!schedule) return null;
    if (!schedule[5] || schedule[5] === "ONLINE COURSE") return null;
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
