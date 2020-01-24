import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import '../../styles/guest/EnvironmentalControl.css';
import { LINK_GG_ASSISTANT, LINK_CONDITIONER_TIVI,
  LINK_SECURITY_SYSTEM, LINK_LIGHT_CONTROL, LINK_RGB_LED } from '../../constant'

class EnvironmentalControl extends Component {

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
      <div className="environmental-control">
        <div className="environmental-control_header">
          <div className="environmental-control_header_title">
            <h1>KIỂM SOÁT MÔI TRƯỜNG</h1>
            <p>Mọi lúc mọi nơi bạn luôn biết được nhiệt độ, độ ẩm và ánh sáng trong ngôi nhà của mình.</p>
          </div>
        </div>

        <div className="environmental-control_introduce">
          <p>Cảm biến chuyển động và cảm biến cửa của Lumi được tích hợp cảm biến môi trường, có thể xem là người “bác sỹ” cung cấp thông tin nhiệt độ, độ ẩm, ánh sáng trong ngôi nhà bạn.
            Khi nhiệt độ trong nhà quá nóng, cảm biến sẽ truyền thông tin đến bộ điều khiển trung tâm - HC, HC sẽ “ra lệnh” gửi tin đến smartphone của bạn,
            đồng thời kích hoạt bật điều hòa, quạt gió, đóng rèm cửa... để bạn luôn có một môi trường sống đảm bảo sức khỏe.</p>
          <Row className="environmental-control_introduce_image" gutter={[32, 8]}>
            <Col className="environmental-control_introduce_gg-home" span={12}>
              <img alt="google-assistant" src="/image/gg-assistant/gg-home.png"></img>
              <p>Kiểm soát môi trường bằng giọng nói tiếng Việt</p>
            </Col>
            <Col className="environmental-control_introduce_smartphone" span={12}>
              <img alt="smartphone" src="/image/gg-assistant/smartphone.png"></img>
              <p>Kiểm soát tình trạng ngôi nhà tại bất cứ đâu</p>
            </Col>
          </Row>
        </div>

        <div className="environmental-control_body">
          <img className="environmental-control_body_indicators-image" alt="cac-chi-so-ve-ngoi-nha" src="/image/environmental-control/cac-chi-so-ve-ngoi-nha.jpg"></img>
          <div className="environmental-control_body_indicators">
            <h1>CÁC CHỈ SỐ<br/>VỀ NGÔI NHÀ<br/>LUÔN ĐƯỢC CẬP NHẬT</h1>
            <p>Chỉ số nhiệt độ, độ ẩm, ánh sáng tại bất cứ căn phòng nào trong ngôi nhà khi không đảm bảo một môi trường sống khỏe đều được gửi đến điện thoại của bạn.</p>
          </div>

          <img className="environmental-control_body_device-image" alt="cam-bien-chuyen-dong" src="/image/environmental-control/cam-bien-chuyen-dong.png"></img>
          <div className="environmental-control_body_device">
            <h1>THIẾT BỊ<br/>ĐO MÔI TRƯỜNG</h1>
            <p>Cảm biến chuyển động của Chika là người “bác sỹ” giúp bạn đo nhiệt độ, độ ẩm và ánh sáng trong ngôi nhà, để đảm bảo gia đình bạn có không gian sống khỏe.</p>
          </div>
        </div>

        <div className="environmental-control_automatic">
          <div className="environmental-control_automatic_content">
            <h1>ĐIỀU HÒA TỰ ĐỘNG TẮT</h1>
            <p>Đảm bảo nhiệt độ phòng ổn định cho trẻ giấc ngủ ngon lành.</p>
          </div>
        </div>

        <div className="environmental-control_body">
          <img className="environmental-control_body_combine-device-image" alt="rem-tu-dong-khi-troi-qua-toi" src="/image/environmental-control/rem-tu-dong-khi-troi-qua-toi.jpg"></img>
          <div className="environmental-control_body_combine-device">
            <h1>KẾT HỢP THIẾT BỊ KHÁC<br/>TẠO NÊN<br/>ĐIỀU KỲ DIỆU</h1>
            <p>Rèm cửa tự động mở ra khi trời tối. hay đóng vào khi có ánh nắng chói chang.</p>
          </div>
        </div>

        <div className="environmental-control_auto-light">
          <h1>ĐÈN TỰ ĐỘNG SÁNG</h1>
          <div className="environmental-control_auto-light_image"></div>
        </div>

        <div className="environmental-control_body">
          <img className="environmental-control_body_door-sensor-image" alt="cam-bien-cua" src="/image/light-control/cam-bien-cua.png"></img>
          <div className="environmental-control_body_door-sensor">
            <h1>SANG TRỌNG<br/>TINH TẾ<br/>& ĐẲNG CẤP</h1>
            <p>Sản phẩm đầu tiên tại Việt Nam đạt chứng chỉ tiêu chuẩn xuất khẩu sang các nướ Châu Âu - CE và UL – được phép xuất khẩu tới 104 Quốc gia trên thế giới.</p>
          </div>
        </div>

        <div className="environmental-control_footer">
          <h1>CÁC GIẢI PHÁP KHÁC</h1>
          <Row className="environmental-control_footer_row">
            <Col className="environmental-control_footer_col" span={8}>
              <img alt="google-assistant" src="/image/solution/google-assistant.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_GG_ASSISTANT)}></img>
              <p>KẾT NỐI GOOGLE ASSISTANT</p>
            </Col>
            <Col className="environmental-control_footer_col" span={8}>
              <img alt="conditioner-tivi" src="/image/solution/conditioner-tivi.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_CONDITIONER_TIVI)}></img>
              <p>ĐIỀU HÒA, TV THÔNG MINH</p>
            </Col>
            <Col className="environmental-control_footer_col" span={8}>
              <img alt="light-control" src="/image/solution/light-control.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_LIGHT_CONTROL)}></img>
              <p>CHIẾU SÁNG THÔNG MINH</p>
            </Col>
          </Row>
          <Row className="environmental-control_footer_row">
            <Col className="light-control_footer_col" span={8}>
              <img alt="environmental-control" src="/image/solution/environmental-control.jpg"
                  onClick={this.toTopPage}></img>
              <p>KIỂM SOÁT MÔI TRƯỜNG</p>
            </Col>
            <Col className="environmental-control_footer_col" span={8}>
              <img alt="security-system" src="/image/solution/security-system.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_SECURITY_SYSTEM)}></img>
              <p>AN NINH CHỐNG TRỘM</p>
            </Col>
            <Col className="environmental-control_footer_col" span={8}>
              <img alt="led-rgb" src="/image/solution/led-rgb.jpg"
                  onClick={(event) => this.handleClickChangePage(event, LINK_RGB_LED)}></img>
                <p>ĐÈN LED 16 TRIỆU MÀU</p>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default withRouter(EnvironmentalControl);
