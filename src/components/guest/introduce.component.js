import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Icon } from 'antd';

import '../../styles/guest/introduce.component.css';

class IntroduceComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="introduction">
        <div className="introduction_header">
          <h1>GIỚI THIỆU VỀ CHIKA</h1>
        </div>

        <div className="introduction_timeline">
          <img className="introduction_timeline_image" alt="google-assitant" src="/image/guest/introduce/timeline.png"></img>
          <div className="introduction_timeline_content">
            <h1>CHIKA SMARTHOME</h1>
            <p>Công ty cổ phần Nhà thông minh Chika, được thành lập vào ngày 25/2/2019, xuất phát từ niềm đam mê nghiên cứu khoa học, công nghệ của 4 cựu sinh viên Bộ môn Vật lý Tin học,
              trường đại học Khoa học Tự Nhiên - Thành phố Hồ Chí Minh. Với khẩu hiệu “Never Stop Innovating” - “Không bao giờ ngừng đổi mới”.</p>
            <Button shape="round">Xem thêm<Icon type="double-right" /></Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(IntroduceComponent);
