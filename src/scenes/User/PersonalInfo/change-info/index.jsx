import React, {Component} from 'react';
import {Button, Icon, Form, Input, DatePicker} from 'antd';
import moment from 'moment';

import './change-info.scss';

const ChangeInfoComponent = ({userInfo, updateUserInfo}) => {
    const AntEditForm = Form.create()(ChangeInfoForm);

    return (
        <div className="user-info-edit">
            <AntEditForm userInfo={userInfo} updateUserInfo={updateUserInfo}/>
        </div>
    )
};

export default ChangeInfoComponent;

class ChangeInfoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChange: false
        }
    }

    isChange = (values) => {
        const {userInfo} = this.props;
        return !(userInfo.birthday !== values.birthday.format('DD/MM/YYYY') || userInfo.address !== values.address ||
            userInfo.phone !== values.phone || userInfo.email !== values.email);

    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const request = {
                    birthday: values.birthday.format('DD/MM/YYYY'),
                    address: values.address,
                    phone: values.phone,
                    email: values.email,
                };
                this.props.updateUserInfo(request);
            }
        });
    };

    render() {
        const {userInfo} = this.props;
        const {getFieldDecorator, getFieldsValue} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} autoComplete="off">
                <Form.Item>
                    {getFieldDecorator('phone', {
                        initialValue: userInfo.phone,
                        rules: [{required: true, message: 'Vui lòng nhập số điện thoại!'}]
                    })(
                        <Input size="large" placeholder="Số điện thoại" maxLength={10} suffix={<Icon type="edit"/>}/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        initialValue: userInfo.email,
                        rules: [
                            {type: 'email', message: 'Email không hợp lệ!',},
                            {required: true, message: 'Vui lòng nhập Email!',},
                        ],
                    })(<Input size="large" placeholder="Email" suffix={<Icon type="edit"/>}/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('birthday', {
                        initialValue: moment(userInfo.birthday, 'DD/MM/YYYY'),
                        rules: [{required: true, message: 'Vui lòng nhập ngày sinh!'}],
                    })(
                        <DatePicker style={{width: '100%'}} size="large" placeholder='Ngày sinh' format={'DD/MM/YYYY'}/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('address', {
                        initialValue: userInfo.address,
                        rules: [{required: true, message: 'Vui lòng nhập ngày sinh!'}]
                    })(
                        <Input size="large" placeholder="Địa chỉ" suffix={<Icon type="edit"/>}/>
                    )}
                </Form.Item>
                <Button type="primary"
                        htmlType="submit"
                        size="large"
                        disabled={this.isChange(getFieldsValue())}
                        style={{width: '50%'}}>Thay đổi</Button>
            </Form>
        );
    }
}