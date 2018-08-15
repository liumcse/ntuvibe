// @flow
import { combineReducers } from "redux";
import * as actionTypes from "./action_types";
import type {
  CourseState,
  PopupState,
  UserState,
  State
} from "src/FlowType/states";
import type { Action } from "src/FlowType/actions";

const initialState: State = {
  course: {
    courseRatingSubmission: null,
    courseList: null,
    courseDetail: null,
    courseRating: null,
    courseSchedule: null,
    courseComments: null,
    examSchedule: null
  },
  popup: {
    loginOpen: false,
    signUpOpen: false,
    rateCourseOpen: false
  },
  user: {
    profile: null,
    courseComment: null,
    loginRequest: null,
    signUpRequest: null,
    updateProfile: null,
    validation: null,
    activation: null
  }
};

const course = (state = initialState.course, action: Action): CourseState => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_COURSE_DETAIL_SUCCESS:
      return {
        ...state,
        courseDetail: payload.data
      };
    case actionTypes.FETCH_COURSE_DETAIL_FAILURE:
      return {
        ...state,
        courseDetail: payload
      };
    case actionTypes.FETCH_COURSE_RATING_SUCCESS:
      return {
        ...state,
        courseRating: payload.data
      };
    case actionTypes.FETCH_COURSE_RATING_FAILURE:
      return {
        ...state,
        courseRating: payload
      };
    case actionTypes.FETCH_COURSE_LIST_SUCCESS:
      return {
        ...state,
        courseList: payload.data
      };
    case actionTypes.FETCH_COURSE_LIST_FAILURE:
      return {
        ...state,
        courseList: payload
      };
    case actionTypes.FETCH_EXAM_SCHEDULE_SUCCESS:
      return {
        ...state,
        examSchedule: payload.data
      };
    case actionTypes.FETCH_EXAM_SCHEDULE_FAILURE:
      return {
        ...state,
        examSchedule: payload
      };
    case actionTypes.FETCH_COURSE_SCHEDULE_SUCCESS:
      return {
        ...state,
        courseSchedule: payload.data
      };
    case actionTypes.FETCH_COURSE_SCHEDULE_FAILURE:
      return {
        ...state,
        courseSchedule: payload
      };
    case actionTypes.FETCH_COURSE_COMMENTS_SUCCESS:
      return {
        ...state,
        courseComments: payload.data
      };
    case actionTypes.FETCH_COURSE_COMMENTS_FAILURE:
      return {
        ...state,
        courseComments: payload
      };
    case actionTypes.SUBMIT_COURSE_RATING_SUCCESS:
      return {
        ...state,
        courseRatingSubmission: payload.data
      };
    case actionTypes.SUBMIT_COURSE_RATING_FAILURE:
      return {
        ...state,
        courseRatingSubmission: payload.data
      };
    case actionTypes.CLEAR_COURSE_INFORMATION:
      return {
        ...state,
        courseDetail: null,
        courseRating: null,
        courseSchedule: null,
        courseComments: null,
        examSchedule: null
      };
    default:
      // likely to be an error
      return state;
  }
};

const user = (state = initialState.user, action: Action): UserState => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload.data
      };
    case actionTypes.FETCH_USER_COURSE_COMMENT_SUCCESS:
      return {
        ...state,
        courseComment: payload.data[0]
      };
    case actionTypes.FETCH_USER_COURSE_COMMENT_FAILURE:
      return {
        ...state,
        courseComment: payload
      };
    case actionTypes.FETCH_PROFILE_FAILURE:
      return {
        ...state,
        profile: payload.data
      };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginRequest: payload.data
      };
    case actionTypes.USER_LOGIN_FAILURE:
      return {
        ...state,
        loginRequest: payload.data
      };
    case actionTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        signUpRequest: payload.data
      };
    case actionTypes.USER_SIGNUP_FAILURE:
      return {
        ...state,
        signUpRequest: payload.data
      };
    case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfile: payload.data
      };
    case actionTypes.USER_UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        updateProfile: payload.data
      };
    case actionTypes.VALIDATE_ACTIVATION_SUCCESS:
      return {
        ...state,
        validation: payload
      };
    case actionTypes.VALIDATE_ACTIVATION_FAILURE:
      return {
        ...state,
        validation: payload.data
      };
    case actionTypes.USER_ACTIVATE_SUCCESS:
      return {
        ...state,
        activation: payload.data
      };
    case actionTypes.USER_ACTIVATE_FAILURE:
      return {
        ...state,
        activation: payload.data
      };
    default:
      return state;
  }
};

const popup = (state = initialState.popup, action: Action): PopupState => {
  const { type, payload } = action;
  if (type === actionTypes.POPUP_TRIGGER) {
    switch (payload) {
      case 1:
        // open Login
        return {
          ...initialState.popup,
          loginOpen: true
        };
      case 2:
        // open SignUp
        return {
          ...initialState.popup,
          signUpOpen: true
        };
      case 3:
        // open RateCourse
        return {
          ...initialState.popup,
          rateCourseOpen: true
        };
      default:
        // close all
        return initialState.popup;
    }
  } else {
    return state;
  }
};

const rootReducer = combineReducers({ course, popup, user });

export default rootReducer;
