import React, {Component} from 'react';
import {Card, Col, Icon, Menu, Row} from 'antd';

import './document.css';

export default class DocumentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reference: '1'
        }
    }

    handleChangeDocument = (key) => {
        this.setState({
            reference: key
        });
    }

    handleOpenPdf = (path) => {
        window.open(path);
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        let documentContent;
        if (this.state.reference === '1') {
            documentContent = (<Reference/>)
        } else if (this.state.reference === '2') {
            documentContent = (<Video/>)
        }
        return (
            <div className="document">
                <div className="document_header">
                    TÀI LIỆU HƯỚNG DẪN
                </div>

                <div className="document_body">
                    <Menu className="document_body_menu"
                          defaultSelectedKeys={['1']}
                          mode="inline">
                        <Menu.Item className="document_body_menu_item" key="1"
                                   onClick={() => this.handleChangeDocument('1')}>
                            <p>Tài liệu hướng dẫn</p>
                        </Menu.Item>
                        <Menu.Divider/>
                        <Menu.Item className="document_body_menu_item" key="2"
                                   onClick={() => this.handleChangeDocument('2')}>
                            <p>Video hướng dẫn</p>
                        </Menu.Item>
                        <Menu.Divider/>
                        <Menu.Item className="document_body_menu_item" key="3"
                                   onClick={() => this.handleOpenPdf('/pdf/bang-gia.pdf')}>
                            <p>Bảng giá thiết bị</p>
                        </Menu.Item>
                    </Menu>
                    {documentContent}
                </div>

                <div className="document_footer">
                    <h1>Không tìm thấy nội dung bạn tìm kiếm?<br/>Chúng tôi ở đây để trợ giúp bạn</h1>
                    <Row>
                        <Col className="document_footer_col" span={5}>
                            <h2><Icon type="desktop" style={{color: 'green', fontSize: '2vw'}}/>&ensp;TRỰC TUYẾN</h2>
                            <h3>Email: info@chika.vn</h3>
                            <p>Chúng tôi sẽ phản hồi trong vòng 24 giờ từ khi nhận được yêu cầu của bạn</p>
                            <h3>Phản hồi chất lượng đại lý</h3>
                            <p>Gửi phản hồi đến chúng tôi để nhận được sự chăm sóc từ đại lý tốt nhất</p>
                        </Col>
                        <Col className="document_footer_col" span={5}>
                            <h2><Icon type="phone" style={{color: 'green', fontSize: '2vw'}}/>&ensp;GỌI ĐIỆN THOẠI</h2>
                            <h3>0909 123 456</h3>
                            <p>24 giờ, 7 ngày trong tuần.</p>
                            <h3>Tư vấn trực tuyến</h3>
                            <p>24 giờ, 7 ngày trong tuần.</p>
                        </Col>
                        <Col className="document_footer_col" span={5}>
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

class Reference extends Component {
    render() {
        return (
            <div className="document_body_content">
                <Card className="document_body_content_card" title="Hướng dẫn sử dụng ChikaHome">
                    <p>Hướng dẫn sử dụng ứng dụng ChikaHome để điều khiển các thiết bị</p>
                </Card>
                <Card className="document_body_content_card" title="Hướng dẫn sử dụng CA-HC">
                    <p>Hướng dẫn sử dụng bộ xử lý trung tâm Home Controller của Chika</p>
                </Card>
                <Card className="document_body_content_card" title="Hướng dẫn lắp đặt công tắc cảm ứng Chika">
                    <p>Được thiết kế phù hợp với đa số các ổ điện tiêu chuẩn hiện nay trên thị trường, công tắc Chika
                        cực kỳ tiện lợi không phải đục đẽo tường hay khoan tường nhiều,
                        không làm ảnh hưởng gì đến thẩm mỹ, thiết kế của ngôi nhà. Tuy nhiên, sau đây chúng tôi đưa ra
                        hướng dẫn lắp đặt cơ bản công tắc thông minh Chika để khác hàng
                        có thể hiểu rõ hơn về tiêu chuẩn khi lắp đặt.</p>
                </Card>
            </div>
        );
    }
}

class Video extends Component {
    render() {
        return (
            <div className="document_body_content">
                <Card className="document_body_content_card" title="Video Hướng Dẫn Cấu Hình ChikaHome 2019">
                    <p>Cài Đặt Chung Trên Điện Thoại</p>
                </Card>
                <Card className="document_body_content_card" title="Video Hướng Dẫn Cấu Hình ChikaHome 2019">
                    <p>Cài Đặt Chung Trong nhà</p>
                </Card>
            </div>
        );
    }
}