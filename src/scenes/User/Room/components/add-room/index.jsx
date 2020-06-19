import React, {Component, Fragment} from "react";
import {Button, Form, Icon, Input} from "antd";
import {IconModal} from "../../../../../components/modal";
import {ErrorNotification, SuccessNotification} from "../../../../../components/notification";
import {addRoom} from '../../../../../services/RoomService'

import {ROOM_NAME} from "../../../../../constant/name";
import {ROOM_IMG_URI} from "../../../../../constant/uri";

export default class AddRoomFormComponent extends Component {

    handleSubmit = () => {
        return this.addRoomForm.handleSubmitAddRoom();
    }

    render() {
        const AntForm = Form.create()(AddRoomForm);
        return (
            <AntForm wrappedComponentRef={instance => { this.addRoomForm = instance; }}/>
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
                addRoom(request).then(() => {
                    SuccessNotification("Thêm phòng thành công.")
                }).catch(() => {
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
            <Fragment>
                <Form autoComplete='off'>
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
                            initialValue: logoName,
                            rules: [{required: true, message: 'Vui lòng chọn logo!'}]
                        })(
                            <Input type='hidden'/>
                        )}
                        {logoName !== 'Logo' ? <img alt={logoName} src={`${ROOM_IMG_URI}${logoName}-icon.png`}
                                                    style={{width: '70px', marginRight: '20px'}}/> : null}
                        <Button type='dashed' onClick={this.handleShowModal}>
                            {logoName === 'Logo' ? 'Chọn Logo' : 'Chọn Lại'}
                        </Button>
                    </Form.Item>
                </Form>

                <IconModal visible={logoModalVisible} logoName={ROOM_NAME} imgUri={ROOM_IMG_URI}
                           handleCancelModal={this.handleCancelModal}
                           handleChangeLogo={this.handleChangeLogoName}/>
            </Fragment>
        )
    }
}