import { fetchExamSchedule } from "src/api";

export const examTime = async schedule => {
  let result = [];
  await Promise.all(
    Object.keys(schedule).map(async courseID => {
      let res = await fetchExamSchedule(courseID);
      console.log(res);
      let record = res.data.data;
      if (record.start_time) result = [record, ...result];
    })
  );
  console.log("inner");
  console.log(result);
  return result;
};
