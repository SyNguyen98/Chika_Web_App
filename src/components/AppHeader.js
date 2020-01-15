import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Menu, Dropdown, Row, Col } from 'antd';

import '../styles/AppHeader.css';
import { CHIKA_COLOR, LINK_GG_ASSISTANT, LINK_LIGHT_CONTROL, LINK_CONDITIONER_TIVI,
  LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED } from '../constant'

const { Header } = Layout;

class AppHeader extends Component {

  handleClickChangePage = (event, link) => {
    event.preventDefault();
    this.props.history.push(link);
  }

  handleMenuClick = ({key}) => {
    if(key === "logout") {
      this.props.onLogout();
    }
  }

  render() {
    let menuItems;
    if(this.props.currentUser) {
      menuItems = [
        <Menu.Item key="/" >
          <Link style={{color: CHIKA_COLOR}} to="/">Trang chủ</Link>
        </Menu.Item>,
        <Menu.Item key="/product" >
          <Link style={{color: CHIKA_COLOR}} to="/product">Sản phẩm</Link>
        </Menu.Item>
      ];
    } else {
      menuItems = [
        <Menu.Item key="/introduction" >
          <Link style={{color: CHIKA_COLOR}} to="/introduction">Giới thiệu</Link>
        </Menu.Item>,
        <Menu.Item key="/smarthome" className="smarthome-menu">
          <SmarthomeDropdownMenu
            currentUser={this.props.currentUser}
            handleMenuClick={this.handleMenuClick} />
        </Menu.Item>,
        <Menu.Item key="/product" >
          <Link style={{color: CHIKA_COLOR}} to="/product">Thiết bị</Link>
        </Menu.Item>,
        <Menu.Item key="/login">
          <Link style={{color: CHIKA_COLOR}} to="/login">Đăng nhập</Link>
        </Menu.Item>
      ];
    }

    return(
      <Header className="app-header">
        <div className="logo" onClick={(event) => this.handleClickChangePage(event, '/')}>
          <img src="/image/logo.svg" alt="logo" height="40px"/>
          <div className="name">
            <p className="chika">CHIKA</p>
            <p className="home">Nhà thông minh</p>
          </div>
        </div>
        <Menu className="header-menu"
              mode="horizontal"
              selectedKeys={[this.props.location.pathname]}>
          {menuItems}
        </Menu>
      </Header>
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
