// @flow
import React from "react";
import "./style.scss";

type Props = {
  trigger: any
};

class Modal extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.trigger = props.trigger.getBoundingClientRect();
  }

  addClickEvent = () => {

  };

  componentDidMount() {
    console.log(this.trigger);
    this.addClickEvent();
  }

  render() {
    // return the trigger so nothing changes in appearance
    return this.trigger;
  }
}

export default Modal;
