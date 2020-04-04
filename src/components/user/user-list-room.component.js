import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Modal, Button, Form, Input, Icon, notification } from 'antd';
import { getRooms, addRoom } from '../../service/room.service'
import { LINK_USER_ROOM } from '../../constant'

import '../../styles/user/user-list-room.component.css';

const headerColor = [
    "rgba(192, 226, 37, 0.6), rgba(86, 228, 116, 0.6)", "rgba(63, 114, 253, 0.6), rgba(255, 42, 237, 0.6)",
    "rgba(89, 230, 255, 0.6), rgba(253, 241, 72, 0.6)", "rgba(255, 89, 227, 0.6), rgba(253, 154, 72, 0.6)",
    "rgba(255, 62, 62, 0.6), rgba(166, 72, 253, 0.6)", "rgba(96, 255, 33, 0.6), rgba(72, 90, 253, 0.6)",
    "rgba(255, 70, 141, 0.6), rgba(204, 255, 22, 0.6)", "rgba(255, 153, 20, 0.6), rgba(0, 136, 41, 0.6)"
]
const roomName = [
    "living room", "kitchen", "bedroom", "bathroom", "working room", "garden", "balcony", "garage"
]
const imageUri = "/image/user/room/"

class UserListRoomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            addModalVisible: false,
            roomList: JSON.parse(sessionStorage.getItem("listRoom")) || [],
        }
    }
    
    componentDidMount() {
      window.scrollTo(0, 0);
      this.loadRooms();
    }

    loadRooms = () => {
        getRooms().then(response => {
            this.setState({ roomList: response });
            sessionStorage.setItem("listRoom", JSON.stringify(response));
            console.log(response);
        }).catch(error => {
            notification.error({
                message: 'Chika Smarthome',
                description: error.message || "Tải danh sách phòng thất bại"
            })
        })
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
        });
    }

    setHeaderBackground = (color, url) => {
        return {
            background: `linear-gradient(90deg, ${color}), url('${url}')`,
            backgroundSize: '100% 20vh'
        } 
    }

    render() {
        const { addModalVisible, roomList } = this.state;
        const AntAddRoomForm = Form.create()(AddRoomForm)
        return(
            <Fragment>
                <Row className='user-list-room'>
                    {roomList.map((item, i) => {
                        return (
                            <Col className='user-list-room__item' span={6} key={i} onClick={() => this.handleGoToRoomPage(item.id)}>
                                <div className='user-list-room__item__header'
                                    style={this.setHeaderBackground(headerColor[i], `${imageUri}${item.logo}.jpg`)}>
                                    <img alt="icon" src={`${imageUri}${item.logo}-icon.png`}/>
                                    <p>{item.name.toUpperCase()}</p>
                                </div>
                                <Row gutter={[8, 16]} className='user-list-room__item__body'>
                                    <Col span={12}>
                                        <h2>NHIỆT ĐỘ</h2>
                                        <p>26<span>&#8451;</span></p>
                                    </Col>
                                    <Col span={12}>
                                        <h2>ĐỘ ẨM</h2>
                                        <p>12<span>&#37;</span></p>
                                    </Col>
                                </Row>
                            </Col>
                        )
                    })}
                    <Col className='user-list-room__item__add' span={6} onClick={this.handleShowModal}>
                        <h2>THÊM PHÒNG</h2>
                        <img alt="add-icon" src={`${imageUri}add-icon.png`}/>
                    </Col>
                </Row>

                <Modal visible={addModalVisible} closable={false}
                        title="THÊM PHÒNG"
                        centered
                        width='20vw'
                        footer={(
                            <Button type="primary" onClick={this.handleCancelModal}>
                                Quay về
                            </Button>
                        )}>
                    <AntAddRoomForm />
                </Modal>
            </Fragment>
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
                            <Input type='hidden' />
                        )}
                        {logoName !== 'Logo' ? <img alt={logoName} src={`${imageUri}${logoName}-icon.png`} style={{width: '5vw', marginRight: '2vw'}}/> : null }
                        <Button type='dashed' onClick={this.handleShowModal}>
                            {logoName === 'Logo' ? 'Chọn Logo' : 'Chọn Lại'}
                        </Button>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" size="large">Thêm Phòng</Button>
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
                                    <img className="modal__room-icon" alt="living-room-icon" src={`${imageUri}${item}-icon.png`}/>
                                </Col>
                            )
                        })}
                    </Row>
                </Modal>
            </div>            
        )
    }
}