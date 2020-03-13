import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Drawer, Icon, notification } from 'antd';

import '../styles/sidenav.component.css';
import { LINK_USER_INFO, LINK_USER_ADD_USER, LINK_USER_SETTING } from '../constant';

import { getUserInfo } from '../api';

class SideNavComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
        }
    }

    handleChangeUserComponent = (link) => {
        this.props.history.push(link);
        this.props.onCloseSidenav()
    }

    loadCurrentUser = () => {
        getUserInfo().then(response => {
            this.setState({
                currentUser: response
            });
            this.forceUpdate();
        }).catch(error => {
            notification.error({
                message: 'Chika Smarthome',
                description: error.message || "Tải dữ liệu người dùng thất bại!"
            });
        });
    }

    componentDidMount() {
        this.loadCurrentUser();
      }

    render() {
        const { sidenavVisible, onCloseSidenav, handleLogout } = this.props;
        const { currentUser } = this.state;
        return(
                    <Drawer className='side-nav'
                            title={<SideNavHeader currentUser={currentUser}/>}
                            placement='left'
                            width='23vw'
                            visible={sidenavVisible}
                            closable={false}
                            onClose={onCloseSidenav}>
                            
                        <div className='side-nav__item' onClick={() => this.handleChangeUserComponent(LINK_USER_INFO)}>
                            <Icon type="idcard" /><p>Quản lý tài khoản</p>
                        </div>
            
                        {currentUser !== null && currentUser.role === 'HOME_MASTER' ? (
                        <div className='side-nav__item' onClick={() => this.handleChangeUserComponent(LINK_USER_ADD_USER)}>
                            <Icon type="user-add" /><p>Thêm thành viên</p>
                        </div>
                        ) : null}
            
                        <div className='side-nav__item' onClick={() => this.handleChangeUserComponent(LINK_USER_SETTING)}>
                            <Icon type="setting" /><p>Hỗ trợ</p>
                        </div>
            
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
                <img alt='user-avatar' src={currentUser!==null && currentUser.avatar !== '' ? currentUser.avatar : '/image/avatar.png'}/>
                <span>
                    <p className='name'>{currentUser ? currentUser.name : null}</p>
                    <p className='email'>{currentUser ? currentUser.email : null}</p>
                </span>
            </div>  
        </div> 
    )
}