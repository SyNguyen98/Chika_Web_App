import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'antd';

import '../../styles/guest/Product.css';
import { LINK_SWITCH_SENSOR, LINK_SWITCH, LINK_MODULE_IR, LINK_HOME_CONTROLLER, LINK_DOOR_SENSOR, LINK_MOTION_DETECTOR } from '../../constant'

class Product extends Component {

  handleChangePage = (event, link) => {
    this.props.history.push(link);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return(
      <div className="product">
        <div className="product_header">
          <div className="product_header_title">
            <h1>THIẾT BỊ ĐIỆN THÔNG MINH</h1>
            <p>Mang lại những tiện nghi tuyệt vời cho ngôi nhà của bạn</p>
          </div>
        </div>

        <div className="product_introduce">
          <strong>Thiết bị điện thông minh</strong> Chika được sản xuất tại Việt Nam tiêu chuẩn châu Âu,
            công nghệ sóng không dây Zigbee, Wifi hứa hẹn sẽ mang lại đẳng cấp sống mới cho mọi ngôi nhà Việt
        </div>

        <div className="product_body">
          <img className="product_body_switch-sensor-image" alt="switch" src="/image/product/cong-tac-tich-hop-cam-bien-cau-thang.png"></img>
          <div className="product_body_switch-sensor">
            <h1 onClick={(event) => this.handleChangePage(event, LINK_SWITCH_SENSOR)}>CÔNG TẮC<br/>TÍCH HỢP CẢM BIẾN</h1>
            <p>Điện áp hoạt động: 100~240V<br/>Công suất tải: Đèn sợi đốt - 500W, Led - 150W<br/>Kiểu dáng: Hình vuông/ Hình chữ nhật<br/>Màu sắc: Đen/ Trắng</p>
            <Button shape="round" onClick={(event) => this.handleChangePage(event, LINK_SWITCH_SENSOR)}>Xem thêm<Icon type="double-right" /></Button>
          </div>

          <img className="product_body_switch-image" alt="switch" src="/image/product/cong-tac-vien-nhom.png"></img>
          <div className="product_body_switch">
            <h1 onClick={(event) => this.handleChangePage(event, LINK_SWITCH)}>CÔNG TẮC VIỀN NHÔM</h1>
            <p>Nguồn cấp: 100-240V 50/60Hz<br/>Công suất: 8A/ kênh<br/>Kiểu dáng: Hình vuông/ Hình chữ nhật<br/>Màu sắc: Đen/ Trắng</p>
            <Button shape="round" onClick={(event) => this.handleChangePage(event, LINK_SWITCH)}>Xem thêm<Icon type="double-right" /></Button>
          </div>

          <img className="product_body_module-ir-image" alt="switch" src="/image/product/cam-bien-hong-ngoai.png"></img>
          <div className="product_body_module-ir">
            <h1 onClick={(event) => this.handleChangePage(event, LINK_MODULE_IR)}>ĐIỀU KHIỂN HỒNG NGOẠI</h1>
            <p>Nguồn cấp: 5VDC/1A<br/>Nhiệt độ hoạt động: 0-50 độ C<br/>Góc điều khiển: 360 độ<br/>Số mã lệnh: lên đến 1000 lệnh</p>
            <Button shape="round" onClick={(event) => this.handleChangePage(event, LINK_MODULE_IR)}>Xem thêm<Icon type="double-right" /></Button>
          </div>

          <img className="product_body_home-controller-image" alt="switch" src="/image/product/bo-dieu-khien-trung-tam.png"></img>
          <div className="product_body_home-controller">
            <h1 onClick={(event) => this.handleChangePage(event, LINK_HOME_CONTROLLER)}>BỘ ĐIỀU KHIỂN<br/>TRUNG TÂM</h1>
            <p>Nguồn cấp: 100-240V ~ 50-60Hz<br/>Nhiệt độ hoạt động: 0 - 50ºC<br/>Kích thước: 95,6 x 48,9 x 46mm<br/>Màu sắc: Màu đen</p>
            <Button shape="round" onClick={(event) => this.handleChangePage(event, LINK_HOME_CONTROLLER)}>Xem thêm<Icon type="double-right" /></Button>
          </div>

          <img className="product_body_door-sensor-image" alt="switch" src="/image/product/cam-bien-cua.png"></img>
          <div className="product_body_door-sensor">
            <h1 onClick={(event) => this.handleChangePage(event, LINK_DOOR_SENSOR)}>CẢM BIẾN CỬA</h1>
            <p>Nguồn cấp: Pin CR2477 3V 1000mAh<br/>Nhiệt độ hoạt động: 0 – 50ºC<br/>Thời gian Pin: 2 năm</p>
            <Button shape="round" onClick={(event) => this.handleChangePage(event, LINK_DOOR_SENSOR)}>Xem thêm<Icon type="double-right" /></Button>
          </div>

          <img className="product_body_motion-detector-image" alt="switch" src="/image/product/cam-bien-chuyen-dong.png"></img>
          <div className="product_body_motion-detector">
            <h1 onClick={(event) => this.handleChangePage(event, LINK_MOTION_DETECTOR)}>CẢM BIẾN PHÁT HIỆN CHUYỂN ĐỘNG</h1>
            <p>Nguồn cấp: 220V<br/>Nhiệt độ hoạt động: 0 - 50 độ<br/>Góc quét: 100 độ</p>
            <Button shape="round" onClick={(event) => this.handleChangePage(event, LINK_MOTION_DETECTOR)}>Xem thêm<Icon type="double-right" /></Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
