import React from "react";
import { Link } from "react-router-dom";
import { Tag, Skeleton } from "antd";
import { remove_trailing_newline, cap_first_letter } from "src/utils";
import * as styles from "./styles.scss";

const CourseCard = props => {
  if (props.skeleton) {
    return (
      <Link className={styles.hyper} style={{ cursor: "default" }} to="#">
        <div className={styles.container}>
          <Skeleton active />
        </div>
      </Link>
    );
  }

  const code = props.code;
  const title = cap_first_letter(props.title);
  const description = remove_trailing_newline(props.description)
    .split(" ")
    .slice(0, 150)
    .join(" ")
    .concat("...");
  const { as_ue, as_pe, grade_type } = props;

  return (
    <Link
      className={styles.hyper}
      to={`/courses/${code}`}
      /* eslint-disable-next-line react/jsx-no-target-blank */
      target="_blank"
    >
      <div className={styles.container}>
        <h2>{title}</h2>
        <div className={styles.tagContainer}>
          <Tag>{grade_type ? "Pass / Fail" : "Letter Graded"}</Tag>
          {as_ue && <Tag>Available as UE</Tag>}
          {as_pe && <Tag>Available as PE</Tag>}
        </div>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default CourseCard;
