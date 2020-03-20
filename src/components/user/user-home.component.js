import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { notification } from 'antd';

import '../../styles/user/user-home.component.css';
import { getUserInfo } from '../../api';

import { LINK_USER_ROOM, LINK_USER_SCRIPT, LINK_USER_CAMERA } from '../../constant'

class UserHomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
        }
    }
    
    componentDidMount() {
      window.scrollTo(0, 0);
      this.loadCurrentUser();
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

    handleChangeUserComponent = (link) => {
        this.props.history.push(link);
    }
  
    render() {
        const { currentUser } = this.state;
        return(
            <div className='user-home'>
                <div className='user-home__title'>
                    <img alt='smarthome-icon' src='/image/user/home/smarthome-icon.png'/>
                    <h1>
                        Nhà thông minh của {currentUser ? currentUser.name.substring(currentUser.name.lastIndexOf(' ')) : null}
                    </h1>
                    <img className='user-home__title__avatar' alt='user-avatar' 
                        src={currentUser!== null && currentUser.avatar !== '' ? currentUser.avatar : '/image/avatar.png'}/>
                </div>
                
                <div className='user-home__item user-home__item__security'>
                    <h1>AN NINH</h1>
                    <div className='user-home__item__body'>
                        <img alt='security-icon' src='/image/user/home/shield-icon.png'></img>
                        <span>
                            <i>Tình trạng</i>
                            <p>AN TOÀN</p>
                        </span>
                    </div>
                </div>

                <div className='user-home__item user-home__item__info'>
                    <h1>THÔNG TIN</h1>
                    <div className='user-home__item__body'>
                        <img alt='air-icon' src='/image/user/home/air-icon.png'></img>
                        <span className='air'>
                            <i>Không khí</i>
                            <p>An toàn</p>
                        </span>
                        <img alt='temperature-icon' src='/image/user/home/temperature-icon.png'></img>
                        <span className='temperature'>
                            <i>Nhiệt độ</i>
                            <p>27 &#8451;</p>
                        </span>
                        <img alt='humidity-icon' src='/image/user/home/humidity-icon.png'></img>
                        <span className='humidity'>
                            <i>Độ ẩm</i>
                            <p>97 &#37;</p>
                        </span>
                    </div> 
                </div>

                <div className='user-home__item user-home__item__zoom-in user-home__item__room'
                    onClick={() => this.handleChangeUserComponent(LINK_USER_ROOM)}>
                    <h1>PHÒNG</h1>
                    <div className='user-home__item__body'>
                        <img alt='room-icon' src='/image/user/home/room-icon.png'></img>
                        <i>Điều khiển thiết bị<br/>trong từng căn phòng</i>
                    </div>
                </div>

                <div className='user-home__item user-home__item__zoom-in user-home__item__script'
                    onClick={() => this.handleChangeUserComponent(LINK_USER_SCRIPT)}>
                    <h1>KỊCH BẢN</h1>
                    <div className='user-home__item__body'>
                        <img alt='script-icon' src='/image/user/home/script-icon.png'/>
                        <i>Tạo kịch bản<br/>cho ngôi nhà</i>
                    </div>
                </div>

                <div className='user-home__item user-home__item__zoom-in user-home__item__camera'
                    onClick={() => this.handleChangeUserComponent(LINK_USER_CAMERA)}>
                    <h1>GIÁM SÁT</h1>
                    <div className='user-home__item__body'>
                        <img alt='camera-icon' src='/image/user/home/camera-icon.png'></img>
                        <i>Giám sát an ninh<br/>trong nhà</i>
                    </div>
                </div>
            </div>
        )
    }
}
  
export default withRouter(UserHomeComponent);