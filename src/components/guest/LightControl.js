import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import '../../styles/guest/LightControl.css';
import { LINK_GG_ASSISTANT, LINK_CONDITIONER_TIVI,
  LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED } from '../../constant'

class LightControl extends Component {

  handleClickChangePage = (event, link) => {
    event.preventDefault();
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
      <div className="light-control">
        <div className="light-control_header">
          <div className="light-control_header_title">
            <h1>CHIẾU SÁNG THÔNG MINH</h1>
            <p>Đem lại cho chủ nhà sự tiện lợi, linh động khi có thể điều khiển bằng giọng nói tiếng Việt.</p>
          </div>
        </div>

        <div className="light-control_introduce">
          Cuộc sống của bạn sẽ thú vị hơn với hệ thống đèn chiếu sáng trong ngôi nhà được điều khiển, kiểm soát dù ở bất cứ nơi đâu trên smartphone hay máy tính
          khi được kết nối Internet, 3G/4G. Đèn hành lang, cầu thang... sẽ tự động bật khi có người di chuyển và tắt khi không có người.
        </div>

        <div className="light-control_body">
          <img className="light-control_body_auto-light-image" alt="ok-google-bat-den" src="/image/light-control/chieu-sang-thong-minh-qua-dien-thoai.jpg"></img>
          <div className="light-control_body_auto-light">
            <h1>TIỆN NGHI HỆ THỐNG<br/>ÁNH SÁNG TỰ ĐỘNG</h1>
            <p>Chika đã tích hợp thành công với Google Assistant, giúp bật/tắt hệ thống chiếu sáng bằng giọng nói tiếng Việt dễ dàng, giải pháp mang đến cuộc sống vạn tiện nghi cho gia đình bạn.
              Khi ở xa, với chiếc smartphone được kết nối internet, bạn có thể điều khiển, kiểm soát hệ thống chiếu sáng 1 phòng hay toàn bộ ngôi nhà.</p>
          </div>

          <img className="light-control_body_switch-image" alt="ok-google-bat-dieu-hoa" src="/image/light-control/cong-tac-cam-ung.png"></img>
          <div className="light-control_body_switch">
            <h1>CÔNG TẮC CẢM ỨNG</h1>
            <p>Sử dụng công nghệ cảm ứng điện dung, rất an toàn kể cả khi tay ướt chạm vào. Vòng tròn tỏa sáng led giúp bạn nhận biết dễ dàng trạng thái đang bật/tắt của công tắc.</p>
          </div>
        </div>

        <div className="light-control_switch-2in1">
          <div className="light-control_switch-2in1_content">
            <h1>CẢM BIẾN CHUYỂN ĐỘNG CẦU THANG 2IN1</h1>
            <p>Thiết bị điện thông minh này được Chika phát triển, dùng thay thế cho các công tắc cầu thang thông thường và cảm biến chuyển động, kết hợp 2 trong 1.
              Tự động bật đèn khi có chuyển động trong khu vực nhận diện và tự động tắt khi không có chuyển động.</p>
          </div>
        </div>

        <div className="light-control_body">
          <img className="light-control_body_timer-image" alt="ok-google-bat-dieu-hoa" src="/image/light-control/hen-gio-chieu-sang.jpg"></img>
          <div className="light-control_body_timer">
            <h1>HẸN GIỜ CHIẾU SÁNG</h1>
            <p>Hệ thống đèn chiếu sáng trong ngôi nhà sẽ tự động bật tắt theo giờ bạn cài đặt. Ví dụ: đèn ngủ tự động bật khi 10h tối và tắt khi 5h sáng.</p>
          </div>
        </div>

        <div className="light-control_auto-light">
          <h1>MỞ CỬA, ĐÈN TỰ SÁNG</h1>
          <div className="light-control_auto-light_image"></div>
        </div>

        <div className="light-control_body">
          <img className="light-control_body_door-sensor-image" alt="ok-google-bat-den" src="/image/light-control/cam-bien-cua.png"></img>
          <div className="light-control_body_door-sensor">
            <h1>CẢM BIẾN CỬA</h1>
            <p>Đèn sẽ tự động sáng khi cửa được mở ra và tắt khi cửa đóng.</p>
          </div>
        </div>

        <div className="light-control_motion-detector">
          <div className="light-control_motion-detector_content">
            <h1>CẢM BIẾN CHUYỂN ĐỘNG GẮN TRẦN</h1>
            <p>Thiết kế sang trọng – khác biệt
              <br/>Cảm biến chuyển động được chế tạo phù hợp để lắp trần thạch cao và có hỗ trợ lắp trần thường:
                Giúp phát hiện chuyển động khi có người di chuyển trong vùng cảm ứng và bật đèn.</p>
          </div>
        </div>

        <div className="light-control_footer">
          <h1>CÁC GIẢI PHÁP KHÁC</h1>
          <Row className="light-control_footer_row">
            <Col className="light-control_footer_col" span={8}>
              <img alt="google-assistant" src="/image/solution/google-assistant.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_GG_ASSISTANT)}></img>
              <p>KẾT NỐI GOOGLE ASSISTANT</p>
            </Col>
            <Col className="light-control_footer_col" span={8}>
              <img alt="conditioner-tivi" src="/image/solution/conditioner-tivi.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_CONDITIONER_TIVI)}></img>
              <p>ĐIỀU HÒA, TV THÔNG MINH</p>
            </Col>
            <Col className="light-control_footer_col" span={8}>
              <img alt="light-control" src="/image/solution/light-control.jpg"
                  onClick={this.toTopPage}></img>
              <p>CHIẾU SÁNG THÔNG MINH</p>
            </Col>
          </Row>
          <Row className="light-control_footer_row">
            <Col className="light-control_footer_col" span={8}>
              <img alt="environmental-control" src="/image/solution/environmental-control.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_ENVIRONMANTAL_CONTROL)}></img>
              <p>KIỂM SOÁT MÔI TRƯỜNG</p>
            </Col>
            <Col className="light-control_footer_col" span={8}>
              <img alt="security-system" src="/image/solution/security-system.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_SECURITY_SYSTEM)}></img>
              <p>AN NINH CHỐNG TRỘM</p>
            </Col>
            <Col className="light-control_footer_col" span={8}>
              <img alt="led-rgb" src="/image/solution/led-rgb.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_RGB_LED)}></img>
              <p>LED 16 TRIỆU MÀU</p>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default withRouter(LightControl);
