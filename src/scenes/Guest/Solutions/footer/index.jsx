import React, { Component } from 'react';
import { Row, Col } from 'antd';

import "./solution-footer.css"

import {
    CONDITIONER_TIVI_LINK,
    ENVIRONMENTAL_CONTROL_LINK,
    GOOGLE_ASSISTANT_LINK,
    LIGHT_CONTROL_LINK, RGB_LED_LINK, SECURITY_SYSTEM_LINK
} from "../../../../constant/link";
import {GUEST_SOLUTION_IMG_URI} from "../../../../constant/uri";

export default class SolutionFooterComponent extends Component {

  handleChangePage = (link) => {
    if (window.location.pathname.includes(link)) {
        window.scrollTo(0, 0);
    } else {
        this.props.history.push(link);
    }
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
                    <img alt="solution-assistant" src={`${GUEST_SOLUTION_IMG_URI}google-assistant.jpg`}
                        onClick={() => this.handleChangePage(GOOGLE_ASSISTANT_LINK)}/>
                    <p>KẾT NỐI GOOGLE ASSISTANT</p>
                </Col>
                <Col className="solution__footer__col" span={8}>
                    <img alt="conditioner-tivi" src={`${GUEST_SOLUTION_IMG_URI}conditioner-tivi.jpg`}
                        onClick={() => this.handleChangePage(CONDITIONER_TIVI_LINK)}/>
                    <p>ĐIỀU HÒA, TV THÔNG MINH</p>
                </Col>
                <Col className="solution__footer__col" span={8}>
                    <img alt="light-control" src={`${GUEST_SOLUTION_IMG_URI}light-control.jpg`}
                        onClick={() => this.handleChangePage(LIGHT_CONTROL_LINK)}/>
                    <p>CHIẾU SÁNG THÔNG MINH</p>
                </Col>
            </Row>
            <Row className="solution__footer__row">
                <Col className="solution__footer__col" span={8}>
                    <img alt="environmental-control" src={`${GUEST_SOLUTION_IMG_URI}environmental-control.jpg`}
                        onClick={() => this.handleChangePage(ENVIRONMENTAL_CONTROL_LINK)}/>
                    <p>KIỂM SOÁT MÔI TRƯỜNG</p>
                </Col>
                <Col className="solution__footer__col" span={8}>
                    <img alt="security-system" src={`${GUEST_SOLUTION_IMG_URI}security-system.jpg`}
                        onClick={() => this.handleChangePage(SECURITY_SYSTEM_LINK)}/>
                    <p>AN NINH CHỐNG TRỘM</p>
                </Col>
                <Col className="solution__footer__col" span={8}>
                    <img alt="led-rgb" src={`${GUEST_SOLUTION_IMG_URI}led-rgb.jpg`}
                        onClick={() => this.handleChangePage(RGB_LED_LINK)}/>
                    <p>ĐÈN LED 16 TRIỆU MÀU</p>
                </Col>
            </Row>
        </div>
    )
  }
}
