// @flow
import React from "react";
import NavBar from "src/components/NavBar";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as styles from "./style.scss";
import SideBar from "./components/SideBar";
import SettingProfile from "./components/SettingProfile";

type Props = null;

type States = {
  redirect: boolean,
  tab: 0 | 1 | 2,
  username: string,
  major: string,
  avatar: string
};

class PageUserSetting extends React.Component<Props, States> {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      redirect: false,
      username: "",
      major: "",
      avatar: ""
    };
  }

  componentDidMount() {
    const { profile } = this.props;
    if (profile) {
      const { username, major, avatar } = profile;
      this.setState({
        username: username,
        major: major,
        avatar: avatar
      });
    } else {
      this.setState({
        redirect: true,
        username: "Not logged in",
        major: "How did you even see this page"
      });
    }
  }

  render() {
    const { redirect, username, major, avatar } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className={styles.container}>
        <NavBar />
        <div className={styles.innerContainer}>
          <div className={styles.sidebar}>
            <SideBar avatar={avatar} />
          </div>
          <div className={styles.settingContainer}>
            <div className={styles.header}>Public Profile</div>
            <SettingProfile username={username} major={major} />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => null;

const mapStateToProps = state => {
  const { user } = state;
  return {
    profile: user && user.profile
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageUserSetting);
