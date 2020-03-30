import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';

import '../../../styles/guest/solution/conditioner-tivi.component.css';
import SolutionFooterComponent from './solution-footer.component';

const imageUri = "/image/guest/solution/conditioner-tivi/";

class ConditionerTiviComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Fragment className="conditioner-tivi">
        <div className="conditioner-tivi-header">
          <img alt="conditioner-tivi-header" src={`${imageUri}dieu-khien-tv-banner.jpg`} />
          <div className="conditioner-tivi-header__content">
            <h1>GIẢI PHÁP THÔNG MINH<br/>CHO ĐIỀU HÒA, TIVI</h1>
            <p>Điều khiển điều hòa, tivi bằng giọng nói tiếng Việt mọi miền đầu tiên tại Việt Nam.</p>
          </div>
        </div>

        <div className="conditioner-tivi__introduce">
          Chika đã phát triển bộ dữ liệu điều khiển cho các thiết bị điều khiển hồng ngoại như Tivi, Quạt, Set-top Box, Điều hòa.
          CA-IRX được cải tiến vượt trội về tính năng và cách thức sử dụng, bạn dễ dàng lựa chọn, điều khiển các thiết bị điều khiển hồng ngoại.
          Giúp điều khiển bật chuyển kênh, tăng giảm tốc độ của quạt điện hay tăng giảm nhiệt độ điều hòa.
        </div>

        <Row className="conditioner-tivi__row google__row1" gutter={40}>
          <Col className="conditioner-tivi__row1__col1" span={12}>
            <img alt="ok-google-bat-tivi" src={`${imageUri}ok-google-bat-tivi.jpg`}/>
          </Col>
          <Col className="conditioner-tivi__row1__col2" span={12}>
            <h1>Dễ dàng điều khiển Tivi, Điều hòa, Quạt điện</h1>
            <p>Bạn có thể thao tác điều khiển, giám sát các thiết bị có sóng hồng ngoại trên điện thoại như tivi, điều hòa, quạt điện…
              qua apps trên điện thoại hoặc bằng giọng nói tiếng Việt qua thiết bị Google Assistant.</p>
          </Col>
        </Row>

        <Row className="conditioner-tivi__row google__row2" gutter={40}>
          <Col className="conditioner-tivi__row2__col1" span={12}>
            <h1>BỘ ĐIỀU KHIỂN<br/>HỒNG NGOẠI</h1>
            <p>Thay vì 10 cái remote bạn chỉ cần 1 chiếc điện thoại là hoàn toàn điều khiển được các thiết bị sử remote trong ngôi nhà.
              Bộ điều khiển hồng ngoại có thể học tới và lưu 1.000 lệnh của điều khiển remote.</p>
          </Col>
          <Col className="conditioner-tivi__row2__col2" span={12}>
            <img alt="bo-dieu-khien-hong-ngoai" src={`${imageUri}bo-dieu-khien-hong-ngoai.png`}/>
          </Col>
        </Row>

        <div className="conditioner-tivi__panel smartphone-panel">
          <img alt="smartphone-panel" src={`${imageUri}dieu-khien-dieu-hoa-qua-dt.jpg`}/>
          <div className="smartphone-panel__content">
            <h1>ĐIỀU KHIỂN ĐIỀU HÒA QUA SMART PHONE</h1>
            <p>Dù ở bất cứ nơi đâu, bạn vẫn có thể điều khiển, kiểm soát điều hòa trên smartphone khi được kết nối internet, 3G/4G.
              Giúp bạn xua tan nỗi lo quên tắt các thiết bị điện khi ra ngoài.</p>
          </div>
        </div>

        <Row className="conditioner-tivi__row conditioner-tivi__row3" gutter={40}>
          <Col className="conditioner-tivi__row3__col1" span={12}>
            <img alt="lap-ir" src={`${imageUri}lap-ir.jpg`}/>
          </Col>
          <Col className="conditioner-tivi__row3__col2" span={12}>
            <h1>DỄ DÀNG LẮP ĐẶT<br/>HỌC LỆNH NHANH CHÓNG</h1>
            <p>Chưa đầy 20 phút lắp đặt và cài câu lệnh, bạn đã có ngay ngôi nhà tiện nghi. 
              Sản phẩm đạt chuẩn CE và UL – được phép xuất khẩu tới 104 quốc gia trên thế giới.</p>
          </Col>
        </Row>

        <div className="conditioner-tivi__replace-remote">
          <h1>ĐIỀU HÒA, TIVI THÔNG MINH</h1>
          <h2>Thay remote làm những điều bạn muốn</h2>
          <img alt="thay-remote" src={`${imageUri}thay-remote.jpg`}/>
        </div>

        <Row className="conditioner-tivi__row conditioner-tivi__row4" gutter={40}>
          <Col className="conditioner-tivi__row4__col1" span={12}>
            <h1>THỂ HIỆN ĐẲNG CẤP CỦA CHÍNH BẠN</h1>
            <p>Ngôi nhà sẽ làm bất cứ vị khách nào đến thăm cũng phải ngạc nhiên. Thể hiện đẳng cấp của chính bạn.
              <br/>CA-IRX cải tiến giao diện và trải nghiệm người dùng khi cài đặt thiết lập:
              <br/>+ IRX có sẵn các tập dữ liệu trên server, chỉ cần lựa chọn và sử dụng. Đơn giản hơn trong quá trình lắp đặt cấu hình.
              <br/>+ Với IRX, các ngữ cảnh điều khiển điều hòa đem lại trải nghiệm tốt hơn.</p>
          </Col>
          <Col className="conditioner-tivi__row4__col2" span={12}>
            <img alt="bo-dieu-khien-hong-ngoai" src={`${imageUri}bo-dieu-khien-hong-ngoai2.png`}/>
          </Col>
        </Row>

        <SolutionFooterComponent history={this.props.history}/>
      </Fragment>
    )
  }
}

export default withRouter(ConditionerTiviComponent);
