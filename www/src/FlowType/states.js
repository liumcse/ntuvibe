// @flow

import type { CourseDetail, CourseRating, CourseComments } from "./courses";

export type CourseState = {
  courseList: any,
  courseDetail: ?CourseDetail,
  courseRating: ?CourseRating,
  courseSchedule: any,
  courseComments: ?CourseComments
};

export type PopupState = {
  loginOpen: boolean,
  signUpOpen: boolean,
  rateCourseOpen: boolean
};

// top level state
export type State = {
  +course: CourseState,
  +popup: PopupState
};
