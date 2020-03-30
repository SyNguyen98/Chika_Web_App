import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import '../../styles/guest/introduce.component.css';

const imageUri = "/image/guest/introduce/";

class IntroduceComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Fragment>
        <div className="introduce-header">
          <img alt="banner-introduce" src={`${imageUri}banner-introduce.png`} />
          <h1>GIỚI THIỆU VỀ CHIKA</h1>
        </div>
        <div className="introduce-timeline">
          <VerticalTimeline>
            <VerticalTimelineElement date="25/02/2019"
                                    iconStyle={{ background: '#003eff' }}
                                    icon={<img alt="icon-establish" src={`${imageUri}icon-establish.png`}/>}>
              <h2>THÀNH LẬP</h2>
              <p>
                Chika được thành lập bởi 4 cựu sinh viên ngành Vật lý Tin học, đại học Khoa học Tự Nhiên TP.HCM
              </p>
            </VerticalTimelineElement>
            
            <VerticalTimelineElement date="10/07/2021"
                                    iconStyle={{ background: '#00ff98' }}>
              <h2>CHÍNH THỨC RA MẮT THƯƠNG HIỆU<br/>NHÀ THÔNG MINH CHIKA</h2>
              <p>
                Tuyên bố chính thức tham gia thị trường với sản phẩm công tắc thông minh và điều khiển hồng ngoại
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement date="08/2021 - 08/2022"
                                    iconStyle={{ background: '#003eff' }}>
              <h2>HOÀN THIỆN GIẢI PHÁP NHÀ THÔNG MINH</h2>
              <p>
                Cung ứng giải pháp nhà thông minh đồng bộ với nhiều tính năng được điều khiển qua smartphone
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement date="11/2022"
                                    iconStyle={{ background: '#00ff98' }}>
              <h2>GIẢI PHÁP ĐIỀU KHIỂN BẰNG GIỌNG NÓI</h2>
              <p>
                Ra mắt trợ lý ảo Chika cho phép điều khiển ngôi nhà qua giọng nói
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement date="05/2022"
                                    iconStyle={{ background: '#003eff' }}>
              <h2>ĐẠT CHỨNG CHỈ UL</h2>
              <p>
              Bo mạch điện tử của Chika đạt chuẩn quốc tế, cho phép xuất khẩu đến 104 quốc gia trên thế giới
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement date="06/2023"
                                    iconStyle={{ background: '#00ff98' }}>
              <h2>MẠNG LƯỚI ĐẠI LÝ RỘNG KHẮP</h2>
              <p>
                Hệ thống đại lý rộng khắp các tỉnh thành trên cả nước
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement date="01/2024"
                                    iconStyle={{ background: '#003eff' }}>
              <h2>XUẤT KHẨU RA THẾ GIỚI</h2>
              <p>
                Xuất khẩu giải pháp nhà thông minh đến các quốc gia khác
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement iconStyle={{ background: 'rgb(16, 204, 82)' }}/>
          </VerticalTimeline>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(IntroduceComponent);
