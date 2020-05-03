import React, {Component} from 'react';
import {Icon, Button, Modal, notification} from 'antd';

import './user-list.css';

import {getAllNumberOfProductByUserId} from '../../../../services/ProductService';
import {getAllUser} from '../../../../services/UserService';
import TableComponent from '../../table';

export default class UserListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            userInfo: null,
        }
    }

    handleShowModal = (phone) => {
        this.setState({
            userInfo: this.state.userList.find(user => user.phone === phone)
        });
    };

    handleCancelModal = () => {
        this.setState({userInfo: null});
    }

    loadAllUser = () => {
        getAllUser().then(response => {
            this.setState({userList: response});
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
        const {userList, userInfo} = this.state;
        const columns = [
            {
                title: 'Họ Tên',
                key: 'name',
                render: (text, row) => <a onClick={() => this.handleShowModal(row.phone)}>{text}</a>,
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
        return (
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

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsComponent: false,
            productNum: {
                switchWifi: 0,
                switchRf: 0,
                moduleIr: 0,
                homeCenter: 0,
                sensor: 0
            }
        }
    }

    loadProductNum = (userId) => {
        this.setState({isLoading: true});
        getAllNumberOfProductByUserId(userId).then(response => {
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
            console.log(this.state.products);
        }).catch(error => {
            this.setState({isLoading: false});
            notification.error({
                message: 'Chika Smarthome',
                description: error.message || "Tải dữ liệu thất bại!"
            });
        });
    }

    handleShowProduct = (bool) => {
        this.setState({productsComponent: bool});
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.loadProductNum(this.props.userInfo.id);
    }

    render() {
        const {userInfo} = this.props;
        const {productsComponent, productNum} = this.state;
        const numOfProduct = productNum.switchWifi + productNum.switchRf + productNum.moduleIr + productNum.homeCenter + productNum.sensor;
        return (
            <div className="admin-user__info">
                <div style={{textAlign: 'center'}}>
                    <img className="admin-user__info__avatar" alt='avatar'
                         src={userInfo.avatar !== '' ? userInfo.avatar : '/image/avatar.png'}/>
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
                        <p>{numOfProduct} &emsp;
                            {productsComponent ? (
                                <Icon type="up" style={{cursor: 'pointer'}}
                                      onClick={() => this.handleShowProduct(false)}/>
                            ) : (
                                <Icon type="down" style={{cursor: 'pointer'}}
                                      onClick={() => this.handleShowProduct(true)}/>
                            )}</p>
                    </div>
                </div>

                {productsComponent ? (
                    <div>
                        <h1 className="admin-user__info__title">Sản phẩm</h1>
                        <div className="admin-user__info__content">
                            <div className="admin-user__info_content__topic" style={{width: '15vw'}}>
                                {productNum.switchWifi !== 0 ? (<p>&bull; Công tắc Wifi</p>) : null}
                                {productNum.switchRf !== 0 ? (<p>&bull; Công tắc Rf</p>) : null}
                                {productNum.moduleIr !== 0 ? (<p>&bull; Điều khiển hồng ngoại</p>) : null}
                                {productNum.homeCenter !== 0 ? (<p>&bull; Điều khiển trung tâm</p>) : null}
                                {productNum.sensor !== 0 ? (<p>&bull; Cảm biến</p>) : null}
                            </div>
                            <div className="admin-user__info_content__content">
                                {productNum.switchWifi !== 0 ? (<p>{productNum.switchWifi} sản phẩm</p>) : null}
                                {productNum.switchRf !== 0 ? (<p>{productNum.switchRf} sản phẩm</p>) : null}
                                {productNum.moduleIr !== 0 ? (<p>{productNum.moduleIr} sản phẩm</p>) : null}
                                {productNum.homeCenter !== 0 ? (<p>{productNum.homeCenter} sản phẩm</p>) : null}
                                {productNum.sensor !== 0 ? (<p>{productNum.sensor} sản phẩm</p>) : null}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }
}