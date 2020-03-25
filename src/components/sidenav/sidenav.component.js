import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Icon } from 'antd';

import '../../styles/sidenav/sidenav.component.css';
import { LINK_ADMIN_INFO, LINK_ADMIN_SETTING, LINK_USER_INFO, LINK_USER_ADD_USER, LINK_USER_SETTING } from '../../constant';

class SideNavComponent extends Component {
    handleChangeComponent = (link) => {
        this.props.history.push(link);
        this.props.onCloseSidenav()
    }

    render() {
        const { currentUser, sidenavVisible, onCloseSidenav, handleLogout } = this.props;
        return(
                <Drawer className='side-nav'
                        title={<SideNavHeader currentUser={currentUser}/>}
                        placement='left'
                        width='23vw'
                        visible={sidenavVisible}
                        closable={false}
                        onClose={onCloseSidenav}>
                        
                    {currentUser.role === 'ADMIN' ? (
                        <AdminSidenavComponent handleChangeComponent={this.handleChangeComponent}/>
                    ) : (
                        <UserSidenavComponent currentUser={currentUser} handleChangeComponent={this.handleChangeComponent}/>
                    )}
        
                    <div className='side-nav__item' onClick={handleLogout}>
                        <Icon type="logout" /><p>Đăng xuất</p>
                    </div>
        
                    <i className='side-nav__bottom'>Sản phẩm của Chika Smarthome<br/>Copyright © Chika</i>
                </Drawer>
        )
    }
}
  
export default withRouter(SideNavComponent);

const SideNavHeader = ({currentUser}) => {
    return(
        <div className='side-nav__header'>
            <h4 >CHÀO MỪNG TRỞ LẠI!</h4>
            <div style={{display: 'flex'}}>
                <img alt='user-avatar' src={currentUser.avatar !== '' ? currentUser.avatar : '/image/avatar.png'}/>
                <span>
                    <p className='name'>{currentUser ? currentUser.name : null}</p>
                    <p className='email'>{currentUser ? currentUser.email : null}</p>
                </span>
            </div>  
        </div> 
    )
}

const AdminSidenavComponent = ({ handleChangeComponent }) => {
    return(
        <nav>
            <div className='side-nav__item' onClick={() => handleChangeComponent(LINK_ADMIN_INFO)}>
                <Icon type="idcard" /><p>Thông tin cá nhân</p>
            </div>
        
            <div className='side-nav__item' onClick={() => handleChangeComponent(LINK_ADMIN_SETTING)}>
                <Icon type="setting" /><p>Hỗ trợ</p>
            </div>
        </nav>
    )
}

const UserSidenavComponent = ({ currentUser, handleChangeComponent }) => {
    return(
        <nav>
            <div className='side-nav__item' onClick={() => handleChangeComponent(LINK_USER_INFO)}>
                <Icon type="idcard" /><p>Quản lý tài khoản</p>
            </div>
        
            {currentUser.role === 'HOME_MASTER' ? (
                <div className='side-nav__item' onClick={() => handleChangeComponent(LINK_USER_ADD_USER)}>
                    <Icon type="user-add" /><p>Thêm thành viên</p>
                </div>
            ) : null}
        
            <div className='side-nav__item' onClick={() => handleChangeComponent(LINK_USER_SETTING)}>
                <Icon type="setting" /><p>Hỗ trợ</p>
            </div>
        </nav>
    )
}