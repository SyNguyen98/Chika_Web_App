import React, {Component} from 'react';
import {Form, Input, Button, Icon} from 'antd';
import {updatePassword} from '../../services/UserService';
import {ErrorNotification} from "../notification";

export default class ChangePassComponent extends Component {
    render() {
        const AntChangePasswordForm = Form.create()(ChangePasswordForm)
        return (
            <div>
                <AntChangePasswordForm onLogout={this.props.onLogout}/>
            </div>
        )
    }
}

class ChangePasswordForm extends Component {

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('2 mật khẩu mới phải trùng nhau!');
        } else {
            callback();
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const request = {
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword,
                };
                updatePassword(request).then(() => {
                    this.props.onLogout();
                }).catch(error => {
                    if (error.message === 'Your current password is incorrect') {
                        ErrorNotification('Mật khẩu hiện tại không chính xác!');
                    } else {
                        ErrorNotification(error.message || 'Đã có lỗi xảy ra. Xin vui lòng thử lại sau!');
                    }
                });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form autoComplete="off">
                <Form.Item>
                    {getFieldDecorator('oldPassword', {
                        rules: [{required: true, message: 'Vui lòng nhập Mật khẩu cũ!'}]
                    })(
                        <Input.Password size="large" placeholder="Mật khẩu hiện tại" prefix={<Icon type="lock"/>}/>
                    )}
                </Form.Item>
                <Form.Item hasFeedback>
                    {getFieldDecorator('newPassword', {
                        rules: [
                            {required: true, message: 'Vui lòng nhập Mật khẩu mới!'},
                            {min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự'},
                        ]
                    })(
                        <Input.Password size="large" placeholder="Mật khẩu mới" prefix={<Icon type="lock"/>}/>
                    )}
                </Form.Item>
                <Form.Item hasFeedback>
                    {getFieldDecorator('confirmPassword',
                        {
                            rules: [
                                {required: true, message: 'Vui lòng xác nhận mật khẩu mới!'},
                                {validator: this.compareToFirstPassword,}
                            ]
                        })(
                        <Input.Password size="large" placeholder="Xác nhận mật khẩu mới" prefix={<Icon type="lock"/>}/>
                    )}
                </Form.Item>
                <Button type="primary" size="large" style={{width: '40%'}}
                        onClick={this.handleSubmit}>
                    Đổi mật khẩu
                </Button>
            </Form>
        );
    }
}