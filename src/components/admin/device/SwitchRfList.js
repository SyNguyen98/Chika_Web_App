import React, { Component } from 'react';

export default class SwitchWifiList extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="admin-device_list">
        Danh sách Công tắc Rf (Cập nhật sau)
      </div>
    )
  }
}
