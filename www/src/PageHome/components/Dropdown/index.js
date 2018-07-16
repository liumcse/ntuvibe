import React from "react";
import Autosuggest from "react-autosuggest";

import theme from "./theme.css";

// Imagine you have a list of languages that you'd like to autosuggest.
const courses = [
  {
    code: "CZ2001",
    title: "Algorithms"
  },
  {
    code: "CZ2002",
    title: "Object Oriented Design & Programming"
  },
  {
    code: "CZ2003",
    title: "Computer Graphics"
  },
  {
    code: "CZ2004",
    title: "Human Computer Interactions"
  },
  {
    code: "CZ2005",
    title: "Operating Systems"
  },
  {
    code: "CZ2006",
    title: "Software Engineering"
  },
  {
    code: "CZ2007",
    title: "Introduction to Database Systems"
  },
  {
    code: "CZ3001",
    title: "Advanced Computer Architecture"
  },
  {
    code: "CZ3002",
    title: "Advanced Software Engineering"
  },
  {
    code: "CZ3003",
    title: "System Design & Engineering"
  },
  {
    code: "CZ3004",
    title: "Multidisciplinary Project"
  },
  {
    code: "CZ3005",
    title: "Artificial Intelligence"
  },
  {
    code: "CZ3006",
    title: "Net-centric Computing"
  },
  {
    code: "CZ3007",
    title: "Compiler Techniques"
  }
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : courses.filter(lang =>
    lang.code.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => {suggestion.code.concat(" - ").concat(suggestion.title); window.location.assign("/courses/" + suggestion.code.toLowerCase());};

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.code.concat(" - ").concat(suggestion.title)}
  </div>
);

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

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
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
      placeholder: "Type the code or title of a course (e.g. CZ3003 | Algorithms)",
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
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default Dropdown;