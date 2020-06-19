import React, {Component, Fragment} from 'react';
import {Col} from "antd";

import Gauge from 'react-svg-gauge';

import './sensor-item.scss';

const imgDeviceUri = "/image/user/device/"

export default class SensorComponent extends Component{
    render() {
        const { sensor, doorState, airState } = this.props;
        return (
            <Fragment>
                {sensor.door ? (
                    <Col className='sensor-item' span={6}>
                        <b>CỬA</b><br/>
                        <DoorSensorComponent doorState={doorState}/>
                    </Col>
                ) : null}
                {sensor.air ? (
                    <Fragment>
                        <Col className='sensor-item' span={6}>
                            <b>KHÔNG KHÍ</b><br/>
                            <AirSensorComponent aqi={airState ? airState.aqi : 0}/>
                        </Col>
                        <Col className='sensor-item' span={6}>
                            <b>NHIỆT ĐỘ</b><br/>
                            <b className="temperature">{airState ? airState.temperature : '0'} &#8451;</b>
                        </Col>
                        <Col className='sensor-item' span={6}>
                            <b>ĐỘ ẨM</b><br/>
                            <b className="humidity">{airState ? airState.humidity : '0'} &#37;</b>
                        </Col>
                    </Fragment>
                ) : null}
            </Fragment>
        )
    }
}

class DoorSensorComponent extends Component {

    render() {
        const {doorState} = this.props;
        let imgSrc = "";
        if (doorState && doorState.state) {
            imgSrc = `${imgDeviceUri}door-open-icon.png`;
        } else {
            imgSrc = `${imgDeviceUri}door-close-icon.png`;
        }
        return (
            <img alt="door-icon" src={imgSrc} style={{width: '70px', marginTop: '5px'}}/>
        )
    }
}

class AirSensorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
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
        const {aqi} = this.props;
        let color;
        if (aqi < 2) {
            color = "#00b856";
        } else if (aqi < 6.5) {
            color = "#ff9900";
        } else {
            color = "#bf0000";
        }
        return (
            <Gauge value={this.props.aqi} max={10}
                   width={190} height={100}
                   backgroundColor={"#dedede"}
                   color={color}
                   label={null}
                   minMaxLabelStyle={{fontSize: '0'}}
                   valueLabelStyle={{fontSize: '15px', fontWeight: 'bold'}}
                   valueFormatter={(value) => this.setLabel(value)}/>
        )
    }
}