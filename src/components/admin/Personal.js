import React, { Component } from 'react';

import '../../styles/admin/Personal.css';
import { getAdminInfo } from '../../api';

export default class Personal extends Component {
  constructor(props) {
      super(props);
      this.state = {
          adminInfo: null,
          isLoading: false,
      }
  }

  loadInfo = () => {
    this.setState({
      isLoading: true
    });
    getAdminInfo().then(response => {
      this.setState({
        adminInfo: response,
        isLoading: false
      });
      console.log(this.state.adminInfo);
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  componentDidMount() {
    this.loadInfo();
  }

  render() {
    return(
      <div className="admin-personal">
        {this.state.adminInfo ? (
          <div>
            <div style={{textAlign: 'center'}}>
              <img className="admin-personal_avatar" alt='avatar' src={this.state.adminInfo.avatar}></img>
              <p className="admin-personal_name">{this.state.adminInfo.name}</p>
              <p className="admin-personal_username">@{this.state.adminInfo.username}</p>
            </div>
            <div className="admin-personal_info">
              <div className="admin-personal_info_title">
                <img alt='icon-id-card' src='/image/admin/icon-id-card.png'></img>
                <h1>Thông tin cá nhân</h1>
              </div>
              <div className="admin-personal_info_content">
                <div className="admin-personal_info_content_topic">
                  <p>Ngày sinh</p>
                  <p>Địa chỉ</p>
                  <p>Email</p>
                  <p>Số điện thoại</p>
                </div>
                <div className="admin-personal_info_content_content">
                  <p>{this.state.adminInfo.birthday}</p>
                  <p>{this.state.adminInfo.address}</p>
                  <p>{this.state.adminInfo.email}</p>
                  <p>{this.state.adminInfo.phone}</p>
                </div>
              </div>

              <div className="admin-personal_work_title">
                <img alt='icon-work' src='/image/admin/icon-work.png'></img>
                <h1>Thông tin công việc</h1>
              </div>
              <div className="admin-personal_info_content">
                <div className="admin-personal_info_content_topic">
                  <p>Mã nhân viên</p>
                  <p>Chức danh</p>
                  <p>Nhóm</p>
                </div>
                <div className="admin-personal_info_content_content">
                  <p>{this.state.adminInfo.employeeId}</p>
                  <p>{this.state.adminInfo.function}</p>
                  <p>{this.state.adminInfo.department}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
