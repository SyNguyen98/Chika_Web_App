import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import '../../../styles/guest/solution/rgb-led.component.css';
import SolutionFooterComponent from './solution-footer.component';

const imageUri = '/image/guest/solution/rgb-led/'

class RgbLedComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Fragment className="rgb-led">
        <div className="rgb-led-header">
          <img alt="banner-led-16-trieu-mau" src={`${imageUri}banner-led-16-trieu-mau.jpg`} />
          <div className="rgb-led-header__content">
            <h1>GIẢI PHÁP<br/>ĐÈN LED 16 TRIỆU MÀU</h1>
            <p>Không gian sống sinh động với 16 triệu sắc màu, tùy biến theo ý muốn của bạn.</p>
          </div>
        </div>

        <div className="rgb-led__introduce">
          Bộ điều khiển đèn Led 16 triệu màu Chika cho bạn không gian sống sinh động, một bữa tiệc sinh nhật ấn tượng với gam màu hồng và ánh đèn vàng cho bữa tối lãng mạn.
          Chỉ cần nói những câu lệnh tự nhiên nhất là bạn đã có ngay sắc xanh mong muốn. Ngoài ra, bạn có thể thay đổi màu sắc đèn trên smartphone hay cài đặt hoạt cảnh
          với các thiết bị khác trong ngôi nhà như: phát nhạc, mở rèm, tắt đèn sáng phòng khách ... bạn sẽ có ngay không gian thư giãn lý tưởng.
        </div>

        <Row className="rgb-led__row rgb-led__row1" gutter={40}>
          <Col className="rgb-led__row1__col1" span={12}>
            <img alt="khong-gian-da-mau-sac" src={`${imageUri}khong-gian-da-mau-sac.jpg`}/>
          </Col>
          <Col className="rgb-led__row1__col2" span={12}>
            <h1>KHÔNG GIAN ĐA<br/>MÀU SẮC</h1>
            <p>Không gian nhà bạn sẽ trở nên sinh động với 16 triệu màu sắc tùy biến theo từng không gian và sự kiện, giúp bạn có một bữa tiệc sinh nhật,
              đêm noel hay năm mới lãng mạn và hạnh phúc.</p>
          </Col>
        </Row>

        <div className="rgb-led__panel change-color-panel">
          <img alt="change-color-panel" src={`${imageUri}doi-mau-sac.jpg`}/>
          <div className="change-color-panel__content">
            <h1>ĐỔI MÀU SẮC<br/>NHƯ BẠN MUỐN</h1>
            <p>Tận hưởng không gian sắc màu theo đúng tâm trạng, sẽ giúp bạn thư giãn thoải mái nhất.</p>
          </div>
        </div>

        <Row className="rgb-led__row rgb-led__row2" gutter={40}>
          <Col className="rgb-led__row2__col1" span={12}>
            <h1>KẾT HỢP THIẾT BỊ KHÁC</h1>
            <p>Hòa chung với âm nhạc, sắc màu rực rỡ và ánh sáng chan hòa. Ngôi nhà bạn sẽ là nơi bạn luôn muốn trở về.</p>
          </Col>
          <Col className="rgb-led__row2__col2" span={12}>
            <img alt="led-ket-hop-cung-thiet-bi-khac" src={`${imageUri}led-ket-hop-cung-thiet-bi-khac.jpg`}/>
          </Col>
        </Row>

        <div className="rgb-led__timer">
          <h1>HẸN GIỜ ĐỔI MÀU SẮC</h1>
          <img alt="hen-gio-doi-mau-sac-led" src={`${imageUri}hen-gio-doi-mau-sac-led.jpg`}/>
        </div>

        <SolutionFooterComponent history={this.props.history}/>
      </Fragment>
    )
  }
}

export default withRouter(RgbLedComponent);
