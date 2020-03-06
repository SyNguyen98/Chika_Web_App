import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Icon, Form, Input, DatePicker } from 'antd';
import moment from 'moment';

import { getUserInfo, updateUserInfo } from '../../api';

import '../../styles/user/Personal.css';

class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      isLoading: false,
      componentName: 'info'
    }
  }

  loadUserInfo = () => {
    this.setState({
      isLoading: true
    });
    getUserInfo().then(response => {
      this.setState({
        userInfo: response,
        isLoading: false
      });
      console.log(response);
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  updateUserInfo = (request) => {
    this.setState({
      isLoading: true
    });
    updateUserInfo(request).then(response => {
      this.setState({
        userInfo: response,
        isLoading: false
      });
      console.log(response);
      this.forceUpdate();
    }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  handleChangeComponent = (component) => {
    this.setState({ componentName: component });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadUserInfo();
  }

  render() {
    const { userInfo, componentName } = this.state;
    let component;
    switch (componentName) {
      case 'info':
        component = (<UserInfo userInfo={userInfo}/>)
        break;
      case 'edit':
        component = (<EditInfo userInfo={userInfo} updateUserInfo={this.updateUserInfo} handleChangeComponent={this.handleChangeComponent}/>)
        break;
      default:
        component = null;
    }
    return (
      <div className="user-personal">
        {userInfo ? (
          <div>
            {componentName === 'info' ? (
              <Button className="user-personal_edit-button" onClick={() => this.handleChangeComponent('edit')}><Icon type="edit" /></Button>
            ) : (<br/>)} 

            <div style={{ textAlign: 'center' }}>
              <img className="user-personal_avatar" alt='avatar' src={userInfo.avatar}></img>
              <p className="user-personal_name">{userInfo.name}</p>
            </div>

            {component}
          </div>
        ) : null}
      </div>
    )
  }
}

export default withRouter(Personal);

class UserInfo extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div className="user-personal_info">
        <div className="user-personal_info_title">
          <img alt='icon-id-card' src='/image/user/personal/icon-id-card.png'></img>
          <h1>Thông tin cá nhân</h1>
        </div>
        <div className="user-personal_info_content">
          <div className="user-personal_info_content_topic">
            <p>Ngày sinh</p>
            <p>Địa chỉ</p>
          </div>
          <div className="user-personal_info_content_content">
            <p>{userInfo.birthday}</p>
            <p>{userInfo.address}</p>
          </div>
        </div>

        <div className="user-personal_info_title">
          <img alt='icon-id-card' src='/image/user/personal/icon-contact.png'></img>
          <h1>Thông tin liên hệ</h1>
        </div>
        <div className="user-personal_info_content">
          <div className="user-personal_info_content_topic">
            <p>Email</p>
            <p>Số điện thoại</p>
          </div>
          <div className="user-personal_info_content_content">
            <p>{userInfo.email}</p>
            <p>{userInfo.phone}</p>
          </div>
        </div>

        <div className="user-personal_info_title">
          <img alt='icon-id-card' src='/image/user/personal/icon-home.png'></img>
          <h1>Thông tin về Chika</h1>
        </div>
        <div className="user-personal_info_content">
          <div className="user-personal_info_content_topic">
            <p>Ngày gia nhập</p>
            <p>Sản phẩm đang sở hữu:</p>
          </div>
          <div className="user-personal_info_content_content">
            <p>{userInfo.createAt}</p>
            <p>10</p>
          </div>
        </div>
      </div>
    )
  }
}

class EditInfo extends Component {
  
  render() {
    const AntEditForm = Form.create()(ChangeInfoForm)
    const { userInfo } = this.props;
    return (
      <div className="user-personal_edit">
        <AntEditForm userInfo={userInfo} updateUserInfo={this.props.updateUserInfo} handleChangeComponent={this.props.handleChangeComponent}/>
        <Button className="user-personal_edit_back-btn"
                size="large"
                onClick={() => this.props.handleChangeComponent('info')}>
          Quay về
        </Button>
      </div>
    )
  }
}

class ChangeInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChange: false
    }
  }

  isChange = (values) => {
    const { userInfo } = this.props;   
    if (userInfo.birthday !== values.birthday.format('DD/MM/YYYY') || userInfo.address !== values.address ||
      userInfo.phone !== values.phone || userInfo.email !== values.email) {
      return false;
    }
    return true;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const request = {
          birthday: values.birthday.format('DD/MM/YYYY'),
          address: values.address,
          phone: values.phone,
          email: values.email,
        };
        console.log(request);
        this.props.updateUserInfo(request);
        this.props.handleChangeComponent('info');
      }
    });
  }

  render() {
    const { userInfo } = this.props;
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} autoComplete="off">
        <Form.Item>
          {getFieldDecorator('birthday', {
            initialValue: moment(userInfo.birthday, 'DD/MM/YYYY'),
            rules: [{ required: true, message: 'Vui lòng nhập ngày sinh!' }],
          })(
            <DatePicker style={{width: '100%'}} size="large" placeholder='Ngày sinh' format={'DD/MM/YYYY'} />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('address', {
            initialValue: userInfo.address,
            rules: [{ required: true, message: 'Vui lòng nhập ngày sinh!' }]
          })(
            <Input size="large" placeholder="Địa chỉ" suffix={<Icon type="edit" />}/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phone', {
            initialValue: userInfo.phone,
            rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }]
          })(
            <Input size="large" placeholder="Số điện thoại" maxLength={10} suffix={<Icon type="edit" />}/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            initialValue: userInfo.email,
            rules: [
              { type: 'email', message: 'Email không hợp lệ!', },
              { required: true, message: 'Vui lòng nhập Email!', },
            ],
          })(<Input size="large" placeholder="Email" suffix={<Icon type="edit" />}/>
          )}
        </Form.Item>
        <Button type="primary" 
                htmlType="submit" 
                size="large" 
                disabled={this.isChange(getFieldsValue())}
                style={{width: '50%'}}>Thay đổi</Button>
      </Form>
    );
  }
}
