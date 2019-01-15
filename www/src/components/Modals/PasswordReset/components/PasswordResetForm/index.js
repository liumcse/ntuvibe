// @flow
import React from "react";
import { connect } from "react-redux";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Icon from "antd/lib/icon";
import Form from "antd/lib/form";
import { userRequestPasswordReset } from "src/redux/actions";

import "./style.scss";

const FormItem = Form.Item;

type FormProps = {
  form: any,
  hideModal: () => void,
  userRequestPasswordReset: () => void
};

class PasswordResetForm extends React.Component<FormProps> {
  state = {
    visible: false,
    requested: false,
    succeed: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ requested: true });
        // construct FormData object
        const { email } = values;
        const form = new FormData();
        form.append("email", email);

        // send request
        this.props.userRequestPasswordReset(form).then(() => {
          this.setState({ requested: false, succeed: true });
          alert("A password reset Email has been sent to your inbox!");
          // TODO: handle exception
          this.props.hideModal();
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "Enter a valid NTU Email address",
                pattern: /^.\w*@(e.)?(ntu.edu.sg)/
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="your-ntu-email@e.ntu.edu.sg"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            disabled={this.state.requested}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {this.state.requested ? "Sending" : "Send"}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(
  connect(
    (state, props) => {
      return {
        hideModal: props.hideModal
      };
    },
    dispatch => ({
      userRequestPasswordReset: form => dispatch(userRequestPasswordReset(form))
    })
  )(PasswordResetForm)
);
