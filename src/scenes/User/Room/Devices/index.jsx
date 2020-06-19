import React, {Component, Fragment} from 'react';
import {Button, Col, Divider, Icon, Modal, Popover, Row, Switch} from 'antd';

import AddDeviceModal from './components/add-device';
import SensorComponent from './components/sensor-item'
import DeviceModal from "./components/device-modal";
import UpdateRoomModal from './components/update-room';
import {ErrorNotification, SuccessNotification} from "../../../../components/notification";

import {deleteDevice, getDevicesByRoomId} from '../../../../services/DeviceService';
import {deleteRoom} from '../../../../services/RoomService';
import {mqttPublish, mqttSubscribe} from "../../../../services/MqttService";

import {DEVICE_IMG_URI, ROOM_IMG_URI} from "../../../../constant/uri";
import {USER_ROOM_LINK} from "../../../../constant/link";
import {LIST_ROOM} from "../../../../constant";

import './devices.scss';
import RoomListComponent from "./components/room-list";
import DeviceComponent from "./components/device-item";

const {confirm} = Modal;

export default class UserRoomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: window.location.pathname.substring(18),
            roomList: JSON.parse(sessionStorage.getItem(LIST_ROOM)),
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
        }).catch(() => {
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
                    <Col span={7} className='list-room'>
                        <RoomListComponent roomList={roomList} roomId={roomId}/>
                    </Col>
                    <Col span={17} className='list-device'>
                        <div className='title'>
                            <img alt="icon" src={`${ROOM_IMG_URI}${room.logo}-icon.png`}/>
                            <h1>{room.name.toUpperCase()}</h1>
                            <Button type="primary" className='button add-button'
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
                                <Button type="primary" className='button setting-button'>
                                    <Icon type="more"/>
                                </Button>
                            </Popover>
                        </div>
                        <div className="body">
                            <Row>
                                <SensorComponent sensor={sensor} doorState={doorState} airState={airState}/>
                            </Row>
                            <Row>
                                <DeviceComponent deviceList={deviceList} switchChecked={switchChecked}
                                                 handleShowDeviceModal={this.handleShowDeviceModal}
                                                 onChange={this.onChange}/>
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
                            <DeviceModal device={device} visible={deviceModal} mqttMessage={this.props.mqttMessage}
                                         handleCancelModal={this.handleCancelModal}
                                         handleDeleteDevice={this.handleDeleteDevice} loadDevices={this.loadDevices}/>
                        ) : null}

                    </Col>
                </Row>
            </Fragment>
        )
    }
}