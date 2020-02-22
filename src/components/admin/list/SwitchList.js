import React, { Component } from 'react';
import { Table, Icon, Input, Button, Modal, Radio, Popconfirm, notification } from 'antd';

import { saveSwitch, deleteSwitch } from '../../../api';

export default class SwitchList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        searchText: '',
        searchedColumn: '',
        modalVisible: false,
        buttonNum: 2,
        saveSwitchResponse: null,
        disableAddSwitch: false
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
      saveSwitchResponse: null,
      disableAddSwitch: false
    });
  }

  handleAddSwitch = () => {
    this.setState({
      isLoading: true
    });
    saveSwitch(this.state.buttonNum).then(response => {
      this.setState({
        isLoading: false,
        saveSwitchResponse: response,
        disableAddSwitch: true
      });
      this.props.switchList.unshift(response);
      this.componentDidMount();
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  handleDeleteSwitch = (id) => {
    this.setState({
      isLoading: true
    });
    deleteSwitch(id).then(response => {
      this.setState({
        isLoading: false,
      });
      notification.success({
        message: 'Chika Smarthome',
        description: "Sản phẩm đã được xóa.",
      });
      let index = this.props.switchList.indexOf(this.props.switchList.find(s => s.id === id));
      this.props.switchList.splice(index, 1);
      this.componentDidMount();
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
    const { modalVisible, buttonNum, saveSwitchResponse, disableAddSwitch } = this.state;
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
        title: 'Loại',
        dataIndex: 'type',
        key: 'type',
        ...this.getColumnSearchProps('type'),
      },
      {
        title: 'Mã người dùng',
        dataIndex: 'userId',
        key: 'userId',
        render: (text) => <span>{text ? text : 'Chưa có'}</span>,
        ...this.getColumnSearchProps('userId'),
      },
      {
        title: 'Mã nút',
        dataIndex: 'buttonId',
        key: 'buttonId',
        render: (text) => <span style={{ lineHeight: '2vw', whiteSpace: "pre-line" }}>{text.join('\n')}</span>
      },
      {
        dataIndex: 'delete',
        key: 'delete',
        render: (text, row) => <Popconfirm title="Bạn có chắc muốn xóa?"
                                  onConfirm={(event) => this.handleDeleteSwitch(row.id)}
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
        <h1>DANH SÁCH CÔNG TẮC</h1>
        {this.props.switchList ? (
          <Table className="admin-device_list_table"
                columns={columns}
                dataSource={this.props.switchList}
                pagination={{ pageSize: 20 }}
                bordered/>
        ) : null}
        <Modal visible={modalVisible}
              title="Thêm sản phẩm"
              centered
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
                  <p><b>Mã nút: </b></p>
                  <p style={{ lineHeight: '2vw', whiteSpace: "pre-line" }}>{saveSwitchResponse.buttonId.join('\n')}</p>
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
