import React, { Component, Fragment } from 'react';
import {Modal, Button, Timeline, Row, Col, Tabs, notification, Form, Input, Icon} from 'antd';
import moment from 'moment';
import './device-modal.component.css'
import {updateDevice} from "../../../service/device.service";

const { confirm } = Modal;
const { TabPane } = Tabs;
const imgDeviceUri = "/image/user/device/";
const deviceName = [
    "light", "chandelier", "lamp", "air-conditioner", "fan", "television", "curtain", "speaker"
];

export default class DeviceModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    showConfirm = (handleDeleteDevice, deviceId) => {
        confirm({
            title: 'Bạn thật sự muốn xóa thiết bị này?',
            centered: true,
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                handleDeleteDevice(deviceId);
            },
        });
    }

    render() {
        const { device, visible, handleCancelModal, handleDeleteDevice, loadDevices } = this.props;
        const AntUpdateDeviceForm = Form.create()(UpdateDeviceForm);
        let detailComponent;
        if (device.type.includes("SW") || device.type.includes("SR")) {
            detailComponent = (<SwitchDetail device={device}/>)
        } else {
            switch (device.type) {
                case "SS01":
                    detailComponent = (<DoorSensorDetail device={device}/>);
                    break;
                case "SS03":
                    detailComponent = (<AirSensorDetail device={device}/>);
                    break;
                default:
                    break;
            }
        }

        return (
            <Modal className="device-info-modal"
                    visible={visible} closable={false}
                    title="CHI TIẾT THIẾT BỊ"
                    centered
                    width='50vw'
                    onCancel={handleCancelModal}
                    footer={(
                        <Fragment>
                            <Button type="danger" onClick={() => this.showConfirm(handleDeleteDevice, device.id)}>Xóa Thiết Bị</Button>
                            <Button onClick={handleCancelModal}>Quay Về</Button>
                        </Fragment>
                    )}>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="Lịch Sử Thiết Bị" key="1">
                        {detailComponent}
                    </TabPane>
                    <TabPane tab="Chỉnh Sửa" key="2">
                        <AntUpdateDeviceForm device={device} handleCancelModal={handleCancelModal} loadDevices={loadDevices}/>
                    </TabPane>
                </Tabs>
            </Modal>
        )
    }
}

class SwitchDetail extends Component {

    render() {
        const { device } = this.props;
        return (
            <Row>
                <Col span={12}>
                    <Timeline className="device-info-modal__timeline">
                        <Timeline.Item color="green">Bật lúc 20:31 23/04/2020</Timeline.Item>
                        <Timeline.Item color="red">Tắt lúc 20:00 23/04/2020</Timeline.Item>
                        <Timeline.Item color="green">Bật lúc 19:04 23/04/2020</Timeline.Item>
                        <Timeline.Item color="red">Tắt lúc 16:30 23/04/2020</Timeline.Item>
                        <Timeline.Item color="green">Bật lúc 12:53 23/04/2020</Timeline.Item>
                        <Timeline.Item color="red">Tắt lúc 8:24 23/04/2020</Timeline.Item>
                    </Timeline>
                </Col>
                <Col span={12}>
                    <div className="device-info-modal__detail">
                        <img alt={`${device.logo}-icon`} src={`${imgDeviceUri}${device.logo}-icon.png`}/>
                        <text>{device.name}</text>
                        <p><b>Ngày tạo: </b> {moment(device.createdAt).format("DD/MM/YYYY")}</p>
                        <p><b>Công suất tiêu thụ: </b> 15kWh</p>
                        <p>Thuộc bộ Công tắc {device.type.includes("SW") ? "Wifi" : "RF"}</p>
                        <Button type="primary">Xuất File</Button>
                    </div>
                </Col>
            </Row>
        );
    }
}

class DoorSensorDetail extends Component {

