import React, {Component} from 'react';
import {Form, Input, Button, Icon, Row, Col, notification} from 'antd';

import './support.css';

import {sendFeedback} from '../../../services/FeedbackService';

import {DOCUMENT_LINK, PRODUCT_LINK, QUESTION_LINK} from "../../../constant/link";
import {SUPPORTING_IMG_URI} from "../../../constant/uri";

const {TextArea} = Input;

export default class SupportComponent extends Component {

    handleChangePage = (link) => {
        this.props.history.push(link);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        const SupportingForm = Form.create()(SubmitForm)
        return (
            <div className="supporting">
                <div className="supporting_header">
                    <div className="supporting_header_title">
                        <img alt="support-icon" src={`${SUPPORTING_IMG_URI}support-icon.png`}/>
                        <h1>CHÚNG TÔI CÓ THỂ<br/>HỖ TRỢ GÌ CHO BẠN?</h1>
                    </div>
                    <SupportingForm/>
                </div>

                <div className="supporting_body">
                    <h1>Bạn cần trợ giúp thông tin gì?</h1>
                    <Row>
                        <Col className="supporting_body_col" span={5}
                             onClick={() => this.handleChangePage(QUESTION_LINK)}>
                            <img alt="question" src={`${SUPPORTING_IMG_URI}question-icon.png`}/>
                            <p>Các câu hỏi<br/>thường gặp</p>
                        </Col>
                        <Col className="supporting_body_col" span={5}
                             onClick={() => this.handleChangePage(DOCUMENT_LINK)}>
                            <img alt="document" src={`${SUPPORTING_IMG_URI}document-icon.png`}/>
                            <p>Tài liệu hướng dẫn<br/>và phần mềm</p>
                        </Col>
                        <Col className="supporting_body_col" span={5}
                             onClick={() => this.handleChangePage(PRODUCT_LINK)}>
                            <img alt="products" src={`${SUPPORTING_IMG_URI}product-icon.png`}/>
                            <p>Tìm hiểu<br/>bộ sản phẩm</p>
                        </Col>
                    </Row>
                </div>

                <div className="supporting_footer">
                    <h1>Liên hệ</h1>
                    <Row>
                        <Col className="supporting_footer_col" span={5}>
                            <h2><Icon type="desktop" style={{color: 'green', fontSize: '2vw'}}/>&ensp;TRỰC TUYẾN</h2>
                            <h3>Email: info@chika.vn</h3>
                            <p>Chúng tôi sẽ phản hồi trong vòng 24 giờ từ khi nhận được yêu cầu của bạn</p>
                            <h3>Phản hồi chất lượng đại lý</h3>
                            <p>Gửi phản hồi đến chúng tôi để nhận được sự chăm sóc từ đại lý tốt nhất</p>
                        </Col>
                        <Col className="supporting_footer_col" span={5}>
                            <h2><Icon type="phone" style={{color: 'green', fontSize: '2vw'}}/>&ensp;GỌI ĐIỆN THOẠI</h2>
                            <h3>0909 123 456</h3>
                            <p>24 giờ, 7 ngày trong tuần.</p>
                            <h3>Tư vấn trực tuyến</h3>
                            <p>24 giờ, 7 ngày trong tuần.</p>
                        </Col>
                        <Col className="supporting_footer_col" span={5}>
                            <h2><Icon type="environment" style={{color: 'green', fontSize: '2vw'}}/>&ensp;HỖ TRỢ TRỰC
                                TIẾP</h2>
                            <h3>Facebook</h3>
                            <p>facebook.com/chikavietnam</p>
                            <h3>Zalo</h3>
                            <p>Liên hệ với chúng tôi qua zalo: 0909 123 456</p>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

class SubmitForm extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const feedback = Object.assign({}, values);
                sendFeedback(feedback)
                    .then(response => {
                        notification.success({
                            message: 'Chika Smarthome',
                            description: "Yêu cầu của bạn đã được gửi. Chúng tôi sẽ trả lời trong thời gian sớm nhất",
                        });
                        this.props.form.resetFields();
                    }).catch(error => {
                    notification.error({
                        message: 'Chika Smarthome',
                        description: 'Đã có lỗi xảy ra. Xin vui lòng thử lại!'
                    });
                });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form className="supporting_header_form" onSubmit={this.handleSubmit} autocomplete="off">
                <Form.Item>
                    {getFieldDecorator('subject', {
                        rules: [{required: true, message: 'Vui lòng không để trống tiêu đề!'}]
                    })(<Input className="form-input" style={{width: "30vw"}}
                              size="large"
                              name="subject"
                              placeholder="Tiêu đề"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: 'Vui lòng không để trống nội dung!'}]
                    })(<TextArea style={{width: "30vw"}}
                                 size="large"
                                 autoSize={{minRows: 2, maxRows: 3}}
                                 name="content"
                                 placeholder="Vui lòng cho chúng tôi biết yêu cầu của bạn"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Vui lòng không để trống họ tên!'}]
                    })(<Input style={{width: "30vw"}}
                              size="large"
                              name="name"
                              placeholder="Họ và tên"/>
                    )}
                </Form.Item>
                <div>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: 'Vui lòng không để trống email!'}]
                        })(<Input style={{width: "20vw"}}
                                  size="large"
                                  name="email"
                                  placeholder="Email"/>
                        )}
                        <Button type="primary" htmlType="submit" size="large" style={{width: "8vw", marginLeft: '2vw'}}>Hoàn
                            Tất</Button>
                    </Form.Item>
                </div>
            </Form>
        );
    }
}