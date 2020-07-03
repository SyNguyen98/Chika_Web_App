import React, {Component} from 'react';
import {Button, Form, Input} from 'antd';

import {sendFeedback} from "../../../../../services/FeedbackService";
import {ErrorNotification, SuccessNotification} from "../../../../../components/notification";

const { TextArea } = Input;

export default class FeedbackComponent extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const AntFeedbackForm = Form.create()(FeedbackForm)
        return (
            <div>
                <AntFeedbackForm user={this.props.user}/>
            </div>
        )
    }
}

class FeedbackForm extends Component {

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const request = {
                    subject: values.subject,
                    content: values.content,
                    name: this.props.user.name,
                    email: this.props.user.email
                };
                sendFeedback(request).then(() => {
                    SuccessNotification("Yêu cầu của bạn đã được gửi. Chúng tôi sẽ trả lời trong thời gian sớm nhất")
                    this.props.form.resetFields();
                }).catch(error => {
                    ErrorNotification(error.message || "Đã có lỗi xảy ra")
                });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form autoComplete="off">
                <Form.Item>
                    {getFieldDecorator('subject', {
                        rules: [{required: true, message: 'Vui lòng nhập chủ đề!'}]
                    })(
                        <Input size="large" placeholder="Chủ đề"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: 'Vui lòng nhập nội dung!'}]
                    })(
                        <TextArea rows={6} placeholder="Phản hồi của bạn"/>
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit" size="large" style={{width: '40%'}}
                        onClick={this.handleSubmit}>
                    Gửi phản hồi
                </Button>
            </Form>
        );
    }
}