// @flow

import type {
  CourseDetail,
  CourseRating,
  CourseComments,
  ExamSchedule
} from "./courses";

export type CourseState = {
  courseList: any,
  courseDetail: ?CourseDetail,
  courseRating: ?CourseRating,
  courseSchedule: any,
  courseComments: ?CourseComments,
  examSchedule: ?ExamSchedule
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
