import React, {Component, Fragment} from 'react';
import {Col, Icon, Row} from 'antd';

import './home.css';

import {USER_ROOM_LINK, USER_SCRIPT_LINK} from "../../../constant/link";
import {USER_HOME_IMG_URI} from "../../../constant/uri";

export default class UserHomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSafe: true,
            isLoading: false,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleChangeComponent = (link) => {
        this.props.history.push(link);
    }

    setSecurityBackground = () => {
        let background = this.state.isSafe
            ? `linear-gradient(90deg, rgba(0, 255, 76, 0.6), rgba(0, 122, 26, 0.7) 90%), url(${USER_HOME_IMG_URI}/security-background.jpg)`
            : `linear-gradient(90deg, rgba(255, 41, 41, 0.8), rgba(146, 0, 0, 0.9) 90%), url(${USER_HOME_IMG_URI}/security-background.jpg)`
        return {
            background: background,
            backgroundSize: "100% 25vh"
        }
    }

    setBackground = (url) => {
        return {
            background: `linear-gradient(90deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url('${url}')`,
            backgroundSize: 'cover'
        }
    };

    render() {
        return (
            <Fragment>
                <Row gutter={[16, 8]} className='user-home'>
                    <Col span={6} className="user-home__info">
                        <div className="user-home__info__header" style={this.setSecurityBackground()}>
                            <img alt="home-header" src={`${USER_HOME_IMG_URI}shield-icon.png`}/>
                            <div className="user-home__info__header__content">
                                <p>An ninh</p>
                                <b>AN TOÀN</b>
                            </div>
                        </div>
                        <div className="user-home__info__body">
                            <p><Icon type="home"/>&emsp;Chủ nhà</p>
                            <b>HUỲNH VĂN TUẤN</b>
                            <p><Icon type="team"/>&emsp;Số thành viên trong nhà:</p>
                            <b>3 người</b>
                            <p><Icon type="appstore"/>&emsp;Số thiết bị trong nhà:</p>
                            <b>15 thiết bị</b>
                        </div>
                    </Col>
                    <Col span={18} className='user-home__body'>
                        <Row className='user-home__row'>
                            <Col className='user-home__col col1' span={6}>
                                <p>Điện năng <Icon type="caret-right"/></p>
                                <b>190</b><span>kW</span>
                            </Col>
                            <Col className='user-home__col col2' span={6}>
                                <p>Nhiệt độ <Icon type="caret-right"/></p>
                                <b>27</b><span>&#8451;</span>
                            </Col>
                            <Col className='user-home__col col3' span={6}>
                                <p>Độ ẩm <Icon type="caret-right"/></p>
                                <b>15</b><span>&#37;</span>
                            </Col>
                            <Col className='user-home__col col4' span={6}>
                                <p>Không khí <Icon type="caret-right"/></p>
                                <b>270</b><span>AQI</span>
                            </Col>
                        </Row>
                        <h1>Phòng</h1>
                        <Row className='user-home__row'>
                            <Col className='user-home__col room' span={6}
                                 style={this.setBackground(`${USER_HOME_IMG_URI}living-room.jpg`)}>
                                <p>Phòng Khách <Icon type="caret-right"/></p>
                            </Col>
                            <Col className='user-home__col room' span={6}
                                 style={this.setBackground(`${USER_HOME_IMG_URI}kitchen.jpeg`)}>
                                <p>Phòng Bếp <Icon type="caret-right"/></p>
                            </Col>
                            <Col className='user-home__col room' span={6}
                                 style={this.setBackground(`${USER_HOME_IMG_URI}bedroom.jpg`)}>
                                <p>Phòng Ngủ <Icon type="caret-right"/></p>
                            </Col>
                            <Col className='user-home__col room' span={6}
                                 style={this.setBackground(`${USER_HOME_IMG_URI}room.jpg`)}
                                 onClick={() => this.handleChangeComponent(USER_ROOM_LINK)}>
                                <p>Xem Tất Cả <Icon type="caret-right"/></p>
                            </Col>
                        </Row>
                        <h1>Kịch bản đang hoạt động</h1>
                        <Row className='user-home__row'>
                            <Col className='user-home__col script' span={6}>
                                <div className='user-home__col script__circle'>
                                    <img alt="wake-up-icon"
                                         src={`${USER_HOME_IMG_URI}clock-icon.png`}/>
                                </div>
                                <p>Thức Dậy</p>
                            </Col>
                            <Col className='user-home__col script' span={6}>
                                <div className='user-home__col script__circle'>
                                    <img alt="sleep-icon"
                                         src={`${USER_HOME_IMG_URI}moon-icon.png`}/>
                                </div>
                                <p>Đi Ngủ</p>
                            </Col>
                            <Col className='user-home__col script' span={6}>
                                <div className='user-home__col script__circle'>
                                    <img alt="go-work-icon"
                                         src={`${USER_HOME_IMG_URI}working-icon.png`}/>
                                </div>
                                <p>Đi Làm</p>
                            </Col>
                            <Col className='user-home__col script' span={6}>
                                <div className='user-home__col script__circle'
                                     onClick={() => this.handleChangeComponent(USER_SCRIPT_LINK)}>
                                    <img alt="3-dot-icon"
                                         src={`${USER_HOME_IMG_URI}3-dot-icon.png`}/>
                                </div>
                                <p>Xem Tất Cả</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}