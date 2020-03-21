import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import '../../../styles/guest/solution/google.component.css';
import { LINK_LIGHT_CONTROL, LINK_CONDITIONER_TIVI,
  LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED } from '../../../constant'

class GoogleComponent extends Component {

  handleChangePage = (link) => {
    this.props.history.push(link);
  }

  toTopPage = () => {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="gg-assistant">
        <div className="gg-assistant_header">
          <div className="gg-assistant_header_title">
            <h1>TÍCH HỢP<br/>GOOGLE ASSISTANT</h1>
            <p>Nhà thông minh Chika chính thức được Google cấp chứng nhận “Works with the Google Assistant”.</p>
          </div>
        </div>

        <div className="gg-assistant_introduce">
          <p>Nhà thông minh Chika chính thức được Google cấp chứng nhận “Works with the Google Assistant” tích hợp trợ lý ảo Voice Control.
          Đạt được điều này, Chika đã vượt qua những tiêu chuẩn cực kỳ khắt khe của Google. Nhà thông minh Chika giờ đây sẽ được điều khiển qua trợ lý ảo Google Assistant
          với Voice control bằng tất cả ngôn ngữ, đặc biệt là GIỌNG NÓI TIẾNG VIỆT mà Google vừa mới cho ra mắt.</p>
          <Row className="gg-assistant_introduce_image" gutter={[32, 8]}>
            <Col className="gg-assistant_introduce_gg-home" span={12}>
              <img alt="google-home" src="/image/guest/solution/google/gg-home.png"></img>
              <p>Điều khiển bằng giọng nói tiếng Việt mọi miền</p>
            </Col>
            <Col className="gg-assistant_introduce_smartphone" span={12}>
              <img alt="smartphone" src="/image/guest/solution/google/smartphone.png"></img>
              <p>Điều khiển qua smartphone mọi lúc mọi nơi</p>
            </Col>
          </Row>
        </div>

        <div className="gg-assistant_body">
          <img className="gg-assistant_body_open-light-image" alt="ok-google-bat-den" src="/image/guest/solution/google/ok-google-bat-den.jpg"></img>
          <div className="gg-assistant_body_open-light">
            <h1>"OK GOOGLE, BẬT ĐÈN"</h1>
            <p>Hệ thống điện chiếu sáng được bật/tắt chỉ với câu lệnh: “Ok Google, bật đèn chùm phòng khách”.
              Trong nháy mắt, hệ thống đèn nhà bạn sẽ được bật lên. Chika giúp bạn thể hiện giọng nói “quyền năng” trong chính ngôi nhà mình.</p>
          </div>

          <img className="gg-assistant_body_open-conditioner-image" alt="ok-google-bat-dieu-hoa" src="/image/guest/solution/google/ok-google-bat-dieu-hoa.jpg"></img>
          <div className="gg-assistant_body_open-conditioner">
            <h1>"OK GOOGLE, BẬT ĐIỀU HÒA"</h1>
            <p>Hệ thống rèm hay điều hòa, TV, bình nóng lạnh… cũng sẽ nhanh chóng được điều khiển bằng giọng nói tiếng Việt.</p>
          </div>

          <img className="gg-assistant_body_open-sound-image" alt="ok-google-bat-nhac" src="/image/guest/solution/google/ok-google-bat-nhac.jpg"></img>
          <div className="gg-assistant_body_open-sound">
            <h1>"OK GOOGLE, BẬT NHẠC"</h1>
            <p>Được kết nối trực tiếp với google assistant, giải pháp tích hợp giữa nhà thông minh Chika với Google Assistant giúp bạn thưởng thức bất cứ bài nhạc nào bạn muốn.</p>
          </div>

          <img className="gg-assistant_body_design-image" alt="ok-google-bat-nhac" src="/image/guest/solution/google/gg-home-design.png"></img>
          <div className="gg-assistant_body_design">
            <h1>THIẾT KẾ TINH TẾ</h1>
            <p>Màu sắc sang trọng, tinh tế, luxury trên từng đường nét.</p>
          </div>
        </div>

        <div className="gg-assistant_footer">
          <h1>CÁC GIẢI PHÁP KHÁC</h1>
          <Row className="gg-assistant_footer_row">
            <Col className="gg-assistant_footer_col" span={8}>
              <img alt="google-assistant" src="/image/guest/solution/google-assistant.jpg"
                  onClick={this.toTopPage}></img>
              <p>KẾT NỐI GOOGLE ASSISTANT</p>
            </Col>
            <Col className="gg-assistant_footer_col" span={8}>
              <img alt="conditioner-tivi" src="/image/guest/solution/conditioner-tivi.jpg"
                  onClick={() => this.handleChangePage(LINK_CONDITIONER_TIVI)}></img>
              <p>ĐIỀU HÒA, TV THÔNG MINH</p>
            </Col>
            <Col className="gg-assistant_footer_col" span={8}>
              <img alt="light-control" src="/image/guest/solution/light-control.jpg"
                  onClick={() => this.handleChangePage(LINK_LIGHT_CONTROL)}></img>
              <p>CHIẾU SÁNG THÔNG MINH</p>
            </Col>
          </Row>
          <Row className="gg-assistant_footer_row">
            <Col className="gg-assistant_footer_col" span={8}>
              <img alt="environmental-control" src="/image/guest/solution/environmental-control.jpg"
                  onClick={() => this.handleChangePage(LINK_ENVIRONMANTAL_CONTROL)}></img>
              <p>KIỂM SOÁT MÔI TRƯỜNG</p>
            </Col>
            <Col className="gg-assistant_footer_col" span={8}>
              <img alt="security-system" src="/image/guest/solution/security-system.jpg"
                  onClick={() => this.handleChangePage(LINK_SECURITY_SYSTEM)}></img>
              <p>AN NINH CHỐNG TRỘM</p>
            </Col>
            <Col className="gg-assistant_footer_col" span={8}>
              <img alt="led-rgb" src="/image/guest/solution/led-rgb.jpg"
                  onClick={() => this.handleChangePage(LINK_RGB_LED)}></img>
                <p>ĐÈN LED 16 TRIỆU MÀU</p>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default withRouter(GoogleComponent);
