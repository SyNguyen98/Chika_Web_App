import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {  } from 'antd';

import '../../styles/user/User.css';

import Personal from './Personal';

class User extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { userComponent } = this.props;
    let component;
    switch (userComponent) {
      case 'info':
        component = (<Personal/>);
        break;
      default:
        component = null;
    }
    return(
      <div className="user">
        {component}
      </div>
    )
  }
}

export default withRouter(User);
