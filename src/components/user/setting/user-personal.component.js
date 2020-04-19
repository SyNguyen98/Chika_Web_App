import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Icon, Tabs, notification, Modal, Row, Col } from 'antd';

import '../../../styles/user/user-personal.component.css';
import { updateUserInfo } from '../../../service/user.service';
import { getAllNumberOfProductByUserId } from '../../../service/product.service';
import ChangeInfoComponent from './change-info.component';

const { TabPane } = Tabs;

class UserPersonalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productNum: {
        switchWifi: 0,
        switchRf: 0,
        moduleIr: 0,
        homeCenter: 0,
        sensor: 0
      },
      isLoading: false,
      productModalVisible: false
    }
  }

  loadProductNum = () => {
    this.setState({ isLoading: true });
    getAllNumberOfProductByUserId(this.props.currentUser.id).then(response => {
      this.setState({
        productNum: {
          switchWifi: response.switchWifi,
          switchRf: response.switchRf,
          moduleIr: response.moduleIr,
          homeCenter: response.homeCenter,
          sensor: response.sensor
        },
        isLoading: false
      });
      this.forceUpdate();
      console.log(this.state.productNum);
    }).catch(error => {
      this.setState({ isLoading: false });
      notification.error({
        message: 'Chika Smarthome',
        description: error.message || "Tải dữ liệu thất bại!"
      });
    });
  };

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
  };

  handleModal = () => {
    this.setState({ productModalVisible: !this.state.productModalVisible });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadProductNum();
  }

  render() {
    const { currentUser } = this.props;
    const { productNum, productModalVisible } = this.state;
    const numOfProduct = productNum.switchWifi + productNum.switchRf + productNum.moduleIr + productNum.homeCenter + productNum.sensor;
    return (
      <Fragment>
        <div className="user-info">
          {currentUser ? (
            <div className="user-info__float">
              <div className="user-info__col1">
                <img alt="avatar" src={currentUser.avatar}/>
                <h1>{currentUser.name}</h1>
                <p><Icon type="code" />&ensp;{currentUser.role}</p>
              </div>
              <div className="user-info__col2">
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                  <TabPane tab="Hồ Sơ" key="1">
                    <h1><Icon type="idcard" />&emsp;Thông tin cá nhân</h1>
                    <p><Icon type="mobile" />&emsp;&emsp;{currentUser.phone}</p>
                    <p><Icon type="mail" />&emsp;&emsp;{currentUser.email}</p>
                    <p><Icon type="calendar" />&emsp;&emsp;{currentUser.birthday}</p>
                    <p><Icon type="home" />&emsp;&emsp;{currentUser.address}</p>
                  
                    <h1><Icon type="solution" />&emsp;Thông tin Chika</h1>
                    <p><Icon type="contacts" />&emsp;&emsp;Ngày gia nhập:&emsp;&emsp;<i>{currentUser.createAt}</i></p>
                    <p>
                      <Icon type="appstore" />&emsp;&emsp;Số sản phẩm:&emsp;&emsp;&ensp;{numOfProduct}&emsp;&emsp;
                      <Icon type="info-circle" style={{cursor: 'pointer'}} onClick={this.handleModal}/>
                    </p> 
                  </TabPane>
                  <TabPane tab="Chỉnh Sửa" key="2">
                    <ChangeInfoComponent userInfo={currentUser} updateUserInfo={this.updateUserInfo}/>
                  </TabPane>
                </Tabs>
              </div>
              <div className="user-info__corner1"></div>
              <div className="user-info__corner2"></div>
            </div>
          ) : null}

          <ProductModal productNum={productNum} 
                        productModalVisible={productModalVisible} 
                        handleModal={this.handleModal}/>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(UserPersonalComponent);

class ProductModal extends Component {

  render() {
    const { productNum, productModalVisible } = this.props;
    const products = [];
    if (productNum.switchWifi !== 0) {
      products.push(
        <Col span={6}>
          <img alt="cong tac wifi" src="/image/admin/product/switch-wifi.png"/>
          <p>Số lượng: {productNum.switchWifi}</p>
        </Col>
      )
    }
    if (productNum.switchRf !== 0) {
      products.push(
        <Col span={6}>
          <img alt="cong tac rf" src="/image/admin/product/switch-rf.png"/>
          <p>Số lượng: {productNum.switchRf}</p>
        </Col>
      )
    }
    if (productNum.moduleIr !== 0) {
      products.push(
        <Col span={6}>
          <img alt="dieu khien hong ngoai" src="/image/admin/product/module-ir.png"/>
          <p>Số lượng: {productNum.moduleIr}</p>
        </Col>
      )
    }
    if (productNum.homeCenter !== 0) {
      products.push(
        <Col span={6}>
          <img alt="dieu khien trung tam" src="/image/admin/product/home-center.png"/>
          <p>Số lượng: {productNum.homeCenter}</p>
        </Col>
      )
    }
    if (productNum.sensor !== 0) {
      products.push(
        <Col span={6}>
          <img alt="cam bien" src="/image/admin/product/sensor.png"/>
          <p>Số lượng: {productNum.sensor}</p>
        </Col>
      )
    }
    
    return (
      <Modal visible={productModalVisible} closable={false}
            title="Sản Phẩm Sở Hữu"
            centered
            width='40vw'
            onCancel={this.props.handleModal}
            footer={(
              <Button type='primary' onClick={this.props.handleModal}>
                Quay về
              </Button>
            )}>
          <Row className="user-info__product-modal">
            {products}
          </Row>
      </Modal>
    )
  }
}
