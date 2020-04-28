import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Switch, notification, Button, Icon, Popover, Divider, Modal, Form, Input } from 'antd';

import './user-room.component.css';
import { getDevicesByRoomId, deleteDevice } from '../../../service/device.service'
import { updateRoom, deleteRoom } from '../../../service/room.service'
import { mqttPublish, mqttSubscribe } from '../../../app/App'
import { LINK_USER_ROOM } from '../../../constant'
import { headerColor, roomName } from '../user-list-room.component'
import AddDeviceModal from './user-add-device.component';
import { DoorSensorComponent, AirSensorComponent } from './device.component';
import DeviceModalComponent from './device-modal.component'

const { confirm } = Modal;

const imageRoomUri = "/image/user/room/"

class UserRoomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mqttMessage: null,
            roomId: window.location.pathname.substring(18),
            roomList: JSON.parse(sessionStorage.getItem("listRoom")),
            device: null,
            deviceList: [],
            switchChecked: [],
            // doorState: null,
            // motionState: null,
            // airState: null,
            // fireState: null,
            popoverVisible: false,
            updateModalVisible: false,
            addDeviceModalVisible: false,
            deviceModalVisible: false
        }
    }

    loadDevices = (roomId) => {
        getDevicesByRoomId(roomId).then(response => {
            console.log(response);
            response.forEach(element => {
                mqttSubscribe(`${element.topic}`);
            });
            this.setState({ deviceList: response });
        }).catch(error => {
            notification.error({
                message: 'Chika Smarthome',
                description: error.message || "Tải danh sách thiết bị thất bại"
            })
        })
    }

    handleGoToRoomPage = (roomId) => {
        this.props.history.push(`${LINK_USER_ROOM}/${roomId}`);
        this.setState({ roomId, deviceList: [] }); 
        this.loadDevices(roomId); 
    }

    handlePopoverVisibleChange = popoverVisible => {
        this.setState({ popoverVisible });
    };

    handleShowUpdateRoomModal = () => {
        this.setState({ updateModalVisible: true });
    };
    
    handleShowAddDeviceModal = () => {
        this.setState({ addDeviceModalVisible: true });
    };

    handleShowDeviceModal = (device) => {
        this.setState({ device, deviceModalVisible: true });
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
        }).catch(error => {
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
                    history.push(LINK_USER_ROOM);
                    notification.success({
                        message: 'Chika Smarthome',
                        description:"Xóa phòng thành công"
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
        const { switchChecked } = this.state;
        if (device.type.includes("SW") || device.type.includes("SR")) {
            return (
                <Col className='user-room__device-item' span={8}>
                    <div className='user-room__device-item__header'>
                        <img id={`${device.id}-img`} alt="device-icon" src={`/image/user/device/${device.logo}-icon.png`} 
                            style={switchChecked[index] ? {opacity: '1'} : {opacity: '0.2'}}/>
                    </div>
                    <div className='user-room__device-item__footer'>
                        <b style={switchChecked[index] ? {opacity: '1'} : {opacity: '0.2'}}>{device.name.toUpperCase()}</b>
                        <Switch checked={switchChecked[index]} onChange={(checked, event) => this.onChange(event, device, checked)}/>
                    </div>
                </Col>
            )
        } else {
            switch (device.type) {
                case "SS01":
                    return (<DoorSensorComponent device={device} doorState={this.state.doorState}/>);
                case "SS03":
                    return (<AirSensorComponent device={device} airState={this.state.airState}/>);
            }
        }
    }

    onChange = (event, device, checked) => {
        event.stopPropagation();
        let switchChecked = this.state.switchChecked;
        switchChecked[this.state.deviceList.indexOf(device)] = checked;  
        this.setState({ switchChecked })  
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

    componentDidUpdate() {
        const { mqttMessage } = this.props;
        if (mqttMessage !== this.state.mqttMessage) {
            const { deviceList } = this.state;
            let device = deviceList.find(device =>  device.topic === mqttMessage.topic);

            if (device.type.includes("SW") || device.type.includes("SR")) {
                let switchChecked = this.state.switchChecked;
                if (deviceList.length > 0) {               
                    switchChecked[deviceList.indexOf(device)] = mqttMessage.message === "true";
                }
                this.setState({ mqttMessage, switchChecked })  
            } else {
                switch (device.type) {
                    case "SS01":
                        console.log("Cảm biến cửa");
                        this.setState({ mqttMessage, doorState: JSON.parse(mqttMessage.message) });
                        break;
                    case "SS02":
                        console.log("Cảm biến chuyển động");
                        this.setState({ mqttMessage, motionState: JSON.parse(mqttMessage.message) });
                        break;
                    case "SS03":
                        console.log("Cảm biến không khí");
                        this.setState({ mqttMessage, airState: JSON.parse(mqttMessage.message) });
                        break;
                    default:
                        console.log("Cảm biến lửa");
                        this.setState({ mqttMessage, fireState: JSON.parse(mqttMessage.message) });
                        break;
                }
            }
        }
    }

    render() {
        const { roomId, roomList, device, deviceList, popoverVisible, 
                updateModalVisible, addDeviceModalVisible, deviceModalVisible } = this.state;
        const room = roomList.find(room => room.id === roomId);
        const AntUpdateRoomForm = Form.create()(UpdateRoomForm)
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
                            <Button type="primary" className='user-room__btn user-room__add-btn'
                                    onClick={this.handleShowAddDeviceModal}>
                                <Icon type="plus" />
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
                                    <Icon type="more" />
                                </Button>
                            </Popover>
                           
                        </div>
                        <Row className='user-room__list-device__list'>
                            {deviceList.map((item, i) => (
                                <div key={i} onClick={() => this.handleShowDeviceModal(item)}>
                                    {this.showDevice(item, i)}
                                </div>
                                
                            ))}
                        </Row>

                        <Modal visible={updateModalVisible} closable={false}
                                title="CHỈNH SỬA PHÒNG"
                                centered
                                width='20vw'
                                footer={(
                                    <Button type="primary" onClick={this.handleCancelModal}>
                                        Quay về
                                    </Button>
                                )}>
                            <AntUpdateRoomForm room={room}/>
                        </Modal>

                        <AddDeviceModal modalVisible={addDeviceModalVisible} 
                                        handleCancelModal={this.handleCancelModal} 
                                        loadDevices={this.loadDevices} 
                                        {...this.props}/>
                        {device ? (
                            <DeviceModalComponent   device={device} visible={deviceModalVisible}
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
  
export default withRouter(UserRoomComponent);

class UpdateRoomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoModalVisible: false,
            logoName: this.props.room.logo
        }
    }

    handleChangeLogoName = (name) => {
        this.setState({ 
            logoName: name,
            logoModalVisible: false
        });
    }

    handleSubmitUpdateRoom = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {   
                const request = Object.assign({}, values);
                request.id = this.props.room.id;
                updateRoom(request).then(() => {
                    this.props.history.push(LINK_USER_ROOM);
                    notification.success({
                        message: 'Chika Smarthome',
                        description: "Sửa phòng thành công."
                    })
                }).catch(error => {
                    notification.error({
                        message: 'Chika Smarthome',
                        description: "Sửa phòng thất bại" || error.message
                    })
                })
            }
        });
    }

    handleShowModal = () => {
        this.setState({ logoModalVisible: true });
    };

    handleCancelModal = () => {
        this.setState({ logoModalVisible: false });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { logoModalVisible, logoName } = this.state;
        return(
            <div>
                <Form onSubmit={this.handleSubmitUpdateRoom} autoComplete='off'>
                    <Form.Item label='Tên phòng'>
                        {getFieldDecorator('name', {
                            initialValue: this.props.room.name,
                            rules: [{ required: true, message: 'Vui lòng nhập tên phòng!' }]
                        })(
                            <Input  size="large"
                                    prefix={<Icon type="form" />}
                                    placeholder="Tên phòng"/>
                        )}
                    </Form.Item>
                    <Form.Item label='Logo'>
                        {getFieldDecorator('logo', {
                            initialValue: logoName
                        })(
                            <Input type='hidden' />
                        )}
                        <img alt={logoName} src={`${imageRoomUri}${logoName}-icon.png`} style={{width: '5vw', marginRight: '2vw'}}/>
                        <Button type='dashed' onClick={this.handleShowModal}>
                            Chọn Logo
                        </Button>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" size="large">Cập Nhật</Button>
                </Form>

                <Modal visible={logoModalVisible} closable={false}
                        title="LOGO"
                        centered
                        width='35vw'
                        footer={(
                            <Button type="primary" onClick={this.handleCancelModal}>
                                Quay về
                            </Button>
                        )}>
                    <Row gutter={[18,24]}>
                        {roomName.map((item, i) => {
                            return (
                                <Col key={i} span={6} onClick={() => this.handleChangeLogoName(item)}>
                                    <img className="modal__room-icon" alt={`${imageRoomUri}${item}-icon`} src={`${imageRoomUri}${item}-icon.png`}/>
                                </Col>
                            )
                        })}
                    </Row>
                </Modal>
            </div>            
        )
    }
}