import React, {Component, Fragment} from 'react';
import {Col, Dropdown, Layout, Row} from 'antd';

import UserHeaderComponent from './user';
import AdminHeaderComponent from './admin';

import {
    CONDITIONER_TV_LINK,
    ENVIRONMENTAL_CONTROL_LINK,
    GOOGLE_ASSISTANT_LINK,
    INTRODUCTION_LINK,
    LIGHT_CONTROL_LINK,
    LOGIN_LINK,
    PRODUCT_LINK,
    RGB_LED_LINK,
    SECURITY_SYSTEM_LINK
} from "../../constant/link";

import "./header.scss";

const {Header} = Layout;

export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTop: true
        }
    }

    handleChangePage = (link) => {
        this.props.history.push(link);
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 100;
            if (isTop !== this.state.isTop) {
                this.setState({isTop})
            }
        });
    }

    render() {
        const {currentUser, onOpenSidenav} = this.props;
        const colorStyle = this.state.isTop ? {backgroundColor: 'rgba(255, 255, 255, 0.7)'} : {backgroundColor: 'white'};
        let headerComponent = null;
        if (currentUser !== null) {
            switch (currentUser.role) {
                case 'ADMIN':
                    headerComponent = (<AdminHeaderComponent onOpenSidenav={onOpenSidenav}
                                                             handleChangePage={this.handleChangePage}/>)
                    break;
                case 'HOME_MASTER':
                case 'HOME_USER':
                    headerComponent = (<UserHeaderComponent onOpenSidenav={onOpenSidenav}
                                                            handleChangePage={this.handleChangePage}/>)
                    break;
                default:
                    headerComponent = null;
            }
        }

        return (
            <div>
                <Header style={colorStyle} className="app-header">
                    {headerComponent ? headerComponent : (
                        <Fragment>
                            <img className="logo" alt="chika-logo" src="/image/logo-name.svg"
                                 onClick={() => this.handleChangePage('/')}/>
                            <nav className="nav">
                                <a className="item" onClick={() => this.handleChangePage(INTRODUCTION_LINK)}>Giới thiệu</a>
                                <span className="solutions-menu">
                                <SmarthomeDropdownMenu handleChangePage={this.handleChangePage}/>
                            </span>
                                <a className="item" onClick={() => this.handleChangePage(PRODUCT_LINK)}>Thiết bị</a>
                                <a className="item" onClick={() => this.handleChangePage(LOGIN_LINK)}>Đăng nhập</a>
                            </nav>
                        </Fragment>
                    )}
                </Header>
            </div>
        );
    }
}

const SmarthomeDropdownMenu = ({handleChangePage}) => {
    const dropdownMenu = (
        <Row>
            <Row className="dropdown-row">
                <Col className="solutions-item" span={8} onClick={() => handleChangePage(GOOGLE_ASSISTANT_LINK)}>
                    <b>Kết nối google assistant</b>
                </Col>
                <Col className="solutions-item" span={8} onClick={() => handleChangePage(CONDITIONER_TV_LINK)}>
                    <b>Hệ thống điều hòa - tivi</b>
                </Col>
                <Col className="solutions-item" span={8} onClick={() => handleChangePage(LIGHT_CONTROL_LINK)}>
                    <b>Chiếu sáng thông minh</b>
                </Col>
            </Row>
            <Row className="dropdown-row">
                <Col className="solutions-item" span={8} onClick={() => handleChangePage(ENVIRONMENTAL_CONTROL_LINK)}>
                    <b>Kiểm soát môi trường</b>
                </Col>
                <Col className="solutions-item" span={8} onClick={() => handleChangePage(SECURITY_SYSTEM_LINK)}>
                    <b>An ninh chống trộm</b>
                </Col>
                <Col className="solutions-item" span={8} onClick={() => handleChangePage(RGB_LED_LINK)}>
                    <b>Đèn led 16 triệu màu</b>
                </Col>
            </Row>
        </Row>
    );

    return (
        <Dropdown overlay={dropdownMenu}
                  getPopupContainer={() => document.getElementsByClassName('solutions-menu')[0]}>
            <span className="item">Giải pháp</span>
        </Dropdown>
    )
}
