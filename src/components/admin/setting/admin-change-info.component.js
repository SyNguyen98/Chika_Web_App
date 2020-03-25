import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';

import '../../../styles/admin/setting/admin-change-info.component.css';

export default class AdminChangeInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const AntEditForm = Form.create()(ChangeInfoForm)
    const { currentUser } = this.props;
    return(
      <div className="admin-setting__change-info">
            <div className="admin-setting_change-info__topic">
              <p>Ngày sinh</p>
              <p>Địa chỉ</p>
              <p>Số điện thoại</p>
              <p>Email</p>
            </div>
            <div className="admin-setting_change-info__input">
              {currentUser ? <AntEditForm currentUser={currentUser} updateAdminInfo={this.props.updateAdminInfo}/> : null}  
            </div>
      </div>
    )
  }
}

class ChangeInfoForm extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const request = Object.assign({}, values);
        this.props.updateAdminInfo(request);
      }
    });
  }

  render() {
    const { currentUser } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} autoComplete="off">
        <Form.Item>
          {getFieldDecorator('birthday', {
            initialValue: currentUser.birthday,
            rules: [{ required: true, message: 'Vui lòng nhập ngày sinh!' }]
          })(
            <Input size="large" placeholder="Ngày sinh" suffix={<Icon type="edit" />}/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('address', {
            initialValue: currentUser.address,
            rules: [{ required: true, message: 'Vui lòng nhập ngày sinh!' }]
          })(
            <Input size="large" placeholder="Địa chỉ" suffix={<Icon type="edit" />}/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phone', {
            initialValue: currentUser.phone,
            rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }]
          })(
            <Input size="large" placeholder="Số điện thoại" maxLength={10} suffix={<Icon type="edit" />}/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            initialValue: currentUser.email,
            rules: [
              { type: 'email', message: 'Email không hợp lệ!', },
              { required: true, message: 'Vui lòng nhập Email!', },
            ],
          })(<Input size="large" placeholder="Email" suffix={<Icon type="edit" />}/>
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit" size="large" style={{width: '50%'}}>Thay đổi</Button>
      </Form>
    );
  }
}