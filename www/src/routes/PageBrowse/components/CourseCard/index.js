import React from "react";
import { Tag, Skeleton } from "antd";
import { remove_trailing_newline, cap_first_letter } from "src/utils";
import * as styles from "./styles.scss";

const CourseCard = props => {
  if (props.skeleton) {
    return (
      <a className={styles.hyper} style={{ cursor: "default" }} href="#">
        <div className={styles.container}>
          <Skeleton active />
        </div>
      </a>
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
    <a
      className={styles.hyper}
      href={`/courses/${code}`}
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
    </a>
  );
};

export default CourseCard;
