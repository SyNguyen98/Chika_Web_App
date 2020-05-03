import React, {Component} from 'react';
import {Row, Col, notification} from 'antd';

import './product-management.css';
import {getAllNumberOfProduct} from '../../../services/ProductService';
import {
    ADMIN_HOME_CENTRAL_LINK,
    ADMIN_MODULE_IR_LINK, ADMIN_SENSOR_LINK,
    ADMIN_SWITCH_RF_LINK,
    ADMIN_SWITCH_WIFI_LINK
} from "../../../constant/link";
import {ADMIN_PRODUCT_IMG_URI} from "../../../constant/uri";

export default class ProductManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchWifiNum: 0,
            switchRfNum: 0,
            moduleIrNum: 0,
            homeCenterNum: 0,
            sensorNum: 0,
            isLoading: false
        }
    }

    loadNumOfProduct = () => {
        this.setState({isLoading: true});
        getAllNumberOfProduct().then(response => {
            this.setState({
                switchWifiNum: response.switchWifi,
                switchRfNum: response.switchRf,
                moduleIrNum: response.moduleIr,
                homeCenterNum: response.homeCenter,
                sensorNum: response.sensor,
                isLoading: false
            });
        }).catch(error => {
            this.setState({isLoading: false});
            notification.error({
                message: 'Chika Smarthome',
                description: error.message || "Đã có lỗi xảy ra. Vui lòng thử lại sau!",
            });
        });
    }

    handleChangeComponent = (link) => {
        this.props.history.push(link);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.loadNumOfProduct();
    }

    render() {
        const {switchWifiNum, switchRfNum, moduleIrNum, homeCenterNum, sensorNum} = this.state;
        return (
            <div className="admin-device">
                <Row className="admin-device__menu">
                    <Col className='admin-device__item' span={8}
                         onClick={() => this.handleChangeComponent(ADMIN_SWITCH_WIFI_LINK)}>
                        <img src={`${ADMIN_PRODUCT_IMG_URI}switch-wifi.png`} alt="switch-wifi"/>
                        <div className='admin-device__item__title'>
                            <h3>CÔNG TẮC<br/>WIFI</h3>
                            <p>{switchWifiNum} sản phẩm</p>
                        </div>
                    </Col>
                    <Col className='admin-device__item' span={8}
                         onClick={() => this.handleChangeComponent(ADMIN_SWITCH_RF_LINK)}>
                        <img src={`${ADMIN_PRODUCT_IMG_URI}switch-rf.png`} alt="switch-rf"/>
                        <div className='admin-device__item__title'>
                            <h3>CÔNG TẮC<br/>RF</h3>
                            <p>{switchRfNum} sản phẩm</p>
                        </div>
                    </Col>
                    <Col className='admin-device__item' span={8}
                         onClick={() => this.handleChangeComponent(ADMIN_MODULE_IR_LINK)}>
                        <img src={`${ADMIN_PRODUCT_IMG_URI}module-ir.png`} alt="module-ir"/>
                        <div className='admin-device__item__title'>
                            <h3>ĐIỀU KHIỂN<br/>HỒNG NGOẠI</h3>
                            <p>{moduleIrNum} sản phẩm</p>
                        </div>
                    </Col>
                    <Col className='admin-device__item' span={8}
                         onClick={() => this.handleChangeComponent(ADMIN_HOME_CENTRAL_LINK)}>
                        <img src={`${ADMIN_PRODUCT_IMG_URI}home-central.png`} alt="home-central"/>
                        <div className='admin-device__item__title'>
                            <h3>BỘ ĐIỀU KHIỂN<br/>TRUNG TÂM</h3>
                            <p>{homeCenterNum} sản phẩm</p>
                        </div>
                    </Col>
                    <Col className='admin-device__item' span={8}
                         onClick={() => this.handleChangeComponent(ADMIN_SENSOR_LINK)}>
                        <img src={`${ADMIN_PRODUCT_IMG_URI}sensor.png`} alt="sensor"/>
                        <div className='admin-device__item__title'>
                            <h3><br/>CẢM BIẾN</h3>
                            <p>{sensorNum} sản phẩm</p>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}