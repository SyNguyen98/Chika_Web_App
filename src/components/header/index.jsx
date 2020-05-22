import React, {Component} from 'react';
import {Col, Dropdown, Layout, Row} from 'antd';

import UserHeaderComponent from './user';
import AdminHeaderComponent from './admin';

import "./header.css";

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

const { Header } = Layout;

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
          this.setState({ isTop })
      }
    });
  }

  render() {
    const { currentUser, onOpenSidenav } = this.props;
    const colorStyle = this.state.isTop ? {backgroundColor: 'rgba(255, 255, 255, 0.7)'} : {backgroundColor: 'white'};
    let headerComponent = null;
    if (currentUser !== null) {
      switch (currentUser.role) {
        case 'ADMIN':
          headerComponent = (<AdminHeaderComponent onOpenSidenav={onOpenSidenav}
                                                   handleChangePage={this.handleChangePage}/>)
          break;
        case 'HOME_MASTER': case 'HOME_USER':
          headerComponent = (<UserHeaderComponent onOpenSidenav={onOpenSidenav}
                                    handleChangePage={this.handleChangePage}/>)
          break;
        default:
          headerComponent = null;
      }
    }
    
    return(
      <div>
        {headerComponent ? headerComponent : (
          <Header style={colorStyle} className="app-header">
            <img  className="app-header__logo" alt="chika-logo" src="/image/logo-name.svg" 
                  onClick={() => this.handleChangePage('/')}/>
            <nav className="app-header__nav">
              <a className="app-header__nav__item" onClick={() => this.handleChangePage(INTRODUCTION_LINK)}>Giới thiệu</a>
              <span className="solutions-menu">
                <SmarthomeDropdownMenu handleChangePage={this.handleChangePage}/>
              </span>
              <a className="app-header__nav__item" onClick={() => this.handleChangePage(PRODUCT_LINK)}>Thiết bị</a>
              <a className="app-header__nav__item" onClick={() => this.handleChangePage(LOGIN_LINK)}>Đăng nhập</a>
            </nav>
          </Header>
        )}
      </div>
    );
  }
}

const SmarthomeDropdownMenu = ({ handleChangePage }) => {
  const dropdownMenu = (
    <Row>
      <Row className="dropdown-row">
        <Col className="solutions-item" span={8}>
          <a onClick={() => handleChangePage(GOOGLE_ASSISTANT_LINK)}>Kết nối google assistant</a>
        </Col>
        <Col className="solutions-item" span={8}>
          <a onClick={() => handleChangePage(CONDITIONER_TV_LINK)}>Hệ thống điều hòa - tivi</a>
        </Col>
        <Col className="solutions-item" span={8}>
          <a onClick={() => handleChangePage(LIGHT_CONTROL_LINK)}>Chiếu sáng thông minh</a>
        </Col>
      </Row>
      <Row className="dropdown-row">
        <Col className="solutions-item" span={8}>
          <a onClick={() => handleChangePage(ENVIRONMENTAL_CONTROL_LINK)}>Kiểm soát môi trường</a>
        </Col>
        <Col className="solutions-item" span={8}>
          <a onClick={() => handleChangePage(SECURITY_SYSTEM_LINK)}>An ninh chống trộm</a>
        </Col>
        <Col className="solutions-item" span={8}>
          <a onClick={() => handleChangePage(RGB_LED_LINK)}>Đèn led 16 triệu màu</a>
        </Col>
      </Row>
    </Row>
  );

  return (
    <Dropdown overlay={dropdownMenu}
              getPopupContainer = {() => document.getElementsByClassName('solutions-menu')[0]}>
      <span className="app-header__nav__item">Giải pháp</span>
    </Dropdown>
  )
}
