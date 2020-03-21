import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Layout, BackTop, notification } from 'antd';
import './App.css';

import AppHeaderComponent from '../components/header/app-header.component';
import AppFooterComponent from '../components/app-footer.component';
import SideNavComponent from '../components/sidenav.component';
import ContactMenuComponent from '../components/guest/contact-menu.component';

import HomeComponent from '../components/guest/home.component.';
import IntroduceComponent from '../components/guest/introduce.component';
import ProductComponent from '../components/guest/product.component';
import SupportComponent from '../components/guest/support.component';

import GoogleComponent from '../components/guest/solution/google.component';
import ConditionerTiviComponent from '../components/guest/solution/conditioner-tivi.component';
import LightControlComponent from '../components/guest/solution/light-control.component';
import EnvironmentalControlComponent from '../components/guest/solution/environmental-control.component';
import SecuritySystemComponent from '../components/guest/solution/security-system.component';
import RgbLedComponent from '../components/guest/solution/rgb-led.component';

import SwitchSensor from '../components/guest/product/SwitchSensor';
import Switch_ from '../components/guest/product/Switch';
import ModuleIr from '../components/guest/product/ModuleIr';
import HomeController from '../components/guest/product/HomeController';
import DoorSensor from '../components/guest/product/DoorSensor';
import MotionDetector from '../components/guest/product/MotionDetector';

import QuestionComponent from '../components/guest/supporting/question.component';
import DocumentComponent from '../components/guest/supporting/document.component';

import LoginComponent from '../components/guest/login.component';

import Admin from '../components/admin/Admin';

import UserHomeComponent from '../components/user/user-home.component';
import UserListRoomComponent from '../components/user/user-list-room.component';
import UserRoomComponent from '../components/user/user-room.component';

import UserPersonalComponent from '../components/user/user-personal.component'

import { ACCESS_TOKEN,
  LINK_INTRODUCTION, LINK_LOGIN, LINK_PRODUCT, LINK_SUPPORTING,
  LINK_GG_ASSISTANT, LINK_LIGHT_CONTROL, LINK_CONDITIONER_TIVI, LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED,
  LINK_SWITCH_SENSOR, LINK_SWITCH, LINK_MODULE_IR, LINK_HOME_CONTROLLER, LINK_DOOR_SENSOR, LINK_MOTION_DETECTOR,
  LINK_QUESTION, LINK_DOCUMENT,
  LINK_ADMIN,
  LINK_USER_INFO,
  LINK_USER_HOME, LINK_USER_ROOM} from '../constant';

import { getCurrentUser } from '../api';
import { deleteAllCookies } from '../service/cookie.service'

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isLoading: false,
      sidenavVisible: false,
    }
  }

  loadCurrentUser = () => {
    this.setState({
      isLoading: true
    });
    getCurrentUser().then(response => {
      this.setState({
        currentUser: response,
        isLoading: false
      });
      this.forceUpdate();
      console.log(response);
      switch (response.role) {
        case 'ADMIN':
          this.props.history.push(LINK_ADMIN);
          break;
        case 'HOME_MASTER': case 'HOME_USER':
          this.props.history.push(LINK_USER_HOME);
          this.onCloseSidenav();
          break;
        default:
      }
    }).catch(error => {
      this.setState({
        isLoading: false
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

  handleLogoutForChangePassword = () => {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({ currentUser: null, });

    this.props.history.push(LINK_LOGIN);
    notification.success({
      message: 'Chika Smarthome',
      description: "Đổi mật khẩu thành công",
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
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
                <Route exact path={LINK_SWITCH_SENSOR} component={SwitchSensor} />
                <Route exact path={LINK_SWITCH} component={Switch_} />
                <Route exact path={LINK_MODULE_IR} component={ModuleIr} />
                <Route exact path={LINK_HOME_CONTROLLER} component={HomeController} />
                <Route exact path={LINK_DOOR_SENSOR} component={DoorSensor} />
                <Route exact path={LINK_MOTION_DETECTOR} component={MotionDetector} />

              <Route exact path={LINK_SUPPORTING} component={SupportComponent} />
                <Route exact path={LINK_QUESTION} component={QuestionComponent} />
                <Route exact path={LINK_DOCUMENT} component={DocumentComponent} />

              <Route path={LINK_LOGIN} render={(props) => <LoginComponent onLogin={this.handleLogin} {...props} />}/>

              <Route exact path={LINK_ADMIN}
                render={(props) => <Admin onLogout={this.handleLogout} onLogoutForChangePassword={this.handleLogoutForChangePassword} {...props} />} />

              <Route exact path={LINK_USER_HOME} render={(props) => <UserHomeComponent {...props}/>} />
              <Route exact path={LINK_USER_ROOM} render={(props) => <UserListRoomComponent {...props}/>} />
              <Route exact path={`${LINK_USER_ROOM}/:id`} render={(props) => <UserRoomComponent {...props}/>} />

              <Route exact path={LINK_USER_INFO} render={(props) => <UserPersonalComponent {...props}/>} />

            </Switch>
        </Content>

        {currentUser !== null && currentUser.role !== 'ADMIN' ? (
          <SideNavComponent sidenavVisible={sidenavVisible}
                            onCloseSidenav={this.onCloseSidenav}
                            handleLogout={this.handleLogout}/>
        ) : null}

        {currentUser === null ? (<AppFooterComponent/>) : null}

        {currentUser === null ? (<ContactMenuComponent/>) : null}

        <BackTop/>
      </Layout>
    );
  }
}

export default withRouter(App);
