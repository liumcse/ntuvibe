import { SEMESTER_START, WEEKTIME } from "../../../constants";

// turns out I don't need a complex lexer... lol, but it was fun
export class Lexer {
  constructor(tokenStream) {
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
// LEC 13:30 - 14:30, LEC 14:30 - 15:30 can be merged into LEC 13:30 - 15:30
// And this function is to achieve that
// eslint-disable-next-line
export const mergeSchedule = scheduleList => {
  // helper function for comparing weeks
  const compareWeeks = (weekA, weekB) => {
    if (weekA.length !== weekB.length) return false;
    for (let i = 0; i < weekA.length; i++) {
      if (weekA[i] !== weekB[i]) return false;
    }
    return true;
  };
  // start processing
  if (!scheduleList) return [];
  const mergedSchedule = [];
  for (let i = 0; i < scheduleList.length; i++) {
    const thisSchedule = scheduleList[i]; // enforce immutability
    if (!thisSchedule) break;
    if (i === 0) {
      mergedSchedule.push(thisSchedule);
      continue;
    }
    const {
      day,
      start_time,
      end_time,
      remark,
      class_type,
      group,
      venue
    } = thisSchedule;
    if (
      !day ||
      !start_time ||
      !end_time ||
      !remark ||
      !class_type ||
      !group ||
      !venue
    ) {
      mergedSchedule.push(thisSchedule);
      continue;
    }
    const lastSchedule = mergedSchedule[mergedSchedule.length - 1];
    const last_day = lastSchedule.day;
    const last_end_time = lastSchedule.end_time;
    const last_remark = lastSchedule.remark;
    const last_class_type = lastSchedule.class_type;
    const last_group = lastSchedule.group;
    const last_venue = lastSchedule.venue;
    if (
      day === last_day &&
      start_time === last_end_time &&
      compareWeeks(remark, last_remark) &&
      class_type === last_class_type &&
      group === last_group &&
      venue === last_venue
    ) {
      // can be merged
      // warning: do not mutate lastSchedule directly; instead, create a new object
      mergedSchedule[mergedSchedule.length - 1] = {
        ...lastSchedule,
        end_time: end_time
      };
    } else {
      mergedSchedule.push(thisSchedule);
    }
  }
  return mergedSchedule;
};

export function calculateAcademicWeek() {
  const weekDifference = parseInt(
    ((new Date().getTime() - SEMESTER_START + 86400000) / WEEKTIME).toString(),
    10
  );
  if (weekDifference >= 1 && weekDifference <= 7) {
    return `Week ${weekDifference}`;
  } else if (weekDifference === 8) {
    return "Recess Week 🎉";
  } else if (weekDifference >= 9 && weekDifference <= 14) {
    return `Week ${weekDifference - 1}`;
  } else return null;
}

export function getLatestClass(events) {
  let latest = new Date("January 1, 00 00:00");
  events.forEach(event => {
    if (event.end.getHours() > latest.getHours()) {
      latest = new Date(event.end.getTime());
    }
  });
  return latest;
}
