import React, {Component, Fragment} from 'react';
import {Icon, Tabs} from 'antd';

import {updateUserInfo} from '../../../services/UserService';
import {getAllNumberOfProductByUserId} from '../../../services/ProductService';
import {ErrorNotification, SuccessNotification} from "../../../components/notification";
import ChangeInfoComponent from './change-info';
import UserProductModal from "./device-modal";

import './personal-info.scss';

const {TabPane} = Tabs;

export default class UserPersonalComponent extends Component {
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
        this.setState({isLoading: true});
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
        }).catch(error => {
            this.setState({isLoading: false});
            ErrorNotification(error.message || "Tải dữ liệu thất bại!")
        });
    };

    updateUserInfo = (request) => {
        this.setState({isLoading: true});
        updateUserInfo(request).then(response => {
            this.setState({
                userInfo: response,
                isLoading: false
            });
            SuccessNotification("Thông tin đã được cập nhật.");
            this.forceUpdate();
        }).catch(error => {
            this.setState({isLoading: false});
            let message;
            if (error.message.includes('Phone')) {
                message = 'Số điện thoại đã được sử dụng';
            } else if (error.message.includes('Email')) {
                message = 'Email đã được sử dụng';
            }
            ErrorNotification(message || "Đã có lỗi xảy ra. Vui lòng thử lại sau!")
        });
    };

    handleModal = () => {
        this.setState({productModalVisible: !this.state.productModalVisible});
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        this.loadProductNum();
    }

    render() {
        const {currentUser} = this.props;
        const {productNum, productModalVisible} = this.state;
        const numOfProduct = productNum.switchWifi + productNum.switchRf + productNum.moduleIr + productNum.homeCenter + productNum.sensor;
        return (
            <Fragment>
                <div className="user-info">
                    {currentUser ? (
                        <div className="container">
                            <div className="info-col1">
                                <img alt="avatar" src={currentUser.avatar}/>
                                <h1>{currentUser.name}</h1>
                                <p><Icon type="code"/>&ensp;{currentUser.role}</p>
                            </div>
                            <div className="info-col2">
                                <Tabs defaultActiveKey="1" onChange={this.callback}>
                                    <TabPane tab="Hồ Sơ" key="1">
                                        <h1><Icon type="idcard"/>&emsp;Thông tin cá nhân</h1>
                                        <p><Icon type="mobile"/>&emsp;&emsp;{currentUser.phone}</p>
                                        <p><Icon type="mail"/>&emsp;&emsp;{currentUser.email}</p>
                                        <p><Icon type="calendar"/>&emsp;&emsp;{currentUser.birthday}</p>
                                        <p><Icon type="home"/>&emsp;&emsp;{currentUser.address}</p>

                                        <h1><Icon type="solution"/>&emsp;Thông tin Chika</h1>
                                        <p><Icon type="contacts"/>&emsp;&emsp;Ngày gia nhập:&emsp;&emsp;
                                            <i>{currentUser.createAt}</i></p>
                                        <p>
                                            <Icon type="appstore"/>&emsp;&emsp;Số sản phẩm:&emsp;&emsp;&ensp;{numOfProduct}&emsp;&emsp;
                                            <Icon type="info-circle" style={{cursor: 'pointer'}}
                                                  onClick={this.handleModal}/>
                                        </p>
                                    </TabPane>
                                    <TabPane tab="Chỉnh Sửa" key="2">
                                        <ChangeInfoComponent userInfo={currentUser}
                                                             updateUserInfo={this.updateUserInfo}/>
                                    </TabPane>
                                </Tabs>
                            </div>
                            <div className="corner1"/>
                            <div className="corner2"/>
                        </div>
                    ) : null}
                </div>

                <UserProductModal productNum={productNum} productModalVisible={productModalVisible}
                                  handleModal={this.handleModal}/>
            </Fragment>
        )
    }
}