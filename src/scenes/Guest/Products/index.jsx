import React, { Component } from 'react';
import { Button, Icon, Row, Col } from 'antd';

import "./product.css"

import {PRODUCT_IMG_URI} from "../../../constant/uri";
import {
  DOOR_SENSOR_LINK,
  HOME_CENTRAL_LINK,
  MODULE_IR_LINK,
  MOTION_DETECTOR_LINK,
  SWITCH_LINK, SWITCH_SENSOR_LINK
} from "../../../constant/link";

export default class ProductComponent extends Component {

  handleChangePage = (link) => {
    this.props.history.push(link);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return(
      <div className="product">
        <div className="product-header">
          <img alt="banner-thiet-bi" src={`${PRODUCT_IMG_URI}banner-thiet-bi.jpg`} />
          <div className="product-header__content">
            <h1>THIẾT BỊ ĐIỆN THÔNG MINH</h1>
            <p>Mang lại những tiện nghi tuyệt vời cho ngôi nhà của bạn</p>
          </div>
        </div>

        <div className="product__introduce">
          <strong>Thiết bị điện thông minh</strong> Chika được sản xuất tại Việt Nam tiêu chuẩn châu Âu,
            công nghệ sóng không dây Zigbee, Wifi hứa hẹn sẽ mang lại đẳng cấp sống mới cho mọi ngôi nhà Việt
        </div>

        <Row className="product__row product__row1" gutter={40}>
          <Col className="product__row1__col1" span={12}>
            <img alt="cong-tac-tich-hop-cam-bien-cau-thang" src={`${PRODUCT_IMG_URI}cong-tac-tich-hop-cam-bien-cau-thang.png`}
                onClick={() => this.handleChangePage(SWITCH_SENSOR_LINK)}/>
          </Col>
          <Col className="product__row1__col2" span={12}>
            <h1>CÔNG TẮC<br/>TÍCH HỢP CẢM BIẾN</h1>
            <p>Điện áp hoạt động: 100~240V<br/>Công suất tải: Đèn sợi đốt - 500W, Led - 150W<br/>Kiểu dáng: Hình vuông/ Hình chữ nhật<br/>Màu sắc: Đen/ Trắng</p>
            <Button shape="round" onClick={() => this.handleChangePage(SWITCH_SENSOR_LINK)}>Xem thêm<Icon type="double-right" /></Button>
          </Col>
        </Row>

        <Row className="product__row product__row2" gutter={40}>
          <Col className="product__row2__col1" span={12}>
            <h1>CÔNG TẮC VIỀN NHÔM</h1>
            <p>Nguồn cấp: 100-240V 50/60Hz<br/>Công suất: 8A/ kênh<br/>Kiểu dáng: Hình vuông/ Hình chữ nhật<br/>Màu sắc: Đen/ Trắng</p>
            <Button shape="round" onClick={() => this.handleChangePage(SWITCH_LINK)}>Xem thêm<Icon type="double-right" /></Button>
          </Col>
          <Col className="product__row2__col2" span={12}>
            <img alt="cong-tac-vien-nhom" src={`${PRODUCT_IMG_URI}cong-tac-vien-nhom.png`}
                onClick={() => this.handleChangePage(SWITCH_LINK)}/>
          </Col>
        </Row>

        <Row className="product__row product__row3" gutter={40}>
          <Col className="product__row3__col1" span={12}>
            <img alt="cam-bien-hong-ngoai" src={`${PRODUCT_IMG_URI}cam-bien-hong-ngoai.png`}
                onClick={() => this.handleChangePage(MODULE_IR_LINK)}/>
          </Col>
          <Col className="product__row3__col2" span={12}>
            <h1>ĐIỀU KHIỂN HỒNG NGOẠI</h1>
            <p>Nguồn cấp: 5VDC/1A<br/>Nhiệt độ hoạt động: 0-50 độ C<br/>Góc điều khiển: 360 độ<br/>Số mã lệnh: lên đến 1000 lệnh</p>
            <Button shape="round" onClick={() => this.handleChangePage(MODULE_IR_LINK)}>Xem thêm<Icon type="double-right" /></Button>
          </Col>
        </Row>

        <Row className="product__row product__row4" gutter={40}>
          <Col className="product__row4__col1" span={12}>
            <h1>BỘ ĐIỀU KHIỂN<br/>TRUNG TÂM</h1>
            <p>Nguồn cấp: 100-240V ~ 50-60Hz<br/>Nhiệt độ hoạt động: 0 - 50ºC<br/>Kích thước: 95,6 x 48,9 x 46mm<br/>Màu sắc: Màu đen</p>
            <Button shape="round" onClick={() => this.handleChangePage(HOME_CENTRAL_LINK)}>Xem thêm<Icon type="double-right" /></Button>
          </Col>
          <Col className="product__row4__col2" span={12}>
            <img alt="bo-dieu-khien-trung-tam" src={`${PRODUCT_IMG_URI}bo-dieu-khien-trung-tam.png`}
                onClick={() => this.handleChangePage(HOME_CENTRAL_LINK)}/>
          </Col>
        </Row>

        <Row className="product__row product__row5" gutter={40}>
          <Col className="product__row5__col1" span={12}>
            <img alt="cam-bien-cua" src={`${PRODUCT_IMG_URI}cam-bien-cua.png`}
                onClick={() => this.handleChangePage(DOOR_SENSOR_LINK)}/>
          </Col>
          <Col className="product__row5__col2" span={12}>
            <h1>CẢM BIẾN CỬA</h1>
            <p>Nguồn cấp: Pin CR2477 3V 1000mAh<br/>Nhiệt độ hoạt động: 0 – 50ºC<br/>Thời gian Pin: 2 năm</p>
            <Button shape="round" onClick={() => this.handleChangePage(DOOR_SENSOR_LINK)}>Xem thêm<Icon type="double-right" /></Button>
          </Col>
        </Row>

        <Row className="product__row product__row6" gutter={40}>
          <Col className="product__row6__col1" span={12}>
            <h1>CẢM BIẾN PHÁT HIỆN CHUYỂN ĐỘNG</h1>
            <p>Nguồn cấp: 220V<br/>Nhiệt độ hoạt động: 0 - 50 độ<br/>Góc quét: 100 độ</p>
            <Button shape="round" onClick={() => this.handleChangePage(MOTION_DETECTOR_LINK)}>Xem thêm<Icon type="double-right" /></Button>
          </Col>
          <Col className="product__row6__col2" span={12}>
            <img alt="cam-bien-chuyen-dong" src={`${PRODUCT_IMG_URI}cam-bien-chuyen-dong.png`}
                onClick={() => this.handleChangePage(MOTION_DETECTOR_LINK)}/>
          </Col>
        </Row>
      </div>
    );
  }
}
