// @flow

import type {
  CourseDetail,
  CourseRating,
  CourseComments,
  CourseList,
  CourseSchedule,
  ExamSchedule
} from "./courses";

export type CourseState = {
  courseList: ?CourseList,
  courseDetail: ?CourseDetail,
  courseRating: ?CourseRating,
  courseSchedule: ?CourseSchedule,
  courseComments: ?CourseComments,
  courseRatingSubmission: any, // todo
  examSchedule: ?ExamSchedule
};

export type UserState = {
  loginRequest: any // todo
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
