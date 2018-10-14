// @flow
import * as api from "src/api";
import * as actionTypes from "./actionTypes";
import { resolve } from "url";

export function fetchCourseDetail(courseCode: string) {
  return async function(dispatch: any) {
    dispatch({
      type: actionTypes.FETCH_COURSE_DETAIL_REQUESTED
    });
    api
      .fetchCourseDetail(courseCode)
      .then(response =>
        dispatch({
          type: actionTypes.FETCH_COURSE_DETAIL_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: actionTypes.FETCH_COURSE_DETAIL_FAILURE,
          payload: {}
        })
      );
  };
}

export function fetchCourseRating(courseCode: string) {
  return async function(dispatch: any) {
    dispatch({
      type: actionTypes.FETCH_COURSE_RATING_REQUESTED
    });
    api
      .fetchCourseRating(courseCode)
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
    api
      .fetchCourseList()
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

export function fetchCourseSchedule(courseCode: string) {
  return async function(dispatch: any) {
    dispatch({
      type: actionTypes.FETCH_COURSE_SCHEDULE_REQUESTED
    });
    api
      .fetchCourseSchedule(courseCode)
      .then(response =>
        dispatch({
          type: actionTypes.FETCH_COURSE_SCHEDULE_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: actionTypes.FETCH_COURSE_SCHEDULE_FAILURE,
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
    api
      .fetchExamSchedule(courseCode)
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
    api
      .fetchCourseComments(courseCode)
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

export function submitCourseRating(courseRatingForm: FormData) {
  return async function(dispatch: any) {
    dispatch({
      type: actionTypes.SUBMIT_COURSE_RATING_REQUESTED
    });
    await api
      .submitCourseRating(courseRatingForm)
      .then(response => {
        return dispatch({
          type: actionTypes.SUBMIT_COURSE_RATING_SUCCESS,
          payload: response
        });
      })
      .catch(error => {
        return dispatch({
          type: actionTypes.SUBMIT_COURSE_RATING_FAILURE,
          payload: error.response
        });
      });
  };
}

export function validateActivation(token: string, email: string) {
  return async function(dispatch: any) {
    dispatch({
      type: actionTypes.VALIDATE_ACTIVATION_REQUESTED
    });
    await api
      .validateActivation(token, email)
      .then(response =>
        dispatch({
          type: actionTypes.VALIDATE_ACTIVATION_SUCCESS,
          payload: response.data
        })
      )
      .catch(error =>
        dispatch({
          type: actionTypes.VALIDATE_ACTIVATION_FAILURE,
          payload: error.response
        })
      );
  };
}

export function userActivate(form: FormData) {
  return async function(dispatch: any) {
    dispatch({
      type: actionTypes.USER_ACTIVATE_REQUESTED
    });
    await api
      .userActivate(form)
      .then(response => {
        return dispatch({
          type: actionTypes.USER_ACTIVATE_SUCCESS,
          payload: response
        });
      })
      .catch(error =>
        dispatch({
          type: actionTypes.USER_ACTIVATE_FAILURE,
          payload: error.response
        })
      );
  };
}

export function userLogin(authForm: FormData) {
  return async function(dispatch: any) {
    dispatch({
      type: actionTypes.USER_LOGIN_REQUESTED
    });
    await api
      .userLogin(authForm)
      .then(response => {
        return dispatch({
          type: actionTypes.USER_LOGIN_SUCCESS,
          payload: response
        });
      })
      .catch(error =>
        dispatch({
          type: actionTypes.USER_LOGIN_FAILURE,
          payload: error.response
        })
      );
  };
}

export function userLogout() {
  return async function(dispatch: any) {
    api
      .userLogout()
      .then(response => {
        return dispatch({ type: actionTypes.USER_LOGOUT });
      })
      .catch(() => console.log("Logout error..."));
  };
}

export function userSignUp(authForm: FormData) {
  return async function(dispatch: any) {
    dispatch({
      type: actionTypes.USER_SIGNUP_REQUESTED
    });
    await api
      .userSignUp(authForm)
      .then(response => {
        return dispatch({
          type: actionTypes.USER_SIGNUP_SUCCESS,
          payload: response
        });
      })
      .catch(error =>
        dispatch({
          type: actionTypes.USER_SIGNUP_FAILURE,
          payload: error.response
        })
      );
  };
}

export function userUpdateProfile(form: FormData) {
  return async function(dispatch: any) {
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_REQUESTED
    });
    await api
      .userUpdateProfile(form)
      .then(response => {
        return dispatch({
          type: actionTypes.USER_UPDATE_PROFILE_REQUESTED,
          payload: response
        });
      })
      .catch(error =>
        dispatch({
          type: actionTypes.USER_UPDATE_PROFILE_REQUESTED,
          payload: error.response
        })
      );
  };
}

export function fetchProfile() {
  return async function(dispatch: any) {
    dispatch({
      type: actionTypes.FETCH_PROFILE_REQUESTED
    });
    api
      .fetchProfile()
      .then(response => {
        return dispatch({
          type: actionTypes.FETCH_PROFILE_SUCCESS,
          payload: response.data
        });
      })
      .catch(error =>
        dispatch({
          type: actionTypes.FETCH_PROFILE_FAILURE,
          payload: {}
        })
      );
  };
}

export function fetchUserCourseComment(courseCode: string) {
  return async function(dispatch: any) {
    dispatch({
      type: actionTypes.FETCH_USER_COURSE_COMMENT_REQUESTED
    });
    await api
      .fetchUserCourseComment(courseCode)
      .then(response => {
        return dispatch({
          type: actionTypes.FETCH_USER_COURSE_COMMENT_SUCCESS,
          payload: response.data
        });
      })
      .catch(error =>
        dispatch({
          type: actionTypes.FETCH_USER_COURSE_COMMENT_FAILURE,
          payload: {}
        })
      );
  };
}

export function fetchUserSchedule() {
  return async function(dispatch: any) {
    dispatch({
      type: actionTypes.FETCH_USER_SCHEDULE_REQUESTED
    });
    await api
      .fetchUserSchedule()
      .then(response => {
        return dispatch({
          type: actionTypes.FETCH_USER_SCHEDULE_SUCCESS,
          payload: response.data
        });
      })
      .catch(error =>
        dispatch({
          type: actionTypes.FETCH_USER_SCHEDULE_FAILURE,
          payload: {}
        })
      );
  };
}

export function updateSchedule(form: FormData) {
  return async function(dispatch: any) {
    dispatch({
      type: actionTypes.UPDATE_SCHEDULE_REQUESTED
    });
    await api
      .updateSchedule(form)
      .then(response => {
        return dispatch({
          type: actionTypes.UPDATE_SCHEDULE_SUCCESS,
          payload: response
        });
      })
      .catch(error =>
        dispatch({
          type: actionTypes.UPDATE_SCHEDULE_FAILURE,
          payload: error.response
        })
      );
  };
}

export function saveSchedule(schedule: Object) {
  return {
    type: actionTypes.SAVE_SCHEDULE,
    payload: schedule
  };
}

export function clearCourseInformation() {
  return {
    type: actionTypes.CLEAR_COURSE_INFORMATION
  };
}

export function showModal(modalType: string, modalProps: Object) {
  return {
    type: actionTypes.MODAL_SHOW,
    payload: {
      modalType,
      modalProps
    }
  };
}

export function hideModal() {
  return {
    type: actionTypes.MODAL_HIDE
  };
}
