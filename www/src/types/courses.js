// flow
export type CourseDetail = {
  code: string,
  title: string,
  au: string,
  description: string,
  prerequisite: string,
  remark: [{ key: string }],
  asUE: boolean,
  asPE: boolean
};

export type CourseRating = {
  code: string,
  overall: 0 | 1 | 2,
  useful: 0 | 1 | 2,
  easy: 0 | 1 | 2
};

export type CourseComment = {
  userid: number,
  usename: string,
  major: string,
  like: 0 | 1 | 2,
  useful: 0 | 1 | 2,
  easy: 0 | 1 | 2,
  comment_date: number,
  comment_content: ?string
};
