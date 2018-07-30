// @flow

import React from "react";
import Autosuggest from "react-autosuggest";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { fetchCourseList } from "src/redux/actions";

import * as styles from "./style.scss";
import theme from "./theme.css";

type Props = {
  // from redux
  courseList: any,
  fetchCourseList: () => void,
  // from router
  match: Object,
  location: Object,
  history: Object
};

type States = {
  value: string,
  suggestions: Array<any>
};

class Dropdown extends React.Component<Props, States> {
  constructor() {
    super();
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: "",
      suggestions: []
    };
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => {
    const { history } = this.props;
    suggestion.code.concat(" - ").concat(suggestion.title);
    history.push("/courses/" + suggestion.code.toLowerCase());
  };

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div className={styles.suggestion_title}>
      {suggestion.code.concat(" - ").concat(suggestion.title)}
    </div>
  );

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    console.log("Value", value);
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue === null ? 0 : inputValue.length;
    console.log("inputValue", inputValue);
    console.log("inputValue === null ?", inputValue === null);
    console.log("inputLength", inputValue.length);

    if (inputLength === 0) return [];
    else {
      console.log("Trigger");
      this.props.fetchCourseList(); // does it work?
      console.log("Finished");
      const { courseList } = this.props;
      return courseList || [];
    }
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.courseList !== this.props.courseList) {
      console.log("Did update");
      this.setState({
        suggestions: this.props.courseList
      });
    }
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
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
        "Type the code or title of a course (e.g. CZ3003 | Algorithms)",
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
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
