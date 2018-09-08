// @flow

import React from "react";
import Autosuggest from "react-autosuggest";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { fetchCourseList } from "src/redux/actions";
import {
  search_course_by_code_or_title,
  course_code_is_valid
} from "src/utils";

import type { CourseList, CourseListSnippet } from "src/FlowType/courses";

import * as styles from "./style.scss";
// import * as theme from "./theme.scss";

type Props = {
  // style
  theme: Object,
  // from redux
  courseList: CourseList,
  fetchCourseList: () => void,
  // from router
  match: Object,
  location: Object,
  history: Object
};

type States = {
  value: string,
  suggestions: Array<CourseListSnippet>,
  isLoading: boolean
};

class Search extends React.Component<Props, States> {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
      isLoading: false
    };
    this.lastRequestId = null;
    window.addEventListener("keydown", this.keydownEvent);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.keydownEvent);
  }

  keydownEvent = event => {
    if (event.key === "Enter") {
      const { courseList } = this.props;
      const { value } = this.state;
      if (!value || value === "") return;
      const code = value.split(" - ")[0].toLowerCase();
      if (course_code_is_valid(courseList, code)) {
        this.redirect(code);
      }
    }
  };

  loadSuggestions = (value: string) => {
    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }

    this.setState({
      isLoading: true
    });

    this.lastRequestId = setTimeout(() => {
      this.setState({
        isLoading: false,
        suggestions: this.getSuggestions(value)
      });
    }, 200);
  };

  redirect = code => {
    const { history } = this.props;
    history.push("/courses/" + code.toLowerCase());
  };

  getSuggestionValue = suggestion => {
    // const { history } = this.props;
    // history.push("/courses/" + suggestion.code.toLowerCase());
    return suggestion.code.concat(" - ").concat(suggestion.title);
  };

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div
      onClick={() => this.redirect(suggestion.code)}
      className={styles.suggestion_title}
    >
      {suggestion.code.concat(" - ").concat(suggestion.title)}
    </div>
  );

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    if (!value || value === undefined) return [];
    const { courseList } = this.props;
    const inputValue = value
      .replace("-", "")
      .trim()
      .toLowerCase();
    const inputLength = inputValue === null ? 0 : inputValue.length;
    if (inputLength === 0) return [];
    else {
      const suggestions = search_course_by_code_or_title(
        courseList,
        inputValue
      );
      return suggestions;
    }
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  componentDidMount() {
    this.props.fetchCourseList();
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    // this.setState({
    //   suggestions: this.getSuggestions(value)
    // });
    this.loadSuggestions(value);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder:
        "Type the code or title of a course (e.g. CZ3003 or Algorithms)",
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        theme={this.props.theme}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

const mapStateToProps = state => {
  const { course } = state;
  return {
    courseList: course && course.courseList
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCourseList: () => dispatch(fetchCourseList())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);
