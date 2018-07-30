// @flow

import axios from "axios";
import * as actionTypes from "./action_types";

const BASE_URL = "http://178.128.214.242/api";

export function fetchCourseDetail(courseCode: string): Function {
  return async function(dispatch: Function) {
    dispatch({
      type: actionTypes.FETCH_COURSE_DETAIL_REQUESTED
    });
    axios
      .get(`${BASE_URL}/courses/get_course_detail?code=${courseCode}`)
      .then(response =>
        dispatch({
          type: actionTypes.FETCH_COURSE_DETAIL_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: actionTypes.FETCH_COURSE_DETAIL_FAILURE,
          payload: null
        })
      );
  };
}

export function fetchCourseRating(courseCode: string): Function {
  return async function(dispatch: Function) {
    dispatch({
      type: actionTypes.FETCH_COURSE_RATING_REQUESTED
    });
    axios
      .get(`${BASE_URL}/courses/get_course_rating?code=${courseCode}`)
      .then(response =>
        dispatch({
          type: actionTypes.FETCH_COURSE_RATING_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: actionTypes.FETCH_COURSE_RATING_FAILURE,
          payload: null
        })
      );
  };
}

export function fetchCourseList() {
  return async function(dispatch: Function): Function {
    dispatch({
      type: actionTypes.FETCH_COURSE_LIST_REQUESTED
    });
    axios
      .get(`${BASE_URL}/courses/get_course_list`)
      .then(response =>
        dispatch({
          type: actionTypes.FETCH_COURSE_LIST_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: actionTypes.FETCH_COURSE_LIST_FAILURE,
          payload: null
        })
      );
  };
}

export function fetchCourseComments(courseCode: string) {
  return async function(dispatch: Function): Function {
    dispatch({
      type: actionTypes.FETCH_COURSE_COMMENTS_REQUESTED
    });
    axios
      .get(`${BASE_URL}/courses/get_course_comments?code=${courseCode}`)
      .then(response =>
        dispatch({
          type: actionTypes.FETCH_COURSE_COMMENTS_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: actionTypes.FETCH_COURSE_COMMENTS_FAILURE,
          payload: []
        })
      );
  };
}

export function popupTrigger(popup: 0 | 1 | 2 | 3): Object {
  switch (popup) {
    case 1:
      return { type: actionTypes.POPUP_TRIGGER, payload: 1 };
    case 2:
      return { type: actionTypes.POPUP_TRIGGER, payload: 2 };
    case 3:
      return { type: actionTypes.POPUP_TRIGGER, payload: 3 };
    default:
      return { type: actionTypes.POPUP_TRIGGER, payload: 0 }; // close all
  }
}
