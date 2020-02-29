import React, { Component } from 'react';
import { Table, Icon, Input, Button, Modal, Radio, Popconfirm, notification } from 'antd';

import { saveSwitchRf, deleteSwitchRf } from '../../../api';

export default class SwitchWifiList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        searchText: '',
        searchedColumn: '',
        modalVisible: false,
        buttonNum: 1,
        switchChannel: '',
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
    saveSwitchRf(this.state.buttonNum, this.state.switchChannel).then(response => {
      this.setState({
        isLoading: false,
        saveSwitchResponse: response,
        disableAddSwitch: true
      });
      this.props.switchRfList.unshift(response);
      this.forceUpdate();
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
    deleteSwitchRf(id).then(response => {
      this.setState({
        isLoading: false,
      });
      notification.success({
        message: 'Chika Smarthome',
        description: "Sản phẩm đã được xóa.",
      });
      let index = this.props.switchRfList.indexOf(this.props.switchRfList.find(s => s.id === id));
      this.props.switchRfList.splice(index, 1);
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
        width: '12vw',
        ...this.getColumnSearchProps('id'),
      },
      {
        title: 'Loại',
        dataIndex: 'type',
        key: 'type',
        ...this.getColumnSearchProps('type'),
      },
      {
        title: 'Kênh',
        dataIndex: 'channel',
        key: 'channel',
        width: '7vw',
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
        <h1>DANH SÁCH CÔNG TẮC RF</h1>
        {this.props.switchRfList ? (
          <Table className="admin-device_list_table"
                columns={columns}
                dataSource={this.props.switchRfList}
                pagination={{ pageSize: 20 }}
                bordered
                style={{fontSize: '0.2vw'}}/>
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
                  <p><b>Kênh: </b>{saveSwitchResponse.channel}</p>
                  <p><b>Mã nút: </b></p>
                  <p style={{ lineHeight: '2vw', whiteSpace: "pre-line" }}>{saveSwitchResponse.buttonId.join('\n')}</p>
                </div>
              </div>
            ) : (
              <div style={{margin: '1vw 5vw 1vw 5vw', fontSize: '1.2vw', textAlign: 'center'}}>
                <p>Chọn loại công tắc muốn thêm:</p>
                <Radio.Group onChange={e => { this.setState({ buttonNum: e.target.value })}} value={buttonNum}>
                  <Radio value={1}>1 nút</Radio>
                  <Radio value={2} style={{marginLeft: '2vw'}}>2 nút</Radio>
                  <Radio value={3} style={{marginLeft: '2vw'}}>3 nút</Radio>
                </Radio.Group>
                <Input placeholder='Kênh vô tuyến. Vd: 83878217022001'
                      size="large"
                      style={{marginTop: '2vw', fontSize: '1vw'}}
                      prefix={<Icon type="wifi" />}
                      onChange={(e) => {this.setState({switchChannel: e.target.value})}}></Input>
              </div>
            )}
          </div>
        </Modal>
      </div>
    )
  }
}
