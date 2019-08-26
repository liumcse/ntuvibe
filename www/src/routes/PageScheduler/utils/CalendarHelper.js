import { OFFSET, SEMESTER_START, WEEKDAY, DAYTIME, WEEKTIME } from "./config";
import { mergeSchedule } from "./config";

const dateCalculationForCalendar = (d, T) => {
  const original = new Date(
    parseInt(d.getFullYear(), 10),
    parseInt(d.getMonth(), 10),
    parseInt(d.getDate(), 10),
    parseInt(T.slice(0, 2), 10),
    parseInt(T.slice(2, 4), 10),
    0,
    0
  ).getTime();
  return new Date(original + OFFSET);
};

export function calendarHelper(schedule, exam) {
  if (!schedule) return [];
  let idCount = 0;
  const events = [];
  const courseList = Object.keys(schedule);
  const examList = Object.keys(exam);
  let eventCategory = {};
  courseList.forEach((courseCode, index) => {
    eventCategory = { ...eventCategory, [courseCode]: index };
  });
  courseList.forEach(courseCode => {
    const course = schedule[courseCode];
    let scheduleList = course.schedule;
    scheduleList = mergeSchedule(scheduleList);
    scheduleList.forEach(schedule => {
      if (!schedule) return;
      const {
        day,
        start_time,
        end_time,
        remark,
        class_type,
        group,
        venue
      } = schedule;
      remark.forEach(week => {
        const calculatedTime =
          SEMESTER_START + week * WEEKTIME + WEEKDAY[day] * DAYTIME;
        const start = dateCalculationForCalendar(
          new Date(calculatedTime),
          start_time
        );
        const end = dateCalculationForCalendar(
          new Date(calculatedTime),
          end_time
        );
        events.push({
          id: idCount++,
          title: courseCode,
          type: class_type,
          group: group,
          location: venue,
          allDay: false,
          start: start,
          end: end,
          category: "category_".concat(eventCategory[courseCode])
        });
      });
    });
  });
  examList.forEach(courseCode => {
    const examTime = exam[courseCode];
    events.push({
      id: idCount++,
      title: courseCode,
      type: "Exam",
      group: "Examination",
      allDay: false,
      start: new Date(examTime.start_time * 1000),
      end: new Date(examTime.end_time * 1000)
    });
  });
  return events;
}
