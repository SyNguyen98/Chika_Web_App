import React, {Component, Fragment} from 'react';
import {Button, Col, Divider, Icon, Modal, notification, Popover, Row, Switch} from 'antd';

import './devices.css';
import {deleteDevice, getDevicesByRoomId} from '../../../../services/DeviceService';
import {deleteRoom} from '../../../../services/RoomService';
import {mqttPublish, mqttSubscribe} from '../../../../app/App';

import AddDeviceModal from './components/add-device';
import UpdateRoomModal from './components/update-room';
import {DoorSensorComponent, AirSensorComponent} from './components/sensor'
import DeviceModalComponent from './components/device-detail'

import {ROOM_IMG_URI} from "../../../../constant/uri";
import {USER_ROOM_LINK} from "../../../../constant/link";
import {ROOM_COLOR} from "../../../../constant/color";

const {confirm} = Modal;

export default class UserRoomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mqttMessage: null,
            roomId: window.location.pathname.substring(18),
            roomList: JSON.parse(sessionStorage.getItem("listRoom")),
            device: null,
            deviceList: {
                sensors: [],
                switches: [],
                remoteIr: []
            },
            sensor: {
                door: null,
                air: null
            },
            switchChecked: [],
            popoverVisible: false,
            updateModalVisible: false,
            addDeviceModalVisible: false,
            deviceModalVisible: false
        }
    }

    loadDevices = (roomId) => {
        getDevicesByRoomId(roomId).then(deviceList => {
            console.log(deviceList);
            deviceList.sensors.forEach(sensor => {
                mqttSubscribe(`${sensor.topic}`);
            })
            deviceList.switches.forEach(device => {
                mqttSubscribe(`${device.topic}`);
            })
            let sensor = {
                door: deviceList.sensors.find(sensor => sensor.type === "SS01"),
                air: deviceList.sensors.find(sensor => sensor.type === "SS03")
            };
            this.setState({deviceList, sensor});
        }).catch(error => {
            notification.error({
                message: 'Chika Smarthome',
                description: error.message || "Tải danh sách thiết bị thất bại"
            })
        })
    }

    handleGoToRoomPage = (roomId) => {
        this.props.history.push(`${USER_ROOM_LINK}/${roomId}`);
        this.setState({
            roomId,
            deviceList: {sensors: [], switches: [], remoteIr: []},
            sensor: {door: null, air: null}
        });
        this.loadDevices(roomId);
    }

    handlePopoverVisibleChange = popoverVisible => {
        this.setState({popoverVisible});
    };

    handleShowUpdateRoomModal = () => {
        this.setState({updateModalVisible: true});
    };

    handleShowAddDeviceModal = () => {
        this.setState({addDeviceModalVisible: true});
    };

    handleShowDeviceModal = (device) => {
        this.setState({device, deviceModalVisible: true});
    }

    handleCancelModal = () => {
        this.setState({
            updateModalVisible: false,
            addDeviceModalVisible: false,
            deviceModalVisible: false
        });
    }

    handleDeleteDevice = (deviceId) => {
        deleteDevice(deviceId).then(() => {
            this.handleCancelModal();
            notification.success({
                message: 'Chika Smarthome',
                description: "Xóa thiết bị thành công"
            })
            this.loadDevices(this.state.roomId);
        }).catch(() => {
            notification.error({
                message: 'Chika Smarthome',
                description: "Đã có lỗi xảy ra, vui lòng thử lại sau"
            })
        })
    }

    showDeleteConfirm = (roomId, history) => {
        confirm({
            title: 'Bạn thật sự muốn xóa phòng này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Không',
            centered: true,
            onOk() {
                deleteRoom(roomId).then(() => {
                    history.push(USER_ROOM_LINK);
                    notification.success({
                        message: 'Chika Smarthome',
                        description: "Xóa phòng thành công"
                    })
                }).catch(error => {
                    notification.error({
                        message: 'Chika Smarthome',
                        description: error.message || "Tải danh sách thiết bị thất bại"
                    })
                })
            },
        });
    }

    showDevice = (device, index) => {
        const {switchChecked} = this.state;
        if (device.type.includes("SW") || device.type.includes("SR")) {
            return (
                <Col className='user-room__device-item' span={8}>
                    <div className='user-room__device-item__header'>
                        <img id={`${device.id}-img`} alt="device-icon"
                             src={`/image/user/device/${device.logo}-icon.png`}
                             style={switchChecked[index] ? {opacity: '1'} : {opacity: '0.2'}}/>
                    </div>
                    <div className='user-room__device-item__footer'>
                        <b style={switchChecked[index] ? {opacity: '1'} : {opacity: '0.2'}}>{device.name.toUpperCase()}</b>
                        <Switch checked={switchChecked[index]}
                                onChange={(checked, event) => this.onChange(event, device, checked)}/>
                    </div>
                </Col>
            )
        }
    }

    onChange = (event, device, checked) => {
        event.stopPropagation();
        let switchChecked = this.state.switchChecked;
        switchChecked[this.state.deviceList.indexOf(device)] = checked;
        this.setState({switchChecked})
        mqttPublish(device.topic, checked.toString())
    }

    setHeaderBackground = (color, url) => {
        return {
            background: `linear-gradient(90deg, ${color}), url('${url}')`,
            backgroundSize: '100% 20vh'
        }
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        this.loadDevices(window.location.pathname.substring(18));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {mqttMessage} = this.props;
        if (mqttMessage !== this.state.mqttMessage) {
            const {deviceList} = this.state;
            let device;
            device = deviceList.sensors.find(device => device.topic === mqttMessage.topic);
            if (device === undefined) {
                device = deviceList.switches.find(device => device.topic === mqttMessage.topic);
                let switchChecked = this.state.switchChecked;
                if (deviceList.length > 0) {
                    switchChecked[deviceList.indexOf(device)] = mqttMessage.message === "true";
                }
                this.setState({mqttMessage, switchChecked})
            }

            switch (device.type) {
                case "SS01":
                    this.setState({mqttMessage, doorState: JSON.parse(mqttMessage.message)});
                    break;
                case "SS03":
                    this.setState({mqttMessage, airState: JSON.parse(mqttMessage.message)});
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        const {
            roomId, roomList, device, deviceList, sensor, popoverVisible, doorState, airState,
            updateModalVisible, addDeviceModalVisible, deviceModalVisible
        } = this.state;
        const room = roomList.find(room => room.id === roomId);
        return (
            <Fragment>
                <Row className='user-room'>
                    <Col span={7} className='user-room__list-room'>
                        {roomList.map((item, i) => {
                            if (item.id === roomId) {
                                return null;
                            } else {
                                return (
                                    <div className='user-room__list-room__item' key={i}
                                         style={this.setHeaderBackground(ROOM_COLOR[i], `${ROOM_IMG_URI}${item.logo}.jpg`)}
                                         onClick={() => this.handleGoToRoomPage(item.id)}>
                                        <img alt="icon" src={`${ROOM_IMG_URI}${item.logo}-icon.png`}/>
                                        <p>{item.name.toUpperCase()}</p>
                                    </div>
                                )
                            }
                        })}
                    </Col>
                    <Col span={17} className='user-room__list-device'>
                        <div className='user-room__list-device__title'>
                            <img alt="icon" src={`${ROOM_IMG_URI}${room.logo}-icon.png`}/>
                            <h1>{room.name.toUpperCase()}</h1>
                            <Button type="primary" className='user-room__btn user-room__add-btn'
                                    onClick={this.handleShowAddDeviceModal}>
                                <Icon type="plus"/>
                            </Button>
                            <Popover trigger="click" placement="bottom"
                                     visible={popoverVisible}
                                     onVisibleChange={this.handlePopoverVisibleChange}
                                     content={
                                         <div style={{textAlign: 'right'}}>
                                             <a style={{margin: '0', fontSize: '1vw', fontWeight: 'bold'}}
                                                onClick={this.handleShowUpdateRoomModal}>
                                                 Chỉnh Sửa
                                             </a>
                                             <Divider style={{margin: '10px auto'}}/>
                                             <a style={{margin: '0', fontSize: '1vw', fontWeight: 'bold', color: 'red'}}
                                                onClick={() => this.showDeleteConfirm(room.id, this.props.history)}>
                                                 Xóa
                                             </a>
                                         </div>
                                     }>
                                <Button type="primary" className='user-room__btn user-room__setting-btn'>
                                    <Icon type="more"/>
                                </Button>
                            </Popover>
                        </div>
                        <div className="user-room__list-device__list">
                            <Row style={{textAlign: 'center'}}>
                                {sensor.door ? (
                                    <Col className='user-room__sensor-item' span={6}>
                                        <b>CỬA</b><br/>
                                        <DoorSensorComponent doorState={doorState}/>
                                    </Col>
                                ) : null}
                                {sensor.air ? (
                                    <Fragment>
                                        <Col className='user-room__sensor-item' span={6}>
                                            <b>KHÔNG KHÍ</b><br/>
                                            <AirSensorComponent airState={airState}/>
                                        </Col>
                                        <Col className='user-room__sensor-item' span={6}>
                                            <b>NHIỆT ĐỘ</b><br/>
                                            <b style={{
                                                fontSize: '50px',
                                                color: 'red'
                                            }}>{airState ? airState.temperature : '0'} &#8451;</b>
                                        </Col>
                                        <Col className='user-room__sensor-item' span={6}>
                                            <b>ĐỘ ẨM</b><br/>
                                            <b style={{
                                                fontSize: '50px',
                                                color: 'blue'
                                            }}>{airState ? airState.humidity : '0'} &#37;</b>
                                        </Col>
                                    </Fragment>
                                ) : null}
                            </Row>
                            <Row>
                                {deviceList.switches.map((item, i) => (
                                    <div key={i} onClick={() => this.handleShowDeviceModal(item)}>
                                        {this.showDevice(item, i)}
                                    </div>
                                ))}
                            </Row>
                        </div>

                        <UpdateRoomModal room={room}
                                         visible={updateModalVisible}
                                         handleCancelModal={this.handleCancelModal}/>

                        <AddDeviceModal modalVisible={addDeviceModalVisible}
                                        handleCancelModal={this.handleCancelModal}
                                        loadDevices={this.loadDevices}
                                        {...this.props}/>

                        {device ? (
                            <DeviceModalComponent device={device}
                                                  visible={deviceModalVisible}
                                                  handleCancelModal={this.handleCancelModal}
                                                  handleDeleteDevice={this.handleDeleteDevice}
                                                  loadDevices={this.loadDevices}/>
                        ) : null}

                    </Col>
                </Row>
            </Fragment>
        )
    }
}