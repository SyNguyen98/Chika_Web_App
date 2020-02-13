import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/admin/Admin.css';
import { getAdminInfo } from '../../api';

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
          component: 'user'
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
    let component;
    if (this.state.component === 'info') {
      component = (<Personal adminInfo={this.state.user}/>);
    } else if (this.state.component === 'user') {
      component = (<User/>);
    } else if (this.state.component === 'device') {
      component = (<Device/>);
    } else if (this.state.component === 'setting') {
      component = (<Setting/>);
    }
    return(
      <div className="admin">
        <div className="admin_menu">
          {this.state.user ? (
            <div className="admin_menu_personal" onClick={(event) => this.handleChangeComponent('info')}>
              <img alt="avatar" src={this.state.user.avatar}></img>
              <p>{this.cutName(this.state.user.name)}</p>
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
            <p>Cài Đặt</p>
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
