import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Layout, notification, BackTop } from 'antd';
import './App.css';

import AppHeader from '../components/AppHeader.js';
import AppFooter from '../components/AppFooter.js';

import Home from '../components/guest/Home';
import Introduction from '../components/guest/Introduction';
import GGAssistant from '../components/guest/GGAssistant';
import AirConditionerTivi from '../components/guest/AirConditionerTivi';
import LightControl from '../components/guest/LightControl';
import EnvironmentalControl from '../components/guest/EnvironmentalControl';
import SecuritySystem from '../components/guest/SecuritySystem';
import RBGLed from '../components/guest/RBGLed';

import Product from '../components/guest/Product'
import Login from '../components/guest/Login';

import Signup from '../components/admin/Signup';

import Profile from '../components/user/Profile';

import { getUser } from '../util/APIUtil';
import { ACCESS_TOKEN, LINK_GG_ASSISTANT, LINK_LIGHT_CONTROL, LINK_CONDITIONER_TIVI,
  LINK_SECURITY_SYSTEM, LINK_ENVIRONMANTAL_CONTROL, LINK_RGB_LED } from '../constant';

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
          <p>Chika Smarthome</p>
        </AppHeader>
        <Content>
          <div className="container">
              <Switch>
                <Route exact path="/"
                  component={Home}>
                </Route>
                <Route exact path="/introduction"
                  component={Introduction}>
                </Route>
                <Route exact path={LINK_GG_ASSISTANT}
                  component={GGAssistant}>
                </Route>
                <Route exact path={LINK_CONDITIONER_TIVI}
                  component={AirConditionerTivi}>
                </Route>
                <Route exact path={LINK_LIGHT_CONTROL}
                  component={LightControl}>
                </Route>
                <Route exact path={LINK_ENVIRONMANTAL_CONTROL}
                  component={EnvironmentalControl}>
                </Route>
                <Route exact path={LINK_SECURITY_SYSTEM}
                  component={SecuritySystem}>
                </Route>
                <Route exact path={LINK_RGB_LED}
                  component={RBGLed}>
                </Route>

                <Route exact path="/product"
                  component={Product}>
                </Route>
                <Route path="/login"
                  render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={Signup}></Route>
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
