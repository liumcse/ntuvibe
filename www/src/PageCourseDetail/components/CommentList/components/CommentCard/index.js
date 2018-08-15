import React from "react";
import PropTypes from "prop-types";
import { timestampToDate } from "src/utils";

import * as styles from "./style.scss";

const Badge = props => {
  const value = props.value;
  const label = props.label;
  switch (value) {
    case 0:
      return (
        <div className={styles.badge + " " + styles.badge_bad}>{label}</div>
      );
    case 50:
      return (
        <div className={styles.badge + " " + styles.badge_moderate}>
          {label}
        </div>
      );
    default:
      return (
        <div className={styles.badge + " " + styles.badge_good}>{label}</div>
      );
  }
};

class CommentCard extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.profile}>
          <div
            className={styles.profile_avatar}
            style={{
              background: `url(${this.props.avatar ||
                "https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/6rZOCAVe_400x400.jpg?alt=media&token=7b928473-d476-4075-82bf-0ab6d905bdc1"})`,
              backgroundSize: "cover"
            }}
          />
        </div>
        <div className={styles.box}>
          <div className={styles.box_left}>
            <div className={styles.username}>{this.props.username}</div>
            <div className={styles.glance}>
              A {this.props.major} student on{" "}
              {timestampToDate(this.props.comment_date)}
            </div>
            <div className={styles.content}>
              {this.props.comment_content && (
                <p>{this.props.comment_content}</p>
              )}
            </div>
          </div>
          <div className={styles.box_right}>
            <Badge value={this.props.easy} label={"Easy"} />
            <Badge value={this.props.useful} label={"Useful"} />
            <Badge value={this.props.like} label={"Like"} />
          </div>
        </div>
      </div>
    );
  }
}

CommentCard.propTypes = {
  userid: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  major: PropTypes.string.isRequired,
  easy: PropTypes.number.isRequired,
  useful: PropTypes.number.isRequired,
  like: PropTypes.number.isRequired,
  comment_date: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  comment_content: PropTypes.string
};

export default CommentCard;
