// @flow
import type { CourseList, CourseListSnippet } from "src/FlowType/courses";
import moment from "moment";

// TODO: the current search has severe performance issue. Write a better one
export function search_course_by_code_or_title(
  courseList: CourseList,
  input: string
): CourseList {
  if (input.length < 2) return []; // require two or more letters
  const result = courseList.filter((snippet: CourseListSnippet) => {
    return (
      // TODO: here's a performance issue
      snippet.code.toLowerCase().includes(input) ||
      snippet.title.toLowerCase().includes(input)
    );
  });
  // // sort, but too slow
  // if (result.length > 0) {
  //   return result.sort((a, b) => {
  //     console.log("sorting attempted");
  //     return a.code.toLowerCase().localeCompare(b.code.toLowerCase());
  //   });
  // }
  return result;
}

export function course_code_is_valid(
  courseList: CourseList,
  code: string
): boolean {
  return (
    courseList.filter(
      (snippet: CourseListSnippet) => snippet.code.toLowerCase() === code
    ).length > 0
  );
}

export function cap_first_letter(input: string): string {
  if (input === "" || !input) return "";
  const splittedString = input.split(" ");
  if (!splittedString || splittedString === undefined) return "";
  const loweredString = splittedString.map((word: string) =>
    word.toLowerCase()
  );
  const cappedString = loweredString.map((word: string) => {
    const firstLetter = word[0];
    if (firstLetter) {
      const capped = firstLetter.toUpperCase();
      return capped.concat(word.slice(1, word.length));
    } else {
      return word;
    }
  });
  return cappedString.join(" ");
}

export function remove_trailing_newline(input: string): string {
  if (!input || input.length === 0) return "";
  const splittedString = input.split("\n");
  for (let i = 0; i < splittedString.length; i++) {
    if (splittedString[i] === "\n") {
      splittedString[i] = "";
    } else {
      break;
    }
  }
  for (let i = splittedString.length - 1; i >= 0; i--) {
    if (splittedString[i] === "\n") {
      splittedString[i] = "";
    } else {
      break;
    }
  }
  const filteredString = splittedString.filter(s => s.length > 0);
  return filteredString.join("\n");
}

export function timestampToDate(timestamp: number): string {
  // subtract 28800 to adjust time zone
  return moment(timestamp - 28800, "X").format("MMMM Do, YYYY");
}

export function timestampToDay(timestamp: number): string {
  return moment(timestamp - 28800, "X").format("dddd");
}

export function timestampToTime(timestamp: number): string {
  return moment(timestamp - 28800, "X").format("hh:mm A");
}

export function timestampToDuration(
  startTime: number,
  endTime: number
): string {
  const start = new moment(startTime, "X");
  const end = new moment(endTime, "X");
  const duration = moment.duration(end.diff(start)).as("hours");
  return duration.toString().concat(" h");
}
