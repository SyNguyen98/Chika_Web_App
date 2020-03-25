import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Icon, Checkbox, notification } from 'antd';

import '../../../styles/admin/user/admin-user-add.component.css';
import { SWITCH_WIFI, SWITCH_RF, MODULE_IR, HOME_CENTER, SENSOR } from '../../../constant';
import { signup } from '../../../service/auth.service';

class AddUserComponent extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const AntSignUpForm = Form.create()(SignUp)
    return (
      <div className="admin-user__add">
        <h1>THÊM TÀI KHOẢN NGƯỜI DÙNG</h1>
        <AntSignUpForm />
      </div>
    )
  }
}

export default withRouter(AddUserComponent);

class SignUp extends Component {
  constructor(props) {
      super(props);
      this.state = {
          products: [],
          switchWifi: [""],
          switchRf: [""],
          moduleIr: [""],
          homeCenter: [""],
          sensor: [""],
      }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const request = {
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
          products: []
        };
        this.state.products.forEach((item, i) => {
          let ids = [];
          switch (item) {
            case SWITCH_WIFI:
              ids = this.state.switchWifi.slice();
              break;
            case SWITCH_RF:
              ids = this.state.switchRf.slice();
              break;
            case MODULE_IR:
              ids = this.state.moduleIr.slice();
              break;
            case HOME_CENTER:
              ids = this.state.homeCenter.slice();
              break;
            case SENSOR:
              ids = this.state.sensor.slice();
              break;
            default:
          }
          request.products.push({
            name: item,
            ids: ids
          })
        });
        console.log(request);
        signup(request).then(response => {
          notification.success({
            message: 'Chika Smarthome',
            description: 'Tạo tài khoản thành công!'
          });
        }).catch(error => {
          let message;
          if (error.message.includes('have owner')) {
            if (error.message.includes(SWITCH_WIFI)) {
              message = 'Công tắc Wifi đã có người sở hữu';
            } else if (error.message.includes(SWITCH_RF)) {
              message = 'Công tắc Rf đã có người sở hữu';
            } else if (error.message.includes(MODULE_IR)) {
              message = 'Điều khiển hồng ngoại đã có người sở hữu';
            } else if (error.message.includes(HOME_CENTER)) {
              message = 'Bộ điều khiển trung tâm đã có người sở hữu';
            } else if (error.message.includes(SENSOR)) {
              message = 'Cảm biến đã có người sở hữu';
            }
          } else if (error.message.includes('already taken')) {
            if (error.message.includes('Phone')) {
              message = 'Số điện thoại đã được sử dụng';
            } else if (error.message.includes('Email')) {
              message = 'Email đã được sử dụng';
            }
          } else if (error.message.includes('1 Chika product')) {
              message = 'Bạn cần sở hữu ít nhất 1 sản phẩm của Chika để tạo được tài khoản';
          }
          notification.error({
            message: 'Chika Smarthome',
            description: message || 'Đã có lỗi xảy ra. Xin vui lòng thử lại sau!'
          });
        });
      }
    });
  }

  handleAddProduct = (productName) => {
    switch (productName) {
      case SWITCH_WIFI:
        const switchWifis = this.state.switchWifi.slice();
        this.setState({
          switchWifi: switchWifis.concat("")
        })
        break;
      case SWITCH_RF:
        const switchRfs = this.state.switchRf.slice();
        this.setState({
          switchRf: switchRfs.concat("")
        })
        break;
      case MODULE_IR:
        const moduleIrs = this.state.moduleIr.slice();
        this.setState({
          moduleIr: moduleIrs.concat("")
        })
        break;
      case HOME_CENTER:
        const homeCenters = this.state.homeCenter.slice();
        this.setState({
          homeCenter: homeCenters.concat("")
        })
        break;
      case SENSOR:
        const sensors = this.state.sensor.slice();
        this.setState({
          sensor: sensors.concat("")
        })
        break;
      default:
    }
  }

  handleRemoveProduct = (productName, num) => {
    switch (productName) {
      case SWITCH_WIFI:
        const switchWifis = this.state.switchWifi.slice();
        this.setState({
          switchWifi: [...switchWifis.slice(0, num), ...switchWifis.slice(num + 1)]
        });
        break;
      case SWITCH_RF:
        const switchRfs = this.state.switchRf.slice();
        this.setState({
          switchRf: [...switchRfs.slice(0, num), ...switchRfs.slice(num + 1)]
        });
        break;
      case MODULE_IR:
        const moduleIrs = this.state.moduleIr.slice();
        this.setState({
          moduleIr: [...moduleIrs.slice(0, num), ...moduleIrs.slice(num + 1)]
        })
        break;
      case HOME_CENTER:
        const homeCenters = this.state.homeCenter.slice();
        this.setState({
          homeCenter: [...homeCenters.slice(0, num), ...homeCenters.slice(num + 1)]
        })
        break;
      case SENSOR:
        const sensors = this.state.sensor.slice();
        this.setState({
          sensor: [...sensors.slice(0, num), ...sensors.slice(num + 1)]
        })
        break;
      default:
    }
  }

  onChange = (event, productName, index) => {
    const value = event.target.value;
    switch (productName) {
      case SWITCH_WIFI:
        const switchWifis = this.state.switchWifi.slice();
        switchWifis[index] = value;
        this.setState({
          switchWifi: switchWifis
        });
        break;
      case SWITCH_RF:
        const switchRfs = this.state.switchRf.slice();
        switchRfs[index] = value;
        this.setState({
          switchRf: switchRfs
        });
        break;
      case MODULE_IR:
        const moduleIrs = this.state.moduleIr.slice();
        moduleIrs[index] = value;
        this.setState({
          moduleIr: moduleIrs
        });
        break;
      case HOME_CENTER:
        const homeCenters = this.state.homeCenter.slice();
        homeCenters[index] = value;
        this.setState({
          homeCenter: homeCenters
        });
        break;
      case SENSOR:
        const sensors = this.state.sensor.slice();
        sensors[index] = value;
        this.setState({
          sensor: sensors
        });
        break;
      default:
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { products, switchWifi, switchRf, moduleIr, homeCenter, sensor } = this.state;
    const options = [
      { label: 'Công tắc Wifi', value: SWITCH_WIFI },
      { label: 'Công tắc RF', value: SWITCH_RF },
      { label: 'Điều khiển hồng ngoại', value: MODULE_IR },
      { label: 'Bộ điều khiển trung tâm', value: HOME_CENTER },
      { label: 'Cảm biến', value: SENSOR },
    ];

    const switchWifis = [];
    const switchRfs = [];
    const moduleIrs = [];
    const homeCenters = [];
    const sensors = [];
    switchWifi.forEach((item, i) => {
      switchWifis.push(<ProductInput key={i} getFieldDecorator={getFieldDecorator} productName={SWITCH_WIFI} productNum={i}
                                      handleRemove={this.handleRemoveProduct} onChange={this.onChange}/>)
    });
    switchRf.forEach((item, i) => {
      switchRfs.push(<ProductInput key={i} getFieldDecorator={getFieldDecorator} productName={SWITCH_RF} productNum={i}
                                  handleRemove={this.handleRemoveProduct} onChange={this.onChange}/>)
    });
    moduleIr.forEach((item, i) => {
      moduleIrs.push(<ProductInput key={i} getFieldDecorator={getFieldDecorator} productName={MODULE_IR} productNum={i}
                                  handleRemove={this.handleRemoveProduct} onChange={this.onChange}/>)
    });
    homeCenter.forEach((item, i) => {
      homeCenters.push(<ProductInput key={i} getFieldDecorator={getFieldDecorator} productName={HOME_CENTER} productNum={i}
                                    handleRemove={this.handleRemoveProduct} onChange={this.onChange}/>)
    });
    sensor.forEach((item, i) => {
      sensors.push(<ProductInput key={i} getFieldDecorator={getFieldDecorator} productName={SENSOR} productNum={i}
                                handleRemove={this.handleRemoveProduct} onChange={this.onChange}/>)
    });

    return (
      <Form className="admin-user_add_form" onSubmit={this.handleSubmit} autoComplete="off">
        <div style={{display: 'flex'}}>
          <div className="admin-user_add_form_info">
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Vui lòng nhập họ tên!' }]
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" />}
                  placeholder="Họ và Tên"/>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: 'Vui lòng nhập số điện thoại!' }]
              })(
                <Input
                  size="large"
                  prefix={<Icon type="phone" />}
                  placeholder="Số điện thoại"
                  maxLength={10}/>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  { type: 'email', message: 'Email không hợp lệ!', },
                  { required: true, message: 'Vui lòng nhập Email!', },
                ],
              })(<Input
                  size="large"
                  prefix={<Icon type="mail" />}
                  placeholder="Email"/>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Vui lòng nhập mật khẩu!' }]
              })(
                <Input
                  size="large"
                  prefix={<Icon type="lock" />}
                  placeholder="Mật khẩu"/>
              )}
            </Form.Item>
            <Button type="primary" htmlType="submit" size="large" className="admin-user_add_form_button">Tạo tài khoản</Button>
          </div>

          <div className="admin-user_add_form_product">
            <h2>Sản phẩm sở hữu</h2>
            <Checkbox.Group options={options}
                            onChange={(values) => { this.setState({ products: values }) }}/>

            {products.includes(SWITCH_WIFI) ? (
              <div className="admin-user_add_form_product_type">
                <p>Công tắc Wifi</p>
                {switchWifis}
                <Button type="dashed" onClick={() => this.handleAddProduct(SWITCH_WIFI)}><Icon type="plus" />Thêm</Button>
              </div>
            ) : null}

            {products.includes(SWITCH_RF) ? (
              <div className="admin-user_add_form_product_type">
                <p>Công tắc Rf</p>
                {switchRfs}
                <Button type="dashed" onClick={() => this.handleAddProduct(SWITCH_RF)}><Icon type="plus" />Thêm</Button>
              </div>
            ) : null}

            {products.includes(MODULE_IR) ? (
              <div className="admin-user_add_form_product_type">
                <p>Điều khiển hồng ngoại</p>
                {moduleIrs}
                <Button type="dashed" onClick={() => this.handleAddProduct(MODULE_IR)}><Icon type="plus" />Thêm</Button>
              </div>
            ) : null}

            {products.includes(HOME_CENTER) ? (
              <div className="admin-user_add_form_product_type">
                <p>Bộ điều khiển trung tâm</p>
                {homeCenters}
                <Button type="dashed" onClick={() => this.handleAddProduct(HOME_CENTER)}><Icon type="plus" />Thêm</Button>
              </div>
            ) : null}

            {products.includes(SENSOR) ? (
              <div className="admin-user_add_form_product_type">
                <p>Cảm biến</p>
                {sensors}
                <Button type="dashed" onClick={() => this.handleAddProduct(SENSOR)}><Icon type="plus" />Thêm</Button>
              </div>
            ) : null}
          </div>
        </div>
      </Form>
    );
  }
}

class ProductInput extends Component {
  render() {
    const { getFieldDecorator, productName, productNum, handleRemove, onChange} = this.props;
    return (
      <Form.Item>
        <div style={{display: 'flex', marginBottom: '10px'}}>
          {getFieldDecorator(productName + ' ' + productNum, {
            rules: [{ required: true, message: 'Vui lòng nhập id sản phẩm!'}]
          })(
            <Input
              size="default"
              prefix={<Icon type="barcode" />}
              placeholder= {productNum === 0 ? "Mã sản phẩm" : "Mã sản phẩm " + productNum}
              onChange={(event) => onChange(event, productName, productNum)}/>
          )}
          {productNum > 0 ? (
            <Icon type="close-circle" style={{marginTop: '7px', marginLeft: '10px', fontSize: '20px', cursor: 'pointer'}}
                  onClick={() => handleRemove(productName, productNum)}/>
          ): null}
        </div>
      </Form.Item>
    );
  }
}
