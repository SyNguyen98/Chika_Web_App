import React from 'react';
import {Button, Icon} from 'antd';

import {ADMIN_PRODUCT_LINK, ADMIN_USER_LINK} from "../../../constant/link";

import "./admin-header.scss";

const AdminHeaderComponent = ({ onOpenSidenav, handleChangePage }) => {

    return(
        <div className="admin-header">
            <Button onClick={onOpenSidenav}><Icon type="menu" /></Button>
            <img alt="logo-chika" src="/image/logo.svg"/>
            <h1>Trang Quản Lý</h1>
            <nav className="nav">
                <a className="item" onClick={() => handleChangePage(ADMIN_USER_LINK)}>
                    <Icon type="team" />&emsp;Người dùng
                </a>
                <a className="item" onClick={() => handleChangePage(ADMIN_PRODUCT_LINK)}>
                    <Icon type="appstore" />&emsp;Thiết bị
                </a>
            </nav>
        </div>
    )
}

export default AdminHeaderComponent;