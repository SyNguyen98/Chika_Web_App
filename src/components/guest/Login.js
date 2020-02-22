import React, { Component } from 'react';
import { Form, Input, Button, Icon, notification } from 'antd';

import '../../styles/guest/Login.css';
import { ACCESS_TOKEN } from '../../constant';
import { login } from '../../api';

class Login extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const AntWrappedLoginForm = Form.create()(LoginForm)
    return (
      <div>
        <AntWrappedLoginForm onLogin={this.props.onLogin} />
      </div>
    );
  }
}

class LoginForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginRequest = Object.assign({}, values);
        login(loginRequest)
        .then(response => {
          localStorage.setItem(ACCESS_TOKEN, response.accessToken);
          this.props.onLogin();
        }).catch(error => {
          if(error.status === 401) {
            notification.error({
              message: 'Chika Smarthome',
              description: 'Tên đăng nhập hoặc Mật khẩu không đúng. Xin vui lòng thử lại!'
            });
          } else {
            notification.error({
              message: 'Chika Smarthome',
              description: error.message || 'Đã có lỗi xảy ra. Xin vui lòng thử lại!'
            });
          }
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page">
        <div className="login-container">
          <h1>ĐĂNG NHẬP</h1>
          <p>Dành cho người dùng có sản phẩm của Chika</p>
          <div className="login-form">
            <Form onSubmit={this.handleSubmit} autocomplete="off">
              <Form.Item className="item">
                {getFieldDecorator('usernameOrEmail', {
                  rules: [{ required: true, message: 'Vui lòng nhập tên đăng nhập hoặc email!' }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" />}
                    name="usernameOrEmail"
                    placeholder="Tên đăng nhập hoặc Email"/>
                )}
              </Form.Item>
              <Form.Item className="item">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }]
                })(
                  <Input.Password
                    size="large"
                    prefix={<Icon type="lock" />}
                    name="password"
                    placeholder="Mật khẩu"/>
                )}
              </Form.Item>
              <Button type="primary" htmlType="submit" size="large" className="login-button">Đăng Nhập</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
