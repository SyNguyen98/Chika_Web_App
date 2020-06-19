import React, {Component} from "react";
import {Button, Col, Modal, Row} from "antd";
import {deleteScriptById} from "../../../../../services/ScriptService";
import {ErrorNotification, SuccessNotification} from "../../../../../components/notification";
import {SCRIPT_IMG_URI} from "../../../../../constant/uri";

import './script-info.scss';
import {DAY_OF_WEEK} from "../../../../../constant";

export default class ScriptInfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleDeleteScript = () => {
        deleteScriptById(this.props.script.id).then(res => {
            SuccessNotification("Đã xóa kịch bản")
            this.props.loadDevices();
            this.props.handleCancelModal();
        }).catch(err =>
            ErrorNotification("Đã có lỗi xảy ra")
        )
    }

    getDayOfWeek = days => {
        let dayOfWeek = [];
        days.split(",").forEach(day => {
            let dow = DAY_OF_WEEK.find(dow => dow.day === day);
            if (dow) {
                dayOfWeek.push(dow.name);
            }
        })
        if (dayOfWeek.length < 7) {
            return dayOfWeek.join('\xa0\xa0\xa0');
        }
        return 'MỖI NGÀY';
    }

    render() {
        const {visible, script} = this.props;
        return (
            <Modal visible={visible} closable={false}
                   title="CHI TIẾT KỊCH BẢN"
                   centered
                   width='500px'
                   onCancel={this.props.handleCancelModal}
                   footer={(
                       <span>
                           <Button type="danger" onClick={this.handleDeleteScript}>Xóa Kịch Bản</Button>
                           <Button type="default" onClick={this.props.handleCancelModal}>Quay Về</Button>
                       </span>
                   )}>
                {script ? (
                    <div className="script-info">
                        <Row>
                            <Col span={7} className="script-col1">
                                <span>
                                    <img alt={script.logo} src={`${SCRIPT_IMG_URI}${script.logo}-icon.png`}/>
                                </span>
                            </Col>
                            <Col span={17} className="script-col2">
                                <p><b>Tên:&emsp;</b>{script.name.toUpperCase()}</p>
                                <p><b>Thời gian:&emsp;</b>{script.time}</p>
                                <p><b>Ngày hoạt động:&emsp;</b>{this.getDayOfWeek(script.days)}</p>
                            </Col>
                        </Row>
                        <Row>
                            <p><b>Thiết bị:</b></p>
                            {script.devices.map((device, i) => {
                                return (
                                    <Col span={6} key={i}>&bull; {device.name}</Col>
                                )
                            })}
                        </Row>
                    </div>
                ) : null}
            </Modal>
        )
    }
}