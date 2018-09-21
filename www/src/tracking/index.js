import ReactGA from "react-ga";

export function logPageview() {
  if (process.env.NODE_ENV === "production") {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
}

export function logCalendarDownload() {
  const env = process.env.NODE_ENV;
  if (env === "production") {
    ReactGA.event({
      category: "User",
      action: "Download a calendar"
    });
  }
}

export function logScheduleGeneration() {
  const env = process.env.NODE_ENV;
  if (env === "production") {
    ReactGA.event({
      category: "User",
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
  }
}
