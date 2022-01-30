// ====================== Home page
export const THIS_YEAR = "2022";

// ====================== Calendar
/** By calculation time offset is +8 Hours
 * Since I use UTC as standard time, hour and minutes is in Singapore timezone (UTC+8)
 * Since frontend JS is browser specific.
 * Hence, when it apply to UTC time the real time offset is -8 Hours
 * Then I import the time to ics API, which use UTC-8 as standard.
 * Hence There is a -8 Hours Offset.
 * In total it is a +0 Hours Offset.
 */
export const DAYTIME = 24 * 60 * 60 * 1000;
export const OFFSET = 0;
export const WEEKTIME = 7 * DAYTIME;
export const WEEKDAY = {
  MON: 0,
  TUE: 1,
  WED: 2,
  THU: 3,
  FRI: 4,
  SAT: 5,
  SUN: 6
};

// Semester start uses UTC time
// JS Date module use 0 as the start of month, hence, 0 stands for January.
export const SEMESTER_START =
  new Date(2022, 0, 10, 0, 0, 0, 0).getTime() - WEEKTIME;
