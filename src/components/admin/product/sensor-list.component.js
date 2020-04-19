import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Button, Modal, Radio, Popconfirm, notification, Input } from 'antd';

import { getAllSensor, saveSensor, deleteSensor } from '../../../service/product.service';
import TableComponent from '../table.component';

class SensorListComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        sensorList: [],
        modalVisible: false,
        sensorType: 'SS01',
        sensorChannel: '',
        saveSensorResponse: null,
        disableAddSensor: false
      }
  }

  loadAllSensor = () => {
    this.setState({ isLoading: true });
    getAllSensor().then(response => {    
      this.setState({
        sensorList: response,
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

  handleShowModal = () => {
    this.setState({ modalVisible: true });
  }

  handleCancelModal = () => {
    this.setState({
      modalVisible: false,
      saveSensorResponse: null,
      disableAddSensor: false
    });
  }

  handleAddSensor = () => {
    this.setState({ isLoading: true });
    let sensorRequest = {
      type: this.state.sensorType,
      rfChannel: this.state.sensorChannel
    }
    switch (sensorRequest.type) {
      case "SS01": {
        sensorRequest.name = "Cảm biến cửa";
        break;
      }
      case "SS02": {
        sensorRequest.name = "Cảm biến chuyển động";
        break;
      }
      case "SS03": {
        sensorRequest.name = "Cảm biến không khí";
        break;
      }
      default: {
        sensorRequest.name = "Cảm biến cảnh báo cháy";
      }
    }
    saveSensor(sensorRequest).then(response => {
      this.setState({
        isLoading: false,
        saveSensorResponse: response,
        disableAddSensor: true
      });
      this.state.sensorList.unshift(response);
      this.forceUpdate();
    }).catch(error => {
      this.setState({ isLoading: false });
      notification.error({
        message: 'Chika Smarthome',
        description: error.message || "Đã có lỗi xảy ra. Vui lòng thử lại sau!",
      });
    });
  }

  handleDeleteSensor = (id) => {
    this.setState({
      isLoading: true
    });
    deleteSensor(id).then(response => {
      this.setState({
        isLoading: false,
      });
      notification.success({
        message: 'Chika Smarthome',
        description: "Sản phẩm đã được xóa.",
      });
      let index = this.state.sensorList.indexOf(this.state.sensorList.find(s => s.id === id));
      this.state.sensorList.splice(index, 1);
      this.forceUpdate();
    }).catch(error => {
      this.setState({
        isLoading: false
      });
      notification.error({
        message: 'Chika Smarthome',
        description: "Đã có lỗi xảy ra. Xin vui lòng thử lại sau!"
      });
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadAllSensor();
  }

  render() {
    const { sensorList, modalVisible, saveSensorResponse, disableAddSensor, sensorType } = this.state;
    const columns = [
      {
        title: 'Ngày sản xuất',
        key: 'day',
      },
      {
        title: 'Mã sản phẩm',
        key: 'id',
      },
      {
        title: 'Loại',
        key: 'type',
      },
      {
        title: 'Kênh',
        key: 'rfChannel',
      },
      {
        title: 'Mã người dùng',
        key: 'userId',
        render: (text) => <span>{text ? text : 'Chưa có'}</span>,
      },
      {
        key: 'delete',
        render: (text, row) => <Popconfirm title="Bạn có chắc muốn xóa?"
                                  onConfirm={(event) => this.handleDeleteSensor(row.id)}
                                  okText="Xóa"
                                  cancelText="Hủy">
                                <b style={{cursor: 'pointer', color: 'blue'}}>Xóa</b>
                              </Popconfirm>,
      },
    ];
    return (
      <div className="admin-device__list">
        <Button className="admin-device__list__add-btn" type="primary" onClick={this.handleShowModal}>
          <Icon type="plus" />
        </Button>
        <h1>DANH SÁCH CẢM BIẾN</h1>
        {sensorList ? (
          <TableComponent columns={columns} list={sensorList}/>
        ) : null}

        <Modal visible={modalVisible}
              title="Thêm sản phẩm"
              centered
              width='40vw'
              footer={[
                <Button key="back" onClick={this.handleCancelModal}>
                  Quay về
                </Button>,
                <Button disabled={disableAddSensor} key="submit" type="primary" onClick={this.handleAddSensor}>
                  Thêm
                </Button>,
              ]}>
          <div style={{margin: '0 3vw 0 3vw'}}>
            {saveSensorResponse ? (
              <div>
                <div style={{marginBottom: '1vw', fontSize: '1.5vw'}}>
                  <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/><b>&ensp;Đã thêm sản phẩm</b>
                </div>
                <div style={{fontSize: '1.2vw'}}>
                  <p><b>Ngày sản xuất: </b>{saveSensorResponse.day}</p>
                  <p><b>Mã sản phẩm: </b></p>
                  <p>{saveSensorResponse.id}</p>
                  <p><b>Loại: </b>{saveSensorResponse.type}</p>
                  <p><b>Kênh: </b>{saveSensorResponse.rfChannel}</p>
                </div>
              </div>
            ) : (
              <div style={{fontSize: '1.2vw'}}>
                <p>&bull;&emsp;Chọn loại cảm biến muốn thêm:</p>
                <Radio.Group  style={{display: 'flex'}}
                              onChange={e => { this.setState({ sensorType: e.target.value })}}
                              value={sensorType}>
                  <div style={{float: 'left'}}>
                    <Radio value={'SS01'} style={{marginBottom: '1vw'}}>SS01</Radio>
                    <Radio value={'SS02'}>SS02</Radio>
                  </div>
                  <div style={{float: 'right'}}>
                    <Radio value={'SS03'} style={{marginBottom: '1vw'}}>SS03</Radio>
                    <Radio value={'SS04'}>SS04</Radio>
                  </div>
                </Radio.Group>
                <br/>
                
                {sensorType !== "SS01" ? (
                  <span>
                    <p>&bull;&emsp;Kênh vô tuyến</p>
                    <Input  size='large' 
                        placeholder='Vd: 1002502019006'
                        prefix={<Icon type="wifi" />}
                        onChange={(e) => {this.setState({ sensorChannel: e.target.value })}}></Input>
                  </span>
                ) : null}
              </div>
            )}
          </div>
        </Modal>
      </div>
    )
  }
}

export default withRouter(SensorListComponent);