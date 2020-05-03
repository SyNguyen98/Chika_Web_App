import React from 'react';
import {Button, Icon, Layout} from 'antd';

import "./user-header.css";

import {USER_CAMERA_LINK, USER_HOME_LINK, USER_ROOM_LINK, USER_SCRIPT_LINK} from "../../../constant/link";

const { Header } = Layout;

const UserHeaderComponent = ({ onOpenSidenav, handleChangePage }) => {

    return(
      <Header className="app-header user-header">
        <Button onClick={onOpenSidenav}><Icon type="menu" /></Button>
        <img className="app-header__logo" alt='logo-icon' src='/image/logo.svg'/>&ensp;
        <b>Nhà Thông Minh</b>
        <nav className="app-header__nav">
          <a className="app-header__nav__item" onClick={() => handleChangePage(USER_HOME_LINK)}>
            <img alt='house-icon' src='/image/header/house-icon.png'/>&ensp;Nhà
          </a>
          <a className="app-header__nav__item" onClick={() => handleChangePage(USER_ROOM_LINK)}>
            <img alt='room-icon' src='/image/header/room-icon.png'/>&ensp;Phòng
          </a>
          <a className="app-header__nav__item" onClick={() => handleChangePage(USER_SCRIPT_LINK)}>
            <img alt='script-icon' src='/image/header/script-icon.png'/>&ensp;Kịch bản
          </a>
          <a className="app-header__nav__item" onClick={() => handleChangePage(USER_CAMERA_LINK)}>
            <img alt='camera-icon' src='/image/header/camera-icon.png'/>&ensp;Giám sát
          </a>
        </nav>
      </Header>
    )
}

export default UserHeaderComponent;