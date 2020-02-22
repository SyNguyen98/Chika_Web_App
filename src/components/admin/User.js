import React, { Component } from 'react';
import { Icon, Button, Badge } from 'antd';

import '../../styles/admin/User.css';
import { getAllUser, getAllFeedback } from '../../api';

import UserList from './user/UserList';
import FeedbackList from './user/FeedbackList';

export default class User extends Component {
  constructor(props) {
      super(props);
      this.state = {
          component: null,
          userList: null,
          feedbackList: null,
          isLoading: false,
          haveFeedback: false
      }
  }

  loadAllUser = () => {
    this.setState({
      isLoading: true
    });
    getAllUser().then(response => {
      this.setState({
        userList: response,
        isLoading: false
      });
    console.log(response);
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  loadAllFeedback = () => {
    this.setState({
      isLoading: true
    });
    getAllFeedback().then(response => {
      this.setState({
        feedbackList: response,
        isLoading: false
      });
      let i = 0;
      for(; i < response.length; i++) {
        if (response[i].response === null) {
          this.setState({ haveFeedback: true });
          break;
        }
      }
      if (i === response.length) {
        this.setState({ haveFeedback: false });
      }
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  handleChangeList = (componentName) => {
    this.setState({ component: componentName });
  }

  handleBack = () => {
    this.setState({ component: null });
    this.componentDidMount();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadAllUser();
    this.loadAllFeedback();
  }

  render() {
    const { userList, feedbackList, haveFeedback } = this.state;
    let component;
    switch (this.state.component) {
      case 'user-list':
        component = (<UserList userList={userList}/>);
        break;
      case 'feedback':
        component = (<FeedbackList feedbackList={feedbackList}/>);
        break;
      default:
        component = null;
    }
    return(
      <div className="admin-user">
        {component ? (
          <div >
            <Button type="primary" style={{margin: '1vw 0 0 3vw'}} onClick={this.handleBack}>
                <Icon type="left" />Trở về
            </Button>
            {component}
          </div>
        ) : [
          <div className="admin-user_menu">
            <div className="admin-user_menu_item" onClick={(event) => this.handleChangeList('user-list')}>
              <img alt='icon-user-list' src='/image/admin/user/icon-user-list.png' style={{marginTop: '2vw', width: '8vw', height: '8vw'}}/>
              <h1>THÔNG TIN NGƯỜI DÙNG</h1>
            </div>

            <div className="admin-user_menu_item" onClick={(event) => this.handleChangeList('add-user')}>
              <img alt='icon-user-list' src='/image/admin/user/icon-add-user.png' style={{marginTop: '3vw', width: '6vw', height: '6vw'}}/>
              <h1 style={{marginTop: '1vw'}}>THÊM NGƯỜI DÙNG</h1>
            </div>
          </div>,

          <div className="admin-user_menu">
            <div className="admin-user_menu_item" onClick={(event) => this.handleChangeList('shop')}>
              <img alt='icon-user-list' src='/image/admin/user/icon-shop.png' style={{width: '10vw', height: '10vw'}}/>
              <h1>MUA HÀNG</h1>
            </div>

            <div className="admin-user_menu_item" onClick={(event) => this.handleChangeList('feedback')}>
              <img alt='icon-user-list' src='/image/admin/user/icon-feedback.png' style={{marginTop: '2vw', width: '7vw', height: '7vw'}}/>
              {haveFeedback ? (
                <div style={{marginTop: '1vw'}}>
                  <Badge dot>
                      <h1>PHẢN HỒI</h1>
                  </Badge>
                </div>
              ) : (
                <h1 style={{marginTop: '1vw'}}>PHẢN HỒI</h1>
              )}
            </div>
          </div>
        ]}
      </div>
    )
  }
}
