// // @flow
// import React from "react";
// import Login from "./Login";
// import RateCourse from "./RateCourse";

// class Modal extends React.Component {
//   static state = {
//     showRateCourse: false,
//     showLogin: false
//   };

//   static hideAll = () => {
//     Modal.state = {
//       showRateCourse: false,
//       showLogin: false
//     };
//     Modal.forceUpdate();
//   };

//   static showLogin = () => {
//     Modal.state = { showLogin: true, showRateCourse: false };
//     Modal.forceUpdate();
//   };

//   static showRateCourse = () => {
//     Modal.state = { showRateCourse: true, showLogin: false };
//   };

//   render() {
//     // return the trigger so nothing changes in appearance
//     return (
//       <React.Fragment>
//         <Login visible={Modal.state.showLogin} hideModal={Modal.hideAll} />
//         <RateCourse
//           visible={Modal.state.showRateCourse}
//           hideModal={Modal.hideAll}
//         />
//       </React.Fragment>
//     );
//   }
// }

// export default Modal;
