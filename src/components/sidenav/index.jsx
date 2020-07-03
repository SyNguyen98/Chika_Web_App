import React from 'react';
import {Drawer, Icon} from 'antd';

import "./sidenav.scss";

import {ADMIN_INFO_LINK, ADMIN_SETTING_LINK, USER_INFO_LINK, USER_SUPPORT_LINK} from "../../constant/link";

const SideNavComponent = ({history, currentUser, sidenavVisible, onCloseSidenav, handleLogout}) => {

    const handleChangeComponent = (link) => {
        history.push(link);
        onCloseSidenav();
    }

    const getWidth = () => {
        if (window.innerWidth < 1300) {
            return '250px';
        }
        if (window.innerWidth < 1500) {
            return '270px';
        }
        if (window.innerWidth < 2000) {
            return '330px';
        }
        return '400px'
    }

    return (
        <Drawer className='app-side-nav'
                title={<SideNavHeader currentUser={currentUser}/>}
                placement='left'
                width={getWidth()}
                visible={sidenavVisible}
                closable={false}
                onClose={onCloseSidenav}>

            {currentUser.role === 'ADMIN' ? (
                <AdminSidenavComponent handleChangeComponent={handleChangeComponent}/>
            ) : (
                <UserSidenavComponent handleChangeComponent={handleChangeComponent}/>
            )}

            <div className='item' onClick={handleLogout}>
                <Icon type="logout"/><p>Đăng xuất</p>
            </div>

            <i className='bottom'>Sản phẩm của Chika Smarthome<br/>Copyright © Chika</i>
        </Drawer>
    )
}

export default SideNavComponent;

const SideNavHeader = ({currentUser}) => (
    <div className='header'>
        {window.innerWidth < 1500 ? <h4>CHÀO MỪNG<br/>TRỞ LẠI!</h4> : <h4>CHÀO MỪNG TRỞ LẠI!</h4>}
        <div className="content">
            <img alt='user-avatar' src={currentUser.avatar !== '' ? currentUser.avatar : '/image/avatar.png'}/>
            <p>{currentUser ? currentUser.name : null}</p>
        </div>
    </div>
)


const AdminSidenavComponent = ({handleChangeComponent}) => (
    <nav>
        <div className='item' onClick={() => handleChangeComponent(ADMIN_INFO_LINK)}>
            <Icon type="idcard"/><p>Thông tin cá nhân</p>
        </div>

        <div className='item' onClick={() => handleChangeComponent(ADMIN_SETTING_LINK)}>
            <Icon type="setting"/><p>Hỗ trợ</p>
        </div>
    </nav>
)


const UserSidenavComponent = ({handleChangeComponent}) => (
    <nav>
        <div className='item' onClick={() => handleChangeComponent(USER_INFO_LINK)}>
            <Icon type="idcard"/><p>Quản lý tài khoản</p>
        </div>

        <div className='item' onClick={() => handleChangeComponent(USER_SUPPORT_LINK)}>
            <Icon type="setting"/><p>Hỗ trợ</p>
        </div>
    </nav>
)
