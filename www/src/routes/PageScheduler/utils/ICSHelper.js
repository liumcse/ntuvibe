import * as ics from "ics";
import { OFFSET, SEMESTER_START, WEEKDAY, DAYTIME, WEEKTIME } from "./config";
import { mergeSchedule } from "./config";

// download feature implementation
// The ics API use UTC-8 as the only time source, hence we will use UTC time to calculate timezone.
const dateCalculationForICS = (d, T) => {
  let generateArrayResult = src => [
    parseInt(src.getFullYear(), 10),
    parseInt(src.getMonth(), 10) + 1,
    parseInt(src.getDate(), 10),
    parseInt(src.getHours(), 10),
    parseInt(src.getMinutes(), 10)
  ];
  if (T) {
    const original = new Date(
      parseInt(d.getFullYear(), 10),
      parseInt(d.getMonth(), 10),
      parseInt(d.getDate(), 10),
      parseInt(T.slice(0, 2), 10),
      parseInt(T.slice(2, 4), 10),
      0,
      0
    ).getTime();
    const calibrated = new Date(original + OFFSET);
    return generateArrayResult(calibrated);
  } else return generateArrayResult(d);
};

export function icsHelper(schedule, exam) {
  const courseTimeGenerator = courseID => {
    const course = schedule[courseID];
    const scheduleList = mergeSchedule(course.schedule);
    scheduleList.forEach(classOfCourse => {
      if (classOfCourse !== null)
        classOfCourse.remark.forEach(weekCount => {
          const calculatedTime =
            SEMESTER_START +
            weekCount * WEEKTIME +
            WEEKDAY[classOfCourse.day] * DAYTIME;

          const event = {
            start: dateCalculationForICS(
              new Date(calculatedTime),
              classOfCourse["start_time"]
            ),
            end: dateCalculationForICS(
              new Date(calculatedTime),
              classOfCourse["end_time"]
            ),
            title: courseID,
            description:
              course.title +
              "\n" +
              classOfCourse.class_type +
              " " +
              classOfCourse.group,
            categories: ["NTU course"],
            location: classOfCourse.venue,
            geo: { lat: 1.29027, lon: 103.851959 }, // TODO: change to constant
            status: "CONFIRMED"
          };
          serialEvent.push(event);
        });
    });
  };
  const examTimeGenerator = async courseID => {
    const src = exam[courseID];
    const event = {
      start: dateCalculationForICS(new Date(src.start_time * 1000)),
      end: dateCalculationForICS(new Date(src.end_time * 1000)),
      title: "Exam: " + courseID,
      description: courseID + " Examination",
      categories: ["NTU exam"],
      location: "",
      geo: { lat: 1.29027, lon: 103.851959 }, // TODO: change to constant
      status: "CONFIRMED"
    };
    serialEvent.push(event);
  };

  let serialEvent = [];
  Object.keys(schedule).forEach(courseTimeGenerator);
  Object.keys(exam).forEach(examTimeGenerator);
  const { error, value } = ics.createEvents(serialEvent);
  if (!error) return value;
  return null;
}
