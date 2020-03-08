import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';

import '../../../styles/admin/setting/ChangeInfo.css';

export default class ChangeInfo extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const AntEditForm = Form.create()(ChangeInfoForm)
    const { adminInfo } = this.props;
    return(
      <div className="admin-setting_change-info">
        <h1>THAY ĐỔI THÔNG TIN</h1>
        {adminInfo ? (
          <div>
            <p className="admin-setting_change-info_name">{adminInfo.name}</p>
            <div className="admin-setting_change-info_content">
              <div className="admin-setting_change-info_content_topic">
                <p>Ngày sinh</p>
                <p>Địa chỉ</p>
                <p>Số điện thoại</p>
                <p>Email</p>
              </div>
              <div className="admin-setting_change-info_content_content">
                <AntEditForm adminInfo={adminInfo} updateAdminInfo={this.props.updateAdminInfo}/>
              </div>
            </div>
          </div>
        ) : null}
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
    const { adminInfo } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} autoComplete="off">
        <Form.Item>
          {getFieldDecorator('birthday', {
            initialValue: adminInfo.birthday,
            rules: [{ required: true, message: 'Vui lòng nhập ngày sinh!' }]
          })(
            <Input size="large" placeholder="Ngày sinh" suffix={<Icon type="edit" />}/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('address', {
            initialValue: adminInfo.address,
            rules: [{ required: true, message: 'Vui lòng nhập ngày sinh!' }]
          })(
            <Input size="large" placeholder="Địa chỉ" suffix={<Icon type="edit" />}/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phone', {
            initialValue: adminInfo.phone,
            rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }]
          })(
            <Input size="large" placeholder="Số điện thoại" maxLength={10} suffix={<Icon type="edit" />}/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            initialValue: adminInfo.email,
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
