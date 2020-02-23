import React, { Component } from 'react';

export default class Shop extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="admin-user_add">
        Mua hàng (Cập nhật sau)
      </div>
    )
  }
}
