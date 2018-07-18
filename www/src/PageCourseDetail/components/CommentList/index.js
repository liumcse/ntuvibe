import React from "react";
import CommentCard from "./components/CommentCard";

// import * as styles from "./style.scss";

class CommentList extends React.Component {
  render() {
    const comments = [1, 2].map((value, index) => <CommentCard key={index} />);
    return comments;
  }
}

export default CommentList;
