import React, {Component, Fragment} from "react";
import {Col, Switch} from "antd";
import {DEVICE_IMG_URI} from "../../../../../../constant/uri";

import './device-item.scss';

export default class DeviceComponent extends Component {
    render() {
        const { deviceList, switchChecked, handleShowDeviceModal, onChange } = this.props;
        return (
            <div className="device-item">
                {deviceList.switches.map((item, i) => (
                    <Col className='switches' span={8} key={i}
                         onClick={() => handleShowDeviceModal(item)}>
                        <div className='header'>
                            <img id={`${item.id}-img`} alt="device-icon"
                                 src={`${DEVICE_IMG_URI}${item.logo}-icon.png`}
                                 style={switchChecked[i] ? {opacity: '1'} : {opacity: '0.2'}}/>
                        </div>
                        <div className='footer'>
                            <b style={switchChecked[i] ? {opacity: '1'} : {opacity: '0.2'}}>{item.name.toUpperCase()}</b>
                            <Switch checked={switchChecked[i]}
                                    onChange={(checked, event) => onChange(event, item, checked)}/>
                        </div>
                    </Col>
                ))}
                {deviceList.remoteIr.map((item, i) => (
                    <Col className='remote' span={8} key={i}
                         onClick={() => handleShowDeviceModal(item)}>
                        <div className='header'>
                            <img id={`${item.id}-img`} alt="device-icon"
                                 src={`${DEVICE_IMG_URI}${item.logo}-icon.png`}/>
                        </div>
                        <div className='footer'>
                            <b>{item.name.toUpperCase()}</b>
                        </div>
                    </Col>
                ))}
            </div>
        )
    }
}