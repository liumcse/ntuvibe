import * as actionTypes from "./action_types";

const reducer = (state, action) => {
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
    default:
      // likely to be an error
      return { ...state };
  }
};

export default reducer;
