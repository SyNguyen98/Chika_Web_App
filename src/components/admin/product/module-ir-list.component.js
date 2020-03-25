import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Button, Modal, Popconfirm, notification } from 'antd';

import { getAllModuleIr, saveModuleIr, deleteModuleIr } from '../../../service/product.service';
import TableComponent from '../table.component';

class ModuleIrListComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        moduleIrList: [],
        modalVisible: false,
        saveModuleResponse: null,
        disableAddModule: false
      }
  }

  loadAllModuleIr = () => {
    this.setState({ isLoading: true });
    getAllModuleIr().then(response => {    
      this.setState({
        moduleIrList: response,
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
      saveModuleResponse: null,
      disableAddModule: false
    });
  }

  handleAddModule = () => {
    this.setState({
      isLoading: true
    });
    saveModuleIr().then(response => {
      this.setState({
        isLoading: false,
        saveModuleResponse: response,
        disableAddModule: true
      });
      this.state.moduleIrList.unshift(response);
      this.forceUpdate();
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  handleDeleteModule = (id) => {
    this.setState({
      isLoading: true
    });
    deleteModuleIr(id).then(response => {
      this.setState({
        isLoading: false
      });
      notification.success({
        message: 'Chika Smarthome',
        description: "Sản phẩm đã được xóa."
      });
      let index = this.state.moduleIrList.indexOf(this.state.moduleIrList.find(moduleIr => moduleIr.id === id));
      this.state.moduleIrList.splice(index, 1);
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
    this.loadAllModuleIr();
  }

  render() {
    const { moduleIrList, modalVisible, saveModuleResponse, disableAddModule } = this.state;
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
                                  onConfirm={(event) => this.handleDeleteModule(row.id)}
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
        <h1>DANH SÁCH ĐIỀU KHIỂN HỒNG NGOẠI</h1>
        {moduleIrList ? (
          <TableComponent columns={columns} list={moduleIrList}/>
        ) : null}

        <Modal visible={modalVisible}
              title="Thêm sản phẩm"
              centered
              width='40vw'
              footer={[
                <Button key="back" onClick={this.handleCancelModal}>
                  Quay về
                </Button>,
                <Button disabled={disableAddModule} key="submit" type="primary" onClick={this.handleAddModule}>
                  Thêm
                </Button>,
              ]}>
          <div style={{margin: '0 3vw 0 3vw'}}>
            {saveModuleResponse ? (
              <div>
                <div style={{marginBottom: '1vw', fontSize: '1.5vw'}}>
                  <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/><b>&ensp;Đã thêm sản phẩm</b>
                </div>
                <div style={{fontSize: '1.2vw'}}>
                  <p><b>Ngày sản xuất: </b>{saveModuleResponse.day}</p>
                  <p><b>Mã sản phẩm: </b></p>
                  <p>{saveModuleResponse.id}</p>
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

export default withRouter(ModuleIrListComponent);