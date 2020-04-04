import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Icon } from 'antd';

import '../../styles/user/user-home.component.css';
import { LINK_USER_ROOM, LINK_USER_SCRIPT } from '../../constant/index';

const imageUri = "/image/user/home/";

class UserHomeComponent extends Component { 
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
                ? "linear-gradient(90deg, rgba(0, 255, 76, 0.6), rgba(0, 122, 26, 0.7) 90%), url('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/living-room-9-1537479929.jpg')"
                : "linear-gradient(90deg, rgba(255, 41, 41, 0.8), rgba(146, 0, 0, 0.9) 90%), url('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/living-room-9-1537479929.jpg')"
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
        return(
            <Fragment>
                <Row gutter={[16, 8]} className='user-home'>
                    <Col span={6} className="user-home__info">
                        <div className="user-home__info__header" style={this.setSecurityBackground()}>
                            <img alt="home-header" src={`${imageUri}shield-icon.png`}/>
                            <div className="user-home__info__header__content">
                                <p>An ninh</p>
                                <b>AN TOÀN</b>
                            </div>
                        </div>
                        <div className="user-home__info__body">
                            <p><Icon type="home" />&emsp;Chủ nhà</p>
                            <b>HUỲNH VĂN TUẤN</b>
                            <p><Icon type="team" />&emsp;Số thành viên trong nhà:</p>
                            <b>3 người</b>
                            <p><Icon type="appstore" />&emsp;Số thiết bị trong nhà:</p>
                            <b>15 thiết bị</b>
                        </div>
                    </Col>
                    <Col span={18} className='user-home__body'>
                        <Row className='user-home__row'>
                            <Col className='user-home__col col1' span={6}>
                                <p>Điện năng <Icon type="caret-right" /></p>
                                <b>190</b><span>kW</span>
                            </Col>
                            <Col className='user-home__col col2' span={6}>
                                <p>Nhiệt độ <Icon type="caret-right" /></p>
                                <b>27</b><span>&#8451;</span>
                            </Col>
                            <Col className='user-home__col col3' span={6}>
                                <p>Độ ẩm <Icon type="caret-right" /></p>
                                <b>15</b><span>&#37;</span>
                            </Col>
                            <Col className='user-home__col col4' span={6}>
                                <p>Không khí <Icon type="caret-right" /></p>
                                <b>270</b><span>AQI</span>
                            </Col>
                        </Row>
                        <h1>Phòng</h1>
                        <Row className='user-home__row'>
                            <Col className='user-home__col room' span={6}
                                style={this.setBackground("https://www.thespruce.com/thmb/FOa0NU7ayi5n0XOruKNLwEmkutI=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-9261821821-5c69c1b7c9e77c0001675a49.jpg")}>
                                <p>Phòng Khách <Icon type="caret-right" /></p>
                            </Col>
                            <Col className='user-home__col room' span={6}
                                style={this.setBackground("https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2019/10/29/0/dh2020_kitchen-01-wide-angle-2X9A3564_h.jpg.rend.hgtvcom.966.644.suffix/1572358152315.jpeg")}>
                                <p>Phòng Bếp <Icon type="caret-right" /></p>
                            </Col>
                            <Col className='user-home__col room' span={6}
                                style={this.setBackground("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/5-emily-andrews-photography-1544213184.jpg")}>
                                <p>Phòng Ngủ <Icon type="caret-right" /></p>
                            </Col>
                            <Col className='user-home__col room' span={6}
                                style={this.setBackground("https://freshome.com/wp-content/uploads/2015/07/online-virtual-room-programs-5d-render.jpg")}
                                onClick={() => this.handleChangeComponent(LINK_USER_ROOM)}>
                                <p>Xem Tất Cả <Icon type="caret-right" /></p>
                            </Col>
                        </Row>
                        <h1>Kịch bản đang hoạt động</h1>
                        <Row className='user-home__row'>
                            <Col className='user-home__col script' span={6}>
                                <div className='user-home__col script__circle'>
                                    <img alt="wake-up-icon" src="https://png.pngtree.com/svg/20150319/huilv_wake_up_call_616852.png"/>
                                </div>
                                <p>Thức Dậy</p>
                            </Col>
                            <Col className='user-home__col script' span={6}>
                                <div className='user-home__col script__circle'>
                                    <img alt="sleep-icon" src="data:image/png;base64,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"/>
                                </div>
                                <p>Đi Ngủ</p>
                            </Col>
                            <Col className='user-home__col script' span={6}>
                                <div className='user-home__col script__circle'>
                                    <img alt="go-work-icon" src="https://cdn4.iconfinder.com/data/icons/human-activity-1/512/Human_Activity-14-512.png"/>
                                </div>
                                <p>Đi Làm</p>
                            </Col>
                            <Col className='user-home__col script' span={6}>
                                <div className='user-home__col script__circle' onClick={() => this.handleChangeComponent(LINK_USER_SCRIPT)}>
                                    <img alt="3-dot-icon" src="https://cdn0.iconfinder.com/data/icons/smoothies-vector-icons-volume-2/48/143-512.png"/>
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
  
export default withRouter(UserHomeComponent);