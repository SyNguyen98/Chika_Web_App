import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Icon, Row, Col } from 'antd';

import '../../styles/guest/home.component.css';
import { LINK_GG_ASSISTANT, LINK_LIGHT_CONTROL, LINK_CONDITIONER_TIVI,
  LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED, LINK_LOGIN, LINK_PRODUCT } from '../../constant'

class HomeComponent extends Component {

  handleClickChangePage = (link) => {
    this.props.history.push(link);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return(
      <div className="home-page">
        <div className="home-page__header">
          <div className="home-page__header__content">
            <h1>NHÀ THÔNG MINH CHIKA</h1>
            <p>Mang lại sự tiện nghi cho ngôi nhà của bạn.<br/>Giúp bạn lười biếng hơn trong ngôi nhà của mình.</p>
            <Button className="home-page__header__btn-login"
                    onClick={() => this.handleClickChangePage(LINK_LOGIN)}>Đăng Nhập</Button>
            <Button className="home-page__header__btn-product"
                    onClick={() => this.handleClickChangePage(LINK_PRODUCT)}>Tìm hiểu sản phẩm</Button>
          </div>
        </div>

        <div className="home_introduce">
          <h1><a>NHÀ THÔNG MINH</a> là gì?</h1>
          <p>Là ngôi nhà có hệ thống đèn chiếu sáng, điều hòa, bình nóng lạnh, rèm cửa, âm thanh đa vùng... được điều khiển, kiểm soát trên smartphone dù ở bất cứ nơi đâu và bằng chính giọng nói của gia chủ.</p>
        </div>

        <div className="home_body">
          <img className="home_body_gg-assitant-img"
              alt="google-assitant" src="/image/guest/home/google-assistant.png"
              onClick={() => this.handleClickChangePage(LINK_GG_ASSISTANT)}>
          </img>
          <div className="home_body_gg-assitant">
            <h1>TÍCH HỢP<br/>GOOGLE ASSISTANT</h1>
            <p>Điều khiển nhà bằng giọng nói tiếng Việt. Nhà thông minh Chika được Google cấp chứng nhận “Works with the Google Assistant”.</p>
            <Button shape="round" onClick={() => this.handleClickChangePage(LINK_GG_ASSISTANT)}>Xem thêm<Icon type="double-right" /></Button>
          </div>
        </div>

        <div className="home_security" onClick={() => this.handleClickChangePage(LINK_SECURITY_SYSTEM)}>
          <div className="home_security_content">
            <h1>AN NINH TOÀN DIỆN</h1>
            <p>Nhà thông minh đạt chuẩn CE</p>
            <Button shape="round" onClick={() => this.handleClickChangePage(LINK_SECURITY_SYSTEM)}>Xem thêm<Icon type="double-right" /></Button>
          </div>
        </div>

        <div className="home_body">
          <img className="home_body_led-rgb-img"
              alt="module-ir" src="/image/guest/home/led-rgb.jpg"
              onClick={() => this.handleClickChangePage(LINK_RGB_LED)}>
          </img>
          <div className="home_body_led-rgb">
            <h1>ĐÈN LED 16 TRIỆU MÀU</h1>
            <p>Bạn sẽ có không gian sinh động, một bữa tối lãng mạn, bữa tiệc sinh nhật ấn tượng với đèn Led 16 triệu sắc màu.</p>
            <Button shape="round" onClick={() => this.handleClickChangePage(LINK_RGB_LED)}>Xem thêm<Icon type="double-right" /></Button>
          </div>

          <img className="home_body_conditioner-tivi-img"
              alt="module-ir" src="/image/guest/home/air-conditioner-tivi.jpg"
              onClick={() => this.handleClickChangePage(LINK_CONDITIONER_TIVI)}>
          </img>
          <div className="home_body_conditioner-tivi">
            <h1>GIẢI PHÁP ĐIỀU HÒA - TIVI</h1>
            <p>Bộ điều khiển hồng ngoại – CA-IRX được Chika phát triển mạnh mẽ hơn.</p>
            <Button shape="round" onClick={() => this.handleClickChangePage(LINK_CONDITIONER_TIVI)}>Xem thêm<Icon type="double-right" /></Button>
          </div>
        </div>

        <div className="home_light-control" onClick={() => this.handleClickChangePage(LINK_LIGHT_CONTROL)}>
          <div className="home_light-control_content">
            <h1>CHIẾU SÁNG THÔNG MINH</h1>
            <p>Cảm biến chuyển động, cảm biến cầu thang của Chika không dùng pin giúp đèn cầu thang, hành lang...
              tự động bật sáng khi có sự chuyển động vào vùng cảm biến và tắt khi không có chuyển động</p>
            <Button shape="round" onClick={() => this.handleClickChangePage(LINK_LIGHT_CONTROL)}>Xem thêm<Icon type="double-right" /></Button>
          </div>
        </div>

        <div className="home_body">
          <div className="home_body_environmental-control-img">
            <img alt="module-ir" src="/image/guest/home/environmental-control.jpg" onClick={() => this.handleClickChangePage(LINK_ENVIRONMANTAL_CONTROL)}></img>
          </div>
          <div className="home_body_environmental-control">
            <h1>KIỂM SOÁT MÔI TRƯỜNG</h1>
            <p>Mọi lúc mọi nơi bạn luôn biết được nhiệt độ, độ ẩm và ánh sáng trong ngôi nhà của mình.</p>
            <Button shape="round" onClick={() => this.handleClickChangePage(LINK_ENVIRONMANTAL_CONTROL)}>Xem thêm<Icon type="double-right" /></Button>
          </div>
        </div>

        <div className="home_reasons">
          <h1>LÝ DO LỰA CHỌN CHIKA</h1>
          <Row>
            <Col className="home_reasons_col" span={8}>
              <img alt="first-reason" src="/image/guest/home/first-reason.png"></img>
              <p>Dễ dàng sử dụng</p>
            </Col>
            <Col className="home_reasons_col" span={8}>
              <img alt="second-reason" src="/image/guest/home/second-reason.png"></img>
              <p>Thiết kế sang trọng</p>
            </Col>
            <Col className="home_reasons_col" span={8}>
              <img alt="third-reason" src="/image/guest/home/third-reason.png"></img>
              <p>Giá thành hợp lý</p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(HomeComponent);
