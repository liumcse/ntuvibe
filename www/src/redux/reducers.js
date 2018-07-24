import * as types from "./action_types";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_COURSE_DETAIL_SUCCESS:
      return {
        ...state,
        courseDetail: payload
      };
    case type.FETCH_COURSE_DETAIL_FAILURE:
      return {
        ...state,
        courseDetail: payload
      };
    case type.FETCH_COURSE_RATING_SUCCESS:
      console.log("course rating action is dispatched into reducer", state);
      return {
        ...state,
        courseRating: payload
      };
    case type.FETCH_COURSE_RATING_FAILURE:
      return {
        ...state,
        courseRating: payload
      };
  }
};

export default reducer;
