import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, Row, Col, Button, Icon } from 'antd';

import '../styles/app-header.component.css';
import { CHIKA_COLOR, LINK_INTRODUCTION, LINK_PRODUCT, LINK_LOGIN,
        LINK_GG_ASSISTANT, LINK_LIGHT_CONTROL, LINK_CONDITIONER_TIVI, LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED,
        LINK_USER_HOME, LINK_USER_ROOM, LINK_USER_SCRIPT, LINK_USER_CAMERA } from '../constant'

const { Header } = Layout;

const AppHeaderComponent = ({ currentUser, onOpenSidenav, history }) => {

  const handleClickChangePage = (event, link) => {
    event.preventDefault();
    history.push(link);
  }

  let header;
  if (currentUser !== null) {
    switch (currentUser.role) {
      case 'ADMIN':
        header = (
          <Header className="app-header">
            <img className="header_admin_img" alt="logo-chika" src="/image/logo.svg"/>
            <p className="header_admin_chika">CHIKA</p>
            <p className="header_admin_title">TRANG QUẢN LÝ</p>
          </Header>
        )
        break;
      case 'HOME_MASTER': case 'HOME_USER':
        header = (<UserHeader currentUser={currentUser} 
                              onOpenSidenav={onOpenSidenav} 
                              history={history}/>)
        break;
      default:
        header = null;
    }
  }

  return(
    <div>
      {header ? header : (
        <Header className="app-header">
          <div className="logo" onClick={(event) => handleClickChangePage(event, '/')}>
            <img src="/image/logo.svg" alt="logo"/>
            <div className="name">
              <p className="chika">CHIKA</p>
              <p className="home">Nhà thông minh</p>
            </div>
          </div>
          <Menu className="header-menu"
                mode="horizontal">
            <Menu.Item key={LINK_INTRODUCTION}>
              <Link style={{color: CHIKA_COLOR}} to={LINK_INTRODUCTION}>Giới thiệu</Link>
            </Menu.Item>
            <Menu.Item className="smarthome-menu">
              <SmarthomeDropdownMenu/>
            </Menu.Item>
            <Menu.Item key={LINK_PRODUCT} >
              <Link style={{color: CHIKA_COLOR}} to={LINK_PRODUCT}>Thiết bị</Link>
            </Menu.Item>
            <Menu.Item key={LINK_LOGIN}>
              <Link style={{color: CHIKA_COLOR}} to={LINK_LOGIN}>Đăng nhập</Link>
            </Menu.Item>
          </Menu>
        </Header>
      )}
    </div>
  );
}

const SmarthomeDropdownMenu = () => {
  const dropdownMenu = (
    <Row>
      <Row className="dropdown-row">
        <Col className="smarthome-item" span={8}>
          <Link style={{color: "#000"}} to={LINK_GG_ASSISTANT}>Kết nối google assistant</Link>
        </Col>
        <Col className="smarthome-item" span={8}>
          <Link style={{color: "#000"}} to={LINK_CONDITIONER_TIVI}>Hệ thống điều hòa - tivi</Link>
        </Col>
        <Col className="smarthome-item" span={8}>
          <Link style={{color: "#000"}} to={LINK_LIGHT_CONTROL}>Chiếu sáng thông minh</Link>
        </Col>
      </Row>
      <Row className="dropdown-row">
        <Col className="smarthome-item" span={8}>
          <Link style={{color: "#000"}} to={LINK_ENVIRONMANTAL_CONTROL}>Kiểm soát môi trường</Link>
        </Col>
        <Col className="smarthome-item" span={8}>
          <Link style={{color: "#000"}} to={LINK_SECURITY_SYSTEM}>An ninh chống trộm</Link>
        </Col>
        <Col className="smarthome-item" span={8}>
          <Link style={{color: "#000"}} to={LINK_RGB_LED}>Đèn led 16 triệu màu</Link>
        </Col>
      </Row>
    </Row>
  );

  return (
    <Dropdown overlay={dropdownMenu}
              getPopupContainer = {() => document.getElementsByClassName('smarthome-menu')[0]}>
      <a className="drop-down" style={{color: CHIKA_COLOR}}>Nhà thông minh</a>
    </Dropdown>
  )
}

const UserHeader = ({ currentUser, onOpenSidenav, history }) => {

  const handleChangeUserComponent = (link) => {
    history.push(link);
  }

  return(
    <Header className="app-header user-header">
      <Button className='header_user_button' onClick={onOpenSidenav}><Icon type="menu" /></Button>
      <p className='header_user_title'>
        <img alt='logo-icon' src='/image/logo.png' style={{width: '3.5vw'}}/>&ensp;
        <i>Nhà của {currentUser.name.substring(currentUser.name.lastIndexOf(' '))}</i>
      </p>
      <nav className="user-header__nav">
        <p className="user-header__nav__item" onClick={() => handleChangeUserComponent(LINK_USER_HOME)}>
          <img alt='house-icon' src='/image/header/house-icon.png'/>&ensp;Nhà
        </p>
        <p className="user-header__nav__item" onClick={() => handleChangeUserComponent(LINK_USER_ROOM)}>
          <img alt='room-icon' src='/image/header/room-icon.png'/>&ensp;Phòng
        </p>
        <p className="user-header__nav__item" onClick={() => handleChangeUserComponent(LINK_USER_SCRIPT)}>
          <img alt='script-icon' src='/image/header/script-icon.png'/>&ensp;Kịch bản
        </p>
        <p className="user-header__nav__item" onClick={() => handleChangeUserComponent(LINK_USER_CAMERA)}>
          <img alt='camera-icon' src='/image/header/camera-icon.png'/>&ensp;Giám sát
        </p>
      </nav>
    </Header>
  )
}

export default AppHeaderComponent;
