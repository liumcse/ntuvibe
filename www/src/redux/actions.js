// export const fetchCourseList = () => async dispatch => {

// }
import axios from "axios";
import * as actionTypes from "./action_types";

const BASE_URL = "http://localhost:3000";

export function fetchCourseDetail(courseCode) {
  return async function(dispatch) {
    dispatch({
      type: actionTypes.FETCH_COURSE_DETAIL_REQUESTED
    });
    axios
      .get(`${BASE_URL}/get_course_detail/${courseCode}`)
      .then(response =>
        dispatch({
          type: actionTypes.FETCH_COURSE_DETAIL_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: actionTypes.FETCH_COURSE_DETAIL_FAILURE,
          payload: error
        })
      );
  };
}

export function fetchCourseRating(courseCode) {
  return async function(dispatch) {
    dispatch({
      type: actionTypes.FETCH_COURSE_RATING_REQUESTED
    });
    axios
      .get(`${BASE_URL}/get_course_rating/${courseCode}`)
      .then(response =>
        dispatch({
          type: actionTypes.FETCH_COURSE_RATING_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: actionTypes.FETCH_COURSE_RATING_FAILURE,
          payload: error
        })
      );
  };
}

export function fetchCourseList(input) {
  return async function(dispatch) {
    dispatch({
      type: actionTypes.FETCH_COURSE_LIST_REQUESTED
    });
    axios
      .get(`${BASE_URL}/get_course_list?search=${input}`)
      .then(response =>
        dispatch({
          type: actionTypes.FETCH_COURSE_LIST_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: actionTypes.FETCH_COURSE_LIST_FAILURE,
          payload: error
        })
      );
  };
}

export function fetchCourseComments(courseCode) {
  return async function(dispatch) {
    dispatch({
      type: actionTypes.FETCH_COURSE_COMMENTS_REQUESTED
    });
    axios
      .get(`${BASE_URL}/get_course_comments/${courseCode}`)
      .then(response =>
        dispatch({
          type: actionTypes.FETCH_COURSE_COMMENTS_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: actionTypes.FETCH_COURSE_COMMENTS_FAILURE,
          payload: error
        })
      );
  };
}

export function popupTrigger(popup) {
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
