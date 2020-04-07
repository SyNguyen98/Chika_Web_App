import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Switch, notification } from 'antd';

import '../../styles/user/user-room.component.css';
import { getDevicesByRoomId } from '../../service/device.service'
import { mqttPublish, mqttSubscribe } from '../../app/App'
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
            mqttMessage: null,
            roomId: window.location.pathname.substring(18),
            roomList: JSON.parse(sessionStorage.getItem("listRoom")),
            deviceList: [],
            switchChecked: []
        }
    }

    loadDevices = (roomId) => {
        getDevicesByRoomId(roomId).then(response => {
            console.log(response);
            response.forEach(element => {
                mqttSubscribe(`${element.productId}/#`);
            });
            this.setState({ 
                deviceList: response,
             });
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
        let switchChecked = this.state.switchChecked;
        switchChecked[this.state.deviceList.indexOf(device)] = checked;  
        this.setState({
            switchChecked: switchChecked
        })  
        mqttPublish(device.topic, checked.toString())
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

    componentDidUpdate() {
        const { mqttMessage } = this.props;
        if (mqttMessage !== this.state.mqttMessage) {
            const { deviceList } = this.state;
            let device = deviceList.find(device =>  device.topic === mqttMessage.topic);
            let switchChecked = this.state.switchChecked;
            if (deviceList.length > 0) {               
                if (mqttMessage.message === "true") {
                    switchChecked[deviceList.indexOf(device)] = true;       
                } else {
                    switchChecked[deviceList.indexOf(device)] = false;    
                }
            }
            this.setState({
                mqttMessage: mqttMessage,
                switchChecked: switchChecked
            })  
        }
    }

    render() {
        const { roomId, roomList, deviceList, switchChecked } = this.state;
        const room = roomList.find(room => room.id === roomId);
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
                                            <img id={`${item.id}-img`} alt="device-icon" src={`/image/user/device/light.png`} 
                                                style={switchChecked[i] ? {opacity: '1'} : {opacity: '0.2'}}/>
                                        </div>
                                        <div className='user-room__device-item__footer'>
                                            <b style={switchChecked[i] ? {opacity: '1'} : {opacity: '0.2'}}>{item.name.toUpperCase()}</b>
                                            <Switch checked={switchChecked[i]} onChange={(checked) => this.onChange(item, checked)}/>
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