import React, {Component} from "react";
import {Col, Row} from "antd";

import "./scripts.css";
import {ROOM_COLOR} from "../../../constant/color";
import {ROOM_IMG_URI} from "../../../constant/uri";

export default class ListScriptComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    setHeaderBackground = (color, url) => {
        return {
            background: `linear-gradient(90deg, ${color}), url('${url}')`,
            backgroundSize: '100% 20vh'
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Row className="scripts">
                <Col span={6} className='scripts__item'>
                    <div className='scripts__item__header'
                         style={this.setHeaderBackground(ROOM_COLOR[0], `https://www.citicollege.ca/wp-content/uploads/2016/06/wakup.jpg`)}>
                        <img alt="icon" src={`https://www.kindpng.com/picc/m/20-203321_hekr-additional-wake-up-new-business-model-icon.png`}/>
                        <p>THỨC DẬY</p>
                    </div>
                    <div className='scripts__item__footer'>
                        <p>EVERYDAY</p>
                        <b>06:00</b>
                    </div>
                </Col>
                <Col span={6} className='scripts__item'>
                    <div className='scripts__item__header'
                         style={this.setHeaderBackground(ROOM_COLOR[1], `https://ca.res.keymedia.com/files/image/iStock-earlyworkoffice%20(500%20x%20333).jpg`)}>
                        <img alt="icon" src={`https://thumbs.dreamstime.com/b/man-goes-to-work-icon-simple-glyph-flat-vector-people-icons-ui-ux-website-mobile-application-white-background-156312886.jpg`}/>
                        <p>ĐI LÀM</p>
                    </div>
                    <div className='scripts__item__footer'>
                        <p>T2&ensp;T3&ensp;T4&ensp;T5&ensp;T6</p>
                        <b>08:00</b>
                    </div>
                </Col>
                <Col className='scripts__item__add' span={6}>
                    <h2>THÊM KỊCH BẢN</h2>
                    <img alt="add-icon" src={`${ROOM_IMG_URI}add-icon.png`}/>
                </Col>
            </Row>
        )
    }
}