import React, { Component } from 'react';
import { Table, Icon, Input, Button, Modal, notification } from 'antd';

import { getProductByUserForAdmin } from '../../../api';

import '../../../styles/admin/user/UserList.css';

export default class UserList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        userInfo: null,
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

  hanleShowModal = (id) => {
    this.setState({ 
      userInfo: this.props.userList.find(user => user.id === id)
    });
  };

  handleCancelModal = () => {
    this.setState({ userInfo: null });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { userInfo } = this.state;
    const columns = [
      {
        title: 'Mã',
        dataIndex: 'id',
        key: 'id',
        ...this.getColumnSearchProps('id'),
      },
      {
        title: 'Họ Tên',
        dataIndex: 'name',
        key: 'name',
        render: (text, row) => <a onClick={() => this.hanleShowModal(row.id)}>{text}</a>,
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

        {userInfo ? (
          <Modal visible={true} closable={false}
                title="Thông tin cá nhân"
                centered
                width='50vw'
                footer={(
                  <Button type='primary' key="back" onClick={this.handleCancelModal}>
                    Quay về
                  </Button>
                )}>
            <UserInfo userInfo={userInfo}/>    
          </Modal>
        ) : null}
      </div>
    )
  }
}

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsComponent: false,
      products: null,
      productNum: 0,
      switchWifi: null,
      switchRf: null,
      moduleIr: null,
      homeCenter: null,
      sensor: null,
    }
  }

  loadProduct = (userId) => {
    this.setState({ isLoading: true });
    getProductByUserForAdmin(userId).then(response => {
      this.setState({
        products: response,
        isLoading: false
      });
      console.log(this.state.products);
      this.state.products.forEach(product => {
        this.setState({ 
          productNum: this.state.productNum + product.ids.length
        });
      });
      this.forceUpdate();
    }).catch(error => {
      this.setState({ isLoading: false });
      notification.error({
        message: 'Chika Smarthome',
        description: error.message || "Tải dữ liệu thất bại!"
      });
    });
  }

  handleShowProduct = (bool) => {
    if (bool) {
      this.countProduct();
    }
    this.setState({ productsComponent: bool });
  }

  countProduct = () => {
    const { products } = this.state;
    if (products !== null) {
      products.forEach(product => {
        switch (product.name) {
          case 'Switch Wifi':
            this.setState({ switchWifi: {
              name: 'Công tắc Wifi',
              number: product.ids.length
            } });
            break;
          case 'Switch Rf':
            this.setState({ switchRf: {
              name: 'Công tắc RF',
              number: product.ids.length
            } });
            break;
          case 'Module Ir':
            this.setState({ moduleIr: {
              name: 'Điều khiển hồng ngoại',
              number: product.ids.length
            } });
            break;
          case 'Home Center':
            this.setState({ homeCenter: {
              name: 'Bộ điều khiển trung tâm',
              number: product.ids.length
            } });
            break;
          case 'Sensor':
            this.setState({ sensor: {
              name: 'Cảm biến',
              number: product.ids.length
            } });
            break;
          default:
            break;
        }
      })
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadProduct(this.props.userInfo.id);
  }

  render() {
    const { userInfo } = this.props;
    const { productsComponent, productNum, switchWifi, switchRf, moduleIr, homeCenter, sensor } = this.state;
    
    return (
      <div className="user-list_info">
        <div style={{ textAlign: 'center' }}>
          <img className="user-list_info_avatar" alt='avatar' src={userInfo.avatar !== '' ? userInfo.avatar : '/image/avatar.png'}></img>
          <p className="user-list_info_name">{userInfo.name}</p>
        </div>

        <h1 className="user-list_info_title">Thông tin cá nhân</h1>
        <div className="user-list_info_content">
          <div className="user-list_info_content_topic">
            <p>Ngày sinh</p>
            <p>Địa chỉ</p>
          </div>
          <div className="user-list_info_content_content">
            <p>{userInfo.birthday}</p>
            <p>{userInfo.address}</p>
          </div>
        </div>

        <h1 className="user-list_info_title">Thông tin liên hệ</h1>
        <div className="user-list_info_content">
          <div className="user-list_info_content_topic">
            <p>Email</p>
            <p>Số điện thoại</p>
          </div>
          <div className="user-list_info_content_content">
            <p>{userInfo.email}</p>
            <p>{userInfo.phone}</p>
          </div>
        </div>

        <h1 className="user-list_info_title">Thông tin về Chika</h1>
        <div className="user-list_info_content">
          <div className="user-list_info_content_topic">
            <p>Ngày gia nhập</p>
            <p>Sản phẩm đang sở hữu:</p>
          </div>
          <div className="user-list_info_content_content">
            <p>{userInfo.createAt}</p>
            <p>{productNum} &emsp; 
            {productsComponent ? (
              <Icon type="up" style={{cursor: 'pointer'}} onClick={() => this.handleShowProduct(false)}/>
            ) : (
              <Icon type="down" style={{cursor: 'pointer'}} onClick={() => this.handleShowProduct(true)}/>
            )}</p>
          </div>
        </div>

        {productsComponent ? (
          <div>
            <h1 className="user-list_info_title">Sản phẩm</h1>
            <div className="user-list_info_content">
              <div className="user-list_info_content_topic" style={{width: '15vw'}}>
                {switchWifi ? (<p>&bull; {switchWifi.name}</p>) : null}
                {switchRf ? (<p>&bull; {switchRf.name}</p>) : null}
                {moduleIr ? (<p>&bull; {moduleIr.name}</p>) : null}
                {homeCenter ? (<p>&bull; {homeCenter.name}</p>) : null}
                {sensor ? (<p>&bull; {sensor.name}</p>) : null}
              </div>
              <div className="user-list_info_content_content">
                {switchWifi ? (<p>{switchWifi.number} sản phẩm</p>) : null}
                {switchRf ? (<p>{switchRf.number} sản phẩm</p>) : null}
                {moduleIr ? (<p>{moduleIr.number} sản phẩm</p>) : null}
                {homeCenter ? (<p>{homeCenter.number} sản phẩm</p>) : null}
                {sensor ? (<p>{sensor.number} sản phẩm</p>) : null}
              </div>
            </div>
          </div>        
        ) : null}
      </div>
    )
  }
}