import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';

import '../../../styles/admin/user/AddUser.css';

export default class AddUser extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const AntWrappedLoginForm = Form.create()(SignUp)
    return (
      <div className="admin-user_add">
        <h1>THÊM TÀI KHOẢN NGƯỜI DÙNG</h1>
        <AntWrappedLoginForm />
      </div>
    )
  }
}

class SignUp extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="admin-user_add_form" onSubmit={this.handleSubmit} autocomplete="off">
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Vui lòng nhập họ tên!' }]
          })(
            <Input
              size="large"
              prefix={<Icon type="user" />}
              name="name"
              placeholder="Họ và Tên"/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }]
          })(
            <NumericInput
              size="large"
              prefix={<Icon type="phone" />}
              name="phone"
              placeholder="Số điện thoại"
              maxLength={10}/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              { type: 'email', message: 'Email không hợp lệ!', },
              { required: true, message: 'Vui lòng nhập Email!', },
            ],
          })(<Input
              size="large"
              prefix={<Icon type="mail" />}
              placeholder="Email"/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }]
          })(
            <Input
              size="large"
              prefix={<Icon type="lock" />}
              name="password"
              placeholder="Mật khẩu"/>
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit" size="large" className="login-button">Đăng Nhập</Button>
      </Form>
    );
  }
}

class NumericInput extends Component {
  onChange = e => {
    const { value } = e.target;
    const reg = /^-?[0-9]*(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  };

  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    return (
        <Input
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onBlur}/>
    );
  }
}
