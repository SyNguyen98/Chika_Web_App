import React, {Component, Fragment} from 'react';
import {Button, Col, Form, Icon, Input, Menu, Row, Timeline} from 'antd';
import moment from 'moment';

import './device-detail.css'

import {getDeviceHistories, updateDevice} from "../../../../../../services/DeviceService";

import {DEVICE_NAME} from "../../../../../../constant/name";
import {DEVICE_IMG_URI} from "../../../../../../constant/uri";
import {IconModal} from "../../../../../../components/modal";
import {ErrorNotification, SuccessNotification} from "../../../../../../components/notification";

export default class DeviceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceHistories: [],
            menuKey: "1"
        }
    }

    loadHistories = (deviceId) => {
        getDeviceHistories(deviceId).then(deviceHistories => {
            console.log(deviceHistories)
            this.setState({deviceHistories})
        }).catch(error => {
            ErrorNotification(error.message || "Tải danh sách thất bại");
        })
    }

    onSelectMenu = (key) => {
        console.log(key);
        this.setState({menuKey: key});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.device !== prevProps.device) {
            this.loadHistories(this.props.device.id)
        }
    }

    componentDidMount() {
        this.loadHistories(this.props.device.id)
    }

    render() {
        const {device, handleCancelModal, loadDevices} = this.props;
        const {deviceHistories, menuKey} = this.state;
        const AntUpdateDeviceForm = Form.create()(UpdateDeviceForm);
        let component;
        switch (menuKey) {
            case "1":
                component =
                    <div className="device-detail__info">
                        <p><b>Ngày tạo: </b> {moment(device.createdAt).format("DD/MM/YYYY")}</p>
                        <p><b>Công suất tiêu thụ: </b> 15kWh</p>
                        <p>Thuộc bộ Công tắc {device.type.includes("SW") ? "Wifi" : "RF"}</p>
                    </div>
                break;
            case "2":
                component =
                    <AntUpdateDeviceForm device={device} handleCancelModal={handleCancelModal}
                                         loadDevices={loadDevices}/>
                break;
            case "3":
                component =
                    <Timeline className="device-detail__timeline">
                        {deviceHistories.map((item, i) => (
                            <Timeline.Item key={i} color={item.state ? "green" : "red"}>
                                {item.state ? "Bật" : "Tắt"} lúc {item.time}
                            </Timeline.Item>
                        ))}
                    </Timeline>
                break;
            default:
                break;
        }
        return (
            <Row>
                <Col span={10}>
                    <Menu defaultSelectedKeys={["1"]} mode="inline" onClick={(item) => this.onSelectMenu(item.key)}>
                        <Menu.Item key="1">
                            <Icon type="info-circle" />
                            <span>Thông Tin</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="form" />
                            <span>Chỉnh Sửa</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="unordered-list" />
                            <span>Lịch Sử</span>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={14}>
                    {component}
                </Col>
            </Row>
        )
    }
}

class UpdateDeviceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoModal: false
        }
    }

    handleChangeLogoName = (logoName) => {
        this.props.form.setFieldsValue({logo: logoName});
        this.handleCancelModal();
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
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const {logoModal} = this.state;
        return (
            <Fragment>
                <Form autoComplete='off' className="device-detail__form">
                    {this.props.device.type.includes("SS") ? null : (
                        <Form.Item>
                            {getFieldDecorator('logo', {
                                initialValue: this.props.device.logo,
                            })(
                                <Input type='hidden'/>
                            )}
                            <img alt={getFieldValue("logo")} src={`${DEVICE_IMG_URI}${getFieldValue("logo")}-icon.png`}
                                 onClick={this.handleShowModal}/>
                        </Form.Item>
                    )}
                    <Form.Item>
                        {getFieldDecorator('name', {
                            initialValue: this.props.device.name,
                            rules: [{required: true, message: 'Vui lòng nhập tên thiết bị!'}]
                        })(
                            <Input size="default"
                                   prefix={<Icon type="form"/>}
                                   placeholder="Vd: Đèn trần, Quạt Trần"/>
                        )}
                    </Form.Item>
                    <Button type="primary" size="default" onClick={this.handleSubmitUpdateDevice}>Cập Nhật</Button>
                </Form>

                <IconModal visible={logoModal} logoName={DEVICE_NAME} imgUri={DEVICE_IMG_URI}
                           handleCancelModal={this.handleCancelModal}
                           handleChangeLogo={this.handleChangeLogoName}/>
            </Fragment>
        )
    }
}
