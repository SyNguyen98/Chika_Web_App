import React, {Component, Fragment} from 'react';
import {Button, Col, Divider, Icon, Modal, Popover, Row, Switch} from 'antd';

import './devices.css';
import {deleteDevice, getDevicesByRoomId} from '../../../../services/DeviceService';
import {deleteRoom} from '../../../../services/RoomService';

import AddDeviceModal from './components/add-device';
import UpdateRoomModal from './components/update-room';
import {AirSensorComponent, DoorSensorComponent} from './components/sensor'

import {DEVICE_IMG_URI, ROOM_IMG_URI} from "../../../../constant/uri";
import {USER_ROOM_LINK} from "../../../../constant/link";
import {ROOM_COLOR} from "../../../../constant/color";
import DeviceModal from "./components/device-modal";
import {ErrorNotification, SuccessNotification} from "../../../../components/notification";
import {mqttPublish, mqttSubscribe} from "../../../../services/MqttService";

const {confirm} = Modal;

export default class UserRoomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            updateRoomModal: false,
            addDeviceModal: false,
            deviceModal: false
        }
    }

    loadDevices = (roomId) => {
        getDevicesByRoomId(roomId).then(deviceList => {
            console.log(deviceList);
            deviceList.sensors.forEach(sensor => {
                mqttSubscribe(sensor.topic);
            })
            deviceList.switches.forEach(device => {
                mqttSubscribe(device.topic);
            })
            let sensor = {
                door: deviceList.sensors.find(sensor => sensor.type === "SS01"),
                air: deviceList.sensors.find(sensor => sensor.type === "SS03")
            };
            this.setState({deviceList, sensor});
        }).catch(error => {
            ErrorNotification("Tải danh sách thiết bị thất bại");
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
        this.setState({updateRoomModal: true});
    };

    handleShowAddDeviceModal = () => {
        this.setState({addDeviceModal: true});
    };

    handleShowDeviceModal = (device) => {
        this.setState({device, deviceModal: true});
    }

    handleCancelModal = () => {
        this.setState({
            updateRoomModal: false,
            addDeviceModal: false,
            deviceModal: false
        });
    }

    handleDeleteDevice = (deviceId) => {
        deleteDevice(deviceId).then(() => {
            this.handleCancelModal();
            SuccessNotification("Xóa thiết bị thành công");
            this.loadDevices(this.state.roomId);
        }).catch(() => {
            ErrorNotification("Đã có lỗi xảy ra, vui lòng thử lại sau");
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
                    SuccessNotification("Xóa phòng thành công");
                }).catch(error => {
                    ErrorNotification(error.message || "Tải danh sách thiết bị thất bại");
                })
            },
        });
    }

    onChange = (event, device, checked) => {
        event.stopPropagation();
        let switchChecked = this.state.switchChecked;
        switchChecked[this.state.deviceList.switches.indexOf(device)] = checked;
        this.setState({switchChecked})

        if (device.type.includes("SW")) {
            mqttPublish(device.topic, checked.toString())
        } else {
            mqttPublish(device.topic, `{"type": "SR", "button":${device.switchButton}, "state":${checked}}`)
        }
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
        if (mqttMessage !== prevProps.mqttMessage) {
            const {deviceList} = this.state;
            let device = deviceList.sensors.find(device => device.topic === mqttMessage.topic);
            if (device === undefined) {
                let switchChecked = this.state.switchChecked;
                if (deviceList.switches.length > 0) {
                    device = deviceList.switches.find(device => device.type.includes("SW") && device.topic === mqttMessage.topic);
                    if (device !== undefined) {
                        switchChecked[deviceList.switches.indexOf(device)] = mqttMessage.message === "true";
                    } else {
                        device = deviceList.switches.find(device => device.topic === mqttMessage.topic && device.switchButton === JSON.parse(mqttMessage.message).button);
                        switchChecked[deviceList.switches.indexOf(device)] = JSON.parse(mqttMessage.message).state;
                    }
                }
                this.setState({switchChecked})
            } else {
                switch (device.type) {
                    case "SS01":
                        this.setState({doorState: JSON.parse(mqttMessage.message)});
                        break;
                    case "SS03":
                        this.setState({airState: JSON.parse(mqttMessage.message)});
                        break;
                    default:
                        break;
                }
            }
        }
    }

    render() {
        const {
            roomId, roomList, device, deviceList, sensor, switchChecked, doorState, airState,
            popoverVisible, updateRoomModal, addDeviceModal, deviceModal
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
                                    <Col className='user-room__switch' span={8} key={i}
                                         onClick={() => this.handleShowDeviceModal(item)}>
                                        <div className='user-room__switch__header'>
                                            <img id={`${item.id}-img`} alt="device-icon"
                                                 src={`${DEVICE_IMG_URI}${item.logo}-icon.png`}
                                                 style={switchChecked[i] ? {opacity: '1'} : {opacity: '0.2'}}/>
                                        </div>
                                        <div className='user-room__switch__footer'>
                                            <b style={switchChecked[i] ? {opacity: '1'} : {opacity: '0.2'}}>{item.name.toUpperCase()}</b>
                                            <Switch checked={switchChecked[i]}
                                                    onChange={(checked, event) => this.onChange(event, item, checked)}/>
                                        </div>
                                    </Col>
                                ))}
                                {deviceList.remoteIr.map((item, i) => (
                                    <Col className='user-room__remote' span={8} key={i}
                                         onClick={() => this.handleShowDeviceModal(item)}>
                                        <div className='user-room__remote__header'>
                                            <img id={`${item.id}-img`} alt="device-icon"
                                                 src={`${DEVICE_IMG_URI}${item.logo}-icon.png`}/>
                                        </div>
                                        <div className='user-room__remote__footer'>
                                            <b>{item.name.toUpperCase()}</b>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>

                        <UpdateRoomModal room={room}
                                         visible={updateRoomModal}
                                         handleCancelModal={this.handleCancelModal}/>

                        <AddDeviceModal visible={addDeviceModal}
                                        handleCancelModal={this.handleCancelModal}
                                        loadDevices={this.loadDevices}
                                        {...this.props}/>

                        {device ? (
                            <DeviceModal device={device} visible={deviceModal}
                                         handleCancelModal={this.handleCancelModal}
                                         handleDeleteDevice={this.handleDeleteDevice} loadDevices={this.loadDevices}/>
                        ) : null}

                    </Col>
                </Row>
            </Fragment>
        )
    }
}