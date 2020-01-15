import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Icon } from 'antd';
import '../../styles/admin/Signup.css';

class Signup extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const AntWrappedSignupForm = Form.create()(SignupForm)
    return (
      <div>
        <AntWrappedSignupForm />
      </div>
    );
  }
}

class SignupForm extends Component {
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div className="signup-container">
            <h1>ĐĂNG KÝ TÀI KHOẢN</h1>
            <div className="signup-form">
              <Form>
                <Form.Item>
                  {getFieldDecorator('fullname', {
                    rules: [{ required: true, message: 'Please input your full name!' }]
                  })(
                    <Input
                        size="large"
                        prefix={<Icon type="edit" />}
                        placeholder="Họ tên đầy đủ"/>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your full name!' }]
                  })(<Input
                        size="large"
                        prefix={<Icon type="user" />}
                        placeholder="Tên đăng nhập"/>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid Email!',
                      },
                      {
                        required: true,
                        message: 'Please input your Email!',
                      },
                    ],
                  })(<Input
                      size="large"
                      prefix={<Icon type="mail" />}
                      placeholder="Email"/>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your password!' }]
                  })(<Input.Password
                        size="large"
                        prefix={<Icon type="lock" />}
                        placeholder="Mật khẩu"/>
                  )}
                </Form.Item>
                <Form.Item hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input.Password
                      size="large"
                      prefix={<Icon type="lock" />}
                      placeholder="Xác nhận mật khẩu"/>
                  )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" className="signup-form-button">Đăng Ký</Button>
                </Form.Item>
              </Form>
              Đã có tài khoản? <Link to="/login">Đăng Nhập ngay!</Link>
            </div>
        </div>
    );
  }
}

export default Signup;
