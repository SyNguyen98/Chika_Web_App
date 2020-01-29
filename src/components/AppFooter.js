import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon } from 'antd';

import '../styles/AppFooter.css';

const { Footer } = Layout;

class AppFooter extends Component {

  render() {
    return(
      <Footer className="app-footer">
        <div className="footer-content">
          <h3>Chika Corporation</h3>
          <p><Icon type="home"/> Địa chỉ: phòng 306, tòa nhà E, 227 Đường Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh</p>
          <p><Icon type="phone"/> Liên hệ: 070 123 4567</p>
          <p><Icon type="mail"/> Email: chikacorporation@gmail.com</p>
        </div>
      </Footer>
    )
  }
}

export default withRouter(AppFooter);
