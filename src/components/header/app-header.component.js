import React, { Component } from 'react';
import { Layout, Dropdown, Row, Col } from 'antd';

import '../../styles/header/app-header.component.css';
import UserHeaderComponent from './user-header.component';
import { LINK_INTRODUCTION, LINK_PRODUCT, LINK_LOGIN,
        LINK_GG_ASSISTANT, LINK_LIGHT_CONTROL, LINK_CONDITIONER_TIVI, 
        LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED} from '../../constant'

const { Header } = Layout;

export default class AppHeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTop: true
    }
  }

  handleClickChangePage = (link) => {
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
          headerComponent = (
            <Header className="app-header">
              <img className="header_admin_img" alt="logo-chika" src="/image/logo.svg"/>
              <p className="header_admin_chika">CHIKA</p>
              <p className="header_admin_title">TRANG QUẢN LÝ</p>
            </Header>
          )
          break;
        case 'HOME_MASTER': case 'HOME_USER':
          headerComponent = (<UserHeaderComponent currentUser={currentUser} 
                                onOpenSidenav={onOpenSidenav} 
                                history={this.props.history}/>)
          break;
        default:
          headerComponent = null;
      }
    }
    
    return(
      <div>
        {headerComponent ? headerComponent : (
          <Header style={colorStyle} className="app-header">
            <img  className="app-header__logo" alt="chika-logo" src="/image/logo.svg" 
                  onClick={() => this.handleClickChangePage('/')}/>
            <nav className="app-header__nav">
              <a className="app-header__nav__item" href={LINK_INTRODUCTION}>Giới thiệu</a>
              <span className="solutions-menu">
                <SmarthomeDropdownMenu/>
              </span>
              <a className="app-header__nav__item" href={LINK_PRODUCT}>Thiết bị</a>
              <a className="app-header__nav__item" href={LINK_LOGIN}>Đăng nhập</a>
            </nav>
          </Header>
        )}
      </div>
    );
  }
}

const SmarthomeDropdownMenu = () => {
  const dropdownMenu = (
    <Row>
      <Row className="dropdown-row">
        <Col className="solutions-item" span={8}>
          <a href={LINK_GG_ASSISTANT}>Kết nối google assistant</a>
        </Col>
        <Col className="solutions-item" span={8}>
          <a href={LINK_CONDITIONER_TIVI}>Hệ thống điều hòa - tivi</a>
        </Col>
        <Col className="solutions-item" span={8}>
          <a href={LINK_LIGHT_CONTROL}>Chiếu sáng thông minh</a>
        </Col>
      </Row>
      <Row className="dropdown-row">
        <Col className="solutions-item" span={8}>
          <a href={LINK_ENVIRONMANTAL_CONTROL}>Kiểm soát môi trường</a>
        </Col>
        <Col className="solutions-item" span={8}>
          <a href={LINK_SECURITY_SYSTEM}>An ninh chống trộm</a>
        </Col>
        <Col className="solutions-item" span={8}>
          <a href={LINK_RGB_LED}>Đèn led 16 triệu màu</a>
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
