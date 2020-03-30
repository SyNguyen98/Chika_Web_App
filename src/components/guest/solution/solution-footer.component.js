import React, { Component } from 'react';
import { Row, Col } from 'antd';

import '../../../styles/guest/solution/solution-footer.component.css';
import { LINK_GG_ASSISTANT, LINK_LIGHT_CONTROL, LINK_CONDITIONER_TIVI,
  LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED } from '../../../constant'

const imageUri = "/image/guest/solution/";

export default class SolutionFooterComponent extends Component {

  handleChangePage = (link) => {
    if (window.location.pathname.includes(link)) {
        window.scrollTo(0, 0);
    } else {
        this.props.history.push(link);
    }
  }

  toTopPage = () => {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
        <div className="solution__footer">
            <h1>CÁC GIẢI PHÁP KHÁC</h1>
            <Row className="solution__footer__row">
                <Col className="solution__footer__col" span={8}>
                    <img alt="solution-assistant" src={`${imageUri}google-assistant.jpg`}
                        onClick={() => this.handleChangePage(LINK_GG_ASSISTANT)}/>
                    <p>KẾT NỐI GOOGLE ASSISTANT</p>
                </Col>
                <Col className="solution__footer__col" span={8}>
                    <img alt="conditioner-tivi" src={`${imageUri}conditioner-tivi.jpg`}
                        onClick={() => this.handleChangePage(LINK_CONDITIONER_TIVI)}/>
                    <p>ĐIỀU HÒA, TV THÔNG MINH</p>
                </Col>
                <Col className="solution__footer__col" span={8}>
                    <img alt="light-control" src={`${imageUri}light-control.jpg`}
                        onClick={() => this.handleChangePage(LINK_LIGHT_CONTROL)}/>
                    <p>CHIẾU SÁNG THÔNG MINH</p>
                </Col>
            </Row>
            <Row className="solution__footer__row">
                <Col className="solution__footer__col" span={8}>
                    <img alt="environmental-control" src={`${imageUri}environmental-control.jpg`} 
                        onClick={() => this.handleChangePage(LINK_ENVIRONMANTAL_CONTROL)}/>
                    <p>KIỂM SOÁT MÔI TRƯỜNG</p>
                </Col>
                <Col className="solution__footer__col" span={8}>
                    <img alt="security-system" src={`${imageUri}security-system.jpg`} 
                        onClick={() => this.handleChangePage(LINK_SECURITY_SYSTEM)}/>
                    <p>AN NINH CHỐNG TRỘM</p>
                </Col>
                <Col className="solution__footer__col" span={8}>
                    <img alt="led-rgb" src={`${imageUri}led-rgb.jpg`} 
                        onClick={() => this.handleChangePage(LINK_RGB_LED)}/>
                    <p>ĐÈN LED 16 TRIỆU MÀU</p>
                </Col>
            </Row>
        </div>
    )
  }
}
