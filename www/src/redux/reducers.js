// @flow

import { combineReducers } from "redux";
import * as actionTypes from "./action_types";
import type { State } from "src/FlowType/state";

const initialState: State = {
  course: {
    courseList: null,
    courseDetail: null,
    courseRating: null,
    courseSchedule: null,
    courseComments: null
  },
  popup: {
    loginOpen: false,
    signUpOpen: false,
    rateCourseOpen: false
  }
};

const course = (state = initialState.course, action: Object): State.course => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_COURSE_DETAIL_SUCCESS:
      return {
        ...state,
        courseDetail: payload
      };
    case actionTypes.FETCH_COURSE_DETAIL_FAILURE:
      return {
        ...state,
        courseDetail: payload
      };
    case actionTypes.FETCH_COURSE_RATING_SUCCESS:
      return {
        ...state,
        courseRating: payload
      };
    case actionTypes.FETCH_COURSE_RATING_FAILURE:
      return {
        ...state,
        courseRating: payload
      };
    case actionTypes.FETCH_COURSE_LIST_SUCCESS:
      return {
        ...state,
        courseList: payload
      };
    case actionTypes.FETCH_COURSE_LIST_FAILURE:
      return {
        ...state,
        courseList: payload
      };
    case actionTypes.FETCH_COURSE_COMMENTS_SUCCESS:
      return {
        ...state,
        courseComments: payload
      };
    case actionTypes.FETCH_COURSE_COMMENTS_FAILURE:
      return {
        ...state,
        courseComments: payload
      };
    default:
      // likely to be an error
      return state;
  }
};

const popup = (state = initialState.popup, action: Object): State.popup => {
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

const rootReducer = combineReducers({ course, popup });

export default rootReducer;
