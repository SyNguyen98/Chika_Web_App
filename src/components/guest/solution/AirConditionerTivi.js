import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import '../../../styles/guest/solution/AirConditionerTivi.css';
import { LINK_GG_ASSISTANT, LINK_LIGHT_CONTROL,
  LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED } from '../../../constant'

class AirConditionerTivi extends Component {

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
      <div className="conditioner-tivi">
        <div className="conditioner-tivi_header">
          <div className="conditioner-tivi_header_title">
            <h1>GIẢI PHÁP THÔNG MINH<br/>CHO ĐIỀU HÒA, TIVI</h1>
            <p>Điều khiển điều hòa, tivi bằng giọng nói tiếng Việt mọi miền đầu tiên tại Việt Nam.</p>
          </div>
        </div>

        <div className="conditioner-tivi_introduce">
          Chika đã phát triển bộ dữ liệu điều khiển cho các thiết bị điều khiển hồng ngoại như Tivi, Quạt, Set-top Box, Điều hòa.
          CA-IRX được cải tiến vượt trội về tính năng và cách thức sử dụng, bạn dễ dàng lựa chọn, điều khiển các thiết bị điều khiển hồng ngoại.
          Giúp điều khiển bật chuyển kênh, tăng giảm tốc độ của quạt điện hay tăng giảm nhiệt độ điều hòa.
        </div>

        <div className="conditioner-tivi_body">
          <img className="conditioner-tivi_body_open-tivi-image" alt="ok-google-bat-den" src="/image/conditioner-tivi/ok-google-bat-tivi.jpg"></img>
          <div className="conditioner-tivi_body_open-tivi">
            <h1>Dễ dàng điều khiển Tivi, Điều hòa, Quạt điện</h1>
            <p>Bạn có thể thao tác điều khiển, giám sát các thiết bị có sóng hồng ngoại trên điện thoại như tivi, điều hòa, quạt điện…
              qua apps trên điện thoại hoặc bằng giọng nói tiếng Việt qua thiết bị Google Assistant.</p>
          </div>

          <img className="conditioner-tivi_body_module-ir-image" alt="ok-google-bat-dieu-hoa" src="/image/conditioner-tivi/bo-dieu-khien-hong-ngoai.png"></img>
          <div className="conditioner-tivi_body_module-ir">
            <h1>BỘ ĐIỀU KHIỂN HỒNG NGOẠI</h1>
            <p>Thay vì 10 cái remote bạn chỉ cần 1 chiếc điện thoại là hoàn toàn điều khiển được các thiết bị sử remote trong ngôi nhà.
              Bộ điều khiển hồng ngoại có thể học tới và lưu 1.000 lệnh của điều khiển remote.</p>
          </div>
        </div>

        <div className="conditioner-tivi_smartphone">
          <div className="conditioner-tivi_smartphone_content">
            <h1>ĐIỀU KHIỂN ĐIỀU HÒA QUA SMART PHONE</h1>
            <p>Dù ở bất cứ nơi đâu, bạn vẫn có thể điều khiển, kiểm soát điều hòa trên smartphone khi được kết nối internet, 3G/4G.
              Giúp bạn xua tan nỗi lo quên tắt các thiết bị điện khi ra ngoài.</p>
          </div>
        </div>

        <div className="conditioner-tivi_body">
          <img className="conditioner-tivi_body_set-up-image" alt="ok-google-bat-dieu-hoa" src="/image/conditioner-tivi/lap-ir.jpg"></img>
          <div className="conditioner-tivi_body_set-up">
            <h1>DỄ DÀNG LẮP ĐẶT<br/>HỌC LỆNH NHANH CHÓNG</h1>
            <p>Chưa đầy 20 phút lắp đặt và cài câu lệnh, bạn đã có ngay ngôi nhà tiện nghi. Sản phẩm đạt chuẩn CE và UL – được phép xuất khẩu tới 104 quốc gia trên thế giới.</p>
          </div>
        </div>

        <div className="conditioner-tivi_replace-remote">
          <h1>ĐIỀU HÒA, TIVI THÔNG MINH</h1>
          <h2>Thay remote làm những điều bạn muốn</h2>
          <div className="conditioner-tivi_replace-remote_image"></div>
        </div>

        <div className="conditioner-tivi_body">
          <img className="conditioner-tivi_body_module-ir-design-image" alt="ok-google-bat-den" src="/image/conditioner-tivi/bo-dieu-khien-hong-ngoai2.png"></img>
          <div className="conditioner-tivi_body_module-ir-design">
            <h1>THỂ HIỆN ĐẲNG CẤP CỦA CHÍNH BẠN</h1>
            <p>Ngôi nhà sẽ làm bất cứ vị khách nào đến thăm cũng phải ngạc nhiên. Thể hiện đẳng cấp của chính bạn.
              <br/>CA-IRX cải tiến giao diện và trải nghiệm người dùng khi cài đặt thiết lập:
              <br/>+ IRX có sẵn các tập dữ liệu trên server, chỉ cần lựa chọn và sử dụng. Đơn giản hơn trong quá trình lắp đặt cấu hình.
              <br/>+ Với IRX, các ngữ cảnh điều khiển điều hòa đem lại trải nghiệm tốt hơn.</p>
          </div>
        </div>

        <div className="conditioner-tivi-footer">
          <h1>CÁC GIẢI PHÁP KHÁC</h1>
          <Row className="conditioner-tivi-footer_row">
            <Col className="conditioner-tivi-footer_col" span={8}>
              <img alt="google-assistant" src="/image/solution/google-assistant.jpg"
                  onClick={(event) => this.handleChangePage(event, LINK_GG_ASSISTANT)}></img>
              <p>KẾT NỐI GOOGLE ASSISTANT</p>
            </Col>
            <Col className="conditioner-tivi-footer_col" span={8}>
              <img alt="conditioner-tivi" src="/image/solution/conditioner-tivi.jpg"
                  onClick={this.toTopPage}></img>
              <p>ĐIỀU HÒA, TV THÔNG MINH</p>
            </Col>
            <Col className="conditioner-tivi-footer_col" span={8}>
              <img alt="light-control" src="/image/solution/light-control.jpg"
                  onClick={(event) => this.handleChangePage(event, LINK_LIGHT_CONTROL)}></img>
              <p>CHIẾU SÁNG THÔNG MINH</p>
            </Col>
          </Row>
          <Row className="conditioner-tivi-footer_row">
            <Col className="conditioner-tivi-footer_col" span={8}>
              <img alt="environmental-control" src="/image/solution/environmental-control.jpg"
                  onClick={(event) => this.handleChangePage(event, LINK_ENVIRONMANTAL_CONTROL)}></img>
              <p>KIỂM SOÁT MÔI TRƯỜNG</p>
            </Col>
            <Col className="conditioner-tivi-footer_col" span={8}>
              <img alt="security-system" src="/image/solution/security-system.jpg"
                  onClick={(event) => this.handleChangePage(event, LINK_SECURITY_SYSTEM)}></img>
              <p>AN NINH CHỐNG TRỘM</p>
            </Col>
            <Col className="conditioner-tivi-footer_col" span={8}>
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

export default withRouter(AirConditionerTivi);
