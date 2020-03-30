import React from 'react';
import { Layout, Button, Icon } from 'antd';

import '../../styles/header/user-header.component.css';
import { LINK_USER_HOME, LINK_USER_ROOM, LINK_USER_SCRIPT, LINK_USER_CAMERA } from '../../constant'

const { Header } = Layout;

const UserHeaderComponent = ({ currentUser, onOpenSidenav, history }) => {

    const handleChangeUserComponent = (link) => {
      history.push(link);
    }
  
    return(
      <Header className="app-header user-header">
        <Button onClick={onOpenSidenav}><Icon type="menu" /></Button>
        <img className="app-header__logo" alt='logo-icon' src='/image/logo.svg'/>&ensp;
        <i>Nhà của {currentUser.name.substring(currentUser.name.lastIndexOf(' '))}</i>
        <nav className="app-header__nav">
          <a className="app-header__nav__item" onClick={() => handleChangeUserComponent(LINK_USER_HOME)}>
            <img alt='house-icon' src='/image/header/house-icon.png'/>&ensp;Nhà
          </a>
          <a className="app-header__nav__item" onClick={() => handleChangeUserComponent(LINK_USER_ROOM)}>
            <img alt='room-icon' src='/image/header/room-icon.png'/>&ensp;Phòng
          </a>
          <a className="app-header__nav__item" onClick={() => handleChangeUserComponent(LINK_USER_SCRIPT)}>
            <img alt='script-icon' src='/image/header/script-icon.png'/>&ensp;Kịch bản
          </a>
          <a className="app-header__nav__item" onClick={() => handleChangeUserComponent(LINK_USER_CAMERA)}>
            <img alt='camera-icon' src='/image/header/camera-icon.png'/>&ensp;Giám sát
          </a>
        </nav>
      </Header>
    )
}

export default UserHeaderComponent;