import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';

import SolutionFooterComponent from '../footer';

import "./environmental-control.css"

import {ENVIRONMENTAL_CONTROL_IMG_URI, GOOGLE_ASSISTANT_IMG_URI} from "../../../../constant/uri";

export default class EnvironmentalControlComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Fragment className="environmental-control">
        <div className="environmental-control-header">
          <img alt="environmental-control-header" src={`${ENVIRONMENTAL_CONTROL_IMG_URI}banner-moi-truong.jpg`} />
          <div className="environmental-control-header__content">
            <h1>KIỂM SOÁT MÔI TRƯỜNG</h1>
            <p>Mọi lúc mọi nơi bạn luôn biết được nhiệt độ, độ ẩm và ánh sáng trong ngôi nhà của mình.</p>
          </div>
        </div>

        <div className="environmental-control__introduce">
          <p>Cảm biến chuyển động và cảm biến cửa của Chika được tích hợp cảm biến môi trường, có thể xem là người “bác sỹ” cung cấp thông tin nhiệt độ, độ ẩm, ánh sáng trong ngôi nhà bạn.
            Khi nhiệt độ trong nhà quá nóng, cảm biến sẽ truyền thông tin đến bộ điều khiển trung tâm - HC, HC sẽ “ra lệnh” gửi tin đến smartphone của bạn,
            đồng thời kích hoạt bật điều hòa, quạt gió, đóng rèm cửa... để bạn luôn có một môi trường sống đảm bảo sức khỏe.</p>
          <Row className="environmental-control__introduce__row" gutter={[32, 8]}>
            <Col className="environmental-control__introduce__col1" span={12}>
              <img alt="environmental-control-home" src={`${GOOGLE_ASSISTANT_IMG_URI}gg-home.png`}/>
              <p>Kiểm soát môi trường bằng giọng nói tiếng Việt</p>
            </Col>
            <Col className="environmental-control__introduce__col2" span={12}>
              <img alt="smartphone" src={`${GOOGLE_ASSISTANT_IMG_URI}smartphone.png`}/>
              <p>Kiểm soát tình trạng ngôi nhà tại bất cứ đâu</p>
            </Col>
          </Row>
        </div>

        <Row className="environmental-control__row environmental-control__row1" gutter={40}>
          <Col className="environmental-control__row1__col1" span={12}>
            <img alt="cac-chi-so-ve-ngoi-nha" src={`${ENVIRONMENTAL_CONTROL_IMG_URI}cac-chi-so-ve-ngoi-nha.jpg`}/>
          </Col>
          <Col className="environmental-control__row1__col2" span={12}>
            <h1>CÁC CHỈ SỐ<br/>VỀ NGÔI NHÀ<br/>LUÔN ĐƯỢC CẬP NHẬT</h1>
            <p>Chỉ số nhiệt độ, độ ẩm, ánh sáng tại bất cứ căn phòng nào trong ngôi nhà khi không đảm bảo một môi trường sống khỏe 
              đều được gửi đến điện thoại của bạn.</p>
          </Col>
        </Row>

        <Row className="environmental-control__row environmental-control__row2" gutter={40}>
          <Col className="environmental-control__row2__col1" span={12}>
            <h1>THIẾT BỊ<br/>ĐO MÔI TRƯỜNG</h1>
            <p>Cảm biến chuyển động của Chika là người “bác sỹ” giúp bạn đo nhiệt độ, độ ẩm và ánh sáng trong ngôi nhà, 
              để đảm bảo gia đình bạn có không gian sống khỏe.</p>
          </Col>
          <Col className="environmental-control__row2__col2" span={12}>
            <img alt="cam-bien-chuyen-dong" src={`${ENVIRONMENTAL_CONTROL_IMG_URI}cam-bien-chuyen-dong.png`}/>
          </Col>
        </Row>

        <div className="environmental-control__panel automatic-panel">
          <img alt="automatic-panel" src={`${ENVIRONMENTAL_CONTROL_IMG_URI}dam-bao-nhiet-do-phong-on-dinh.jpg`}/>
          <div className="automatic-panel__content">
            <h1>ĐIỀU HÒA TỰ ĐỘNG TẮT</h1>
            <p>Đảm bảo nhiệt độ phòng ổn định cho trẻ giấc ngủ ngon lành.</p>
          </div>
        </div>

        <Row className="environmental-control__row environmental-control__row3" gutter={40}>
          <Col className="environmental-control__row3__col1" span={12}>
            <img alt="rem-tu-dong-khi-troi-qua-toi" src={`${ENVIRONMENTAL_CONTROL_IMG_URI}rem-tu-dong-khi-troi-qua-toi.jpg`}/>
          </Col>
          <Col className="environmental-control__row3__col2" span={12}>
            <h1>KẾT HỢP THIẾT BỊ KHÁC<br/>TẠO NÊN<br/>ĐIỀU KỲ DIỆU</h1>
            <p>Rèm cửa tự động mở ra khi trời tối, hay đóng vào khi có ánh nắng chói chang.</p>
          </Col>
        </Row>

        <div className="environmental-control__auto-light">
          <h1>ĐÈN TỰ ĐỘNG SÁNG</h1>
          <img alt="den-tu-sang-khi-troi-toi" src={`${ENVIRONMENTAL_CONTROL_IMG_URI}den-tu-sang-khi-troi-toi.jpg`}/>
        </div>

        <Row className="environmental-control__row environmental-control__row4" gutter={40}>
          <Col className="environmental-control__row4__col1" span={12}>
            <h1>SANG TRỌNG<br/>TINH TẾ<br/>& ĐẲNG CẤP</h1>
            <p>Sản phẩm đầu tiên tại Việt Nam đạt chứng chỉ tiêu chuẩn xuất khẩu sang các nước Châu Âu - CE và UL – được phép xuất khẩu tới 104 Quốc gia trên thế giới.</p>
          </Col>
          <Col className="environmental-control__row4__col2" span={12}>
            <img alt="cam-bien-cua" src={`${ENVIRONMENTAL_CONTROL_IMG_URI}cam-bien-cua.png`}/>
          </Col>
        </Row>

        <SolutionFooterComponent history={this.props.history}/>
      </Fragment>
    )
  }
}
