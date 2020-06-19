import React, {Component, Fragment} from 'react';
import {Button, Col, Modal, Row} from 'antd';

import {ErrorNotification} from "../../../components/notification";
import {getRooms} from '../../../services/RoomService'
import {setHeaderBackground} from "../services/CommonService";

import {ROOM_IMG_URI} from "../../../constant/uri";
import {USER_ROOM_LINK} from "../../../constant/link";
import {ROOM_COLOR} from "../../../constant/color";
import {LIST_ROOM} from "../../../constant";

import './room.scss';
import AddRoomFormComponent from "./components/add-room";

export default class ListRoomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            addModalVisible: false,
            roomList: JSON.parse(sessionStorage.getItem(LIST_ROOM)) || [],
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

    getRandomValue(min, max) {
        return (Math.random() * (max - min) + min).toFixed(1);
    }

    render() {
        const {addModalVisible, roomList} = this.state;
        return (
            <Fragment>
                <Row className='user-rooms'>
                    {roomList.map((item, i) => {
                        return (
                            <Col id={item.id} className='item' span={6} key={i}
                                 onClick={() => this.handleGoToRoomPage(item.id)}>
                                <div className='header'
                                     style={setHeaderBackground(ROOM_COLOR[i], `${ROOM_IMG_URI}${item.logo}.jpg`)}>
                                    <img alt="icon" src={`${ROOM_IMG_URI}${item.logo}-icon.png`}/>
                                    <p>{item.name.toUpperCase()}</p>
                                </div>
                                <Row gutter={[8, 16]} className='body'>
                                    <Col span={12}>
                                        <h2>NHIỆT ĐỘ</h2>
                                        <p>{this.getRandomValue(26, 28)}<span> &#8451;</span></p>
                                    </Col>
                                    <Col span={12}>
                                        <h2>ĐỘ ẨM</h2>
                                        <p>{this.getRandomValue(60, 70)}<span> &#37;</span></p>
                                    </Col>
                                </Row>
                            </Col>
                        )
                    })}
                    <Col className='add' span={6} onClick={this.handleShowModal}>
                        <h2>THÊM PHÒNG</h2>
                        <img alt="add-icon" src={`${ROOM_IMG_URI}add-icon.png`}/>
                    </Col>
                </Row>

                <Modal visible={addModalVisible} closable={false}
                       title="THÊM PHÒNG"
                       centered
                       width='400px'
                       footer={(
                           <span>
                               <Button type="default" onClick={this.handleCancelModal}>
                                   Quay Về
                               </Button>
                               <Button type="primary" onClick={() => this.addRoomForm.handleSubmit()}>
                                   Thêm Phòng
                               </Button>
                           </span>
                       )}>
                    <AddRoomFormComponent ref={instance => { this.addRoomForm = instance; }}/>
                </Modal>
            </Fragment>
        )
    }
}

