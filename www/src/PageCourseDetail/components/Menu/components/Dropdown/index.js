// @flow

import React from "react";
import Autosuggest from "react-autosuggest";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { fetchCourseList } from "src/redux/actions";
import { search_course_by_code_or_title, cap_first_letter } from "src/utils";

import type { CourseList, CourseListSnippet } from "src/FlowType/courses";

import * as styles from "./style.scss";
import theme from "./theme.css";

type Props = {
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

class Dropdown extends React.Component<Props, States> {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
      isLoading: false
    };
    this.lastRequestId = null;
  }

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
    }, 500);
  };

  getSuggestionValue = suggestion => {
    const { history } = this.props;
    history.push("/courses/" + suggestion.code.toLowerCase());
    return suggestion.code.toUpperCase(); // necessary to prevent error
  };

  renderSuggestion = suggestion => (
    <div className={styles.suggestion_title}>
      {suggestion.code.concat(" - ").concat(cap_first_letter(suggestion.title))}
    </div>
  );

  getSuggestions = value => {
    if (!value || value === undefined) return [];
    const { courseList } = this.props;
    const inputValue = value.trim().toLowerCase();
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

  onSuggestionsFetchRequested = ({ value }) => {
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

    const inputProps = {
      placeholder:
        "Type the code or title of a course (e.g. CZ3003 | Algorithms)",
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        id={"pageHome"}
        theme={theme}
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
  )(Dropdown)
);
