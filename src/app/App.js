import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Layout, notification, BackTop } from 'antd';
import './App.css';

import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

import Home from '../components/guest/Home';
import Introduction from '../components/guest/Introduction';
import GGAssistant from '../components/guest/GGAssistant';
import AirConditionerTivi from '../components/guest/AirConditionerTivi';
import LightControl from '../components/guest/LightControl';
import EnvironmentalControl from '../components/guest/EnvironmentalControl';
import SecuritySystem from '../components/guest/SecuritySystem';
import RBGLed from '../components/guest/RBGLed';

import Product from '../components/guest/Product';
import SwitchSensor from '../components/guest/product/SwitchSensor';
import Switch_ from '../components/guest/product/Switch';
import ModuleIr from '../components/guest/product/ModuleIr';
import HomeController from '../components/guest/product/HomeController';
import DoorSensor from '../components/guest/product/DoorSensor';
import MotionDetector from '../components/guest/product/MotionDetector';

import Login from '../components/guest/Login';

import Profile from '../components/user/Profile';

import { getUser } from '../util/APIUtil';
import { ACCESS_TOKEN, LINK_INTRODUCTION, LINK_LOGIN, LINK_PRODUCT,
  LINK_GG_ASSISTANT, LINK_LIGHT_CONTROL, LINK_CONDITIONER_TIVI, LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED,
  LINK_SWITCH_SENSOR, LINK_SWITCH, LINK_MODULE_IR, LINK_HOME_CONTROLLER, LINK_DOOR_SENSOR, LINK_MOTION_DETECTOR } from '../constant';

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
  }

  loadCurrentUser = () => {
    this.setState({
      isLoading: true
    });
    getUser()
    .then(response => {
      this.setState({
        currentUser: response,
        isAuthenticated: true,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  handleLogin = () => {
    notification.success({
      message: 'Chika Smarthome',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push("/");
    notification.success({
      message: 'Chika Smarthome',
      description: "You're successfully logged out.",
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  render() {
    return (
      <Layout>
        <AppHeader className="App-header"
          isAuthenticated={this.state.isAuthenticated}
          currentUser={this.state.currentUser}
          onLogout={this.handleLogout} >
        </AppHeader>
        <Content>
          <div className="container">
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

                <Route path={LINK_LOGIN} render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>
                <Route path="/users/:username"
                  render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}/>}>
                </Route>
              </Switch>
            </div>
        </Content>
        <AppFooter/>
        <BackTop />
      </Layout>
    );
  }
}

export default withRouter(App);
