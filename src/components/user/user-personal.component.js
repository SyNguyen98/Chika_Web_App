import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Icon, Form, Input, DatePicker, notification } from 'antd';
import moment from 'moment';

import '../../styles/user/user-personal.component.css';

import { getUserInfo, updateUserInfo, getProductByUser } from '../../api';

class UserPersonalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      products: null,
      productNum: 0,
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
    }).catch(error => {
      this.setState({ isLoading: false });
      notification.error({
        message: 'Chika Smarthome',
        description: "Tải dữ liệu thất bại!"
      });
    });
  }

  loadProduct = () => {
    this.setState({ isLoading: true });
    getProductByUser().then(response => {
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

  updateUserInfo = (request) => {
    this.setState({ isLoading: true });
    updateUserInfo(request).then(response => {
      this.setState({
        userInfo: response,
        isLoading: false
      });
      notification.success({
        message: 'Chika Smarthome',
        description: "Thông tin đã được cập nhật."
      });
      this.forceUpdate();
    }).catch(error => {
      this.setState({ isLoading: false });
      let message;
      if (error.message.includes('Phone')) {
        message = 'Số điện thoại đã được sử dụng';
      } else if (error.message.includes('Email')) {
        message = 'Email đã được sử dụng';
      }
      notification.error({
        message: 'Chika Smarthome',
        description: message || "Đã có lỗi xảy ra. Vui lòng thử lại sau!"
      });
    });
  }

  handleChangeComponent = (component) => {
    this.setState({ componentName: component });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadUserInfo();
    this.loadProduct();
  }

  render() {
    const { userInfo, products, productNum, componentName } = this.state;
    let component;
    switch (componentName) {
      case 'info':
        component = (<UserInfo userInfo={userInfo} products={products} productNum={productNum}/>)
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

export default withRouter(UserPersonalComponent);

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsComponent: false,
      switchWifi: null,
      switchRf: null,
      moduleIr: null,
      homeCenter: null,
      sensor: null,
    }
  }

  handleShowProduct = (bool) => {
    if (bool) {
      this.countProduct();
    }
    this.setState({ productsComponent: bool });
  }

  countProduct = () => {
    const { products } = this.props;
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
    
  }

  render() {
    const { userInfo, productNum } = this.props;
    const { productsComponent, switchWifi, switchRf, moduleIr, homeCenter, sensor } = this.state;
    
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
          <img alt='icon-contact' src='/image/user/personal/icon-contact.png'></img>
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
          <img alt='icon-home' src='/image/user/personal/icon-home.png'></img>
          <h1>Thông tin về Chika</h1>
        </div>
        <div className="user-personal_info_content">
          <div className="user-personal_info_content_topic">
            <p>Ngày gia nhập</p>
            <p>Sản phẩm đang sở hữu:</p>
          </div>
          <div className="user-personal_info_content_content">
            <p>{userInfo.createAt}</p>
            <p>{productNum} &emsp; {productsComponent ? (
              <Icon type="up" style={{cursor: 'pointer'}} onClick={() => this.handleShowProduct(false)}/>
            ) : (
              <Icon type="down" style={{cursor: 'pointer'}} onClick={() => this.handleShowProduct(true)}/>
            )}</p>
          </div>
        </div>

        {productsComponent ? (
          <div>
            <div className="user-personal_info_title">
              <img alt='icon-product' src='/image/user/personal/icon-product.png'></img>
              <h1>Sản phẩm</h1>
            </div>
            <div className="user-personal_info_content">
              <div className="user-personal_info_content_topic" style={{width: '15vw'}}>
                {switchWifi ? (<p>&bull; {switchWifi.name}</p>) : null}
                {switchRf ? (<p>&bull; {switchRf.name}</p>) : null}
                {moduleIr ? (<p>&bull; {moduleIr.name}</p>) : null}
                {homeCenter ? (<p>&bull; {homeCenter.name}</p>) : null}
                {sensor ? (<p>&bull; {sensor.name}</p>) : null}
              </div>
              <div className="user-personal_info_content_content">
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
