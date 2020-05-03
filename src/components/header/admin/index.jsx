import React from 'react';
import { Layout, Button, Icon } from 'antd';

import "./admin-header.css";

import {ADMIN_PRODUCT_LINK, ADMIN_USER_LINK} from "../../../constant/link";

const { Header } = Layout;

const AdminHeaderComponent = ({ onOpenSidenav, handleChangePage }) => {

    return(
        <Header className="app-header admin-header">
            <Button onClick={onOpenSidenav}><Icon type="menu" /></Button>
            <img className="app-header__logo" alt="logo-chika" src="/image/logo.svg"/>
            <h1>Trang Quản Lý</h1>
            <nav className="app-header__nav">
                <a className="app-header__nav__item" onClick={() => handleChangePage(ADMIN_USER_LINK)}>
                    <Icon type="team" />&emsp;Người dùng
                </a>
                <a className="app-header__nav__item" onClick={() => handleChangePage(ADMIN_PRODUCT_LINK)}>
                    <Icon type="appstore" />&emsp;Thiết bị
                </a>
            </nav>
        </Header>
    )
}

export default AdminHeaderComponent;