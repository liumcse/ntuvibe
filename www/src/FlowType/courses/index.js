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
  number_of_rating: number,
  overall: string,
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

export type ExamSchedule = {
  start_time: number,
  end_time: number
};
