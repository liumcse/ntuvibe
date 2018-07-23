import * as types from "./action_types";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.FETCH_POST_SUCCESS:
      return {
        ...state,
        content: payload
      };
    case type.FETCH_POST_FAILURE:
      return {
        ...state,
        content: payload
      };
  }
};

export default reducer;
