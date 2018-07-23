// export const fetchCourseList = () => async dispatch => {

// }
import axios from "axios";
import * as types from "./action_types";

export function fetchCourseList() {
  console.log("Dispatched!");
  return async function(dispatch) {
    dispatch({
      type: types.FETCH_POST_REQUESTED
    });
    axios
      .get("https://jsonplaceholder.typicode.com/posts/1")
      .then(response =>
        dispatch({
          type: types.FETCH_POST_SUCCESS,
          payload: response
        })
      )
      .catch(error =>
        dispatch({
          type: types.FETCH_POST_FAILURE,
          payload: error
        })
      );
  };
}
