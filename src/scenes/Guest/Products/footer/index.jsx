import React from 'react';
import {Row, Col} from 'antd';

import "./product-footer.css";

import {PRODUCT_IMG_URI} from "../../../../constant/uri";
import {
    DOOR_SENSOR_LINK,
    HOME_CENTRAL_LINK,
    MODULE_IR_LINK, MOTION_DETECTOR_LINK,
    SWITCH_LINK,
    SWITCH_SENSOR_LINK
} from "../../../../constant/link";


const ProductFooterComponent = ({history}) => {

    const handleChangePage = (link) => {
        if (window.location.pathname.includes(link)) {
            window.scrollTo(0, 0);
        } else {
            history.push(link);
        }
    }

    return (
        <div className="product__footer">
            <h1>CÁC THIẾT BỊ KHÁC</h1>
            <Row className="product__footer__row">
                <Col className="product__footer__col" span={8}>
                    <img alt="Cong-tac-tich-hop-cam-bien"
                         src={`${PRODUCT_IMG_URI}cong-tac-tich-hop-cam-bien-cau-thang.png`}
                         onClick={() => handleChangePage(SWITCH_SENSOR_LINK)}/>
                    <p>CÔNG TẮC TÍCH HỢP CẢM BIẾN</p>
                </Col>
                <Col className="product__footer__col" span={8}>
                    <img alt="Cong-tac-vien-nhom" src={`${PRODUCT_IMG_URI}cong-tac-vien-nhom.png`}
                         onClick={() => handleChangePage(SWITCH_LINK)}/>
                    <p>CÔNG TẮC VIỀN NHÔM</p>
                </Col>
                <Col className="product__footer__col" span={8}>
                    <img alt="Dieu-khien-hong-ngoai" src={`${PRODUCT_IMG_URI}cam-bien-hong-ngoai.png`}
                         onClick={() => handleChangePage(MODULE_IR_LINK)}/>
                    <p>ĐIỀU KHIỂN HỒNG NGOẠI</p>
                </Col>
            </Row>
            <Row className="product__footer__row">
                <Col className="product__footer__col" span={8}>
                    <img alt="Bo-dieu-khien-trung-tam" src={`${PRODUCT_IMG_URI}bo-dieu-khien-trung-tam.png`}
                         onClick={() => handleChangePage(HOME_CENTRAL_LINK)}/>
                    <p>BỘ ĐIỀU KHIỂN TRUNG TÂM</p>
                </Col>
                <Col className="product__footer__col" span={8}>
                    <img alt="Cam-bien-cua" src={`${PRODUCT_IMG_URI}cam-bien-cua.png`}
                         onClick={() => handleChangePage(DOOR_SENSOR_LINK)}/>
                    <p>CẢM BIẾN CỬA</p>
                </Col>
                <Col className="product__footer__col" span={8}>
                    <img alt="Cam-bien-chuyen-dong" src={`${PRODUCT_IMG_URI}cam-bien-chuyen-dong.png`}
                         onClick={() => handleChangePage(MOTION_DETECTOR_LINK)}/>
                    <p>CẢM BIẾN PHÁT HIỆN CHUYỂN ĐỘNG</p>
                </Col>
            </Row>
        </div>
    )
}

export default ProductFooterComponent;