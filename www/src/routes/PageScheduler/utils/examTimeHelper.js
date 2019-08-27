import { fetchExamSchedule } from "src/api";

export const examTime = async schedule => {
  if (!schedule) return null;
  let result = {};
  await Promise.all(
    Object.keys(schedule).map(async courseID => {
      let res = await fetchExamSchedule(courseID);
      let record = res.data;
      if (record.start_time)
        Object.assign(result, {
          [courseID]: {
            start_time: record["start_time"],
            end_time: record["end_time"]
          }
        });
    })
  );
  return result;
};
