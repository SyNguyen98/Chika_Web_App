import React, { Component } from 'react';
import { Table, Icon, Input, Button, Modal, Popconfirm, notification } from 'antd';

import { saveHomeCenter, deleteHomeCenter } from '../../../api';

export default class HomeCenterList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        searchText: '',
        searchedColumn: '',
        modalVisible: false,
        saveHomeCenterResponse: null,
        disableAddHomeCenter: false
      }
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input ref={node => {this.searchInput = node;}}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}/>
        <Button type="primary" icon="search"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                size="small" style={{ width: 90, marginRight: 8 }}>
          Tìm
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)}
                size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined, fontSize: 15 }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString()
                      .toLowerCase()
                      .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

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
      this.props.homeCenterList.unshift(response);
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
      let index = this.props.homeCenterList.indexOf(this.props.homeCenterList.find(s => s.id === id));
      this.props.homeCenterList.splice(index, 1);
      this.forceUpdate();
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { modalVisible, saveHomeCenterResponse, disableAddHomeCenter } = this.state;
    const columns = [
      {
        title: 'Ngày sản xuất',
        dataIndex: 'day',
        key: 'day',
        ...this.getColumnSearchProps('day'),
      },
      {
        title: 'Mã sản phẩm',
        dataIndex: 'id',
        key: 'id',
        ...this.getColumnSearchProps('id'),
      },
      {
        title: 'Mã người dùng',
        dataIndex: 'userId',
        key: 'userId',
        render: (text) => <span>{text ? text : 'Chưa có'}</span>,
        ...this.getColumnSearchProps('userId'),
      },
      {
        dataIndex: 'delete',
        key: 'delete',
        render: (text, row) => <Popconfirm title="Bạn có chắc muốn xóa?"
                                          onConfirm={(event) => this.handleDeleteHomeCenter(row.id)}
                                          okText="Xóa"
                                          cancelText="Hủy">
                                  <b style={{cursor: 'pointer', color: 'blue'}}>Xóa</b>
                                </Popconfirm>,
      },
    ];
    return (
      <div className="admin-device_list">
        <Button className="admin-device_add-btn" type="primary" onClick={this.handleShowModal}>
          <Icon type="plus" />Thêm
        </Button>
        <h1>DANH SÁCH BỘ ĐIỀU KHIỂN TRUNG TÂM</h1>
        {this.props.homeCenterList ? (
          <Table className="admin-device_list_table"
                columns={columns}
                dataSource={this.props.homeCenterList}
                pagination={{ pageSize: 20 }}
                bordered/>
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
