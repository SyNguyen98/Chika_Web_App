import React, {Component} from "react";
import {Button, Col, Modal, Row} from "antd";
import {ADMIN_PRODUCT_IMG_URI} from "../../../../constant/uri";

import './product-modal.scss';

export default class UserProductModal extends Component {

    render() {
        const {productNum, productModalVisible} = this.props;
        const products = [];
        if (productNum.switchWifi !== 0) {
            products.push(
                <Col span={6}>
                    <img alt="cong tac wifi" src={`${ADMIN_PRODUCT_IMG_URI}switch-wifi.png`}/>
                    <p>Số lượng: {productNum.switchWifi}</p>
                </Col>
            )
        }
        if (productNum.switchRf !== 0) {
            products.push(
                <Col span={6}>
                    <img alt="cong tac rf" src={`${ADMIN_PRODUCT_IMG_URI}switch-rf.png`}/>
                    <p>Số lượng: {productNum.switchRf}</p>
                </Col>
            )
        }
        if (productNum.moduleIr !== 0) {
            products.push(
                <Col span={6}>
                    <img alt="dieu khien hong ngoai" src={`${ADMIN_PRODUCT_IMG_URI}module-ir.png`}/>
                    <p>Số lượng: {productNum.moduleIr}</p>
                </Col>
            )
        }
        if (productNum.homeCenter !== 0) {
            products.push(
                <Col span={6}>
                    <img alt="dieu khien trung tam" src={`${ADMIN_PRODUCT_IMG_URI}home-central.png`}/>
                    <p>Số lượng: {productNum.homeCenter}</p>
                </Col>
            )
        }
        if (productNum.sensor !== 0) {
            products.push(
                <Col span={6}>
                    <img alt="cam bien" src={`${ADMIN_PRODUCT_IMG_URI}sensor.png`}/>
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
                <Row className="user-info__product">
                    {products}
                </Row>
            </Modal>
        )
    }
}