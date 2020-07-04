import React, {Component} from 'react';
import {Button, Col, Row} from 'antd';
import RoundOrangeButton from "../../../components/button";
import {GUEST_HOME_IMG_URI} from "../../../constant/uri";
import {
  CONDITIONER_TV_LINK,
  ENVIRONMENTAL_CONTROL_LINK,
  GOOGLE_ASSISTANT_LINK,
  LIGHT_CONTROL_LINK,
  LOGIN_LINK,
  PRODUCT_LINK,
  RGB_LED_LINK,
  SECURITY_SYSTEM_LINK
} from "../../../constant/link";

import "./home.scss"

export default class HomeComponent extends Component {

  handleChangePage = (link) => {
    this.props.history.push(link);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return(
      <div className="home-page">
        <div className="header">
          <div className="content">
            <h1>NHÀ THÔNG MINH CHIKA</h1>
            <p>Mang lại sự tiện nghi cho ngôi nhà của bạn.</p>
            <Button className="button-login" onClick={() => this.handleChangePage(LOGIN_LINK)}>
              ĐĂNG NHẬP
            </Button>
            <Button className="button-product" onClick={() => this.handleChangePage(PRODUCT_LINK)}>
              TÌM HIỂU SẢN PHẨM
            </Button>
          </div>
        </div>

        <div className="_row">
          <div className="content">
            <h1>NHÀ THÔNG MINH là gì?</h1>
            <p>Là ngôi nhà có hệ thống đèn chiếu sáng, điều hòa, bình nóng lạnh, rèm cửa, âm thanh đa vùng...
              được điều khiển, kiểm soát trên smartphone dù ở bất cứ nơi đâu và bằng chính giọng nói của gia chủ.</p>
          </div>
          <img alt="smarthome" src={`${GUEST_HOME_IMG_URI}smarthome.jpg`}/>
        </div>

        <div className="_row">
          <img alt="google-assitant" src={`${GUEST_HOME_IMG_URI}google-assistant.png`}
               onClick={() => this.handleChangePage(GOOGLE_ASSISTANT_LINK)}/>
          <div className="content">
            <h1>TÍCH HỢP<br/>GOOGLE ASSISTANT</h1>
            <p>Điều khiển nhà bằng giọng nói tiếng Việt. Nhà thông minh Chika được Google cấp chứng nhận “Works with the Google Assistant”.</p>
            <RoundOrangeButton onClick={() => this.handleChangePage(GOOGLE_ASSISTANT_LINK)} />
          </div>
        </div>

        {/*<Row className="row row1">*/}
        {/*  <Col className="col1" span={12}>*/}
        {/*    <h1>NHÀ THÔNG MINH là gì?</h1>*/}
        {/*    <p>Là ngôi nhà có hệ thống đèn chiếu sáng, điều hòa, bình nóng lạnh, rèm cửa, âm thanh đa vùng... */}
        {/*      được điều khiển, kiểm soát trên smartphone dù ở bất cứ nơi đâu và bằng chính giọng nói của gia chủ.</p>*/}
        {/*  </Col>*/}
        {/*  <Col className="col2" span={12}>*/}
        {/*    <img alt="smarthome" src={`${GUEST_HOME_IMG_URI}smarthome.jpg`}/>*/}
        {/*  </Col>*/}
        {/*</Row>*/}

        {/*<Row className="row row2">*/}
        {/*  <Col className="col1" span={12}>*/}
        {/*    <img alt="google-assitant" src={`${GUEST_HOME_IMG_URI}google-assistant.png`}*/}
        {/*          onClick={() => this.handleChangePage(GOOGLE_ASSISTANT_LINK)}/>*/}
        {/*  </Col>*/}
        {/*  <Col className="col2" span={12}>*/}
        {/*    <h1>TÍCH HỢP<br/>GOOGLE ASSISTANT</h1>*/}
        {/*    <p>Điều khiển nhà bằng giọng nói tiếng Việt. Nhà thông minh Chika được Google cấp chứng nhận “Works with the Google Assistant”.</p>*/}
        {/*    <RoundOrangeButton onClick={() => this.handleChangePage(GOOGLE_ASSISTANT_LINK)} />*/}
        {/*  </Col>*/}
        {/*</Row>*/}

        <div className="panel security-panel" onClick={() => this.handleChangePage(SECURITY_SYSTEM_LINK)}>
          <img alt="security-panel" src={`${GUEST_HOME_IMG_URI}security.jpg`}/>
          <div className="content">
            <h1>AN NINH TOÀN DIỆN</h1>
            <p>Nhà thông minh đạt chuẩn CE</p>
            <RoundOrangeButton onClick={() => this.handleChangePage(SECURITY_SYSTEM_LINK)} />
          </div>
        </div>

        <Row className="row row3" gutter={40}>
          <Col className="row3__col1" span={12}>
            <h1>ĐÈN LED 16 TRIỆU MÀU</h1>
            <p>Bạn sẽ có không gian sinh động, một bữa tối lãng mạn, bữa tiệc sinh nhật ấn tượng với đèn Led 16 triệu sắc màu.</p>
            <RoundOrangeButton onClick={() => this.handleChangePage(RGB_LED_LINK)} />
          </Col>
          <Col className="row3__col2" span={12}>
            <img alt="led-rgb" src={`${GUEST_HOME_IMG_URI}led-rgb.jpg`}
                  onClick={() => this.handleChangePage(RGB_LED_LINK)}/>
          </Col>
        </Row>

        <Row className="row row4" gutter={40}>
          <Col className="row4__col1" span={12}>
            <img alt="google-assitant" src={`${GUEST_HOME_IMG_URI}air-conditioner-tivi.jpg`}
                  onClick={() => this.handleChangePage(CONDITIONER_TV_LINK)}/>
          </Col>
          <Col className="row4__col2" span={12}>
            <h1>GIẢI PHÁP ĐIỀU HÒA - TIVI</h1>
            <p>Bộ điều khiển hồng ngoại – CA-IRX được Chika phát triển mạnh mẽ hơn.</p>
            <RoundOrangeButton onClick={() => this.handleChangePage(CONDITIONER_TV_LINK)} />
          </Col>
        </Row>

        <div className="panel light-control-panel" onClick={() => this.handleChangePage(LIGHT_CONTROL_LINK)}>
          <img alt="light-control-panel" src={`${GUEST_HOME_IMG_URI}light-control.jpg`}/>
          <div className="content">
            <h1>CHIẾU SÁNG THÔNG MINH</h1>
            <p>Cảm biến chuyển động, cảm biến cầu thang của Chika không dùng pin giúp đèn cầu thang, hành lang...
              tự động bật sáng khi có sự chuyển động vào vùng cảm biến và tắt khi không có chuyển động</p>
            <RoundOrangeButton onClick={() => this.handleChangePage(LIGHT_CONTROL_LINK)} />
          </div>
        </div>

        <Row className="row row5" gutter={40}>
          <Col className="row5__col1" span={12}>
            <h1>KIỂM SOÁT MÔI TRƯỜNG</h1>
            <p>Mọi lúc mọi nơi bạn luôn biết được nhiệt độ, độ ẩm và ánh sáng trong ngôi nhà của mình.</p>
            <RoundOrangeButton onClick={() => this.handleChangePage(ENVIRONMENTAL_CONTROL_LINK)} />
          </Col>
          <Col className="row5__col2" span={12}>
            <img alt="led-rgb" src={`${GUEST_HOME_IMG_URI}environmental-control.jpg`}
                  onClick={() => this.handleChangePage(ENVIRONMENTAL_CONTROL_LINK)}/>
          </Col>
        </Row>

        <div className="reasons">
          <h1>LÝ DO LỰA CHỌN CHIKA</h1>
          <Row>
            <Col className="col" span={8}>
              <img alt="first-reason" src={`${GUEST_HOME_IMG_URI}first-reason.png`}/>
              <p>Dễ dàng sử dụng</p>
            </Col>
            <Col className="col" span={8}>
              <img alt="second-reason" src={`${GUEST_HOME_IMG_URI}second-reason.png`}/>
              <p>Thiết kế sang trọng</p>
            </Col>
            <Col className="col" span={8}>
              <img alt="third-reason" src={`${GUEST_HOME_IMG_URI}third-reason.png`}/>
              <p>Giá thành hợp lý</p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
