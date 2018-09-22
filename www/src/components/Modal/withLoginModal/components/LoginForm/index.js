// @flow
import React from "react";
import { connect } from "react-redux";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Icon from "antd/lib/icon";
import Form from "antd/lib/form";
import { userLogin, fetchProfile } from "src/redux/actions";

import "./style.scss";

const FormItem = Form.Item;

type FormProps = {
  form: any,
  loginRequest: Object,
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
              this.setState({ succeed: true, requested: false });
              this.props.fetchProfile();
              this.props.hideModal();
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
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Password cannot be empty" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          No account? <a href="">Create one</a>
          {/* <a className="login-form-forgot" href="">
            Forgot password
          </a> */}
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

export default Form.create()(
  connect(
    (state, props) => {
      const { user } = state;
      return {
        hideModal: props.hideModal,
        loginRequest: user && user.loginRequest
      };
    },
    dispatch => ({
      fetchProfile: () => dispatch(fetchProfile()),
      userLogin: authForm => dispatch(userLogin(authForm))
    })
  )(LoginForm)
);
