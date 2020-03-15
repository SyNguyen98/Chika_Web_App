import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Modal, Button, Form, Input, Icon, notification } from 'antd';
import { addRoom } from '../../service/room.service'

import '../../styles/user/user-room.component.css';

class UserRoomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            modalVisible: false
        }
    }
    
    componentDidMount() {
      window.scrollTo(0, 0);
    }

    handleShowModal = () => {
        this.setState({ modalVisible: true });
    };
    
    handleCancelModal = () => {
        this.setState({ modalVisible: false });
    }

    render() {
        const { modalVisible } = this.state;
        const AntAddRoomForm = Form.create()(AddRoomForm)
        const rooms = [];
        return(
            <div className='user-room'>
                <h1>PHÒNG</h1>
                <div className='user-room__list-room'>
                    <Row>
                        <Col className='user-room__list-room__item' span={6} onClick={this.handleShowModal}>
                            <h2>THÊM PHÒNG</h2>
                            <img alt="add-icon" src="/image/user/room/add-icon.png" style={{width: '5vw', marginTop: '1vw'}}/>
                            <br/>
                            <img alt="room-icon" src="/image/user/room/room-icon.png"style={{width: '8vw', marginTop: '1.5vw'}}/>
                        </Col>
                        <Col className='user-room__list-room__item' span={6}>
                            <h2>PHÒNG KHÁCH</h2>
                            <img alt="room-icon" src="https://cdn4.iconfinder.com/data/icons/office-workplace-1/50/26-512.png" style={{width: '8vw', marginTop: '1vw'}}/>
                        </Col>
                        <Col className='user-room__list-room__item' span={6}>
                            <h2>PHÒNG BẾP</h2>
                            <img alt="add-icon" src="https://cdn3.iconfinder.com/data/icons/furniture-and-interior-7/92/34-512.png" style={{width: '8vw', marginTop: '1vw'}}/>
                        </Col>
                        <Col className='user-room__list-room__item' span={6}>
                            <h2>PHÒNG NGỦ 1</h2>
                            <img alt="add-icon" src="https://cdn3.iconfinder.com/data/icons/hotel-112/50/92-512.png" style={{width: '8vw', marginTop: '1vw'}}/>
                        </Col>
                        <Col className='user-room__list-room__item' span={6}>
                            <h2>PHÒNG NGỦ 2</h2>
                            <img alt="add-icon" src="https://cdn3.iconfinder.com/data/icons/hotel-service-reception-staff-room-service-for-tou/50/11-512.png" style={{width: '8vw', marginTop: '1vw'}}/>
                        </Col>
                        <Col className='user-room__list-room__item' span={6}>
                            <h2>PHÒNG LÀM VIỆC</h2>
                            <img alt="add-icon" src="https://cdn4.iconfinder.com/data/icons/logistics-55/50/20-512.png" style={{width: '8vw', marginTop: '1vw'}}/>
                        </Col>
                    </Row>
                </div>

                <Modal visible={modalVisible} closable={false}
                        title="THÊM PHÒNG"
                        centered
                        width='20vw'
                        footer={(
                            <Button key="back" onClick={this.handleCancelModal}>
                                Quay về
                            </Button>
                        )}>
                    <AntAddRoomForm submitAddRoom={this.handleSubmitAddRoom}/>
                </Modal>
            </div>
        )
    }
}
  
export default withRouter(UserRoomComponent);

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
                addRoom(request).then(response => {
                    console.log(response);
                    notification.success({
                        message: 'Chika Smarthome',
                        description: "Thêm phòng thành công."
                    })
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
                            <Input  size="large"
                                    prefix={<Icon type="form" />}
                                    disabled={true}/>
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
                            <Col span={6} onClick={() => this.handleChangeLogoName('living room')}>
                                <img className="modal__room-icon" alt="living-room-icon" src="/image/user/room/living room.png"/>
                            </Col>
                            <Col span={6} onClick={() => this.handleChangeLogoName('kitchen')}>
                                <img className="modal__room-icon" alt="kitchen-icon" src="/image/user/room/kitchen.png"/>
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