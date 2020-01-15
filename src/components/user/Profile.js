import React, { Component } from 'react';
import { Avatar } from 'antd';
import '../../styles/user/Profile.css';

import { getUser } from '../../util/APIUtil';

class Profile extends Component {
  constructor(props) {
      super(props);
      this.state = {
          user: null,
          isLoading: false
      }
  }

  loadCurrentUser = () => {
    this.setState({
      isLoading: true
    });
    getUser().then(response => {
      this.setState({
        user: response,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.loadCurrentUser();
  }

  render() {
    return(
      <div className="profile-page">
        {this.state.user ? (
          <div className="user-detail">
            <Avatar className="user-detail-avatar" src='https://img00.deviantart.net/2cb8/i/2013/117/7/a/assassins_avatar_by_multispeedking-d6380y4.png'/>
            <div className="user-summary">
                <div className="full-name">{this.state.user.name}</div>
                <div className="username">@{this.state.user.username}</div>
                <div className="email">{this.state.user.email}</div>
            </div>
          </div>
      ): null}
      </div>
    );
  }
}

export default Profile;
