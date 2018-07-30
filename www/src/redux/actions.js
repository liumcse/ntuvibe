// @flow
import axios from "axios";
import * as actionTypes from "./action_types";

// import type { Action } from "src/FlowType/acitons";

// const BASE_URL = "http://178.128.214.242/api";
const BASE_URL = "http://localhost:3000/api";

export function fetchCourseDetail(courseCode: string) {
  return async function(dispatch: any) {
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

export function fetchCourseRating(courseCode: string) {
  return async function(dispatch: any) {
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
          payload: {}
        })
      );
  };
}

export function fetchCourseList() {
  return async function(dispatch: any) {
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
          payload: {}
        })
      );
  };
}

export function fetchExamSchedule(courseCode: string) {
  return async function(dispatch: any) {
    dispatch({
      type: actionTypes.FETCH_EXAM_SCHEDULE_REQUESTED
    });
    axios
      .get(`${BASE_URL}/courses/get_exam_schedule?code=${courseCode}`)
      .then(response =>
        dispatch({
          type: actionTypes.FETCH_EXAM_SCHEDULE_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: actionTypes.FETCH_EXAM_SCHEDULE_FAILURE,
          payload: {}
        })
      );
  };
}

export function fetchCourseComments(courseCode: string) {
  return async function(dispatch: any) {
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

export function popupTrigger(popup: 0 | 1 | 2 | 3) {
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
