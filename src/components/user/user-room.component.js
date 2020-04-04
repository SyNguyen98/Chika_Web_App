import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, notification } from 'antd';
import { getDevicesByRoomId } from '../../service/device.service'
import { mqttPublish } from '../../service/mqtt.service'

import '../../styles/user/user-room.component.css';

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

    loadDevices = () => {
        getDevicesByRoomId(this.state.roomId).then(response => {
            this.setState({ deviceList: response });
            console.log(response);
        }).catch(error => {
            notification.error({
                message: 'Chika Smarthome',
                description: error.message || "Tải danh sách thiết bị thất bại"
            })
        })
    }

    handlePublishMessage = (topic, message) => {
        mqttPublish(topic, message)
    }

    setHeaderBackground = (color, url) => {
        return {
            background: `linear-gradient(90deg, ${color}), url('${url}')`,
            backgroundSize: '100% 20vh'
        } 
    }
    
    componentDidMount() {
      window.scrollTo(0, 0);
      this.loadDevices();      
    }

    render() {
        const { roomId, roomList, deviceList } = this.state;
        const room = roomList.find(room => room.id === roomId)
        const deviceListComponent = [];
        deviceList.forEach((item, i) => {
            deviceListComponent.push(
                <Col className='user-room__device' span={6} key={i} onClick={() => this.handlePublishMessage(item.productId, "test")}>
                    <h2>{item.name.toUpperCase()}</h2>
                    <img alt="device-icon" src={`/image/user/device/${item.logo}.png`}/>
                    <br/><br/>
                    <b>{item.createAt}</b>
                </Col>
            )
        });
        return(
            <Fragment>
                <Row className='user-room'>
                    <Col span={7}>
                        <div className='user-room__list-room'>
                            {roomList.map((item, i) => {
                                if (item.id === roomId) {
                                    return null;
                                } else {
                                    return (
                                        <div className='user-room__list-room__item'
                                            style={this.setHeaderBackground(headerColor[i], `${imageRoomUri}${item.logo}.jpg`)}>
                                            <img alt="icon" src={`${imageRoomUri}${item.logo}-icon.png`}/>
                                            <p>{item.name.toUpperCase()}</p>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </Col>
                    <Col span={17}>
                        <h1>{room.name.toUpperCase()}</h1>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}
  
export default withRouter(UserRoomComponent);