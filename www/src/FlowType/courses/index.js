// @flow

export type CourseListSnippet = {
  code: string,
  title: string
};

export type CourseList = Array<CourseListSnippet>;

export type CourseDetail = {
  title: string,
  au: string,
  description: string,
  constraint: {
    prerequisite: string[],
    mutex: ?string
  },
  as_ue: boolean,
  as_pe: boolean
};

export type CourseRating = {
  count: number,
  like: string,
  useful: string,
  easy: string
};

export type CourseComments = {
  userid: number,
  usename: string,
  major: string,
  like: 0 | 1 | 2,
  useful: 0 | 1 | 2,
  easy: 0 | 1 | 2,
  comment_date: number,
  comment_content: ?string
};

export type CourseSchedule = {
  [index: string]: Array<{
    type: string,
    group: string,
    day: 1 | 2 | 3 | 4 | 5 | 6,
    start_time: number,
    end_time: number,
    venue: string,
    weeks: number[]
  }>
};

export type ExamSchedule = {
  start_time: number,
  end_time: number
};
