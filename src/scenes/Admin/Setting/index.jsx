import React, {Component, Fragment} from 'react';
import {Tabs} from 'antd';

import './setting.css';

import AdminChangeInfoComponent from './ChangeInfo';
import AdminChangePassComponent from './ChangePass';

const {TabPane} = Tabs;

export default class AdminSettingComponent extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Fragment>
                <div className="admin-setting">
                    <div className="admin-setting__float">
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Thay đổi thông tin" key="1">
                                <AdminChangeInfoComponent currentUser={this.props.currentUser}
                                                          updateAdminInfo={this.props.updateAdminInfo}/>
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