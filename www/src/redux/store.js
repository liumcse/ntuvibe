import { createStore } from "redux";
import rootReducer from "./reducers";

const initialState = {
  courseList: null,
  course_detail: null,
  course_rating: null,
  course_schedule: null,
  course_comment: null
};

const store = createStore(rootReducers, initialState);

export default store;