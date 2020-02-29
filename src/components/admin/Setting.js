import React, { Component } from 'react';
import { Icon, Button } from 'antd';

import '../../styles/admin/Setting.css';

import ChangeInfo from './setting/ChangeInfo'
import ChangePassword from './setting/ChangePassword'

export default class Setting extends Component {
  constructor(props) {
      super(props);
      this.state = {
          component: null,
      }
  }

  handleChangeComponet = (componentName) => {
    this.setState({ component: componentName });
  }

  handleBack = () => {
    this.setState({ component: null });
    this.componentDidMount();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let component;
    switch (this.state.component) {
      case 'change-info':
        component = (<ChangeInfo adminInfo={this.props.adminInfo} updateAdminInfo={this.props.updateAdminInfo}/>);
        break;
      case 'change-password':
        component = (<ChangePassword onLogout={this.props.onLogout}/>);
        break;
      default:
        component = null;
    }
    return(
      <div className="admin-setting">
        {component ? (
          <div >
            <Button type="primary" style={{margin: '1vw 0 0 3vw'}} onClick={this.handleBack}>
                <Icon type="left" />Trở về
            </Button>
            {component}
          </div>
        ) : (
          <div>
            <div className="admin-setting_menu">
              <div className="admin-setting_menu_item" onClick={(event) => this.handleChangeComponet('change-info')}>
                <img alt='icon-change-info' src='/image/admin/setting/change-info.png' style={{marginTop: '2vw', width: '8vw', height: '8vw'}}/>
                <h1 style={{marginTop: '1vw'}}>THAY ĐỔI THÔNG TIN</h1>
              </div>

              <div className="admin-setting_menu_item" onClick={(event) => this.handleChangeComponet('change-password')}>
                <img alt='icon-change-password' src='/image/admin/setting/change-password.png' style={{marginTop: '2vw', width: '9vw', height: '9vw'}}/>
                <h1 >THAY ĐỔI MẬT KHẨU</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
