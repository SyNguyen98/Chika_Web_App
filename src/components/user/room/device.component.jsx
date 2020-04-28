import React, { Component } from 'react';
import { Col } from 'antd';
import Gauge from 'react-svg-gauge';

const imgDeviceUri = "/image/user/device/"

export class DoorSensorComponent extends Component {

    render() {
        const { device, doorState } = this.props;
        let imgSrc = "";
        if (doorState && doorState.state) {
            imgSrc = `${imgDeviceUri}${device.logo}-open-icon.png`;
        } else {
            imgSrc = `${imgDeviceUri}${device.logo}-close-icon.png`;
        }
        return (
            <Col className='user-room__device-item' span={8}>
                <div className='user-room__device-item__header'>
                    <img id={`${device.id}-img`} alt="device-icon" src={imgSrc}/>
                </div>
                <div className='user-room__device-item__footer'>
                    <b>{device.name.toUpperCase()}</b>
                </div>
            </Col>
        )
    }
}

export class AirSensorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            color: '#00b856'
        }
    }

    setLabel = (value) => {
        if (value < 2) { 
            return "An Toàn"
        } else if (value < 6.5) {
            return "Bất Ổn"
        } else {
            return "Nguy Hiểm"
        }
    }

    render() {
        const { device, airState } = this.props;
        let value = 0;
        let color = "#dedede";
        if (airState) {
            value = airState.aqi;
            if (value < 2) {
                color = "#00b856";
            } else if (value < 6.5) {
                color = "#ff9900";
            } else {
                color = "#bf0000";
            }
        }
        return (
            <Col className='user-room__device-item' span={8}>
                <div className='user-room__device-item__header'>
                    <Gauge  value={value} max={10}
                            width={200} height={100} 
                            backgroundColor={"#dedede"}
                            color={color}
                            label={null}
                            minMaxLabelStyle={{fontSize: '0'}}
                            valueLabelStyle={{fontSize: '18px', fontWeight: 'bold'}}
                            valueFormatter={(value) => this.setLabel(value)}/>
                </div>
                <div className='user-room__device-item__footer'>
                    <b>{device.name.toUpperCase()}</b>
                </div>
            </Col>
        )
    }
}