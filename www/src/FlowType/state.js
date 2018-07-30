// @flow

import type { CourseDetail, CourseRating, CourseComment } from "./courses";

export type State = {
  course: {
    courseList: any,
    courseDetail: ?CourseDetail,
    courseRating: ?CourseRating,
    courseSchedule: any,
    courseComments: ?CourseComment
  },
  popup: {
    loginOpen: boolean,
    signUpOpen: boolean,
    rateCourseOpen: boolean
  }
};
