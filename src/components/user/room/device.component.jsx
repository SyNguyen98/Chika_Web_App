import React, { Component } from 'react';
import { Col } from 'antd';
import Gauge from 'react-svg-gauge';

export class DoorSensorComponent extends Component {

    render() {
        const { device } = this.props;
        return (
            <Col className='user-room__device-item' span={8}>
                <div className='user-room__device-item__header'>
                    <img id={`${device.id}-img`} alt="device-icon" src={`/image/user/device/${device.logo}-close-icon.png`}/>
                </div>
                <div className='user-room__device-item__footer'>
                    <b>{device.name.toUpperCase()}</b>
                </div>
            </Col>
        )
    }
}

export class MotionDetectorComponent extends Component {

    render() {
        const { device } = this.props;
        return (
            <Col className='user-room__device-item' span={8}>
                <div className='user-room__device-item__header'>
                    <img id={`${device.id}-img`} alt="device-icon" src={`/image/user/device/${device.logo}-icon.png`}/>
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
        const { device } = this.props;
        const { value, color } = this.state;
        return (
            <Col className='user-room__device-item' span={8}>
                <div className='user-room__device-item__header'>
                    <Gauge  value={value} max={10}
                            width={200} height={100} 
                            backgroundColor={"#dedede"}
                            color={color}
                            label={null}
                            minMaxLabelStyle={{fontSize: '0'}}
                            valueLabelStyle={{fontSize: '20px', fontWeight: 'bold'}}
                            valueFormatter={(value) => this.setLabel(value)}/>
                </div>
                <div className='user-room__device-item__footer'>
                    <b>{device.name.toUpperCase()}</b>
                </div>
            </Col>
        )
    }
}

export class FireSensorComponent extends Component {

    render() {
        const { device } = this.props;
        return (
            <Col className='user-room__device-item' span={8}>
                <div className='user-room__device-item__header'>
                    <img id={`${device.id}-img`} alt="device-icon" src={`/image/user/device/${device.logo}-icon.png`}/>
                </div>
                <div className='user-room__device-item__footer'>
                    <b>{device.name.toUpperCase()}</b>
                </div>
            </Col>
        )
    }
}