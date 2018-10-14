import axios from "axios";

const BASE_URL = "https://api.ntuvibe.com";
axios.defaults.timeout = 20000;

export function fetchCourseDetail(courseCode) {
  return axios.get(`${BASE_URL}/courses/get_course_detail?code=${courseCode}`);
}

export function fetchCourseRating(courseCode) {
  return axios.get(`${BASE_URL}/courses/get_course_rating?code=${courseCode}`);
}

export function fetchCourseList() {
  return axios.get(`${BASE_URL}/courses/get_course_list`);
}

export function fetchCourseSchedule(courseCode) {
  return axios.get(`${BASE_URL}/courses/get_class_schedule?code=${courseCode}`);
}

export function fetchExamSchedule(courseCode) {
  return axios.get(`${BASE_URL}/courses/get_exam_schedule?code=${courseCode}`);
}

export function fetchCourseComments(courseCode) {
  return axios.get(
    `${BASE_URL}/courses/get_course_comments?code=${courseCode}`
  );
}

export function submitCourseRating(courseRatingForm) {
  return axios.post(
    `${BASE_URL}/courses/submit_course_rating`,
    courseRatingForm,
    {
      withCredentials: true
    }
  );
}

export function validateActivation(token, email) {
  return axios.get(
    `${BASE_URL}/users/check_activation_link?token=${token}&email=${email}`
  );
}

export function userActivate(form) {
  return axios.post(`${BASE_URL}/users/activate`, form);
}

export function userLogin(authForm) {
  return axios.post(`${BASE_URL}/users/login`, authForm, {
    withCredentials: true
  });
}

export function userLogout() {
  return axios.post(`${BASE_URL}/users/logout`, null, {
    withCredentials: true
  });
}

export function userSignUp(authForm) {
  return axios.post(`${BASE_URL}/users/signup`, authForm);
}

export function userUpdateProfile(form) {
  return axios.post(`${BASE_URL}/users/update_user_profile`, form, {
    withCredentials: true
  });
}

export function fetchProfile() {
  return axios.get(`${BASE_URL}/users/get_user_profile`, {
    withCredentials: true
  });
}

export function fetchUserCourseComment(courseCode) {
  return axios.get(
    `${BASE_URL}/courses/get_user_course_comment?code=${courseCode}`,
    {
      withCredentials: true
    }
  );
}

export function fetchUserSchedule() {
  return axios.get(`${BASE_URL}/users/get_user_schedule`, {
    withCredentials: true
  });
}

export function updateSchedule(form) {
  return axios.post(`${BASE_URL}/users/update_user_schedule`, form, {
    withCredentials: true
  });
}
