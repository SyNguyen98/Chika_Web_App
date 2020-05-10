import React, {Component, Fragment} from "react";
import {Button, Icon, Modal} from "antd";
import RemoteTV from "../remote";
import DeviceDetail from "../device-detail";
import {getAllIrValueByDeviceAndProtocol} from "../../../../../../services/IRService";
import {ErrorNotification} from "../../../../../../components/notification";
import "./device-modal.css";
import {mqttPublish} from "../../../../../../services/MqttService";

const {confirm} = Modal;

export default class DeviceModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            irValues: []
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
        if (this.state.irValues.length > 0) {
            let value = this.state.irValues.find(irValue => irValue.function === name);
            let irValue = {
                protocol: value.protocol,
                nbit: value.nbit,
                value: value.value,
                state: value.state,
                rawData: value.rawData
            }
            mqttPublish(this.props.device.topic + "/control", JSON.stringify(irValue));
        }
    }

    loadIrValues = () => {
        getAllIrValueByDeviceAndProtocol("tivi", "sony")
            .then(irValues => {
                this.setState({irValues})
            }).catch(error => {
            ErrorNotification(error.message || "Đã có lỗi xảy ra")
        })
    }

    componentDidMount() {
        if (this.props.device.type.includes("IR")) {
            this.loadIrValues();
        }
    }

    render() {
        const {device, visible, handleCancelModal, handleDeleteDevice, loadDevices} = this.props;
        let component;
        if (device.type.includes("IR")) {
            component = (<RemoteTV sendIrValue={this.sendIrValue}/>)
        } else {
            component = (<DeviceDetail device={device} handleCancelModal={handleCancelModal}
                                       handleDeleteDevice={handleDeleteDevice} loadDevices={loadDevices}/>)
        }
        return (
            <Modal visible={visible} closable={false}
                   title={device.type.includes("IR") ? (
                       <div className="remote__header">
                           <b>{device.name}</b>
                           <Icon type="poweroff" onClick={() => this.sendIrValue("ON/OFF")}/>
                       </div>
                   ) : device.name}
                   centered
                   onCancel={handleCancelModal}
                   width='50vw'
                   footer={(
                       <Fragment>
                           <Button type="danger" onClick={() => this.showConfirm(handleDeleteDevice, device.id)}>
                               Xóa Thiết Bị
                           </Button>
                           <Button onClick={handleCancelModal}>Quay Về</Button>
                       </Fragment>
                   )}>
                {component}
            </Modal>
        )
    }
}