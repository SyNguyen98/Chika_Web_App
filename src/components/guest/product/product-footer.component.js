import React, { Component } from 'react';
import { Row, Col } from 'antd';

import '../../../styles/guest/product/product-footer.component.css';
import { LINK_SWITCH_SENSOR, LINK_SWITCH, LINK_MODULE_IR, LINK_HOME_CONTROLLER, LINK_DOOR_SENSOR, LINK_MOTION_DETECTOR } from '../../../constant';

const imageUri = "/image/guest/product/";

export default class ProductFooterComponent extends Component {

    handleChangePage = (link) => {
        if (window.location.pathname.includes(link)) {
            window.scrollTo(0, 0);
        } else {
            this.props.history.push(link);
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return(
            <div className="product__footer">
                <h1>CÁC THIẾT BỊ KHÁC</h1>
                <Row className="product__footer__row">
                    <Col className="product__footer__col" span={8}>
                        <img alt="Cong-tac-tich-hop-cam-bien" src={`${imageUri}cong-tac-tich-hop-cam-bien-cau-thang.png`}
                            onClick={() => this.handleChangePage(LINK_SWITCH_SENSOR)}/>
                        <p>CÔNG TẮC TÍCH HỢP CẢM BIẾN</p>
                    </Col>
                    <Col className="product__footer__col" span={8}>
                        <img alt="Cong-tac-vien-nhom" src={`${imageUri}cong-tac-vien-nhom.png`}
                            onClick={() => this.handleChangePage(LINK_SWITCH)}></img>
                        <p>CÔNG TẮC VIỀN NHÔM</p>
                    </Col>
                    <Col className="product__footer__col" span={8}>
                        <img alt="Dieu-khien-hong-ngoai" src={`${imageUri}cam-bien-hong-ngoai.png`}
                            onClick={() => this.handleChangePage(LINK_MODULE_IR)}></img>
                        <p>ĐIỀU KHIỂN HỒNG NGOẠI</p>
                    </Col>
                </Row>
                <Row className="product__footer__row">
                    <Col className="product__footer__col" span={8}>
                        <img alt="Bo-dieu-khien-trung-tam" src={`${imageUri}bo-dieu-khien-trung-tam.png`}
                            onClick={() => this.handleChangePage(LINK_HOME_CONTROLLER)}/>
                        <p>BỘ ĐIỀU KHIỂN TRUNG TÂM</p>
                    </Col>
                    <Col className="product__footer__col" span={8}>
                        <img alt="Cam-bien-cua" src={`${imageUri}cam-bien-cua.png`}
                            onClick={() => this.handleChangePage(LINK_DOOR_SENSOR)}/>
                        <p>CẢM BIẾN CỬA</p>
                    </Col>
                    <Col className="product__footer__col" span={8}>
                        <img alt="Cam-bien-chuyen-dong" src={`${imageUri}cam-bien-chuyen-dong.png`}
                            onClick={() => this.handleChangePage(LINK_MOTION_DETECTOR)}/>
                        <p>CẢM BIẾN PHÁT HIỆN CHUYỂN ĐỘNG</p>
                    </Col>
                </Row>
            </div>
        )
    }
}
