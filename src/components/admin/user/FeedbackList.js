import React, { Component } from 'react';
import { Table, Button, Modal, Divider, Popconfirm } from 'antd';

import { updateFeedBackResponse } from '../../../api';

export default class FeedbackList extends Component {
  constructor(props) {
      super(props);
      this.state = {
        visible: false,
        isLoading: false,
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

  handleChangeResponse = (event, time) => {
    event.preventDefault();
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
    const { visible, feedbackInfo } = this.state;
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
                      onConfirm={(event) => this.handleChangeResponse(event, row.time)}
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
