import React, {Component, Fragment} from "react";

import {Checkbox, Col, Form, Icon, Input, Row, TimePicker} from "antd";
import moment from "moment";

import {IconModal} from "../../../../../components/modal";
import {SCRIPT_IMG_URI} from "../../../../../constant/uri";
import {SCRIPT_NAME} from "../../../../../constant/name";

import './info-form.scss';

const dayOfWeek = [
    {name: 'Thứ Hai', value: {value: 'MON', order: 1} },
    {name: 'Thứ Ba', value: {value: 'TUE', order: 2} },
    {name: 'Thứ Tư', value: {value: 'WED', order: 3} },
    {name: 'Thứ Năm', value: {value: 'THU', order: 4} },
    {name: 'Thứ Sáu', value: {value: 'FRI', order: 5} },
    {name: 'Thứ Bảy', value: {value: 'SAT', order: 6} },
    {name: 'Chủ Nhật', value: {value: 'SUN', order: 7} }
];

export default class InfoFormComponent extends Component {

    handleSubmit = () => {
        return this.infoForm.handleSubmitForm();
    }

    render() {
        const AntForm = Form.create()(InfoForm);
        return (
            <AntForm wrappedComponentRef={instance => { this.infoForm = instance; }}/>
        )
    }
}

class InfoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconModal: false
        }
    }

    handleShowModal = () => {
        this.setState({iconModal: true})
    }

    handleCancelModal = () => {
        this.setState({iconModal: false})
    };

    handleChangeLogo = logoName => {
        this.props.form.setFieldsValue({logo: logoName});
        this.handleCancelModal();
    };

    handleSubmitForm = () => {
        let scriptInfo = null;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                scriptInfo = {
                    logo: values.logo,
                    name: values.name,
                    time: moment(values.time).format("HH:mm"),
                    days: values.days.sort((a, b) => a.order - b.order).map(day => day.value).join()
                };
            }
        });
        return scriptInfo;
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        return (
            <Fragment>
                <Form autoComplete='off' className="add-script__form">
                    <Row gutter={[24, 16]}>
                        <Col span={12}>
                            <Form.Item>
                                {getFieldDecorator('logo', {
                                    rules: [{required: true, message: 'Vui lòng chọn logo!'}]
                                })(
                                    <Input type='hidden'/>
                                )}
                                <img alt="logo" src={getFieldValue("logo") === undefined ? '/image/logo-here-icon.png'
                                    : `${SCRIPT_IMG_URI}${getFieldValue("logo")}-icon.png`}
                                     onClick={this.handleShowModal}/>
                            </Form.Item>
                            <Form.Item label='Tên kịch bản'>
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: 'Vui lòng nhập tên kịch bản!'}]
                                })(
                                    <Input size="large"
                                           prefix={<Icon type="form"/>}
                                           placeholder="Vd: Đi ngủ, Đi làm ..."/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='Chọn thời gian'>
                                {getFieldDecorator('time', {
                                    rules: [{ required: true, message: 'Vui lòng chọn thời gian!' }],
                                })(
                                    <TimePicker format={"HH:mm"}/>
                                )}
                            </Form.Item>
                            <Form.Item label='Chọn ngày'>
                                {getFieldDecorator('days', {
                                    rules: [{ required: true, message: 'Vui lòng chọn ngày!' }],
                                })(
                                    <Checkbox.Group>
                                        {dayOfWeek.map((item, i) =>
                                            <Checkbox key={i} value={item.value}>
                                                {item.name}
                                            </Checkbox>
                                        )}
                                    </Checkbox.Group>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <IconModal visible={this.state.iconModal} imgUri={SCRIPT_IMG_URI} logoName={SCRIPT_NAME}
                           handleCancelModal={this.handleCancelModal}
                           handleChangeLogo={this.handleChangeLogo}/>
            </Fragment>
        )
    }
}