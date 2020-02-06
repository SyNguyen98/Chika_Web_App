import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Layout, BackTop, notification } from 'antd';
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

import { ACCESS_TOKEN,
  LINK_INTRODUCTION, LINK_LOGIN, LINK_PRODUCT, LINK_SUPPORTING,
  LINK_GG_ASSISTANT, LINK_LIGHT_CONTROL, LINK_CONDITIONER_TIVI, LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED,
  LINK_SWITCH_SENSOR, LINK_SWITCH, LINK_MODULE_IR, LINK_HOME_CONTROLLER, LINK_DOOR_SENSOR, LINK_MOTION_DETECTOR,
  LINK_QUESTION, LINK_DOCUMENT,
  LINK_ADMIN} from '../constant';

import { getCurrentUser } from '../api';

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: null,
      isLoading: false
    }
  }

  loadCurrentUser = () => {
    this.setState({
      isLoading: true
    });
    getCurrentUser().then(response => {
      this.setState({
        userRole: response.role,
        isLoading: false
      });
      if (this.state.userRole === 'ROLE_ADMIN') {
        this.props.history.push(LINK_ADMIN);
      }
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  handleLogin = () => {
    notification.success({
      message: 'Chika Smarthome',
      description: "Đăng nhập thành công.",
    });
    this.loadCurrentUser();
  }

  handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      userRole: null,
    });

    this.props.history.push("/");
    notification.success({
      message: 'Chika Smarthome',
      description: "Đăng xuất thành công.",
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  render() {
    return (
      <Layout>
        <AppHeader userRole={this.state.userRole}/>

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

              <Route exact path={LINK_ADMIN} render={(props) => <Admin onLogout={this.handleLogout} {...props} />} />

              <Route path={LINK_LOGIN} render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>

            </Switch>
        </Content>

        {this.state.userRole === null ? (<AppFooter/>) : null}

        {this.state.userRole === null ? (<ContactMenu/>) : null}

        <BackTop/>
      </Layout>
    );
  }
}

export default withRouter(App);
