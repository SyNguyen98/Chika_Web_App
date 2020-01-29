import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import '../../../styles/guest/solution/SecuritySystem.css';
import { LINK_GG_ASSISTANT, LINK_CONDITIONER_TIVI,
  LINK_ENVIRONMANTAL_CONTROL, LINK_LIGHT_CONTROL, LINK_RGB_LED } from '../../../constant'

class SecuritySystem extends Component {

  handleChangePage = (event, link) => {
    this.props.history.push(link);
  }

  toTopPage = (event) => {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="security-system">
        <div className="security-system_header">
          <div className="security-system_header_title">
            <h1>GIẢI PHÁP<br/>AN NINH TOÀN DIỆN</h1>
            <p>Bảo vệ ngôi nhà 24/24 với tính năng cảnh báo và kích hoạt an ninh thông minh.</p>
          </div>
        </div>

        <div className="security-system_introduce">
          Giải pháp an ninh toàn diện cho ngôi nhà của bạn được tích hợp camera thông minh giúp tăng cường cảnh báo chống trộm.
          Đặc biệt, hệ thống ChikaHome tích hợp camera có tính năng phát hiện mọi chuyển động.
          Trên apps ChikaHome có thể xem trực tuyến hoặc xem lại các video giám sát, khoanh vùng bảo mật trên app với một số vị trí quan trọng trong nhà
          và phát hiện chuyển động trong vùng cấm.
        </div>

        <div className="security-system_body">
          <img className="security-system_body_supervise-image" alt="an-ninh-qua-dien-thoai" src="/image/security-system/an-ninh-qua-dien-thoai.jpg"></img>
          <div className="security-system_body_supervise">
            <h1>GIÁM SÁT<br/>QUA ĐIỆN THOẠI</h1>
            <p>Cho dù ở bất cứ đâu bạn cũng có thể kiểm soát ngôi nhà mình. Qua apps ChikaHome, bạn có thể:
              <br/>• Theo dõi trực tiếp các hoạt động trong hay ngoài ngôi nhà
              <br/>• Khoanh vùng bảo mật trên app ChikaHome với một số vị trí quan trọng trong nhà và phát hiện chuyển động trong vùng cấm.
              <br/>• Thiết lập hướng phát hiện chuyển động qua đường ranh giới qua App ChikaHome</p>
          </div>

          <img className="security-system_body_door-sensor-image" alt="cong-tac-cam-ung" src="/image/light-control/cam-bien-cua.png"></img>
          <div className="security-system_body_door-sensor">
            <h1>CẢM BIẾN CỬA<br/>CHỐNG TRỘM</h1>
            <p>Thiết bị sẽ kích hoạt đèn sáng, cói hú, đèn sáng khi phát hiện có sự chuyển động vào khung giờ cấm.</p>
          </div>
        </div>

        <div className="security-system_camera">
          <div className="security-system_camera_content">
            <h1>TÍCH HỢP<br/>CAMERA AN NINH</h1>
            <p>Hệ thống ChikaHome tích hợp camera thông minh phát hiện mọi chuyển động.
              <br/>Snapshot để lưu lại 10 hình ảnh liên tục khi phát hiện chuyển động</p>
          </div>
        </div>

        <div className="security-system_body">
          <img className="security-system_body_combine-solution-image" alt="cac-thiet-bi-cung-tham-gia-chong-trom" src="/image/security-system/cac-thiet-bi-cung-tham-gia-chong-trom.jpg"></img>
          <div className="security-system_body_combine-solution">
            <h1>KẾT HỢP GIẢI PHÁP KHÁC<br/>CÙNG CHỐNG TRỘM</h1>
            <p>Hệ thống cảm biến sẽ kích hoạt các thiết bị khác như: cói hú, đèn soáy, rèm mở, đèn bật sáng và gửi cảnh báo tới điện thoại khi phát hiện ngôi nhà bị đột nhập trái phép.</p>
          </div>
        </div>

        <div className="security-system_smart-lock">
          <h1>TÍCH HỢP KHÓA THÔNG MINH</h1>
          <div className="security-system_smart-lock_image"></div>
        </div>

        <div className="security-system_body">
          <img className="security-system_body_lock-control-image" alt="cam-bien-cua" src="/image/security-system/app-chika-an-ninh.png"></img>
          <div className="security-system_body_lock-control">
            <h1>ĐIỀU KHIỂN KHÓA MỌI LÚC, MỌI NƠI TRÊN APPS CHIKAHOME</h1>
            <p>• Chika tích hợp với khóa Yale vào hệ thống nhà thông minh Chika, giúp khách hàng dễ dàng điều khiển, kiểm soát thông qua giao diện ứng dụng ChikaHome.
              <br/>• Đóng mở khóa từ xa ở bất kỳ đâu trên apps ChikaHome
              <br/>• Cài đặt mã bảo mật cho khóa trên Apps ChikaHome
              <br/>• Tích hợp khóa Yale: YMF 3109+, KHÓA YDM 40+.</p>
          </div>
        </div>

        <div className="security-system_footer">
          <h1>CÁC GIẢI PHÁP KHÁC</h1>
          <Row className="security-system_footer_row">
            <Col className="security-system_footer_col" span={8}>
              <img alt="google-assistant" src="/image/solution/google-assistant.jpg"
                  onClick={(event) => this.handleChangePage(event, LINK_GG_ASSISTANT)}></img>
              <p>KẾT NỐI GOOGLE ASSISTANT</p>
            </Col>
            <Col className="security-system_footer_col" span={8}>
              <img alt="conditioner-tivi" src="/image/solution/conditioner-tivi.jpg"
                  onClick={(event) => this.handleChangePage(event, LINK_CONDITIONER_TIVI)}></img>
              <p>ĐIỀU HÒA, TV THÔNG MINH</p>
            </Col>
            <Col className="security-system_footer_col" span={8}>
              <img alt="light-control" src="/image/solution/light-control.jpg"
                  onClick={(event) => this.handleChangePage(event, LINK_LIGHT_CONTROL)}></img>
              <p>CHIẾU SÁNG THÔNG MINH</p>
            </Col>
          </Row>
          <Row className="security-system_footer_row">
            <Col className="light-control_footer_col" span={8}>
              <img alt="environmental-control" src="/image/solution/environmental-control.jpg"
                  onClick={(event) => this.handleChangePage(event, LINK_ENVIRONMANTAL_CONTROL)}></img>
              <p>KIỂM SOÁT MÔI TRƯỜNG</p>
            </Col>
            <Col className="security-system_footer_col" span={8}>
              <img alt="security-system" src="/image/solution/security-system.jpg"
                  onClick={this.toTopPage}></img>
              <p>AN NINH CHỐNG TRỘM</p>
            </Col>
            <Col className="security-system_footer_col" span={8}>
              <img alt="led-rgb" src="/image/solution/led-rgb.jpg"
                  onClick={(event) => this.handleChangePage(event, LINK_RGB_LED)}></img>
              <p>ĐÈN LED 16 TRIỆU MÀU</p>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default withRouter(SecuritySystem);
