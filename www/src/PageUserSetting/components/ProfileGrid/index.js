import React from "react";
import * as styles from "./style.scss";

class ProfileGrid extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <img
          className={styles.selected}
          src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/6rZOCAVe_400x400.jpg?alt=media&token=7b928473-d476-4075-82bf-0ab6d905bdc1"
          width="96px"
          height="96px"
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/sarah.jpeg?alt=media&token=45ad4605-f45e-4237-91ed-7f63b24d6d82"
          width="96px"
          height="96px"
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/crimson-56c72.appspot.com/o/bojack.png?alt=media&token=12a8eb3b-b7a7-416f-b7e9-1ae245958526"
          width="96px"
          height="96px"
        />
      </div>
    );
  }
}

export default ProfileGrid;
