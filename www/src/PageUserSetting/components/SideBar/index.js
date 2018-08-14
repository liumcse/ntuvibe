// @flow
import React from "react";
import * as styles from "./style.scss";

type AvatarProps = {
  avatar: string
};

type Props = {
  avatar: string
};

const Avatar = (props: AvatarProps) => (
  <img
    className={styles.avatarImg}
    src={
      props.avatar ||
      "https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/6rZOCAVe_400x400.jpg?alt=media&token=7b928473-d476-4075-82bf-0ab6d905bdc1"
    }
  />
);

class SideBar extends React.PureComponent<Props> {
  render() {
    return (
      <div className={styles.container}>
        <div>
          <Avatar avatar={this.props.avatar} />
        </div>
        <div className={styles.item}>Profile</div>
        <div className={styles.item}>Account</div>
      </div>
    );
  }
}

export default SideBar;
