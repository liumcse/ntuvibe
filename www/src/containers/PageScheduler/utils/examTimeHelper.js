import { fetchExamSchedule } from "src/api";

export const examTime = async schedule => {
  let result = {};
  await Promise.all(
    Object.keys(schedule).map(async courseID => {
      let res = await fetchExamSchedule(courseID);
      let record = res.data.data;
      let object = {};
      object[courseID] = record;
      if (record.start_time) Object.assign(result, object);
    })
  );
  return result;
};
