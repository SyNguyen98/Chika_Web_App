import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { notification } from 'antd';

import '../../styles/admin/Admin.css';
import { getAdminInfo, updateAdminInfo } from '../../api';

import Personal from './Personal'
import User from './User'
import Device from './Device'
import Setting from './Setting'

class Admin extends Component {
  constructor(props) {
      super(props);
      this.state = {
          user: null,
          isLoading: false,
          component: 'info'
      }
  }

  loadCurrentUser = () => {
    this.setState({
      isLoading: true
    });
    getAdminInfo().then(response => {
      this.setState({
        user: response,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  updateAdminInfo = (updateRequest) => {
    this.setState({ isLoading: true });

    updateAdminInfo(updateRequest).then(response => {
      this.setState({
        user: response,
        component: 'info',
        isLoading: false
      });
      notification.success({
        message: 'Chika Smarthome',
        description: "Thông tin đã được cập nhật."
      });
    }).catch(error => {
      this.setState({ isLoading: false });

      notification.error({
        message: 'Chika Smarthome',
        description: error.message || 'Đã có lỗi xảy ra. Xin vui lòng thử lại sau!'
      });
    });
  }

  cutName = (name) => {
    let nameArray = name.split(" ");
    let nameAfter = nameArray.slice(nameArray.length - 2);
    return nameAfter.toString().replace(',', ' ');
  }

  handleChangeComponent = (component) => {
    this.setState({
      component: component
    });
  }

  handleLogout = () => {
    this.props.onLogout();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadCurrentUser();
  }

  render() {
    const { user } = this.state;
    let component;
    switch (this.state.component) {
      case 'info':
        component = (<Personal adminInfo={user}/>);
        break;
      case 'user':
        component = (<User/>);
        break;
      case 'device':
        component = (<Device/>);
        break;
      case 'setting':
        component = (<Setting adminInfo={user} updateAdminInfo={this.updateAdminInfo} onLogout={this.props.onLogoutForChangePassword}/>);
        break;
      default:
        component = null;
    }
    return(
      <div className="admin">
        <div className="admin_menu">
          {user ? (
            <div className="admin_menu_personal" onClick={(event) => this.handleChangeComponent('info')}>
              <img alt="avatar" src={user.avatar}/>
              <p>{this.cutName(user.name)}</p>
            </div>
          ) : null}
          <div className="admin_menu_item" onClick={(event) => this.handleChangeComponent('user')}>
            <img className="admin_menu_icon" alt="icon-user" src="/image/admin/icon-user.png"></img>
            <p>Người Dùng</p>
          </div>
          <div className="admin_menu_item" onClick={(event) => this.handleChangeComponent('device')}>
            <img className="admin_menu_icon" alt="icon-device" src="/image/admin/icon-device.png"></img>
            <p>Thiết Bị</p>
          </div>
          <div className="admin_menu_item" onClick={(event) => this.handleChangeComponent('setting')}>
            <img className="admin_menu_icon" alt="icon-setting" src="/image/admin/icon-setting.png"></img>
            <p>Quản lý<br/>tài khoản</p>
          </div>
          <div className="admin_menu_item" onClick={this.handleLogout}>
            <img className="admin_menu_icon" alt="icon-logout" src="/image/admin/icon-logout.png"></img>
            <p>Đăng Xuất</p>
          </div>
        </div>

        <div className="admin_body">
          {component}
        </div>
      </div>
    )
  }
}

export default withRouter(Admin);
