import React, { Component } from 'react';
import { Icon, Button, Input, Form, Checkbox, notification } from 'antd';

import '../../../styles/admin/user/Shop.css';

import { getUserByPhone, updateProductWithUser } from '../../../api';

import { SWITCH_WIFI, SWITCH_RF, MODULE_IR, HOME_CENTER, SENSOR } from '../../../constant';

export default class Shop extends Component {
  constructor(props) {
      super(props);
      this.state = {
          user: null,
          products: [],
          switchWifi: [""],
          switchRf: [""],
          moduleIr: [""],
          homeCenter: [""],
          sensor: [""],
          isLoading: false
      }
  }

  handleFindUser = (phone) => {
    this.setState({
      isLoading: true
    });
    getUserByPhone(phone).then(response => {
      this.setState({
        user: response,
        isLoading: false
      });
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
    const AntPhoneForm = Form.create()(PhoneForm);
    const AntProductForm = Form.create()(ProductForm);
    const { user } = this.state;

    return (
      <div className="admin-user_shop">
        <h1>QUẢN LÝ MUA HÀNG</h1>
        <div className="admin-user_shop_content">
          <div style={{width: '40vw'}}>
            <AntPhoneForm findUser={this.handleFindUser} loading={this.state.isLoading}/>
            {user ? (
              <div className="admin-user_shop_user-info">
                <h2>Thông tin người dùng</h2>
                <p><b><i>Họ tên:</i></b>&emsp;{user.name}</p>
                <p><b><i>Số điện thoại:</i></b>&emsp;{user.phone}</p>
                <p><b><i>Email:</i></b>&emsp;{user.email}</p>
                <p><b><i>Quyền:</i></b>&emsp;{user.role}</p>
              </div>
            ) : null}
          </div>
          {user ? (<AntProductForm phone={user.phone} handleBack={this.props.handleBack}/>) : null}
        </div>
      </div>
    )
  }
}

class PhoneForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const request = Object.assign({}, values);
        this.props.findUser(request.phone)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <div style={{display: 'flex'}}>
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
          <Button style={{marginLeft: '1vw'}} type="primary" htmlType="submit" size="large"
                  loading={this.props.loading}>Tìm</Button>
        </div>
      </Form>
    );
  }
}

class ProductForm extends Component {
  constructor(props) {
      super(props);
      this.state = {
          products: [],
          switchWifi: [""],
          switchRf: [""],
          moduleIr: [""],
          homeCenter: [""],
          sensor: [""],
          isLoading: false
      }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ isLoading: true });
        const request = {
          userPhone: this.props.phone,
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
        updateProductWithUser(request).then(response => {
          notification.success({
            message: 'Chika Smarthome',
            description: 'Thiết bị đã được cập nhật với id người dùng!'
          });
          this.setState({ isLoading: false });
          this.props.handleBack();
        }).catch(error => {
          this.setState({ isLoading: false });
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
    const { products, switchWifi, switchRf, moduleIr, homeCenter, sensor, isLoading } = this.state;
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
      <div className="admin-user_shop_product">
        <h2>Sản phẩm cần cập nhật</h2>
        <Checkbox.Group options={options}
                        onChange={(values) => { this.setState({ products: values }) }}/>
                      <Form onSubmit={this.handleSubmit} autoComplete='Off'>
          {products.includes(SWITCH_WIFI) ? (
            <div className="admin-user_shop_product_type">
              <p>Công tắc Wifi</p>
              {switchWifis}
              <Button type="dashed" onClick={() => this.handleAddProduct(SWITCH_WIFI)}><Icon type="plus" />Thêm</Button>
            </div>
          ) : null}

          {products.includes(SWITCH_RF) ? (
            <div className="admin-user_shop_product_type">
              <p>Công tắc Rf</p>
              {switchRfs}
              <Button type="dashed" onClick={() => this.handleAddProduct(SWITCH_RF)}><Icon type="plus" />Thêm</Button>
            </div>
          ) : null}

          {products.includes(MODULE_IR) ? (
            <div className="admin-user_shop_product_type">
              <p>Điều khiển hồng ngoại</p>
              {moduleIrs}
              <Button type="dashed" onClick={() => this.handleAddProduct(MODULE_IR)}><Icon type="plus" />Thêm</Button>
            </div>
          ) : null}

          {products.includes(HOME_CENTER) ? (
            <div className="admin-user_shop_product_type">
              <p>Bộ điều khiển trung tâm</p>
              {homeCenters}
              <Button type="dashed" onClick={() => this.handleAddProduct(HOME_CENTER)}><Icon type="plus" />Thêm</Button>
            </div>
          ) : null}

          {products.includes(SENSOR) ? (
            <div className="admin-user_shop_product_type">
              <p>Cảm biến</p>
              {sensors}
              <Button type="dashed" onClick={() => this.handleAddProduct(SENSOR)}><Icon type="plus" />Thêm</Button>
            </div>
          ) : null}

          <Button style={{margin: '1vw 0 0 1vw', width: '40%'}} type="primary" htmlType="submit" size="large"
                  loading={isLoading}>Cập nhật</Button>
        </Form>
      </div>
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
