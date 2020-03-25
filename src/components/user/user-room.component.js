import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, notification } from 'antd';
import { getDevicesByRoomId } from '../../service/device.service'
import { mqttPublish } from '../../service/mqtt.service'

import '../../styles/user/user-room.component.css';

class UserRoomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: window.location.pathname.substring(18),
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
    
    componentDidMount() {
      window.scrollTo(0, 0);
      this.loadDevices();
    }

    render() {
        const { deviceList } = this.state;
        const deviceListComponent = [];
        deviceList.forEach((item, i) => {
            deviceListComponent.push(
                <Col className='user-room__device' span={6} key={i} onClick={() => this.handlePublishMessage('mqtttest', item.id)}>
                    <h2>{item.name.toUpperCase()}</h2>
                    <img alt="device-icon" src={`/image/user/device/${item.logo}.png`}/>
                    <br/><br/>
                    <b>{item.createAt}</b>
                </Col>
            )
        });
        return(
            <div className='user-room'>
                <Row>
                    {deviceListComponent}
                </Row>
            </div>
        )
    }
}
  
export default withRouter(UserRoomComponent);