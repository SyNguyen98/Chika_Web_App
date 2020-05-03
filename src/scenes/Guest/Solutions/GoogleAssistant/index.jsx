import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';

import SolutionFooterComponent from '../footer';

import "./google-assistant.css"

import {GOOGLE_ASSISTANT_IMG_URI} from "../../../../constant/uri";

export default class GoogleComponent extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Fragment className="google-assistant">
                <div className="google-header">
                    <img alt="google-header" src={`${GOOGLE_ASSISTANT_IMG_URI}banner-google-assistant.jpg`} />
                    <div className="google-header__content">
                        <h1>TÍCH HỢP<br/>GOOGLE ASSISTANT</h1>
                        <p>Nhà thông minh Chika chính thức được Google cấp chứng nhận “Works with the Google Assistant”.</p>
                    </div>
                </div>

                <div className="google__introduce">
                    <p>Nhà thông minh Chika chính thức được Google cấp chứng nhận “Works with the Google Assistant” tích hợp trợ lý ảo Voice Control.
                        Đạt được điều này, Chika đã vượt qua những tiêu chuẩn cực kỳ khắt khe của Google. Nhà thông minh Chika giờ đây sẽ được điều khiển qua trợ lý ảo Google Assistant
                        với Voice control bằng tất cả ngôn ngữ, đặc biệt là GIỌNG NÓI TIẾNG VIỆT mà Google vừa mới cho ra mắt.</p>
                    <Row className="google__introduce__row" gutter={[32, 8]}>
                        <Col className="google__introduce__col1" span={12}>
                            <img alt="google-home" src={`${GOOGLE_ASSISTANT_IMG_URI}gg-home.png`}/>
                            <p>Điều khiển bằng giọng nói tiếng Việt mọi miền</p>
                        </Col>
                        <Col className="google__introduce__col2" span={12}>
                            <img alt="smartphone" src={`${GOOGLE_ASSISTANT_IMG_URI}smartphone.png`}/>
                            <p>Điều khiển qua smartphone mọi lúc mọi nơi</p>
                        </Col>
                    </Row>
                </div>

                <Row className="google__row google__row1" gutter={40}>
                    <Col className="google__row1__col1" span={12}>
                        <img alt="google-assitant" src={`${GOOGLE_ASSISTANT_IMG_URI}ok-google-bat-den.jpg`}/>
                    </Col>
                    <Col className="google__row1__col2" span={12}>
                        <h1>"OK GOOGLE, BẬT ĐÈN"</h1>
                        <p>Hệ thống điện chiếu sáng được bật/tắt chỉ với câu lệnh: “Ok Google, bật đèn chùm phòng khách”.
                            Trong nháy mắt, hệ thống đèn nhà bạn sẽ được bật lên. Chika giúp bạn thể hiện giọng nói “quyền năng” trong chính ngôi nhà mình.</p>
                    </Col>
                </Row>

                <Row className="google__row google__row2" gutter={40}>
                    <Col className="google__row2__col1" span={12}>
                        <h1>"OK GOOGLE, BẬT<br/>ĐIỀU HÒA"</h1>
                        <p>Hệ thống rèm hay điều hòa, TV, bình nóng lạnh… cũng sẽ nhanh chóng được điều khiển bằng giọng nói tiếng Việt.</p>
                    </Col>
                    <Col className="google__row2__col2" span={12}>
                        <img alt="led-rgb" src={`${GOOGLE_ASSISTANT_IMG_URI}ok-google-bat-dieu-hoa.jpg`}/>
                    </Col>
                </Row>

                <Row className="google__row google__row3" gutter={40}>
                    <Col className="google__row3__col1" span={12}>
                        <img alt="google-assitant" src={`${GOOGLE_ASSISTANT_IMG_URI}ok-google-bat-nhac.jpg`}/>
                    </Col>
                    <Col className="google__row3__col2" span={12}>
                        <h1>"OK GOOGLE, BẬT NHẠC"</h1>
                        <p>Được kết nối trực tiếp với google assistant, giải pháp tích hợp giữa nhà thông minh Chika với Google Assistant
                            giúp bạn thưởng thức bất cứ bài nhạc nào bạn muốn.</p>
                    </Col>
                </Row>

                <Row className="google__row google__row4" gutter={40}>
                    <Col className="google__row4__col1" span={12}>
                        <h1>THIẾT KẾ TINH TẾ</h1>
                        <p>Màu sắc sang trọng, tinh tế, luxury trên từng đường nét.</p>
                    </Col>
                    <Col className="google__row4__col2" span={12}>
                        <img alt="led-rgb" src={`${GOOGLE_ASSISTANT_IMG_URI}gg-home-design.png`}/>
                    </Col>
                </Row>

                <SolutionFooterComponent history={this.props.history}/>
            </Fragment>
        )
    }
}
