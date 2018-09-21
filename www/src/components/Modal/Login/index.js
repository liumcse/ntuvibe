// @flow
import React from "react";
import { connect } from "react-redux";

import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Input from "antd/lib/input";
import Icon from "antd/lib/icon";
import Form from "antd/lib/form";

import { userLogin, fetchProfile } from "src/redux/actions";

import * as styles from "./style.scss";

const FormItem = Form.Item;

type FormProps = {
  form: any,
  loginRequest: Object,
  hideModal: () => void,
  fetchProfile: () => void,
  userLogin: () => void
};

type Props = {
  visible: boolean,
  hideModal: () => void
};

class LoginForm extends React.Component<FormProps> {
  state = {
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

// const mapStateToProps = state => {
//   const { user } = state;
//   return {
//     loginRequest: user && user.loginRequest
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   fetchProfile: () => dispatch(fetchProfile()),
//   userLogin: authForm => dispatch(userLogin(authForm))
// });

// const WrappedLoginForm = Form.create()(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(LoginForm)
// );

class Login extends React.PureComponent<Props> {
  WrappedLoginForm = Form.create()(
    connect(
      state => {
        const { user } = state;
        return {
          loginRequest: user && user.loginRequest
        };
      },
      dispatch => ({
        hideModal: this.props.hideModal,
        fetchProfile: () => dispatch(fetchProfile()),
        userLogin: authForm => dispatch(userLogin(authForm))
      })
    )(LoginForm)
  );

  render() {
    return (
      <Modal
        title="LOGIN"
        visible={this.props.visible}
        onCancel={this.props.hideModal}
        footer={null}
      >
        <div style={{ margin: "auto" }}>
          <this.WrappedLoginForm />
        </div>
      </Modal>
    );
  }
}

export default Login;
