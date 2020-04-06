import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Layout, BackTop, notification } from 'antd';
import './App.css';

import AppHeaderComponent from '../components/header/app-header.component';
import AppFooterComponent from '../components/app-footer.component';
import SideNavComponent from '../components/sidenav/sidenav.component';
import ContactMenuComponent from '../components/guest/contact-menu.component';

import HomeComponent from '../components/guest/home.component';
import IntroduceComponent from '../components/guest/introduce.component';
import ProductComponent from '../components/guest/product.component';
import SupportComponent from '../components/guest/support.component';

import GoogleComponent from '../components/guest/solution/google.component';
import ConditionerTiviComponent from '../components/guest/solution/conditioner-tivi.component';
import LightControlComponent from '../components/guest/solution/light-control.component';
import EnvironmentalControlComponent from '../components/guest/solution/environmental-control.component';
import SecuritySystemComponent from '../components/guest/solution/security-system.component';
import RgbLedComponent from '../components/guest/solution/rgb-led.component';

import SwitchSensorComponent from '../components/guest/product/switch-sensor.component';
import SwitchComponent from '../components/guest/product/switch.component';
import ModuleIrComponent from '../components/guest/product/module-ir.component';
import HomeControllerComponent from '../components/guest/product/home-controller.component';
import DoorSensorComponent from '../components/guest/product/door-sensor.component';
import MotionDetectorComponent from '../components/guest/product/motion-detector.component';

import QuestionComponent from '../components/guest/supporting/question.component';
import DocumentComponent from '../components/guest/supporting/document.component';

import LoginComponent from '../components/guest/login.component';

import UserComponent from '../components/admin/user/admin-user.component';
import UserListComponent from '../components/admin/user/admin-user-list.component';
import AddUserComponent from '../components/admin/user/admin-user-add.component';
import ShopComponent from '../components/admin/user/admin-user-shop.component';
import FeedbackComponent from '../components/admin/user/admin-user-feedback.component';
import AdminProductComponent from '../components/admin/product/admin-product.component';
import SwitchWifiListComponent from '../components/admin/product/switch-wifi-list.component';
import SwitchRfListComponent from '../components/admin/product/switch-rf-list.component';
import ModuleIrListComponent from '../components/admin/product/module-ir-list.component';
import HomeCenterListComponent from '../components/admin/product/home-center-list.component';
import SensorListComponent from '../components/admin/product/sensor-list.component';
import AdminInfoComponent from '../components/admin/setting/admin-info.component';
import AdminSettingComponent from '../components/admin/setting/admin-setting.component';

import UserHomeComponent from '../components/user/user-home.component';
import UserListRoomComponent from '../components/user/user-list-room.component';
import UserRoomComponent from '../components/user/user-room.component';

import UserPersonalComponent from '../components/user/setting/user-personal.component'

import { ACCESS_TOKEN,
  LINK_INTRODUCTION, LINK_LOGIN, LINK_PRODUCT, LINK_SUPPORTING,
  LINK_GG_ASSISTANT, LINK_LIGHT_CONTROL, LINK_CONDITIONER_TIVI, LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED,
  LINK_SWITCH_SENSOR, LINK_SWITCH, LINK_MODULE_IR, LINK_HOME_CONTROLLER, LINK_DOOR_SENSOR, LINK_MOTION_DETECTOR,
  LINK_QUESTION, LINK_DOCUMENT,
  LINK_ADMIN_USER, LINK_ADMIN_ADD_USER, LINK_ADMIN_SHOP, LINK_ADMIN_FEEDBACK,
  LINK_ADMIN_PRODUCT, LINK_ADMIN_SWITCH_WIFI, LINK_ADMIN_SWITCH_RF, LINK_ADMIN_MODULE_IR, LINK_ADMIN_HOME_CENTER, LINK_ADMIN_SENSOR,
  LINK_ADMIN_INFO, LINK_ADMIN_SETTING,
  LINK_USER_INFO,
  LINK_USER_HOME, LINK_USER_ROOM, LINK_ADMIN_LIST_USER } from '../constant';

