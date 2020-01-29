import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Icon, Row, Col, notification } from 'antd';

import '../../styles/guest/Supporting.css';
import { postReview } from '../../util/APIUtil';
import { LINK_QUESTION, LINK_DOCUMENT, LINK_PRODUCT } from '../../constant'

const { TextArea } = Input;

class Supporting extends Component {

  handleChangePage = (event, link) => {
    this.props.history.push(link);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const SupportingForm = Form.create()(SubmitForm)
    return(
      <div className="supporting">
        <div className="supporting_header">
          <div className="supporting_header_title">
            <img alt="support-icon" src="/image/supporting/support-icon.png"></img>
            <h1>CHÚNG TÔI CÓ THỂ<br/>HỖ TRỢ GÌ CHO BẠN?</h1>
          </div>
          <SupportingForm />
        </div>

        <div className="supporting_body">
          <h1>Bạn cần trợ giúp thông tin gì?</h1>
          <Row>
            <Col className="supporting_body_col" span={5} onClick={(event) => this.handleChangePage(event, LINK_QUESTION)}>
              <img alt="question" src="/image/supporting/question-icon.png"></img>
              <p>Các câu hỏi<br/>thường gặp</p>
            </Col>
            <Col className="supporting_body_col" span={5} onClick={(event) => this.handleChangePage(event, LINK_DOCUMENT)}>
              <img alt="document" src="/image/supporting/document-icon.png"></img>
              <p>Tài liệu hướng dẫn<br/>và phần mềm</p>
            </Col>
            <Col className="supporting_body_col" span={5} onClick={(event) => this.handleChangePage(event, LINK_PRODUCT)}>
              <img alt="products" src="/image/supporting/product-icon.png"></img>
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
              <h2><Icon type="environment" style={{color: 'green', fontSize: '2vw'}}/>&ensp;HỖ TRỢ TRỰC TIẾP</h2>
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
        const review = Object.assign({}, values);
        postReview(review)
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
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.handleSubmit} className="supporting_header_form">
        <Form.Item>
          {getFieldDecorator('subject', {
            rules: [{ required: true, message: 'Vui lòng không để trống tiêu đề!' }]
          })(<Input className="form-input" style={{width: "30vw"}}
              size="large"
              name="subject"
              placeholder="Tiêu đề"/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Vui lòng không để trống nội dung!' }]
          })(<TextArea style={{width: "30vw"}}
              size="large"
              autoSize={{ minRows: 2, maxRows: 3 }}
              name="content"
              placeholder="Vui lòng cho chúng tôi biết yêu cầu của bạn"/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Vui lòng không để trống họ tên!' }]
          })(<Input style={{width: "30vw"}}
              size="large"
              name="name"
              placeholder="Họ và tên"/>
          )}
        </Form.Item>
        <div>
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Vui lòng không để trống số điện thoại!' }]
            })(<Input style={{width: "17vw"}}
                size="large"
                name="phone"
                placeholder="Số điện thoại"/>
            )}
            <Button type="primary" htmlType="submit" size="large" style={{width: "10vw", marginLeft: '3vw'}}>Hoàn Tất</Button>
          </Form.Item>
        </div>
      </Form>
    );
  }
}

export default withRouter(Supporting);