    render() {
        const { device } = this.props;
        return (
            <Row>
                <Col span={12}>
                    <Timeline className="device-info-modal__timeline">
                        <Timeline.Item color="green">Đóng lúc 20:31 23/04/2020</Timeline.Item>
                        <Timeline.Item color="red">Mở lúc 20:00 23/04/2020</Timeline.Item>
                        <Timeline.Item color="green">Đóng lúc 19:04 23/04/2020</Timeline.Item>
                        <Timeline.Item color="red">Mở lúc 16:30 23/04/2020</Timeline.Item>
                        <Timeline.Item color="green">Đóng lúc 12:53 23/04/2020</Timeline.Item>
                        <Timeline.Item color="red">Mở lúc 8:24 23/04/2020</Timeline.Item>
                    </Timeline>
                </Col>
                <Col span={12}>
                    <div className="device-info-modal__detail">
                        <img alt={`${device.logo}-icon`} src={`${imgDeviceUri}door-close-icon.png`} style={{width: '10vw', height: '10vw'}}/>
                        <p><b>Ngày tạo: </b> {moment(device.createdAt).format("DD/MM/YYYY")}</p>
                        <Button type="primary">Xuất File</Button>
                    </div>
                </Col>
            </Row>
        );
    }
}

class AirSensorDetail extends Component {

    render() {
        const { device } = this.props;
        return (
            <Row>
                <Col span={12}>
                    <Timeline className="device-info-modal__timeline">
                        <Timeline.Item color="green">1.7 lúc 20:30 23/04/2020</Timeline.Item>
                        <Timeline.Item color="red">1.6 lúc 20:00 23/04/2020</Timeline.Item>
                        <Timeline.Item color="green">1.7 lúc 19:30 23/04/2020</Timeline.Item>
                        <Timeline.Item color="red">1.5 lúc 19:00 23/04/2020</Timeline.Item>
                        <Timeline.Item color="green">1.5 lúc 18:30 23/04/2020</Timeline.Item>
                        <Timeline.Item color="red">1.6 lúc 18:00 23/04/2020</Timeline.Item>
                    </Timeline>
                </Col>
                <Col span={12}>
                    <div className="device-info-modal__detail">
                        <img alt={`${device.logo}-icon`} src={`${imgDeviceUri}air-icon.png`} style={{width: '10vw', height: '10vw'}}/>
                        <p><b>Ngày tạo: </b> {moment(device.createdAt).format("DD/MM/YYYY")}</p>
                        <Button type="primary">Xuất File</Button>
                    </div>
                </Col>
            </Row>
        );
    }
}

class UpdateDeviceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoModalVisible: false,
            logoName: this.props.device.logo
        }
    }

    handleChangeLogoName = (logoName) => {
        this.setState({
            logoName, logoModalVisible: false
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
                    notification.success({
                        message: 'Chika Smarthome',
                        description: "Sửa phòng thành công."
                    })
                }).catch(error => {
                    notification.error({
                        message: 'Chika Smarthome',
                        description: "Sửa phòng thất bại" || error.message
                    })
                })
            }
        });
    }

    handleShowModal = () => {
        this.setState({ logoModalVisible: true });
    };

    handleCancelModal = () => {
        this.setState({ logoModalVisible: false });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { logoModalVisible, logoName } = this.state;
        return(
            <div>
                <Form autoComplete='off'>
                    {this.props.device.type.includes("SS") ? null : (
                        <Form.Item label='Logo'>
                            {getFieldDecorator('logo', {
                                initialValue: logoName,
                            })(
                                <Input type='hidden' />
                            )}
                            <img alt={logoName} src={`${imgDeviceUri}${logoName}-icon.png`} style={{width: '5vw', marginRight: '2vw'}}/>
                            <Button type='dashed' onClick={this.handleShowModal}>
                                Chọn Logo
                            </Button>
                        </Form.Item>
                    )}
                    <Form.Item label='Tên phòng'>
                        {getFieldDecorator('name', {
                            initialValue: this.props.device.name,
                            rules: [{ required: true, message: 'Vui lòng nhập tên phòng!' }]
                        })(
                            <Input  size="large"
                                    prefix={<Icon type="form" />}
                                    placeholder="Tên phòng"/>
                        )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" size="large" onClick={this.handleSubmitUpdateDevice}>Cập Nhật</Button>
                </Form>

                <Modal visible={logoModalVisible} closable={false}
                       title="LOGO"
                       centered
                       width='35vw'
                       footer={(
                           <Button type="primary" onClick={this.handleCancelModal}>
                               Quay về
                           </Button>
                       )}>
                    <Row gutter={[18,24]}>
                        {deviceName.map((item, i) => {
                            return (
                                <Col key={i} span={6} onClick={() => this.handleChangeLogoName(item)}>
                                    <img className="modal__room-icon" alt={`${imgDeviceUri}${item}-icon`} src={`${imgDeviceUri}${item}-icon.png`}/>
                                </Col>
                            )
                        })}
                    </Row>
                </Modal>
            </div>
        )
    }
}
