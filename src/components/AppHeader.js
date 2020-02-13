import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, Row, Col } from 'antd';

import '../styles/AppHeader.css';
import { CHIKA_COLOR, LINK_INTRODUCTION, LINK_PRODUCT, LINK_LOGIN,
        LINK_GG_ASSISTANT, LINK_LIGHT_CONTROL, LINK_CONDITIONER_TIVI, LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED } from '../constant'

const { Header } = Layout;

class AppHeader extends Component {

  handleClickChangePage = (event, link) => {
    event.preventDefault();
    this.props.history.push(link);
  }

  componentDidMount() {
  }

  render() {
    let header;
    if (this.props.userRole === null) {
        header = (
          <Header className="app-header">
            <div className="logo" onClick={(event) => this.handleClickChangePage(event, '/')}>
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
        )
    } else if (this.props.userRole === 'ROLE_ADMIN') {
      header = (
        <Header className="app-header">
          <img className="header_admin_img" alt="logo-chika" src="/image/logo.svg"/>
          <p className="header_admin_chika">CHIKA</p>
          <p className="header_admin_title">TRANG QUẢN LÝ</p>
        </Header>
      )
    }
    return(
      <div>
        {header}
      </div>
    );
  }
}

function SmarthomeDropdownMenu() {
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

export default withRouter(AppHeader);
