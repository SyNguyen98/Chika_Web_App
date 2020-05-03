import React, {Component} from 'react';
import {Button, Col, Form, Icon, Input, Modal, notification, Row} from "antd";

import {ROOM_NAME} from "../../../../../../constant/name";
import {ROOM_IMG_URI} from "../../../../../../constant/uri";
import {USER_ROOM_LINK} from "../../../../../../constant/link";

import {updateRoom} from "../../../../../../services/RoomService";


const UpdateRoomModal = ({room, visible, handleCancelModal}) => {
    const AntUpdateRoomForm = Form.create()(UpdateRoomForm)
    return (
        <Modal visible={visible} closable={false}
               title="CHỈNH SỬA PHÒNG"
               centered
               width='20vw'
               footer={(
                   <Button type="primary" onClick={handleCancelModal}>
                       Quay về
                   </Button>
               )}>
            <AntUpdateRoomForm room={room}/>
        </Modal>
    )
}

export default UpdateRoomModal;

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
                    this.props.history.push(USER_ROOM_LINK);
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
                <Form onSubmit={this.handleSubmitUpdateRoom} autoComplete='off'>
                    <Form.Item label='Tên phòng'>
                        {getFieldDecorator('name', {
                            initialValue: this.props.room.name,
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
                        <img alt={logoName} src={`${ROOM_IMG_URI}${logoName}-icon.png`}
                             style={{width: '5vw', marginRight: '2vw'}}/>
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
                    <Row gutter={[18, 24]}>
                        {ROOM_NAME.map((item, i) => {
                            return (
                                <Col key={i} span={6} onClick={() => this.handleChangeLogoName(item)}>
                                    <img className="modal__room-icon" alt={`${ROOM_IMG_URI}${item}-icon`}
                                         src={`${ROOM_IMG_URI}${item}-icon.png`}/>
                                </Col>
                            )
                        })}
                    </Row>
                </Modal>
            </div>
        )
    }
}