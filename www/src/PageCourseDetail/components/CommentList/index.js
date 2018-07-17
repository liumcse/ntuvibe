import React from "react";

import * as styles from "./style.scss";

const CommentCard = () => {
  return (
    <div className={styles.card_container}>{"This is a mocked comment."}</div>
  );
};

class CommentList extends React.Component {
  render() {
    const comments = [1, 2].map((value, index) => <CommentCard key={index} />);
    return comments;
  }
}

export default CommentList;
