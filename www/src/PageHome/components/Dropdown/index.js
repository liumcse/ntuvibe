import React from "react";
import Autosuggest from "react-autosuggest";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import { fetchCourseList } from "src/redux/actions";

import theme from "./theme.css";

class Dropdown extends React.Component {
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
    <div>{suggestion.code.concat(" - ").concat(suggestion.title)}</div>
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
      (async () => await this.props.fetchCourseList(inputValue))(); // does it work?
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

Dropdown.propTypes = {
  // from redux
  courseList: PropTypes.array,
  fetchCourseList: PropTypes.func.isRequired,
  // from router
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { course } = state;
  return {
    courseList: course && course.courseList
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCourseList: input => dispatch(fetchCourseList(input))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dropdown)
);
