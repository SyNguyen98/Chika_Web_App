import React, { Component } from 'react';
import { Icon, Button, notification } from 'antd';

import '../../styles/admin/Device.css';
import { getAllSwitchWifi, getAllSwitchRf, getAllModuleIr, getAllHomeCenter, getAllSensor } from '../../api';

import SwitchWifiList from './device/SwitchWifiList';
import SwitchRfList from './device/SwitchRfList';
import ModuleIrList from './device/ModuleIrList';
import HomeCenterList from './device/HomeCenterList';
import SensorList from './device/SensorList';

export default class Device extends Component {
  constructor(props) {
      super(props);
      this.state = {
          listComponent: null,
          switchWifiList: null,
          switchRfList: null,
          moduleIrList: null,
          homeCenterList: null,
          sensorList: null,
          isLoading: false
      }
  }

  loadAllSwitchWifi = () => {
    this.setState({
        isLoading: true
    });
    getAllSwitchWifi().then(response => {
      this.setState({
        switchWifiList: response,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });
      notification.error({
        message: 'Chika Smarthome',
        description: "Đã có lỗi xảy ra khi tải danh sách công tắc. Vui lòng thử lại sau!",
      });
    });
  }

  loadAllSwitchRf= () => {
    this.setState({
        isLoading: true
    });
    getAllSwitchRf().then(response => {
      this.setState({
        switchRfList: response,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });
      notification.error({
        message: 'Chika Smarthome',
        description: "Đã có lỗi xảy ra khi tải danh sách công tắc. Vui lòng thử lại sau!",
      });
    });
  }

  loadAllModuleIr = () => {
    this.setState({
      isLoading: true
    });
    getAllModuleIr().then(response => {
      this.setState({
        moduleIrList: response,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });
      notification.error({
        message: 'Chika Smarthome',
        description: "Đã có lỗi xảy ra khi tải danh sách điều khiển hồng ngoại. Vui lòng thử lại sau!",
      });
    });
  }

  loadAllHomeCenter = () => {
    this.setState({
      isLoading: true
    });
    getAllHomeCenter().then(response => {
      this.setState({
        homeCenterList: response,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });
      notification.error({
        message: 'Chika Smarthome',
        description: "Đã có lỗi xảy ra khi tải danh sách bộ điều khiển trung tâm. Vui lòng thử lại sau!",
      });
    });
  }

  loadAllSensor = () => {
    this.setState({
      isLoading: true
    });
    getAllSensor().then(response => {
      this.setState({
        sensorList: response,
        isLoading: false
      });
    }).catch(error => {
      this.setState({
        isLoading: false
      });
      notification.error({
        message: 'Chika Smarthome',
        description: "Đã có lỗi xảy ra khi tải danh sách cảm biến. Vui lòng thử lại sau!",
      });
    });
  }

  handleChangeList = (listName) => {
    this.setState({ listComponent: listName });
  }

  handleBack = () => {
    this.setState({ listComponent: null });
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadAllSwitchWifi();
    this.loadAllSwitchRf();
    this.loadAllModuleIr();
    this.loadAllHomeCenter();
    this.loadAllSensor();
  }

  render() {
    const { listComponent, switchWifiList, switchRfList, moduleIrList, homeCenterList, sensorList } = this.state;
    let list;
    switch (listComponent) {
      case 'switch-wifi':
        list = (<SwitchWifiList switchWifiList={switchWifiList}/>);
        break;
      case 'switch-rf':
        list = (<SwitchRfList switchRfList={switchRfList}/>);
        break;
      case 'module-ir':
        list = (<ModuleIrList moduleIrList={moduleIrList}/>);
        break;
      case 'home-center':
          list = (<HomeCenterList homeCenterList={homeCenterList}/>);
        break;
      case 'sensor':
        list = (<SensorList sensorList={sensorList}/>);
        break;
      default:
        list = null;
    }
    return(
      <div className="admin-device">
        {listComponent ? (
          <div>
            <Button className="admin-device_back-btn" type="primary" onClick={this.handleBack}>
              <Icon type="left" />Trở về
            </Button>
            {list}
          </div>
        ) : (
          <div>
            <div className="admin-device_menu">
              <div className="admin-device_menu_item" onClick={(event) => this.handleChangeList('switch-wifi')}>
                <img alt='switch-wifi' src='/image/admin/switch-wifi.png' style={{width: '12vw', height: '12vw'}}/>
                <div className="admin-device_menu_item_title">
                  <h1>CÔNG TẮC WIFI</h1>
                  <p><b>{switchWifiList ? switchWifiList.length : null}</b> sản phẩm</p>
                </div>
              </div>

              <div className="admin-device_menu_item" onClick={(event) => this.handleChangeList('switch-rf')}>
                <img alt='switch-rf' src='/image/admin/switch-rf.png' style={{width: '12vw', height: '12vw'}}/>
                <div className="admin-device_menu_item_title">
                  <h1>CÔNG TẮC RF</h1>
                  <p><b>{switchRfList ? switchRfList.length : null}</b> sản phẩm</p>
                </div>
              </div>

              <div className="admin-device_menu_item" onClick={(event) => this.handleChangeList('module-ir')}>
                <img alt='module-ir' src='/image/admin/module-ir.png' style={{width: '10vw', height: '10vw', marginTop: '1vw'}}/>
                <div className="admin-device_menu_item_title">
                  <h1>ĐIỀU KHIỂN HỒNG NGOẠI</h1>
                  <p><b>{moduleIrList ? moduleIrList.length : null}</b> sản phẩm</p>
                </div>
              </div>

            </div>

            <div className="admin-device_menu">
              <div className="admin-device_menu_item" onClick={(event) => this.handleChangeList('home-center')}>
                <img alt='home-center' src='/image/admin/home-center.png' style={{width: '10vw', height: '9vw', marginTop: '1vw'}}/>
                <div className="admin-device_menu_item_title">
                  <h1>BỘ XỬ LÝ TRUNG TÂM</h1>
                  <p><b>{homeCenterList ? homeCenterList.length : null}</b> sản phẩm</p>
                </div>
              </div>

              <div className="admin-device_menu_item" onClick={(event) => this.handleChangeList('sensor')}>
                <img alt='sensor' src='/image/admin/sensor.png' style={{width: '9vw', height: '9vw', marginTop: '1vw'}}/>
                <div className="admin-device_menu_item_title">
                  <h1>CẢM BIẾN</h1>
                  <p><b>{sensorList ? sensorList.length : null}</b> sản phẩm</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
