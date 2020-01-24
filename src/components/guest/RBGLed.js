import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import '../../styles/guest/RBGLed.css';
import { LINK_GG_ASSISTANT, LINK_CONDITIONER_TIVI,
  LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_LIGHT_CONTROL } from '../../constant'

class RBGLed extends Component {

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
      <div className="rgb-led">
        <div className="rgb-led_header">
          <div className="rgb-led_header_title">
            <h1>GIẢI PHÁP<br/>ĐÈN LED 16 TRIỆU MÀU</h1>
            <p>Không gian sống sinh động với 16 triệu sắc màu, tùy biến theo ý muốn của bạn.</p>
          </div>
        </div>

        <div className="rgb-led_introduce">
          Bộ điều khiển đèn Led 16 triệu màu Chika cho bạn không gian sống sinh động, một bữa tiệc sinh nhật ấn tượng với gam màu hồng và ánh đèn vàng cho bữa tối lãng mạn.
          Chỉ cần nói những câu lệnh tự nhiên nhất là bạn đã có ngay sắc xanh mong muốn. Ngoài ra, bạn có thể thay đổi màu sắc đèn trên smartphone hay cài đặt hoạt cảnh
          với các thiết bị khác trong ngôi nhà như: phát nhạc, mở rèm, tắt đèn sáng phòng khách ... bạn sẽ có ngay không gian thư giãn lý tưởng.
        </div>

        <div className="rgb-led_body">
          <img className="rgb-led_body_color-space-image" alt="khong-gian-da-mau-sac" src="/image/rgb-led/khong-gian-da-mau-sac.jpg"></img>
          <div className="rgb-led_body_color-space">
            <h1>KHÔNG GIAN ĐA<br/>MÀU SẮC</h1>
            <p>Không gian nhà bạn sẽ trở nên sinh động với 16 triệu màu sắc tùy biến theo từng không gian và sự kiện, giúp bạn có một bữa tiệc sinh nhật,
              đêm noel hay năm mới lãng mạn và hạnh phúc.</p>
          </div>
        </div>

        <div className="rgb-led_change-color">
          <div className="rgb-led_change-color_content">
            <h1>ĐỔI MÀU SẮC<br/>NHƯ BẠN MUỐN</h1>
            <p>Tận hưởng không gian sắc màu theo đúng tâm trạng, sẽ giúp bạn thư giãn thoải mái nhất.</p>
          </div>
        </div>

        <div className="rgb-led_body">
          <img className="rgb-led_body_combine-device-image" alt="led-ket-hop-cung-thiet-bi-khac" src="/image/rgb-led/led-ket-hop-cung-thiet-bi-khac.jpg"></img>
          <div className="rgb-led_body_combine-device">
            <h1>KẾT HỢP THIẾT BỊ KHÁC</h1>
            <p>Hòa chung với âm nhạc, sắc màu rực rỡ và ánh sáng chan hòa. Ngôi nhà bạn sẽ là nơi bạn luôn muốn trở về.</p>
          </div>
        </div>

        <div className="rgb-led_timer">
          <h1>HẸN GIỜ ĐỔI MÀU SẮC</h1>
          <div className="rgb-led_timer_image"></div>
        </div>

        <div className="rgb-led_footer">
          <h1>CÁC GIẢI PHÁP KHÁC</h1>
          <Row className="rgb-led_footer_row">
            <Col className="rgb-led_footer_col" span={8}>
              <img alt="google-assistant" src="/image/solution/google-assistant.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_GG_ASSISTANT)}></img>
              <p>KẾT NỐI GOOGLE ASSISTANT</p>
            </Col>
            <Col className="rgb-led_footer_col" span={8}>
              <img alt="conditioner-tivi" src="/image/solution/conditioner-tivi.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_CONDITIONER_TIVI)}></img>
              <p>ĐIỀU HÒA, TV THÔNG MINH</p>
            </Col>
            <Col className="rgb-led_footer_col" span={8}>
              <img alt="light-control" src="/image/solution/light-control.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_LIGHT_CONTROL)}></img>
              <p>CHIẾU SÁNG THÔNG MINH</p>
            </Col>
          </Row>
          <Row className="rgb-led_footer_row">
            <Col className="rgb-led_footer_col" span={8}>
              <img alt="environmental-control" src="/image/solution/environmental-control.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_ENVIRONMANTAL_CONTROL)}></img>
              <p>KIỂM SOÁT MÔI TRƯỜNG</p>
            </Col>
            <Col className="rgb-led_footer_col" span={8}>
              <img alt="security-system" src="/image/solution/security-system.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_SECURITY_SYSTEM)}></img>
              <p>AN NINH CHỐNG TRỘM</p>
            </Col>
            <Col className="rgb-led_footer_col" span={8}>
              <img alt="led-rgb" src="/image/solution/led-rgb.jpg"
                  onClick={this.toTopPage}></img>
              <p>ĐÈN LED 16 TRIỆU MÀU</p>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default withRouter(RBGLed);
