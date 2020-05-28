import React, {Component, Fragment} from "react";
import {Button, Icon, Modal, Tooltip} from "antd";
import DeviceDetail from "../device-detail";
import {getAllIrValueByDeviceAndProtocol} from "../../../../../../services/IRService";
import {ErrorNotification} from "../../../../../../components/notification";
import "./device-modal.css";
import {mqttPublish} from "../../../../../../services/MqttService";
import RemoteComponent from "../remote";

const {confirm} = Modal;

export default class DeviceModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            irValue: null,
            modalVisible: false
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

    sendIrValue = (name) => {
        const {irValue} = this.state;
        if (irValue) {
            let value = irValue.dataList.find(data => data.function === name);
            let data = {
                protocol: irValue.protocol,
                size: irValue.size,
            }
            if (irValue.device === "TV") {
                data.rawData = value.rawData;
            } else {
                data.binaryData = value.binaryData;
            }
            mqttPublish(this.props.device.topic + "/control", JSON.stringify(data));
        }
    }

    loadIrValues = (device, protocol) => {
        getAllIrValueByDeviceAndProtocol(device, protocol)
            .then(irValue => {
                console.log(irValue)
                this.setState({irValue})
            }).catch(error => {
            ErrorNotification(error.message || "Đã có lỗi xảy ra")
        })
    }

    handleStartLearning = () => {
        this.setState({modalVisible: true});
    }

    handleCancelLearning = () => {
        mqttPublish(`${this.props.device.topic}/learn`, "0");
        this.setState({modalVisible: false});
    }

    componentDidMount() {
        if (this.props.device.type.includes("IR")) {
            if (this.props.device.logo === "television") {
                this.loadIrValues("TV", "SONY");
            }

        }
    }

    render() {
        const {device, visible, handleCancelModal, handleDeleteDevice, loadDevices} = this.props;
        const {modalVisible} = this.state;
        let component;
        if (device.type.includes("IR")) {
            component = {
                header:
                    <div className="remote__header">
                        <Tooltip placement="bottom" title="Thêm Nút">
                            <Button className="remote__header__add" onClick={this.handleStartLearning}>
                                <Icon type="plus"/>
                            </Button>
                        </Tooltip>
                        <b>{device.name}</b>
                        <Button className="remote__header__power" onClick={() => this.sendIrValue("POWER")}>
                            <Icon type="poweroff"/>
                        </Button>
                    </div>,
                body: <RemoteComponent device={device} modalVisible={modalVisible} mqttMessage={this.props.mqttMessage}
                                       sendIrValue={this.sendIrValue}
                                       handleCancelLearning={this.handleCancelLearning}/>
            }
        } else {
            component = {
                header: device.name,
                body: <DeviceDetail device={device} handleCancelModal={handleCancelModal} loadDevices={loadDevices}/>
            }
        }
        return (
            <Modal visible={visible} closable={false}
                   title={component.header}
                   centered
                   onCancel={handleCancelModal}
                   width='500px'
                   footer={(
                       <Fragment>
                           <Button type="danger" onClick={() => this.showConfirm(handleDeleteDevice, device.id)}>
                               Xóa Thiết Bị
                           </Button>
                           <Button onClick={handleCancelModal}>Quay Về</Button>
                       </Fragment>
                   )}>
                {component.body}
            </Modal>
        )
    }
}