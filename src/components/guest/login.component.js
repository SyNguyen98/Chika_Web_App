import React, { Component } from 'react';
import { Form, Input, Button, Icon, notification } from 'antd';

import '../../styles/guest/login.component.css';
import { ACCESS_TOKEN } from '../../constant';
import { login } from '../../service/auth.service';

class LoginComponent extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const AntLoginForm = Form.create()(LoginForm)
    return (
      <div>
        <AntLoginForm onLogin={this.props.onLogin} loading={this.props.loading}/>
      </div>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ isLoading: true })
        const loginRequest = Object.assign({}, values);
        login(loginRequest).then(response => {
          localStorage.setItem(ACCESS_TOKEN, response.accessToken);
          this.props.onLogin();
        }).catch(error => {
          this.setState({ isLoading: false })
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
            <Form onSubmit={this.handleSubmit} autoComplete="off">
              <Form.Item className="item">
                {getFieldDecorator('phoneOrEmail', {
                  rules: [{ required: true, message: 'Vui lòng nhập số điện thoại hoặc email!' }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" />}
                    name="phoneOrEmail"
                    placeholder="Số điện thoại hoặc Email"/>
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
              <Button className="login-button" type="primary" htmlType="submit" size="large" loading={this.state.isLoading}>Đăng Nhập</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
