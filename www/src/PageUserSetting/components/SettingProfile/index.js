// @flow
import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { userUpdateProfile } from "src/redux/actions";

import * as styles from "./style.scss";

type Props = {
  username: string,
  major: string,
  avatar: string,
  userUpdateProfile: Object => void
};

type States = {
  username: string,
  major: string,
  avatar: string,
  selectedAvatar: number
};

class SettingProfile extends React.Component<Props, States> {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      major: props.major,
      avatar: props.avatar,
      selectedAvatar: -1
    };
  }

  componentDidUpdate(prevProps) {
    // receive new props
    if (prevProps !== this.props) {
      const { username, major, avatar } = this.props;
      this.setState({
        username: username,
        major: major,
        avatar: avatar
      });
    }
  }

  handleUsername = event => {
    this.setState({ username: event.target.value });
  };

  handleMajor = event => {
    this.setState({ major: event.target.value });
  };

  handleAvatarSelect = event => {
    const id = event.target.id;
    const src = event.target.src;
    switch (id) {
      case "avatar_1":
        this.setState({ avatar: src, selectedAvatar: 1 });
        return;
      case "avatar_2":
        this.setState({ avatar: src, selectedAvatar: 2 });
        return;
      case "avatar_3":
        this.setState({ avatar: src, selectedAvatar: 3 });
        return;
      case "avatar_4":
        this.setState({ avatar: src, selectedAvatar: 4 });
        return;
      case "avatar_5":
        this.setState({ avatar: src, selectedAvatar: 5 });
        return;
      case "avatar_6":
        this.setState({ avatar: src, selectedAvatar: 6 });
        return;
      default:
        return;
    }
  };

  handleUpdate = () => {
    const form = new FormData();
    const { username, major, avatar } = this.state;
    form.append("username", username);
    form.append("major", major);
    form.append("avatar", avatar);
    this.props.userUpdateProfile(form).then(() => location.reload());
  };

  render() {
    const { username, major, selectedAvatar } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.subHeader}>Display name</div>
        <input
          className={styles.displayNameInput}
          onChange={this.handleUsername}
          defaultValue={username}
        />
        <div className={styles.hint}>Your display name must be unique.</div>
        <div className={styles.subHeader}>Major</div>
        <input
          className={styles.majorInput}
          onChange={this.handleMajor}
          defaultValue={major}
          placeholder="Optional"
        />
        <div className={styles.subHeader}>Profile Picture</div>
        <div className={styles.hint}>
          For now, you can choose from the following pictures.
        </div>
        <div className={styles.profileGrid}>
          <div className={styles.gridContainer}>
            <img
              id="avatar_1"
              className={selectedAvatar === 1 ? styles.selected : undefined}
              onClick={this.handleAvatarSelect}
              src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/6rZOCAVe_400x400.jpg?alt=media&token=7b928473-d476-4075-82bf-0ab6d905bdc1"
              width="96px"
              height="96px"
            />
            <img
              id="avatar_2"
              className={selectedAvatar === 2 ? styles.selected : undefined}
              onClick={this.handleAvatarSelect}
              src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/sarah.jpeg?alt=media&token=45ad4605-f45e-4237-91ed-7f63b24d6d82"
              width="96px"
              height="96px"
            />
            <img
              id="avatar_3"
              className={selectedAvatar === 3 ? styles.selected : undefined}
              onClick={this.handleAvatarSelect}
              src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/bojack.png?alt=media&token=12a8eb3b-b7a7-416f-b7e9-1ae245958526"
              width="96px"
              height="96px"
            />
            <img
              id="avatar_4"
              className={selectedAvatar === 4 ? styles.selected : undefined}
              onClick={this.handleAvatarSelect}
              src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/Cheryl_Tunt.jpg?alt=media&token=29741cd0-d4f2-41e5-ba6e-b97f334b5122"
              width="96px"
              height="96px"
            />
            <img
              id="avatar_5"
              className={selectedAvatar === 5 ? styles.selected : undefined}
              onClick={this.handleAvatarSelect}
              src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/archer.png?alt=media&token=8de16d53-c559-4034-9846-32990ccec04b"
              width="96px"
              height="96px"
            />
            <img
              id="avatar_6"
              className={selectedAvatar === 6 ? styles.selected : undefined}
              onClick={this.handleAvatarSelect}
              src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/lana-kane3.jpg?alt=media&token=9d60b20a-ea22-4423-a6ba-0b064935947d"
              width="96px"
              height="96px"
            />
          </div>
        </div>
        <div className={styles.save}>
          <Button type="primary" onClick={this.handleUpdate}>
            Update
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userUpdateProfile: form => dispatch(userUpdateProfile(form))
});

export default connect(
  null,
  mapDispatchToProps
)(SettingProfile);
