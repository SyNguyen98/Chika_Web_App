import React, { Component } from 'react';
import { Table, Icon, Input, Button, Modal } from 'antd';

export default class UserList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        searchText: '',
        searchedColumn: ''
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

  hanleShowModal = (email) => {
    let userInfo = this.props.userList.find(user => user.email === email);
    Modal.info({
      icon: null,
      title: 'Thông tin cá nhân',
      content: (
        <div>
          <img alt='avatar' src={userInfo.avatar !== "" ? userInfo.avatar : '/image/avatar.png'}
              style={{width: '9vw', height: '9vw', borderRadius: '50%'}}/>
          <div style={{marginTop: '1.5vw', fontSize: '1.2vw'}}>
            <div  style={{display: 'inline-block', textAlign: 'justify'}}>
              <p>
                <b>Họ tên :</b>
                <span>&emsp;{userInfo.name}</span>
              </p>
              <p>
                <b>Ngày sinh :</b>
                <span>&emsp;{userInfo.birthday !== "" ? userInfo.birthday : (<i style={{fontSize: '1vw'}}>Không xác định</i>)}</span>
              </p>
              <p>
                <b>Số điện thoại :</b>
                <span>&emsp;{userInfo.phone !== "" ? userInfo.phone : (<i style={{fontSize: '1vw'}}>Không xác định</i>)}</span>
              </p>
              <p>
                <b>Email :</b>
                <span>&emsp;{userInfo.email}</span>
              </p>
              <p style={userInfo.address.length < 30 ? {width: 'auto'} : {width: '25vw'}}>
                <b>Địa chỉ :</b>
                <span>&emsp;{userInfo.address !== "" ? userInfo.address : (<i style={{fontSize: '1vw'}}>Không xác định</i>)}</span>
              </p>
              <p>
                <b>Phân quyền :</b>
                <span>&emsp;{userInfo.role}</span>
              </p>
            </div>
          </div>
        </div>
      ),
      okText: 'Trở về',
      width: '50vw'
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const columns = [
      {
        title: 'Họ Tên',
        dataIndex: 'name',
        key: 'name',
        render: (text, row) => <a onClick={(event) => this.hanleShowModal(row.email)}>{text}</a>,
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Ngày Sinh',
        dataIndex: 'birthday',
        key: 'birthday',
        ...this.getColumnSearchProps('birthday'),
      },
      {
        title: 'Số Điện Thoại',
        dataIndex: 'phone',
        key: 'phone',
        ...this.getColumnSearchProps('phone'),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        ...this.getColumnSearchProps('email'),
      },
    ];
    return(
      <div className="admin-user_list">
        <h1>DANH SÁCH NGƯỜI DÙNG</h1>
        {this.props.userList ? (
          <Table className="admin-user_list_table"
                columns={columns}
                dataSource={this.props.userList}
                pagination={{ pageSize: 20 }}
                bordered/>
        ) : null}
      </div>
    )
  }
}
