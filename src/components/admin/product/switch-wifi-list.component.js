import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Button, Modal, Radio, Popconfirm, notification } from 'antd';

import { getAllSwitchWifi, saveSwitchWifi, deleteSwitchWifi } from '../../../service/product.service';
import TableComponent from '../table.component';

class SwitchWifiListComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        switchWifiList: [],
        modalVisible: false,
        buttonNum: 2,
        saveSwitchResponse: null,
        disableAddSwitch: false
      }
  }

  loadAllSwitchWifi = () => {
    this.setState({ isLoading: true });
    getAllSwitchWifi().then(response => {
      this.setState({
        switchWifiList: response,
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
      saveSwitchResponse: null,
      disableAddSwitch: false
    });
  }

  handleAddSwitch = () => {
    this.setState({
      isLoading: true
    });
    saveSwitchWifi(this.state.buttonNum).then(response => {
      this.setState({
        isLoading: false,
        saveSwitchResponse: response,
        disableAddSwitch: true
      });
      this.state.switchWifiList.unshift(response);
      this.forceUpdate();
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  handleDeleteSwitch = (id) => {
    this.setState({ isLoading: true });
    deleteSwitchWifi(id).then(response => {
      this.setState({ isLoading: false });
      notification.success({
        message: 'Chika Smarthome',
        description: "Sản phẩm đã được xóa.",
      });
      let index = this.state.switchWifiList.indexOf(this.state.switchWifiList.find(s => s.id === id));
      this.state.switchWifiList.splice(index, 1);
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
    this.loadAllSwitchWifi();
  }

  render() {
    const { switchWifiList, modalVisible, buttonNum, saveSwitchResponse, disableAddSwitch } = this.state;
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
        title: 'Mã người dùng',
        key: 'userId',
        render: (text) => <span>{text ? text : 'Chưa có'}</span>,
      },
      {
        key: 'delete',
        render: (text, row) => <Popconfirm title="Bạn có chắc muốn xóa?"
                                  onConfirm={() => this.handleDeleteSwitch(row.id)}
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
        <h1>DANH SÁCH CÔNG TẮC WIFI</h1>
        {switchWifiList ? (
          <TableComponent columns={columns} list={switchWifiList}/>
        ) : null}

        <Modal visible={modalVisible}
              title="Thêm sản phẩm"
              centered
              width='40vw'
              footer={[
                <Button key="back" onClick={this.handleCancelModal}>
                  Quay về
                </Button>,
                <Button disabled={disableAddSwitch} key="submit" type="primary" onClick={this.handleAddSwitch}>
                  Thêm
                </Button>,
              ]}>
          <div style={{margin: '0 3vw 0 3vw'}}>
            {saveSwitchResponse ? (
              <div>
                <div style={{marginBottom: '1vw', fontSize: '1.5vw'}}>
                  <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/><b>&ensp;Đã thêm sản phẩm</b>
                </div>
                <div style={{fontSize: '1.2vw'}}>
                  <p><b>Ngày sản xuất: </b>{saveSwitchResponse.day}</p>
                  <p><b>Mã sản phẩm: </b></p>
                  <p>{saveSwitchResponse.id}</p>
                  <p><b>Loại: </b>{saveSwitchResponse.type}</p>
                </div>
              </div>
            ) : (
              <div style={{fontSize: '1.2vw', textAlign: 'center'}}>
                <p>Chọn loại công tắc muốn thêm:</p>
                <Radio.Group onChange={e => { this.setState({ buttonNum: e.target.value })}} value={buttonNum}>
                  <Radio value={2}>2 nút</Radio>
                  <Radio value={3} style={{marginLeft: '3vw'}}>3 nút</Radio>
                </Radio.Group>
              </div>
            )}
          </div>
        </Modal>
      </div>
    )
  }
}

export default withRouter(SwitchWifiListComponent);