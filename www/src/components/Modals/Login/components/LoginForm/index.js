// @flow
import React from "react";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Icon from "antd/lib/icon";
import Form from "antd/lib/form";

import "./style.scss";

const FormItem = Form.Item;

type FormProps = {
  form: any,
  loginRequest: Object,
  showSignUpModal: () => void,
  showPasswordResetModal: () => void,
  hideModal: () => void,
  fetchProfile: () => void,
  userLogin: () => void
};

class LoginForm extends React.Component<FormProps> {
  state = {
    visible: false,
    requested: false,
    succeed: false
  };

  switchToSignUp = () => {
    this.props.showSignUpModal();
    // this.props.hideModal();
  };

  switchToPasswordReset = () => {
    this.props.showPasswordResetModal();
    // this.props.hideModal();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ requested: true });
        // construct FormData object
        const { email, password } = values;
        const authForm = new FormData();
        authForm.append("email", email);
        authForm.append("password", password);

        // send request
        this.props.userLogin(authForm).then(() => {
          const { loginRequest } = this.props;
          if (!loginRequest) {
            alert("Something went wrong... Please try again later");
            this.setState({ requested: false });
          } else {
            const { success, error_message } = loginRequest;
            if (!success) {
              alert(error_message);
              this.setState({ requested: false });
            } else {
              this.setState({ succeed: true, requested: true });
              this.props.fetchProfile();
              location.reload(); // refresh immediately
            }
          }
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
                message: "Enter your NTU Email address"
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
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Password cannot be empty" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password for NTUVibe"
            />
          )}
        </FormItem>
        <FormItem>
          No account?{" "}
          <a onClick={this.switchToSignUp} href="#">
            Create one
          </a>
          <a
            className="login-form-forgot"
            onClick={this.switchToPasswordReset}
            href="#"
          >
            Forgot password
          </a>
          <Button
            disabled={this.state.requested}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);
