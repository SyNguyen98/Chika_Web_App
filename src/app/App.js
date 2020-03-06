import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Layout, BackTop, notification, Drawer, Icon } from 'antd';
import './App.css';

import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import ContactMenu from '../components/ContactMenu';

import Home from '../components/guest/Home';
import Introduction from '../components/guest/Introduction';
import Product from '../components/guest/Product';
import Supporting from '../components/guest/Supporting';

import GGAssistant from '../components/guest/solution/GGAssistant';
import AirConditionerTivi from '../components/guest/solution/AirConditionerTivi';
import LightControl from '../components/guest/solution/LightControl';
import EnvironmentalControl from '../components/guest/solution/EnvironmentalControl';
import SecuritySystem from '../components/guest/solution/SecuritySystem';
import RBGLed from '../components/guest/solution/RBGLed';

import SwitchSensor from '../components/guest/product/SwitchSensor';
import Switch_ from '../components/guest/product/Switch';
import ModuleIr from '../components/guest/product/ModuleIr';
import HomeController from '../components/guest/product/HomeController';
import DoorSensor from '../components/guest/product/DoorSensor';
import MotionDetector from '../components/guest/product/MotionDetector';

import Question from '../components/guest/supporting/Question';
import Document from '../components/guest/supporting/Document';

import Login from '../components/guest/Login';

import Admin from '../components/admin/Admin';
import User from '../components/user/User';

import { ACCESS_TOKEN,
  LINK_INTRODUCTION, LINK_LOGIN, LINK_PRODUCT, LINK_SUPPORTING,
  LINK_GG_ASSISTANT, LINK_LIGHT_CONTROL, LINK_CONDITIONER_TIVI, LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED,
  LINK_SWITCH_SENSOR, LINK_SWITCH, LINK_MODULE_IR, LINK_HOME_CONTROLLER, LINK_DOOR_SENSOR, LINK_MOTION_DETECTOR,
  LINK_QUESTION, LINK_DOCUMENT,
  LINK_ADMIN, LINK_USER} from '../constant';

import { getCurrentUser } from '../api';

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isLoading: false,
      userMenuVisible: false,
      userComponent: 'info'
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
      console.log(response);
      switch (response.role) {
        case 'ADMIN':
          this.props.history.push(LINK_ADMIN);
          break;
        case 'HOME_MASTER': case 'HOME_USER':
          this.props.history.push(LINK_USER);
          this.setState({ userMenuVisible: false, });
          break;
        default:
          this.props.history.push('/');
      }
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  handleOpenMenuUser = () => {
    this.setState({ userMenuVisible: true });
  }

  handleChangeUserComponet = (component) => {
    this.setState({ userComponent: component });
  }

  onCloseMenuUser = () => {
    this.setState({
      userMenuVisible: false,
    });
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
    // this.handleLogout();
    this.loadCurrentUser();
  }

  render() {
    const { currentUser, isLoading, userMenuVisible } = this.state;
    return (
      <Layout>
        <AppHeader currentUser={currentUser} onOpenMenuUser={this.handleOpenMenuUser}/>

        <Content>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path={LINK_INTRODUCTION} component={Introduction} />

              <Route exact path={LINK_GG_ASSISTANT} component={GGAssistant} />
              <Route exact path={LINK_CONDITIONER_TIVI} component={AirConditionerTivi} />
              <Route exact path={LINK_LIGHT_CONTROL} component={LightControl} />
              <Route exact path={LINK_ENVIRONMANTAL_CONTROL} component={EnvironmentalControl} />
              <Route exact path={LINK_SECURITY_SYSTEM} component={SecuritySystem} />
              <Route exact path={LINK_RGB_LED} component={RBGLed} />

              <Route exact path={LINK_PRODUCT} component={Product} />
                <Route exact path={LINK_SWITCH_SENSOR} component={SwitchSensor} />
                <Route exact path={LINK_SWITCH} component={Switch_} />
                <Route exact path={LINK_MODULE_IR} component={ModuleIr} />
                <Route exact path={LINK_HOME_CONTROLLER} component={HomeController} />
                <Route exact path={LINK_DOOR_SENSOR} component={DoorSensor} />
                <Route exact path={LINK_MOTION_DETECTOR} component={MotionDetector} />

              <Route exact path={LINK_SUPPORTING} component={Supporting} />
                <Route exact path={LINK_QUESTION} component={Question} />
                <Route exact path={LINK_DOCUMENT} component={Document} />

              <Route exact path={LINK_ADMIN}
                render={(props) => <Admin onLogout={this.handleLogout} onLogoutForChangePassword={this.handleLogoutForChangePassword} {...props} />} />

              <Route exact path={LINK_USER}
                render={(props) => <User userComponent={this.state.userComponent} handleChangeUserComponet={this.handleChangeUserComponet}
                                        onLogoutForChangePassword={this.handleLogoutForChangePassword} {...props} />} />

              <Route path={LINK_LOGIN} render={(props) => <Login onLogin={this.handleLogin} loading={isLoading} {...props} />}/>

            </Switch>
        </Content>

        {currentUser !== null ? (
          <Drawer className='user-menu'
                  title={<i style={{fontSize: '1.2vw'}}>Nhà thông minh Chika</i>}
                  placement='left'
                  width='18vw'
                  closable={false}
                  onClose={this.onCloseMenuUser}
                  visible={userMenuVisible}>
            <div className='user-menu_item' onClick={() => this.handleChangeUserComponet('info')}>
              <Icon type="idcard" /><p>Quản lý tài khoản</p>
            </div>

            {currentUser !== null && currentUser.role === 'HOME_MASTER' ? (
              <div className='user-menu_item' onClick={() => this.handleChangeUserComponet('add-user')}>
                <Icon type="user-add" /><p>Thêm thành viên</p>
              </div>
            ) : null}

            <div className='user-menu_item'>
              <Icon type="setting" /><p>Hỗ trợ</p>
            </div>

            <div className='user-menu_item' onClick={this.handleLogout}>
              <Icon type="logout" /><p>Đăng xuất</p>
            </div>

            <i className='user-menu_bottom'>Sản phẩm của Chika Smarthome</i>
          </Drawer>
        ) : null}

        {currentUser === null ? (<AppFooter/>) : null}

        {currentUser === null ? (<ContactMenu/>) : null}

        <BackTop/>
      </Layout>
    );
  }
}

export default withRouter(App);
