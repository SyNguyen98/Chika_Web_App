import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, Row, Tabs, Timeline} from 'antd';
import moment from 'moment';

import './device-detail.css'

import {getDeviceHistories, updateDevice} from "../../../../../../services/DeviceService";

import {DEVICE_NAME} from "../../../../../../constant/name";
import {DEVICE_IMG_URI} from "../../../../../../constant/uri";
import {IconModal} from "../../../../../../components/modal";
import {ErrorNotification, SuccessNotification} from "../../../../../../components/notification";

const {TabPane} = Tabs;

export default class DeviceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceHistories: []
        }
    }

    loadHistories = (deviceId) => {
        getDeviceHistories(deviceId).then(deviceHistories => {
            this.setState({deviceHistories})
        }).catch(error => {
            ErrorNotification(error.message || "Tải danh sách thất bại");
        })
    }

    componentDidMount() {
        this.loadHistories(this.props.device.id)
    }

    render() {
        const {device, handleCancelModal, loadDevices} = this.props;
        const {deviceHistories} = this.state;
        const AntUpdateDeviceForm = Form.create()(UpdateDeviceForm);
        return (
            <Tabs defaultActiveKey={"1"} onChange={this.callback}>
                <TabPane tab="Lịch Sử Thiết Bị" key="1">
                    <Row>
                        <Col span={12}>
                            <Timeline className="device-info-modal__timeline">
                                {deviceHistories.map((item, i) => (
                                    <Timeline.Item key={i} color={item.state ? "green" : "red"}>
                                        {item.state ? "Bật" : "Tắt"} lúc {item.time}
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                        </Col>
                        <Col span={12}>
                            <div className="device-info-modal__detail">
                                <img alt={`${device.logo}-icon`} src={`${DEVICE_IMG_URI}${device.logo}-icon.png`}/>
                                <p><b>Ngày tạo: </b> {moment(device.createdAt).format("DD/MM/YYYY")}</p>
                                <p><b>Công suất tiêu thụ: </b> 15kWh</p>
                                <p>Thuộc bộ Công tắc {device.type.includes("SW") ? "Wifi" : "RF"}</p>
                                <Button type="primary">Xuất File</Button>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="Chỉnh Sửa" key="2">
                    <AntUpdateDeviceForm device={device} handleCancelModal={handleCancelModal}
                                         loadDevices={loadDevices}/>
                </TabPane>
            </Tabs>
        )
    }
}

class UpdateDeviceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoModal: false,
            logoName: this.props.device.logo
        }
    }

    handleChangeLogoName = (logoName) => {
        this.setState({
            logoName, logoModal: false
        });
    }

    handleSubmitUpdateDevice = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const request = Object.assign({}, values);
                request.id = this.props.device.id;
                updateDevice(request).then(() => {
                    this.props.handleCancelModal();
                    this.props.loadDevices(this.props.device.roomId);
                    SuccessNotification("Sửa phòng thành công.");
                }).catch(error => {
                    ErrorNotification(error.message || "Sửa phòng thất bại")
                })
            }
        });
    }

    handleShowModal = () => {
        this.setState({logoModal: true});
    };

    handleCancelModal = () => {
        this.setState({logoModal: false});
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {logoModal, logoName} = this.state;
        return (
            <div>
                <Form autoComplete='off'>
                    {this.props.device.type.includes("SS") ? null : (
                        <Form.Item label='Logo'>
                            {getFieldDecorator('logo', {
                                initialValue: logoName,
                            })(
                                <Input type='hidden'/>
                            )}
                            <img alt={logoName} src={`${DEVICE_IMG_URI}${logoName}-icon.png`} onClick={this.handleShowModal}
                                 style={{width: '5vw', marginRight: '2vw'}}/>
                            <Button type='dashed' >
                                Chọn Logo
                            </Button>
                        </Form.Item>
                    )}
                    <Form.Item label='Tên thiết bị'>
                        {getFieldDecorator('name', {
                            initialValue: this.props.device.name,
                            rules: [{required: true, message: 'Vui lòng nhập tên phòng!'}]
                        })(
                            <Input size="large"
                                   prefix={<Icon type="form"/>}
                                   placeholder="Tên phòng"/>
                        )}
                    </Form.Item>
                    <Button type="primary" size="large" onClick={this.handleSubmitUpdateDevice}>Cập Nhật</Button>
                </Form>

                <IconModal visible={logoModal} logoName={DEVICE_NAME} imgUri={DEVICE_IMG_URI}
                           handleCancelModal={this.handleCancelModal}
                           handleChangeLogo={this.handleChangeLogoName}/>
            </div>
        )
    }
}
