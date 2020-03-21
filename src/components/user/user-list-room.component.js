import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Modal, Button, Form, Input, Icon, notification } from 'antd';
import { getRooms, addRoom, updateRoom, deleteRoom } from '../../service/room.service'
import { LINK_USER_ROOM } from '../../constant'

import '../../styles/user/user-list-room.component.css';

class UserListRoomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            addModalVisible: false,
            updateModalVisible: false,
            roomList: [],
            roomUpdate: null
        }
    }
    
    componentDidMount() {
      window.scrollTo(0, 0);
      this.loadRooms();
    }

    loadRooms = () => {
        getRooms().then(response => {
            this.setState({ roomList: response });
            console.log(response);
        }).catch(error => {
            notification.error({
                message: 'Chika Smarthome',
                description: error.message || "Tải danh sách phòng thất bại"
            })
        })
    }

    handleDeleteRoom = (event, id) => {
        event.cancelBubble = true;
        if (event.stopPropagation) {
            event.stopPropagation();
        } 
        deleteRoom(id).then(() => {
            let index = this.state.roomList.indexOf(this.state.roomList.find(room => room.id === id));
            this.state.roomList.splice(index, 1)
            notification.success({
                message: 'Chika Smarthome',
                description: "Xóa phòng thành công"
            })
            this.forceUpdate();
        }).catch(error => {
            notification.error({
                message: 'Chika Smarthome',
                description: error.message || "Tải danh sách phòng thất bại"
            })
        })
    }

    handleUpdateRoom = (event, room) => {
        event.cancelBubble = true;
        if (event.stopPropagation) {
            event.stopPropagation();
        } 
        this.setState({ 
            updateModalVisible: true,
            roomUpdate: room 
        });
    }

    handleGoToRoomPage = (id) => {
        this.props.history.push(`${LINK_USER_ROOM}/${id}`);
    }

    handleShowModal = () => {
        this.setState({ addModalVisible: true });
    };
    
    handleCancelModal = () => {
        this.setState({ 
            addModalVisible: false,
            updateModalVisible: false
        });
    }

    render() {
        const { addModalVisible, updateModalVisible, roomList } = this.state;
        const AntAddRoomForm = Form.create()(AddRoomForm)
        const AntUpdateRoomForm = Form.create()(UpdateRoomForm)
        const rooms = [];
        roomList.forEach((item, i) => {
            rooms.push(
                <Col className='user-list-room__item' span={6} key={i} onClick={() => this.handleGoToRoomPage(item.id)}>
                    <h2>{item.name.toUpperCase()}</h2>
                    <img alt="room-icon" src={`/image/user/room/${item.logo}.png`}/>
                    <br/><br/>
                    <b>{item.createAt}</b>

                    <div className='user-list-room__item__setting'>
                        <p className='user-list-room__item__setting__update' onClick={(event) => this.handleUpdateRoom(event, item)}>SỬA</p>
                        <p className='user-list-room__item__setting__delete' onClick={(event) => this.handleDeleteRoom(event, item.id)}>XÓA</p>
                    </div>
                </Col>
            )
        });
        return(
            <div className='user-list-room'>
                <Row>
                    {rooms}
                    <Col className='user-list-room__item' span={6} onClick={this.handleShowModal}>
                        <h2>THÊM PHÒNG</h2>
                        <img alt="add-icon" src="/image/user/room/add-icon.png" style={{width: '6vw', marginTop: '2.5vw'}}/>
                    </Col>
                </Row>

                <Modal visible={addModalVisible} closable={false}
                        title="THÊM PHÒNG"
                        centered
                        width='20vw'
                        footer={(
                            <Button key="back" onClick={this.handleCancelModal}>
                                Quay về
                            </Button>
                        )}>
                    <AntAddRoomForm />
                </Modal>

                <Modal visible={updateModalVisible} closable={false}
                        title="SỬA PHÒNG"
                        centered
                        width='20vw'
                        footer={(
                            <Button key="back" onClick={this.handleCancelModal}>
                                Quay về
                            </Button>
                        )}>
                    <AntUpdateRoomForm room={this.state.roomUpdate}/>
                </Modal>
            </div>
        )
    }
}
  
export default withRouter(UserListRoomComponent);

class AddRoomForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoModalVisible: false,
            logoName: 'Logo'
        }
    }

    handleChangeLogoName = (name) => {
        this.setState({ 
            logoName: name,
            logoModalVisible: false
        });
    }

    handleSubmitAddRoom = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const request = Object.assign({}, values);
                console.log(request);
                addRoom(request).then(response => {
                    console.log(response);
                    notification.success({
                        message: 'Chika Smarthome',
                        description: "Thêm phòng thành công."
                    })
                    this.forceUpdate();
                }).catch(error => {
                    notification.error({
                        message: 'Chika Smarthome',
                        description: "Thêm phòng thất bại" || error.message
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
                <Form onSubmit={this.handleSubmitAddRoom} autoComplete='off'>
                    <Form.Item label='Tên phòng'>
                        {getFieldDecorator('name', {
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
                            <Input  type='hidden' />
                        )}
                        {logoName !== 'Logo' ? <img alt='logo-icon' src={`/image/user/room/${logoName}.png`} style={{width: '5vw', marginRight: '2vw'}}/> : null }
                        <Button type='dashed' onClick={this.handleShowModal}>
                            {logoName === 'Logo' ? 'Chọn Logo' : 'Chọn Lại'}
                        </Button>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" size="large">Thêm Phòng</Button>
                </Form>

                <aside>
                    <Modal visible={logoModalVisible} closable={false}
                            title="LOGO"
                            centered
                            width='35vw'
                            footer={(
                                <Button key="back" onClick={this.handleCancelModal}>
                                    Quay về
                                </Button>
                            )}>
                        <Row gutter={[18,24]}>
                            <Col span={6} onClick={() => this.handleChangeLogoName('living room 1')}>
                                <img className="modal__room-icon" alt="living-room-icon" src="/image/user/room/living room 1.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('living room 2')}>
                                <img className="modal__room-icon" alt="living-room-icon" src="/image/user/room/living room 2.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('kitchen 1')}>
                                <img className="modal__room-icon" alt="kitchen-icon" src="/image/user/room/kitchen 1.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('kitchen 2')}>
                                <img className="modal__room-icon" alt="kitchen-icon" src="/image/user/room/kitchen 2.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('bedroom 1')}>
                                <img className="modal__room-icon" alt="bedroom-icon" src="/image/user/room/bedroom 1.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('bedroom 2')}>
                                <img className="modal__room-icon" alt="bedroom-icon" src="/image/user/room/bedroom 2.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('bathroom')}>
                                <img className="modal__room-icon" alt="bathroom-icon" src="/image/user/room/bathroom.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('working room')}>
                                <img className="modal__room-icon" alt="working-room-icon" src="/image/user/room/working room.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('garden')}>
                                <img className="modal__room-icon" alt="garden-icon" src="/image/user/room/garden.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('balcony')}>
                                <img className="modal__room-icon" alt="balcony-icon" src="/image/user/room/balcony.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('garage')}>
                                <img className="modal__room-icon" alt="garage-icon" src="/image/user/room/garage.png"/>
                            </Col>
                        </Row>
                    </Modal>
                </aside>
            </div>            
        )
    }
}

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
                request.id = this.props.room.id
                console.log(request);
                updateRoom(request).then(response => {
                    console.log(response);
                    notification.success({
                        message: 'Chika Smarthome',
                        description: "Thêm phòng thành công."
                    })
                    this.forceUpdate();
                }).catch(error => {
                    notification.error({
                        message: 'Chika Smarthome',
                        description: "Thêm phòng thất bại" || error.message
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
                            initialValue: this.state.logoName
                        })(
                            <Input  type='hidden' />
                        )}
                        {logoName !== 'Logo' ? <img alt='logo-icon' src={`/image/user/room/${logoName}.png`} style={{width: '5vw', marginRight: '2vw'}}/> : null }
                        <Button type='dashed' onClick={this.handleShowModal}>
                            {logoName === 'Logo' ? 'Chọn Logo' : 'Chọn Lại'}
                        </Button>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" size="large">Cập Nhật</Button>
                </Form>

                <aside>
                    <Modal visible={logoModalVisible} closable={false}
                            title="LOGO"
                            centered
                            width='35vw'
                            footer={(
                                <Button key="back" onClick={this.handleCancelModal}>
                                    Quay về
                                </Button>
                            )}>
                        <Row gutter={[18,24]}>
                            <Col span={6} onClick={() => this.handleChangeLogoName('living room 1')}>
                                <img className="modal__room-icon" alt="living-room-icon" src="/image/user/room/living room 1.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('living room 2')}>
                                <img className="modal__room-icon" alt="living-room-icon" src="/image/user/room/living room 2.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('kitchen 1')}>
                                <img className="modal__room-icon" alt="kitchen-icon" src="/image/user/room/kitchen 1.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('kitchen 2')}>
                                <img className="modal__room-icon" alt="kitchen-icon" src="/image/user/room/kitchen 2.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('bedroom 1')}>
                                <img className="modal__room-icon" alt="bedroom-icon" src="/image/user/room/bedroom 1.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('bedroom 2')}>
                                <img className="modal__room-icon" alt="bedroom-icon" src="/image/user/room/bedroom 2.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('bathroom')}>
                                <img className="modal__room-icon" alt="bathroom-icon" src="/image/user/room/bathroom.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('working room')}>
                                <img className="modal__room-icon" alt="working-room-icon" src="/image/user/room/working room.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('garden')}>
                                <img className="modal__room-icon" alt="garden-icon" src="/image/user/room/garden.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('balcony')}>
                                <img className="modal__room-icon" alt="balcony-icon" src="/image/user/room/balcony.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('garage')}>
                                <img className="modal__room-icon" alt="garage-icon" src="/image/user/room/garage.png"/>
                            </Col>
                        </Row>
                    </Modal>
                </aside>
            </div>            
        )
    }
}