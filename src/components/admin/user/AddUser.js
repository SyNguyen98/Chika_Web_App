import React, { Component } from 'react';

export default class AddUser extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="admin-user_add">
        Thêm người dùng (Cập nhật sau)
      </div>
    )
  }
}
