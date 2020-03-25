import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Button, Modal, Popconfirm, notification } from 'antd';

import { getAllHomeCenter, saveHomeCenter, deleteHomeCenter } from '../../../service/product.service';
import TableComponent from '../table.component';

class HomeCenterListComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        homeCenterList: [],
        modalVisible: false,
        saveHomeCenterResponse: null,
        disableAddHomeCenter: false
      }
  }

  loadAllHomeCenter = () => {
    this.setState({ isLoading: true });
    getAllHomeCenter().then(response => {    
      this.setState({
        homeCenterList: response,
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
      saveHomeCenterResponse: null,
      disableAddHomeCenter: false
    });
  }

  handleAddHomeCenter = () => {
    this.setState({
      isLoading: true
    });
    saveHomeCenter().then(response => {
      this.setState({
        isLoading: false,
        saveHomeCenterResponse: response,
        disableAddHomeCenter: true
      });
      this.state.homeCenterList.unshift(response);
      this.forceUpdate();
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  handleDeleteHomeCenter = (id) => {
    this.setState({
      isLoading: true
    });
    deleteHomeCenter(id).then(response => {
      this.setState({
        isLoading: false,
      });
      notification.success({
        message: 'Chika Smarthome',
        description: "Sản phẩm đã được xóa.",
      });
      let index = this.state.homeCenterList.indexOf(this.state.homeCenterList.find(s => s.id === id));
      this.state.homeCenterList.splice(index, 1);
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
    this.loadAllHomeCenter();
  }

  render() {
    const { homeCenterList, modalVisible, saveHomeCenterResponse, disableAddHomeCenter } = this.state;
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
        title: 'Mã người dùng',
        key: 'userId',
        render: (text) => <span>{text ? text : 'Chưa có'}</span>,
      },
      {
        key: 'delete',
        render: (text, row) => <Popconfirm title="Bạn có chắc muốn xóa?"
                                          onConfirm={() => this.handleDeleteHomeCenter(row.id)}
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
        <h1>DANH SÁCH BỘ ĐIỀU KHIỂN TRUNG TÂM</h1>
        {homeCenterList ? (
          <TableComponent columns={columns} list={homeCenterList}/>
        ) : null}
        
        <Modal visible={modalVisible}
              title="Thêm sản phẩm"
              centered
              width='40vw'
              footer={[
                <Button key="back" onClick={this.handleCancelModal}>
                  Quay về
                </Button>,
                <Button disabled={disableAddHomeCenter} key="submit" type="primary" onClick={this.handleAddHomeCenter}>
                  Thêm
                </Button>,
              ]}>
          <div style={{margin: '0 3vw 0 3vw'}}>
            {saveHomeCenterResponse ? (
              <div>
                <div style={{marginBottom: '1vw', fontSize: '1.5vw'}}>
                  <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/><b>&ensp;Đã thêm sản phẩm</b>
                </div>
                <div style={{fontSize: '1.2vw'}}>
                  <p><b>Ngày sản xuất: </b>{saveHomeCenterResponse.day}</p>
                  <p><b>Mã sản phẩm: </b></p>
                  <p>{saveHomeCenterResponse.id}</p>
                </div>
              </div>
            ) : (
              <div style={{fontSize: '1.2vw', textAlign: 'center'}}>
                Bạn có chắc muốn thêm sản phẩm?
              </div>
            )}
          </div>
        </Modal>
      </div>
    )
  }
}

export default withRouter(HomeCenterListComponent);