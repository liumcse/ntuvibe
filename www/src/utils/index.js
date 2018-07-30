// @flow
import type { CourseList, CourseListSnippet } from "src/FlowType/courses";

export function search_course_by_code_or_title(
  courseList: CourseList,
  input: string
): CourseList {
  const result = courseList.filter((snippet: CourseListSnippet) => {
    return (
      // TODO: here's a sever performance issue
      snippet.code.toLowerCase().includes(input) ||
      snippet.title.toLowerCase().includes(input)
    );
  });
  return result;
}

export function cap_first_letter(input: string): string {
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
