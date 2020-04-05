import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Switch, notification } from 'antd';

import '../../styles/user/user-room.component.css';
import { getDevicesByRoomId } from '../../service/device.service'
import { mqttPublish } from '../../service/mqtt.service'
import { LINK_USER_ROOM } from '../../constant'

const headerColor = [
    "rgba(192, 226, 37, 0.6), rgba(86, 228, 116, 0.6)", "rgba(63, 114, 253, 0.6), rgba(255, 42, 237, 0.6)",
    "rgba(89, 230, 255, 0.6), rgba(253, 241, 72, 0.6)", "rgba(255, 89, 227, 0.6), rgba(253, 154, 72, 0.6)",
    "rgba(255, 62, 62, 0.6), rgba(166, 72, 253, 0.6)", "rgba(96, 255, 33, 0.6), rgba(72, 90, 253, 0.6)",
    "rgba(255, 70, 141, 0.6), rgba(204, 255, 22, 0.6)", "rgba(255, 153, 20, 0.6), rgba(0, 136, 41, 0.6)"
]
const imageRoomUri = "/image/user/room/"

class UserRoomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: window.location.pathname.substring(18),
            roomList: JSON.parse(sessionStorage.getItem("listRoom")),
            deviceList: []
        }
    }

    loadDevices = (roomId) => {
        getDevicesByRoomId(roomId).then(response => {
            this.setState({ deviceList: response });
            console.log(response);
        }).catch(error => {
            notification.error({
                message: 'Chika Smarthome',
                description: error.message || "Tải danh sách thiết bị thất bại"
            })
        })
    }

    handleGoToRoomPage = (id) => {
        this.props.history.push(`${LINK_USER_ROOM}/${id}`);
        this.setState({ roomId: id }); 
        this.loadDevices(id); 
    }

    onChange = (device, checked) => {
        console.log(`${device.name} switch to ${checked}`);
        let json = {
            button: parseInt(device.type.slice(-1), 10),
            state: checked
        }
        mqttPublish(device.productId, JSON.stringify(json))
    }

    setHeaderBackground = (color, url) => {
        return {
            background: `linear-gradient(90deg, ${color}), url('${url}')`,
            backgroundSize: '100% 20vh'
        } 
    }
    
    componentDidMount() {
        window.scrollTo(0, 0);
        this.loadDevices(window.location.pathname.substring(18)); 
    }

    render() {
        const { roomId, roomList, deviceList } = this.state;
        const room = roomList.find(room => room.id === roomId) 
        return(
            <Fragment>
                <Row className='user-room'>
                    <Col span={7} className='user-room__list-room'>
                        {roomList.map((item, i) => {
                            if (item.id === roomId) {
                                return null;
                            } else {
                                return (
                                    <div className='user-room__list-room__item' key={i}
                                        style={this.setHeaderBackground(headerColor[i], `${imageRoomUri}${item.logo}.jpg`)}
                                        onClick={() => this.handleGoToRoomPage(item.id)}>
                                        <img alt="icon" src={`${imageRoomUri}${item.logo}-icon.png`}/>
                                        <p>{item.name.toUpperCase()}</p>
                                    </div>
                                )
                            }
                        })}
                    </Col>
                    <Col span={17} className='user-room__list-device'>
                        <div className='user-room__list-device__title'>
                            <img alt="icon" src={`${imageRoomUri}${room.logo}-icon.png`}/>
                            <h1>{room.name.toUpperCase()}</h1>
                        </div>
                        <Row>
                            {deviceList.map((item, i) => {
                                return (
                                    <Col className='user-room__device-item' span={8} key={i}>
                                        <div className='user-room__device-item__header'>
                                            <img alt="device-icon" src={`/image/user/device/light.png`}/>
                                        </div>
                                        <div className='user-room__device-item__footer'>
                                            <b>{item.name.toUpperCase()}</b>
                                            <Switch onChange={(checked) => this.onChange(item, checked)}/>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}
  
export default withRouter(UserRoomComponent);