import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import '../../../styles/guest/solution/light-control.component.css';
import SolutionFooterComponent from './solution-footer.component';

const imageUri = '/image/guest/solution/light-control/';

class LightControlComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Fragment className="light-control">
        <div className="light-control-header">
          <img alt="light-control-header" src={`${imageUri}banner-chieu-sang.jpg`} />
          <div className="light-control-header__content">
            <h1>CHIẾU SÁNG THÔNG MINH</h1>
            <p>Đem lại cho chủ nhà sự tiện lợi, linh động khi có thể điều khiển bằng giọng nói tiếng Việt.</p>
          </div>
        </div>

        <div className="light-control__introduce">
          Cuộc sống của bạn sẽ thú vị hơn với hệ thống đèn chiếu sáng trong ngôi nhà được điều khiển, kiểm soát dù ở bất cứ nơi đâu trên smartphone hay máy tính
          khi được kết nối Internet, 3G/4G. Đèn hành lang, cầu thang... sẽ tự động bật khi có người di chuyển và tắt khi không có người.
        </div>

        <Row className="light-control__row light-control__row1" gutter={40}>
          <Col className="light-control__row1__col1" span={12}>
            <img alt="chieu-sang-thong-minh-qua-dien-thoai" src={`${imageUri}chieu-sang-thong-minh-qua-dien-thoai.jpg`}/>
          </Col>
          <Col className="light-control__row1__col2" span={12}>
            <h1>TIỆN NGHI HỆ THỐNG<br/>ÁNH SÁNG TỰ ĐỘNG</h1>
            <p>Chika đã tích hợp thành công với light-control Assistant, giúp bật/tắt hệ thống chiếu sáng bằng giọng nói tiếng Việt dễ dàng, giải pháp mang đến cuộc sống vạn tiện nghi cho gia đình bạn.
              Khi ở xa, với chiếc smartphone được kết nối internet, bạn có thể điều khiển, kiểm soát hệ thống chiếu sáng 1 phòng hay toàn bộ ngôi nhà.</p>
          </Col>
        </Row>

        <div className="light-control__panel switch-2in1-panel">
          <img alt="switch-2in1-panel" src={`${imageUri}cong-tac-2in1.jpg`}/>
          <div className="switch-2in1-panel__content">
            <h1>CẢM BIẾN<br/>CHUYỂN ĐỘNG<br/>CẦU THANG 2IN1</h1>
            <p>Thiết bị điện thông minh này được Chika phát triển, dùng thay thế cho các công tắc cầu thang thông thường và cảm biến chuyển động, kết hợp 2 trong 1.
              Tự động bật đèn khi có chuyển động trong khu vực nhận diện và tự động tắt khi không có chuyển động.</p>
          </div>
        </div>

        <Row className="light-control__row light-control__row2" gutter={40}>
          <Col className="light-control__row2__col1" span={12}>
            <h1>CÔNG TẮC CẢM ỨNG</h1>
            <p>Sử dụng công nghệ cảm ứng điện dung, rất an toàn kể cả khi tay ướt chạm vào. 
              Vòng tròn tỏa sáng led giúp bạn nhận biết dễ dàng trạng thái đang bật/tắt của công tắc.</p>
          </Col>
          <Col className="light-control__row2__col2" span={12}>
            <img alt="cong-tac-cam-ung" src={`${imageUri}cong-tac-cam-ung.png`}/>
          </Col>
        </Row>

        <div className="light-control__auto-light">
          <h1>MỞ CỬA, ĐÈN TỰ SÁNG</h1>
          <img alt="mo-cua-den-sang" src={`${imageUri}mo-cua-den-sang.jpg`}/>
        </div>

        <Row className="light-control__row light-control__row3" gutter={40}>
          <Col className="light-control__row3__col1" span={12}>
            <img alt="hen-gio-chieu-sang" src={`${imageUri}hen-gio-chieu-sang.jpg`}/>
          </Col>
          <Col className="light-control__row3__col2" span={12}>
            <h1>HẸN GIỜ CHIẾU SÁNG</h1>
            <p>Hệ thống đèn chiếu sáng trong ngôi nhà sẽ tự động bật tắt theo giờ bạn cài đặt. Ví dụ: đèn ngủ tự động bật khi 10h tối và tắt khi 5h sáng.</p>
          </Col>
        </Row>

        <div className="light-control__panel motion-detector-panel">
          <img alt="motion-detector-panel" src={`${imageUri}cam-bien-chuyen-dong.jpg`}/>
          <div className="motion-detector-panel__content">
            <h1>CẢM BIẾN<br/>CHUYỂN ĐỘNG<br/>GẮN TRẦN</h1>
            <p>Thiết kế sang trọng – khác biệt
              <br/>Cảm biến chuyển động được chế tạo phù hợp để lắp trần thạch cao và có hỗ trợ lắp trần thường:
                Giúp phát hiện chuyển động khi có người di chuyển trong vùng cảm ứng và bật đèn.</p>
          </div>
        </div>

        <Row className="light-control__row light-control__row4" gutter={40}>
          <Col className="light-control__row4__col1" span={12}>
            <h1>CẢM BIẾN CỬA</h1>
            <p>Đèn sẽ tự động sáng khi cửa được mở ra và tắt khi cửa đóng.</p>
          </Col>
          <Col className="light-control__row4__col2" span={12}>
            <img alt="cam-bien-cua" src={`${imageUri}cam-bien-cua.png`}/>
          </Col>
        </Row>

        <SolutionFooterComponent history={this.props.history}/>
      </Fragment>
    )
  }
}

export default withRouter(LightControlComponent);
