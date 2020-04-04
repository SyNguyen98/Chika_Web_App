import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Button, Modal, notification } from 'antd';

import '../../../styles/admin/user/admin-user-list.component.css';
import { getProductByUserForAdmin } from '../../../service/product.service';
import { getAllUser } from '../../../service/user.service';
import TableComponent from '../table.component';

class UserListComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        userList: [],
        userInfo: null,
      }
  }

  hanleShowModal = (phone) => {
    this.setState({ 
      userInfo: this.state.userList.find(user => user.phone === phone)
    });
  };

  handleCancelModal = () => {
    this.setState({ userInfo: null });
  }

  loadAllUser = () => {
    getAllUser().then(response => {
      this.setState({ userList: response });
      console.log(response);
    }).catch(error => {
      notification.error({
        message: 'Chika Smarthome',
        description: error.message || "Tải danh sách người dùng thất bại!"
      });
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadAllUser();
  }

  render() {
    const { userList, userInfo } = this.state;
    const columns = [
      {
        title: 'Họ Tên',
        key: 'name',
        render: (text, row) => <a onClick={() => this.hanleShowModal(row.phone)}>{text}</a>,
      },
      {
        title: 'Ngày Sinh',
        key: 'birthday',
      },
      {
        title: 'Số Điện Thoại',
        key: 'phone',
      },
      {
        title: 'Email',
        key: 'email',
      },
    ];
    return(
      <div className="admin-user__list">
        <h1>DANH SÁCH NGƯỜI DÙNG</h1>
        {userList ? (
          <TableComponent list={userList} columns={columns}/>
        ) : null}

        {userInfo ? (
          <Modal visible={true} closable={false}
                title="Thông tin cá nhân"
                centered
                width='50vw'
                onCancel={this.handleCancelModal}
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

export default withRouter(UserListComponent);

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
      <div className="admin-user__info">
        <div style={{ textAlign: 'center' }}>
          <img className="admin-user__info__avatar" alt='avatar' src={userInfo.avatar !== '' ? userInfo.avatar : '/image/avatar.png'}></img>
          <p className="admin-user__info__name">{userInfo.name}</p>
        </div>

        <h1 className="admin-user__info__title">Thông tin cá nhân</h1>
        <div className="admin-user__info__content">
          <div className="admin-user__info__content__topic">
            <p>Ngày sinh</p>
            <p>Địa chỉ</p>
          </div>
          <div className="admin-user__info__content__content">
            <p>{userInfo.birthday}</p>
            <p>{userInfo.address}</p>
          </div>
        </div>

        <h1 className="admin-user__info__title">Thông tin liên hệ</h1>
        <div className="admin-user__info__content">
          <div className="admin-user__info__content__topic">
            <p>Email</p>
            <p>Số điện thoại</p>
          </div>
          <div className="admin-user__info__content__content">
            <p>{userInfo.email}</p>
            <p>{userInfo.phone}</p>
          </div>
        </div>

        <h1 className="admin-user__info__title">Thông tin về Chika</h1>
        <div className="admin-user__info__content">
          <div className="admin-user__info__content__topic">
            <p>Ngày gia nhập</p>
            <p>Sản phẩm đang sở hữu:</p>
          </div>
          <div className="admin-user__info__content__content">
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
            <h1 className="admin-user__info__title">Sản phẩm</h1>
            <div className="admin-user__info__content">
              <div className="admin-user__info_content__topic" style={{width: '15vw'}}>
                {switchWifi ? (<p>&bull; {switchWifi.name}</p>) : null}
                {switchRf ? (<p>&bull; {switchRf.name}</p>) : null}
                {moduleIr ? (<p>&bull; {moduleIr.name}</p>) : null}
                {homeCenter ? (<p>&bull; {homeCenter.name}</p>) : null}
                {sensor ? (<p>&bull; {sensor.name}</p>) : null}
              </div>
              <div className="admin-user__info_content__content">
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