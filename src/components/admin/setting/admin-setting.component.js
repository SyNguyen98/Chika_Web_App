import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';

import '../../../styles/admin/setting/admin-setting.component.css';
import AdminChangeInfoComponent from './admin-change-info.component';
import AdminChangePassComponent from './admin-change-pass.component';

const { TabPane } = Tabs;

class AdminSettingComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return(
      <Fragment>
        <div className="admin-setting">
          <div className="admin-setting__float">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Thay đổi thông tin" key="1">
                <AdminChangeInfoComponent currentUser={this.props.currentUser} updateAdminInfo={this.props.updateAdminInfo}/>
              </TabPane>
              <TabPane tab="Thay đổi mật khẩu" key="2">
                <AdminChangePassComponent onLogout={this.props.onLogout}/>
              </TabPane>
            </Tabs>
            <div className="admin-setting__corner1"/>
            <div className="admin-setting__corner2"/>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(AdminSettingComponent);