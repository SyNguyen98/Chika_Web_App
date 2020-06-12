import React, {Component} from "react";
import {getDevicesForScript} from "../../../../../services/DeviceService";
import {Checkbox, Col, Collapse, Row, Switch} from "antd";

import './device-form.scss';

const { Panel } = Collapse;

export default class DeviceFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceList: [],
            roomList: [],
            deviceChecked: {},
            deviceSwitchDisabled: {},
            deviceSwitchChecked: {},
            errorMessage: false
        }
    }

    handleSubmit = () => {
        const { roomList, deviceChecked, deviceSwitchChecked } = this.state;
        let devices = [];
        roomList.forEach(roomName => {
            deviceChecked[roomName].forEach(device => {
                device.state = deviceSwitchChecked[device.id]
                devices.push(device);
            })
        })
        if (devices.length > 0) {
            return devices;
        } else {
            this.setState({errorMessage: true})
            return null;
        }
    }

    loadDevices = () => {
        getDevicesForScript().then(response => {
            let deviceSwitchDisabled = {};
            let deviceSwitchChecked = {};
            response.forEach(item => {
                item.devices.forEach(device => {
                    deviceSwitchDisabled[device.id] = true;
                    deviceSwitchChecked[device.id] = false;
                })
            })
            this.setState({deviceList: response, deviceSwitchDisabled, deviceSwitchChecked})
        }).catch(error => {
            console.error(error);
        })
    }

    onChange = (checkedValues, roomName) => {
        const { deviceList, roomList, deviceChecked, deviceSwitchDisabled } = this.state;
        if (!roomList.includes(roomName)) {
            roomList.push(roomName);
        }
        deviceChecked[roomName] = checkedValues;

        deviceList.forEach(item =>
            item.devices.forEach(device => {
                deviceSwitchDisabled[device.id] = !checkedValues.includes(device);
            })
        )

        this.setState({roomList, deviceChecked, deviceSwitchDisabled})
    }

    onChangeSwitch = (checked, deviceId) => {
        let deviceSwitchChecked = this.state.deviceSwitchChecked;
        deviceSwitchChecked[deviceId] = checked;
        this.setState({deviceSwitchChecked})
    }

    componentDidMount() {
        this.loadDevices();
    }

    render() {
        const { deviceList, deviceSwitchDisabled, deviceSwitchChecked, errorMessage } = this.state;
        return (
            <div className="script__device-form">
                <Collapse accordion>
                    {deviceList.map((item, i) => {
                        if (item.devices && item.devices.length > 0) {
                            return (
                                <Panel header={item.roomName} key={i}>
                                    <Checkbox.Group className="device-checkbox-group" onChange={(checkedValues) => this.onChange(checkedValues, item.roomName)}>
                                        <Row>
                                            {item.devices.map((device, i) => {
                                                return (
                                                    <Col key={i} span={6}>
                                                        <Checkbox className="device-checkbox" value={device}>{device.name}</Checkbox>
                                                        <Switch checked={deviceSwitchChecked[device.id]}
                                                                disabled={deviceSwitchDisabled[device.id]}
                                                                onChange={checked => this.onChangeSwitch(checked, device.id)}/>
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                    </Checkbox.Group>
                                </Panel>
                            )
                        } else {
                            return null;
                        }
                    })}
                </Collapse>

                {errorMessage ? (
                    <div className="error-message">Vui lòng chọn ít nhất 1 thiết bị</div>
                ) : null}
            </div>
        )
    }
}