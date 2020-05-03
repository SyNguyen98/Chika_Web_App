import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';

import SolutionFooterComponent from '../footer';

import "./security-system.css"

import {SECURITY_SYSTEM_IMG_URI} from "../../../../constant/uri";

export default class SecuritySystemComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Fragment className="security-system">
        <div className="security-system-header">
          <img alt="security-system-header" src={`${SECURITY_SYSTEM_IMG_URI}banner-an-ninh.jpg`} />
          <div className="security-system-header__content">
            <h1>GIẢI PHÁP<br/>AN NINH TOÀN DIỆN</h1>
            <p>Bảo vệ ngôi nhà 24/24 với tính năng cảnh báo và kích hoạt an ninh thông minh.</p>
          </div>
        </div>

        <div className="security-system__introduce">
          Giải pháp an ninh toàn diện cho ngôi nhà của bạn được tích hợp camera thông minh giúp tăng cường cảnh báo chống trộm.
          Đặc biệt, hệ thống ChikaHome tích hợp camera có tính năng phát hiện mọi chuyển động.
          Trên apps ChikaHome có thể xem trực tuyến hoặc xem lại các video giám sát, khoanh vùng bảo mật trên app với một số vị trí quan trọng trong nhà
          và phát hiện chuyển động trong vùng cấm.
        </div>

        <Row className="security-system__row security-system__row1" gutter={40}>
          <Col className="security-system__row1__col1" span={12}>
            <img alt="an-ninh-qua-dien-thoai" src={`${SECURITY_SYSTEM_IMG_URI}an-ninh-qua-dien-thoai.jpg`}/>
          </Col>
          <Col className="security-system__row1__col2" span={12}>
            <h1>GIÁM SÁT<br/>QUA ĐIỆN THOẠI</h1>
            <p>Cho dù ở bất cứ đâu bạn cũng có thể kiểm soát ngôi nhà mình. Qua apps ChikaHome, bạn có thể:
              <br/>• Theo dõi trực tiếp các hoạt động trong hay ngoài ngôi nhà
              <br/>• Khoanh vùng bảo mật trên app ChikaHome với một số vị trí quan trọng trong nhà và phát hiện chuyển động trong vùng cấm.
              <br/>• Thiết lập hướng phát hiện chuyển động qua đường ranh giới qua App ChikaHome</p>
          </Col>
        </Row>

        <Row className="security-system__row security-system__row2" gutter={40}>
          <Col className="security-system__row2__col1" span={12}>
            <h1>CẢM BIẾN CỬA<br/>CHỐNG TRỘM</h1>
            <p>Thiết bị sẽ kích hoạt đèn sáng, cói hú, đèn sáng khi phát hiện có sự chuyển động vào khung giờ cấm.</p>
          </Col>
          <Col className="security-system__row2__col2" span={12}>
            <img alt="cam-bien-cua" src={`${SECURITY_SYSTEM_IMG_URI}cam-bien-cua.png`}/>
          </Col>
        </Row>

        <div className="security-system__panel camera-panel">
          <img alt="camera-panel" src={`${SECURITY_SYSTEM_IMG_URI}camera-an-ninh.jpg`}/>
          <div className="camera-panel__content">
            <h1>TÍCH HỢP<br/>CAMERA AN NINH</h1>
            <p>Hệ thống ChikaHome tích hợp camera thông minh phát hiện mọi chuyển động.
              <br/>Snapshot để lưu lại 10 hình ảnh liên tục khi phát hiện chuyển động</p>
          </div>
        </div>

        <Row className="security-system__row security-system__row3" gutter={40}>
          <Col className="security-system__row3__col1" span={12}>
            <img alt="cac-thiet-bi-cung-tham-gia-chong-trom" src={`${SECURITY_SYSTEM_IMG_URI}cac-thiet-bi-cung-tham-gia-chong-trom.jpg`}/>
          </Col>
          <Col className="security-system__row3__col2" span={12}>
            <h1>KẾT HỢP GIẢI PHÁP KHÁC<br/>CÙNG CHỐNG TRỘM</h1>
            <p>Hệ thống cảm biến sẽ kích hoạt các thiết bị khác như: cói hú, đèn soáy, rèm mở, đèn bật sáng 
              và gửi cảnh báo tới điện thoại khi phát hiện ngôi nhà bị đột nhập trái phép.</p>
          </Col>
        </Row>

        <div className="security-system__smart-lock">
          <h1>TÍCH HỢP KHÓA THÔNG MINH</h1>
          <img alt="smart-lock" src={`${SECURITY_SYSTEM_IMG_URI}smart-lock.jpg`}/>
        </div>

        <Row className="security-system__row security-system__row4" gutter={40}>
          <Col className="security-system__row4__col1" span={12}>
            <h1>ĐIỀU KHIỂN KHÓA MỌI LÚC, MỌI NƠI TRÊN APPS CHIKAHOME</h1>
            <p>• Chika tích hợp với khóa Yale vào hệ thống nhà thông minh Chika, giúp khách hàng dễ dàng điều khiển, kiểm soát thông qua giao diện ứng dụng ChikaHome.
              <br/>• Đóng mở khóa từ xa ở bất kỳ đâu trên apps ChikaHome
              <br/>• Cài đặt mã bảo mật cho khóa trên Apps ChikaHome
              <br/>• Tích hợp khóa Yale: YMF 3109+, KHÓA YDM 40+.</p>
          </Col>
          <Col className="security-system__row4__col2" span={12}>
            <img alt="app-chika-an-ninh" src={`${SECURITY_SYSTEM_IMG_URI}app-chika-an-ninh.png`}/>
          </Col>
        </Row>

        <SolutionFooterComponent history={this.props.history}/>
      </Fragment>
    )
  }
}