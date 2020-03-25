import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Modal, Divider, Popconfirm, notification } from 'antd';

import '../../../styles/admin/user/admin-user-feedback.component.css'
import { getAllFeedback, updateFeedBackResponse } from '../../../service/feedback.service';
import TableComponent from '../table.component';

class FeedbackComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        feedbackList: [],
        visible: false,
        isLoading: false,
        feedbackInfo: null
      }
  }

  loadAllFeedback = () => {
    getAllFeedback().then(response => {
      this.setState({ feedbackList: response });
      console.log(response);
    }).catch(error => {
      notification.error({
        message: 'Chika Smarthome',
        description: error.message || "Tải danh sách phản hồi thất bại!"
      });
    });
  }

  hanleShowModal = (time) => {
    let feedback = this.state.feedbackList.find(feedback => feedback.time === time);
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
    let feedback = this.state.feedbackList.find(feedback => feedback.time === time);
    this.setState({ isLoading: true });
    updateFeedBackResponse(feedback.id, true).then(response => {
      this.setState({
        isLoading: false
      });
      let index = this.state.feedbackList.indexOf(this.state.feedbackList.find(feedback => feedback.id === response.id));
      this.state.feedbackList[index] = response;
      this.forceUpdate();
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadAllFeedback();
  }

  render() {
    const { feedbackList, visible, feedbackInfo } = this.state;
    const columns = [
      {
        title: 'Thời Gian',
        key: 'time',
      },
      {
        title: 'Họ Tên',
        key: 'name',
        render: (text, row) => <a onClick={() => this.hanleShowModal(row.time)}>{text}</a>,
      },
      {
        title: 'Email',
        key: 'email',
      },
      {
        title: 'Phản Hồi',
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
      <div className="admin-user__feedback">
        <h1>DANH SÁCH PHẢN HỒI</h1>
        {feedbackList ? (<TableComponent list={feedbackList} columns={columns}/>) : null}

        {feedbackInfo ? (
          <Modal visible={visible}
                title="Phản Hồi"
                centered
                footer={[
                  <Button key="back" onClick={this.handleCancelModal}>
                    Quay về
                  </Button>,
                  <Button key="submit" type="primary" onClick={() => this.handleSendResponse(feedbackInfo.email)}>
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

export default withRouter(FeedbackComponent);