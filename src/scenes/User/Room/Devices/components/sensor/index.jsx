import React, {Component} from 'react';
import Gauge from 'react-svg-gauge';

const imgDeviceUri = "/image/user/device/"

export class DoorSensorComponent extends Component {

    render() {
        const { doorState } = this.props;
        let imgSrc = "";
        if (doorState && doorState.state) {
            imgSrc = `${imgDeviceUri}door-open-icon.png`;
        } else {
            imgSrc = `${imgDeviceUri}door-close-icon.png`;
        }
        return (
            <img alt="door-icon" src={imgSrc} style={{width: '5vw', marginTop: '1vw'}}/>
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
        const { airState } = this.props;
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
            <Gauge  value={value} max={10}
                    width={190} height={100}
                    backgroundColor={"#dedede"}
                    color={color}
                    label={null}
                    minMaxLabelStyle={{fontSize: '0'}}
                    valueLabelStyle={{fontSize: '16px', fontWeight: 'bold'}}
                    valueFormatter={(value) => this.setLabel(value)}/>
        )
    }
}