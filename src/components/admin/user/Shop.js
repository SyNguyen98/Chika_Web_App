import React, { Component } from 'react';

import '../../../styles/admin/user/Shop.css';

export default class Shop extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="admin-user_shop">
        <h1>QUẢN LÝ MUA HÀNG</h1>
      </div>
    )
  }
}
