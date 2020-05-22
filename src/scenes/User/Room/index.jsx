import React, {Component, Fragment} from 'react';
import {Button, Col, Form, Icon, Input, Modal, Row} from 'antd';
import {addRoom, getRooms} from '../../../services/RoomService'

import './room.css';

import {ROOM_NAME} from "../../../constant/name";
import {ROOM_IMG_URI} from "../../../constant/uri";
import {USER_ROOM_LINK} from "../../../constant/link";
import {ROOM_COLOR} from "../../../constant/color";
import {IconModal} from "../../../components/modal";
import {LIST_ROOM} from "../../../constant";
import {ErrorNotification, SuccessNotification} from "../../../components/notification";

export default class ListRoomComponent extends Component {
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
            this.setState({roomList: response})
            sessionStorage.setItem(LIST_ROOM, JSON.stringify(response));
            console.log(response);
        }).catch(error => {
            ErrorNotification(error.message || "Tải danh sách phòng thất bại");
        })
    }

    handleGoToRoomPage = (id) => {
        this.props.history.push(`${USER_ROOM_LINK}/${id}`);
    }

    handleShowModal = () => {
        this.setState({addModalVisible: true});
    };

    handleCancelModal = () => {
        this.setState({addModalVisible: false});
    }

    setHeaderBackground = (color, url) => {
        return {
            background: `linear-gradient(90deg, ${color}), url('${url}')`,
            backgroundSize: '100% 20vh'
        }
    }

    render() {
        const {addModalVisible, roomList} = this.state;
        const AntAddRoomForm = Form.create()(AddRoomForm)
        return (
            <Fragment>
                <Row className='user-list-room'>
                    {roomList.map((item, i) => {
                        return (
                            <Col id={item.id} className='user-list-room__item' span={6} key={i}
                                 onClick={() => this.handleGoToRoomPage(item.id)}>
                                <div className='user-list-room__item__header'
                                     style={this.setHeaderBackground(ROOM_COLOR[i], `${ROOM_IMG_URI}${item.logo}.jpg`)}>
                                    <img alt="icon" src={`${ROOM_IMG_URI}${item.logo}-icon.png`}/>
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
                        <img alt="add-icon" src={`${ROOM_IMG_URI}add-icon.png`}/>
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
                    <AntAddRoomForm/>
                </Modal>
            </Fragment>
        )
    }
}

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
                sessionStorage.removeItem("listRoom");
                const request = Object.assign({}, values);
                addRoom(request).then(response => {
                    SuccessNotification("Thêm phòng thành công.")
                }).catch(error => {
                    ErrorNotification("Thêm phòng thất bại")
                })
            }
        });
    }

    handleShowModal = () => {
        this.setState({logoModalVisible: true});
    };

    handleCancelModal = () => {
        this.setState({logoModalVisible: false});
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {logoModalVisible, logoName} = this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmitAddRoom} autoComplete='off'>
                    <Form.Item label='Tên phòng'>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Vui lòng nhập tên phòng!'}]
                        })(
                            <Input size="large"
                                   prefix={<Icon type="form"/>}
                                   placeholder="Tên phòng"/>
                        )}
                    </Form.Item>
                    <Form.Item label='Logo'>
                        {getFieldDecorator('logo', {
                            initialValue: logoName
                        })(
                            <Input type='hidden'/>
                        )}
                        {logoName !== 'Logo' ? <img alt={logoName} src={`${ROOM_IMG_URI}${logoName}-icon.png`}
                                                    style={{width: '5vw', marginRight: '2vw'}}/> : null}
                        <Button type='dashed' onClick={this.handleShowModal}>
                            {logoName === 'Logo' ? 'Chọn Logo' : 'Chọn Lại'}
                        </Button>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" size="large">Thêm Phòng</Button>
                </Form>

                <IconModal visible={logoModalVisible} logoName={ROOM_NAME} imgUri={ROOM_IMG_URI}
                           handleCancelModal={this.handleCancelModal}
                           handleChangeLogo={this.handleChangeLogoName}/>
            </div>
        )
    }
}