import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, notification } from 'antd';

import '../../../styles/admin/product/admin-product.component.css';
import { getAllNumberOfProduct } from '../../../service/product.service';
import { LINK_ADMIN_SWITCH_WIFI, LINK_ADMIN_SWITCH_RF, LINK_ADMIN_MODULE_IR, LINK_ADMIN_HOME_CENTER, LINK_ADMIN_SENSOR } from '../../../constant';

class AdminProductComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
          switchWifiNum: 0,
          switchRfNum: 0,
          moduleIrNum: 0,
          homeCenterNum: 0,
          sensorNum: 0,
          isLoading: false
      }
  }

  loadNumOfProduct = () => {
    this.setState({ isLoading: true });
    getAllNumberOfProduct().then(response => {
      this.setState({
        switchWifiNum: response.switchWifi,
        switchRfNum: response.switchRf,
        moduleIrNum: response.moduleIr,
        homeCenterNum: response.homeCenter,
        sensorNum: response.sensor,
        isLoading: false
      });
    }).catch(error => {
      this.setState({ isLoading: false });
      notification.error({
        message: 'Chika Smarthome',
        description: error.message || "Đã có lỗi xảy ra. Vui lòng thử lại sau!",
      });
    });
  }

  handleChangeComponent = (link) => {
    this.props.history.push(link);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadNumOfProduct();
  }

  render() {
    const { switchWifiNum, switchRfNum, moduleIrNum, homeCenterNum, sensorNum } = this.state;
    return(
      <div className="admin-device">
        <Row className="admin-device__menu">
          <Col className='admin-device__item' span={8} onClick={() => this.handleChangeComponent(LINK_ADMIN_SWITCH_WIFI)}>
            <img src="/image/admin/product/switch-wifi.png" alt="img"/>
            <div className='admin-device__item__title'>
              <h3>CÔNG TẮC<br/>WIFI</h3>
              <p>{switchWifiNum} sản phẩm</p>
            </div>
          </Col>
          <Col className='admin-device__item' span={8} onClick={() => this.handleChangeComponent(LINK_ADMIN_SWITCH_RF)}>
            <img src="/image/admin/product/switch-rf.png" alt="img"/>
            <div className='admin-device__item__title'>
              <h3>CÔNG TẮC<br/>RF</h3>
              <p>{switchRfNum} sản phẩm</p>
            </div>
          </Col>
          <Col className='admin-device__item' span={8} onClick={() => this.handleChangeComponent(LINK_ADMIN_MODULE_IR)}>
            <img src="/image/admin/product/module-ir.png" alt="img"/>
            <div className='admin-device__item__title'>
              <h3>ĐIỀU KHIỂN<br/>HỒNG NGOẠI</h3>
              <p>{moduleIrNum} sản phẩm</p>
            </div>
          </Col>
          <Col className='admin-device__item' span={8} onClick={() => this.handleChangeComponent(LINK_ADMIN_HOME_CENTER)}>
            <img src="/image/admin/product/home-center.png" alt="img"/>
            <div className='admin-device__item__title'>
              <h3>BỘ ĐIỀU KHIỂN<br/>TRUNG TÂM</h3>
              <p>{homeCenterNum} sản phẩm</p>
            </div>
          </Col>
          <Col className='admin-device__item' span={8} onClick={() => this.handleChangeComponent(LINK_ADMIN_SENSOR)}>
            <img src="/image/admin/product/sensor.png" alt="img"/>
            <div className='admin-device__item__title'>
              <h3><br/>CẢM BIẾN</h3>
              <p>{sensorNum} sản phẩm</p>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(AdminProductComponent);