import React from "react";
import PropTypes from "prop-types";

import CommentCard from "./components/CommentCard";

// import * as styles from "./style.scss";

class CommentList extends React.Component {
  render() {
    const { comments } = this.props;
    const commentsDOM = comments
      .sort((a, b) => b.comment_date > a.comment_date)
      .map((comment, index) => {
        const {
          userid,
          username,
          avatar,
          major,
          easy,
          useful,
          like,
          comment_date,
          comment_content
        } = comment;
        return (
          <CommentCard
            key={index}
            userid={userid}
            username={username}
            major={major}
            easy={easy}
            useful={useful}
            like={like}
            avatar={avatar}
            comment_date={comment_date}
            comment_content={comment_content}
          />
        );
      });

    return commentsDOM;
  }
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired
};

export default CommentList;
