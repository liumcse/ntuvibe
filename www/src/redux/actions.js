// export const fetchCourseList = () => async dispatch => {

// }
import axios from "axios";
import * as types from "./action_types";

const BASE_URL = "http://localhost:3000";

export function fetchCourseDetail(courseCode) {
  return async function(dispatch) {
    dispatch({
      type: types.FETCH_COURSE_DETAIL_REQUESTED
    });
    axios
      .get(`${BASE_URL}/get_course_detail/${courseCode}`)
      .then(response =>
        dispatch({
          type: types.FETCH_COURSE_DETAIL_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: types.FETCH_COURSE_DETAIL_FAILURE,
          payload: error
        })
      );
  };
}

export function fetchCourseRating(courseCode) {
  return async function(dispatch) {
    dispatch({
      type: types.FETCH_COURSE_RATING_REQUESTED
    });
    axios
      .get(`${BASE_URL}/get_course_rating/${courseCode}`)
      .then(response =>
        dispatch({
          type: types.FETCH_COURSE_RATING_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: types.FETCH_COURSE_RATING_FAILURE,
          payload: error
        })
      );
  };
}
