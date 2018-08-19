import * as ReactGA from "react-ga";

// function logPageview() {
//   if (process.env.NODE_ENV === "production") {
//     ReactGA.pageview(window.location.pathname);
//   }
// }

// ReactGA.initialize("UA-113348736-2");

export function initializeGA() {
  ReactGA.initialize("UA-113348736-2");
}

export function logPageview() {
  if (process.env.NODE_ENV === "production") {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
}

export function logScheduleGeneration() {
  const env = process.env.NODE_ENV;
  if (env === "production") {
    ReactGA.event({
      category: "User",
      action: "Generate a schedule"
    });
  } else {
    ReactGA.event({
      category: "Development",
      action: "Generate a schedule"
    });
  }
}

export function logCourseVisit(code) {
  const env = process.env.NODE_ENV;
  if (env === "production") {
    ReactGA.event({
      category: "Course",
      action: "View a course",
      label: code
    });
  } else {
    ReactGA.event({
      category: "Development",
      action: "View a course",
      label: code
    });
  }
}
