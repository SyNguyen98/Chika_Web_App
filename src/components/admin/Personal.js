import React, { Component } from 'react';

import '../../styles/admin/Personal.css';

export default class Personal extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return(
      <div className="admin-personal">
        {this.props.adminInfo ? (
          <div>
            <div style={{textAlign: 'center'}}>
              <img className="admin-personal_avatar" alt='avatar' src={this.props.adminInfo.avatar}></img>
              <p className="admin-personal_name">{this.props.adminInfo.name}</p>
            </div>
            <div className="admin-personal_info">
              <div className="admin-personal_info_title">
                <img alt='icon-id-card' src='/image/admin/icon-id-card.png'></img>
                <h1>Thông tin cá nhân</h1>
              </div>
              <div className="admin-personal_info_content">
                <div className="admin-personal_info_content_topic">
                  <p>Số điện thoại</p>
                  <p>Email</p>
                  <p>Ngày sinh</p>
                  <p>Địa chỉ</p>
                </div>
                <div className="admin-personal_info_content_content">
                  <p>{this.props.adminInfo.phone}</p>
                  <p>{this.props.adminInfo.email}</p>
                  <p>{this.props.adminInfo.birthday}</p>
                  <p>{this.props.adminInfo.address}</p>
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
                  <p>{this.props.adminInfo.employeeId}</p>
                  <p>{this.props.adminInfo.function}</p>
                  <p>{this.props.adminInfo.department}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