import { getUserInfo, updateAdminInfo } from '../service/user.service';
import { deleteAllCookies } from '../service/cookie.service'
import { mqttConnect } from '../service/mqtt.service'

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isLoading: false,
      sidenavVisible: false,
      mqttMessage: null
    }
  }

  loadCurrentUser = () => {
    getUserInfo().then(response => {
      this.setState({ currentUser: response });
      console.log(response);
      switch (response.role) {
        case 'ADMIN':
          this.props.history.push(LINK_ADMIN_USER);
          this.onCloseSidenav();
          break;
        case 'HOME_MASTER': case 'HOME_USER':
          this.props.history.push(LINK_USER_ROOM + "/b2693580-a57f-4344-a466-ab2ea2aafa1d");
          // this.props.history.push(LINK_USER_HOME);
          this.onCloseSidenav();
          break;
        default:
      }
    }).catch(error => {
    });
  }

  updateAdminInfo = (updateRequest) => {
    this.setState({ isLoading: true });
    updateAdminInfo(updateRequest).then(response => {
      this.setState({
        currentUser: response,
        isLoading: false
      });
      this.props.history.push(LINK_ADMIN_INFO);
      notification.success({
        message: 'Chika Smarthome',
        description: "Thông tin đã được cập nhật."
      });
    }).catch(error => {
      this.setState({ isLoading: false });
      let message;
      if (error.message.includes('Phone')) {
        message = 'Số điện thoại đã được sử dụng';
      } else if (error.message.includes('Email')) {
        message = 'Email đã được sử dụng';
      }
      notification.error({
        message: 'Chika Smarthome',
        description: message || "Đã có lỗi xảy ra. Vui lòng thử lại sau!"
      });
    });
  }

  handleOpenSidenav = () => {
    this.setState({ sidenavVisible: true });
  }

  onCloseSidenav = () => {
    this.setState({ sidenavVisible: false, });
  };

  handleLogin = () => {
    notification.success({
      message: 'Chika Smarthome',
      description: "Đăng nhập thành công.",
    });
    this.loadCurrentUser();
  }

  handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    deleteAllCookies();

    this.setState({ currentUser: null, });

    this.props.history.push("/");
    notification.success({
      message: 'Chika Smarthome',
      description: "Đăng xuất thành công.",
    });
  }

  onChangePasswordLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({ currentUser: null, });

    this.props.history.push("/");
    notification.success({
      message: 'Chika Smarthome',
      description: "Đổi mật khẩu thành công",
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
    mqttConnect();
  }

  render() {
    const { currentUser, sidenavVisible } = this.state;   
    return (
      <Layout>
        <AppHeaderComponent currentUser={currentUser} onOpenSidenav={this.handleOpenSidenav} {...this.props}/>
        <Content>
            <Switch>
              <Route exact path="/" component={HomeComponent} />
              <Route exact path={LINK_INTRODUCTION} component={IntroduceComponent} />

              <Route exact path={LINK_GG_ASSISTANT} component={GoogleComponent} />
              <Route exact path={LINK_CONDITIONER_TIVI} component={ConditionerTiviComponent} />
              <Route exact path={LINK_LIGHT_CONTROL} component={LightControlComponent} />
              <Route exact path={LINK_ENVIRONMANTAL_CONTROL} component={EnvironmentalControlComponent} />
              <Route exact path={LINK_SECURITY_SYSTEM} component={SecuritySystemComponent} />
              <Route exact path={LINK_RGB_LED} component={RgbLedComponent} />

              <Route exact path={LINK_PRODUCT} component={ProductComponent} />
                <Route exact path={LINK_SWITCH_SENSOR} component={SwitchSensorComponent} />
                <Route exact path={LINK_SWITCH} component={SwitchComponent} />
                <Route exact path={LINK_MODULE_IR} component={ModuleIrComponent} />
                <Route exact path={LINK_HOME_CONTROLLER} component={HomeControllerComponent} />
                <Route exact path={LINK_DOOR_SENSOR} component={DoorSensorComponent} />
                <Route exact path={LINK_MOTION_DETECTOR} component={MotionDetectorComponent} />

              <Route exact path={LINK_SUPPORTING} component={SupportComponent} />
                <Route exact path={LINK_QUESTION} component={QuestionComponent} />
                <Route exact path={LINK_DOCUMENT} component={DocumentComponent} />

              <Route path={LINK_LOGIN} render={(props) => <LoginComponent onLogin={this.handleLogin} {...props} />}/>

              <Route exact path={LINK_ADMIN_USER} render={(props) => <UserComponent {...props} />} />
                <Route exact path={LINK_ADMIN_LIST_USER} render={(props) => <UserListComponent {...props} />} />
                <Route exact path={LINK_ADMIN_ADD_USER} render={(props) => <AddUserComponent {...props} />} />
                <Route exact path={LINK_ADMIN_SHOP} render={(props) => <ShopComponent {...props} />} />
                <Route exact path={LINK_ADMIN_FEEDBACK} render={(props) => <FeedbackComponent {...props} />} />
                
              <Route exact path={LINK_ADMIN_PRODUCT} render={(props) => <AdminProductComponent {...props} />} />
                <Route exact path={LINK_ADMIN_SWITCH_WIFI} render={(props) => <SwitchWifiListComponent {...props} />} />
                <Route exact path={LINK_ADMIN_SWITCH_RF} render={(props) => <SwitchRfListComponent {...props} />} />
                <Route exact path={LINK_ADMIN_MODULE_IR} render={(props) => <ModuleIrListComponent {...props} />} />
                <Route exact path={LINK_ADMIN_HOME_CENTER} render={(props) => <HomeCenterListComponent {...props} />} />
                <Route exact path={LINK_ADMIN_SENSOR} render={(props) => <SensorListComponent {...props} />} />

              <Route exact path={LINK_ADMIN_INFO} render={(props) => <AdminInfoComponent currentUser={currentUser} {...props} />} />
              <Route exact path={LINK_ADMIN_SETTING} 
                render={(props) => <AdminSettingComponent currentUser={currentUser}
                                                          updateAdminInfo={this.updateAdminInfo} 
                                                          onLogout={this.onChangePasswordLogout} {...props} />} />

              <Route exact path={LINK_USER_HOME} render={(props) => <UserHomeComponent {...props}/>} />
              <Route exact path={LINK_USER_ROOM} render={(props) => <UserListRoomComponent {...props}/>} />
              <Route exact path={`${LINK_USER_ROOM}/:id`} render={(props) => <UserRoomComponent {...props}/>} />

              <Route exact path={LINK_USER_INFO} render={(props) => <UserPersonalComponent currentUser={currentUser} {...props}/>} />

            </Switch>
        </Content>

        {currentUser ? (
          <SideNavComponent currentUser={currentUser}
                            sidenavVisible={sidenavVisible}
                            onCloseSidenav={this.onCloseSidenav}
                            handleLogout={this.handleLogout}/>
        ) : null}

        {currentUser ? null : [
          <AppFooterComponent/>,
          <ContactMenuComponent/>
        ]}

        <BackTop/>
      </Layout>
    );
  }
}

export default withRouter(App);
