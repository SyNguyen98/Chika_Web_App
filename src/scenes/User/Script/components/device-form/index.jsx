import React, {Component, Fragment} from "react";
import {getDevicesForScript} from "../../../../../services/DeviceService";
import {Checkbox} from "antd";

export default class DeviceFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceList: []
        }
    }

    loadDevices = () => {
        getDevicesForScript().then(response => {
            this.setState({deviceList: response})
        }).catch(error => {
            console.error(error);
        })
    }

    componentDidMount() {
        this.loadDevices();
    }

    render() {
        const { deviceList } = this.state;
        return (
            <Fragment>
                {deviceList.map((item, i) => {
                    if (item.devices && item.devices.length > 0) {
                        return (
                            <div key={i}>
                                <h3>{item.roomName}</h3>
                                {item.devices.map((device, i) => {
                                    return <Checkbox key={i} value={device}>{device.name}</Checkbox>
                                })}
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
            </Fragment>
        )
    }
}