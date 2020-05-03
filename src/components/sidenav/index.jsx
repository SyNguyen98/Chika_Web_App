import React from 'react';
import {Drawer, Icon} from 'antd';

import "./sidenav.css";

import {
    ADMIN_INFO_LINK,
    ADMIN_SETTING_LINK,
    USER_ADD_USER_LINK,
    USER_INFO_LINK,
    USER_SETTING_LINK
} from "../../constant/link";

const SideNavComponent = ({history, currentUser, sidenavVisible, onCloseSidenav, handleLogout}) => {

    const handleChangeComponent = (link) => {
        history.push(link);
        onCloseSidenav();
    }

    return (
        <Drawer className='side-nav'
                title={<SideNavHeader currentUser={currentUser}/>}
                placement='left'
                width='23vw'
                visible={sidenavVisible}
                closable={false}
                onClose={onCloseSidenav}>

            {currentUser.role === 'ADMIN' ? (
                <AdminSidenavComponent handleChangeComponent={handleChangeComponent}/>
            ) : (
                <UserSidenavComponent currentUser={currentUser} handleChangeComponent={handleChangeComponent}/>
            )}

            <div className='side-nav__item' onClick={handleLogout}>
                <Icon type="logout"/><p>Đăng xuất</p>
            </div>

            <i className='side-nav__bottom'>Sản phẩm của Chika Smarthome<br/>Copyright © Chika</i>
        </Drawer>
    )
}

export default SideNavComponent;

const SideNavHeader = ({currentUser}) => (
    <div className='side-nav__header'>
        <h4>CHÀO MỪNG TRỞ LẠI!</h4>
        <div style={{display: 'flex'}}>
            <img alt='user-avatar' src={currentUser.avatar !== '' ? currentUser.avatar : '/image/avatar.png'}/>
            <span>
                    <p className='name'>{currentUser ? currentUser.name : null}</p>
                    <p className='email'>{currentUser ? currentUser.email : null}</p>
                </span>
        </div>
    </div>
)


const AdminSidenavComponent = ({handleChangeComponent}) => (
    <nav>
        <div className='side-nav__item' onClick={() => handleChangeComponent(ADMIN_INFO_LINK)}>
            <Icon type="idcard"/><p>Thông tin cá nhân</p>
        </div>

        <div className='side-nav__item' onClick={() => handleChangeComponent(ADMIN_SETTING_LINK)}>
            <Icon type="setting"/><p>Hỗ trợ</p>
        </div>
    </nav>
)


const UserSidenavComponent = ({currentUser, handleChangeComponent}) => (
    <nav>
        <div className='side-nav__item' onClick={() => handleChangeComponent(USER_INFO_LINK)}>
            <Icon type="idcard"/><p>Quản lý tài khoản</p>
        </div>

        {currentUser.role === 'HOME_MASTER' ? (
            <div className='side-nav__item' onClick={() => handleChangeComponent(USER_ADD_USER_LINK)}>
                <Icon type="user-add"/><p>Thêm thành viên</p>
            </div>
        ) : null}

        <div className='side-nav__item' onClick={() => handleChangeComponent(USER_SETTING_LINK)}>
            <Icon type="setting"/><p>Hỗ trợ</p>
        </div>
    </nav>
)
