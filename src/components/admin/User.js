import React, { Component } from 'react';
import { Table, Icon, Input, Button, Modal, Divider, Popconfirm } from 'antd';

import '../../styles/admin/User.css';
import { getAllUser, getAllFeedback, updateFeedBackResponse } from '../../api';

export default class User extends Component {
  constructor(props) {
      super(props);
      this.state = {
          list: null,
          userList: null,
          feedbackList: null,
          isLoading: false
      }
  }

  loadAllUser = () => {
    this.setState({
      isLoading: true
    });
    getAllUser().then(response => {
      this.setState({
        userList: response,
        isLoading: false
      });
      console.log(this.state.userList);
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  loadAllFeedback = () => {
    this.setState({
      isLoading: true
    });
    getAllFeedback().then(response => {
      this.setState({
        feedbackList: response,
        isLoading: false
      });
      console.log(this.state.feedbackList);
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  handleChangeList = (listName) => {
    this.setState({ list: listName });
  }

  handleBack = () => {
    this.setState({ list: null });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadAllUser();
    this.loadAllFeedback();
  }

  render() {
    let list;
    if (this.state.list === 'user') {
      list = (<UserList userList={this.state.userList}/>);
    } else if (this.state.list === 'feedback') {
      list = (<FeedbackList feedbackList={this.state.feedbackList}/>);
    }
    return(
      <div className="admin-user">
        {this.state.list ? (
          <div >
            <Button type="primary" style={{margin: '1vw 0 0 3vw'}} onClick={this.handleBack}>
                <Icon type="left" />Trở về
            </Button>
            {list}
          </div>
        ) : (
          <div className="admin-user_menu">
            <div className="admin-user_menu_item" style={{backgroundImage: "url('/image/admin/user.jpg')"}}
                onClick={(event) => this.handleChangeList('user')}>
              <div className="admin-user_menu_item_title">
                <h1>Danh sách người dùng</h1>
                <p><b>{this.state.userList ? this.state.userList.length : null}</b> người dùng</p>
              </div>
            </div>

            <div className="admin-user_menu_item" style={{backgroundImage: "url('/image/admin/feedback.png')"}}
                onClick={(event) => this.handleChangeList('feedback')}>
              <div className="admin-user_menu_item_title">
                <h1>Danh sách phản hồi</h1>
                <p><b>{this.state.feedbackList ? this.state.feedbackList.length : null}</b> phản hồi</p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

class UserList extends Component {
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

class FeedbackList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        visible: false,
        feedbackInfo: null
      }
  }

  hanleShowModal = (time) => {
    let feedback = this.props.feedbackList.find(feedback => feedback.time === time);
    this.setState({
      isLoading: false,
      visible: true,
      feedbackInfo: feedback
    });
  };

  handleCancelModal = () => {
    this.setState({ visible: false });
  }

  handleSendResponse = (email) => {
    window.open("https://mail.google.com/mail/u/0/?view=cm&fs=1&to=" + email);
  }

  handleChangeIsResponse = (time) => {
    let feedback = this.props.feedbackList.find(feedback => feedback.time === time);
    this.setState({
      isLoading: true
    });
    updateFeedBackResponse(feedback.id, true).then(response => {
      this.setState({
        isLoading: false
      });
      let index = this.props.feedbackList.indexOf(this.props.feedbackList.find(feedback => feedback.id === response.id));
      this.props.feedbackList[index] = response;
      this.componentDidMount();
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  onChangeTable = {

  }

  render() {
    const { isLoading, visible, feedbackInfo } = this.state;
    const columns = [
      {
        title: 'Thời Gian',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: 'Họ Tên',
        dataIndex: 'name',
        key: 'name',
        render: (text, row) => <a onClick={(event) => this.hanleShowModal(row.time)}>{text}</a>,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Phản Hồi',
        dataIndex: 'response',
        key: 'response',
        render: (text, row) => <span>{text ? <i>Đã phản hồi</i> : (
          <Popconfirm title="Đã phản hồi hay chưa?"
                      onConfirm={(event) => this.handleChangeIsResponse(row.time)}
                      okText="Rồi"
                      cancelText="Chưa">
            <b style={{cursor: 'pointer'}}>Chưa phản hồi</b>
          </Popconfirm>
        )}</span>
      },
    ];
    return(
      <div className="admin-user_list">
        <h1>DANH SÁCH PHẢN HỒI</h1>
        {this.props.feedbackList ? (
          <Table className="admin-user_list_table"
                columns={columns}
                dataSource={this.props.feedbackList}
                pagination={{ pageSize: 20 }}
                bordered/>
        ) : null}
        {feedbackInfo ? (
          <Modal visible={visible}
                title="Phản Hồi"
                centered
                footer={[
                  <Button key="back" onClick={this.handleCancelModal}>
                    Quay về
                  </Button>,
                  <Button key="submit" type="primary" onClick={(event) => this.handleSendResponse(feedbackInfo.email)}>
                    Trả lời
                  </Button>,
                ]}>
            <div style={{margin: '0 3vw 0 3vw'}}>
              <h2 style={{marginBottom: '0'}}>{feedbackInfo.subject}</h2>
              <p style={{marginTop: '0', fontSize: '0.8vw', color: '#cfcfcf'}}>{feedbackInfo.time}</p>
              <p style={{marginTop: '1vw', fontSize: '1.2vw'}}>{feedbackInfo.content}</p>
              <Divider dashed />
              <h4 style={{marginTop: '0', fontSize: '1vw'}}><i>{feedbackInfo.name}</i></h4>
            </div>
          </Modal>
        ) : null}
      </div>
    )
  }
}
