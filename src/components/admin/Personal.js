import React, { Component } from 'react';

import '../../styles/admin/Personal.css';

export default class Personal extends Component {

  componentDidMount() {
  }

  render() {
    return(
      <div className="admin-personal">
        <div style={{textAlign: 'center'}}>
          <img className="admin-personal_avatar" alt='avatar' src='/image/home/led-rgb.jpg'></img>
          <p className="admin-personal_name">Nguyễn Văn A</p>
          <p className="admin-personal_username">@nguyenvana</p>
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
              <p>01-01-1998</p>
              <p>123 Lý Thường Kiệt</p>
              <p>nguyenvana@gmail.com</p>
              <p>0123 456 789</p>
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
              <p>IOT0001</p>
              <p>Lập trình viên IOT</p>
              <p>Phát triển phần cứng</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
