import React, {Component, Fragment} from "react";
import {Button, Col, Icon, Popover, Row} from "antd";

import "./remote.css";
import {DEVICE_IMG_URI} from "../../../../../../constant/uri";
import {ErrorNotification, SuccessNotification} from "../../../../../../components/notification";
import {deleteButtonById, getAllButtonByRemoteId} from "../../../../../../services/IRService";
import LearningModal from "../learning-modal";
import {mqttPublish} from "../../../../../../services/MqttService";


export default class RemoteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuVisible: [],
            buttons: []
        }
    }

    handleLeftClick = (data) => {
        mqttPublish(this.props.device.topic + "/control", data);
    }

    handleRightClick = (event, index) => {
        event.preventDefault();
        let menuVisible = this.state.menuVisible;
        menuVisible[index] = !menuVisible[index];
        this.setState({menuVisible});
    }

    handleDeleteButton = (id) => {
        deleteButtonById(id).then(() => {
            this.setState({menuVisible: false});
            this.loadButtons();
            SuccessNotification("Đã xóa nút")
        }).catch(error => {
            ErrorNotification(error.message || "Đã có lỗi xảy ra")
        })
    }

    loadButtons = () => {
        getAllButtonByRemoteId(this.props.device.id).then(buttons => {
            let menuVisible = [];
            for (let i = 0; i < buttons.length; i++) {
                menuVisible.push(false);
            }
            this.setState({buttons, menuVisible});
        }).catch(error => {
            ErrorNotification(error.message || "Đã có lỗi xảy ra")
        })
    }

    componentDidMount() {
        this.loadButtons();
    }

    render() {
        const {device, sendIrValue, modalVisible} = this.props;
        const {menuVisible, buttons} = this.state;
        return (
            <Fragment>
                {device.logo === "television" ? <RemoteTV sendIrValue={sendIrValue}/> : <RemoteConditioner/>}
                <Row className="remote__add-btn">
                    {buttons.map((item, i) => {
                        return (
                            <Col key={i} span={6}>
                                <Popover content={<a onClick={() => this.handleDeleteButton(item.id)}>Xóa</a>}
                                         visible={menuVisible[i]}>
                                    <Button onClick={() => this.handleLeftClick(item.data)}
                                            onContextMenu={(event) => this.handleRightClick(event, i)}>
                                        <Icon type={item.logo}/>
                                    </Button>
                                </Popover>
                            </Col>
                        )
                    })}
                </Row>

                <LearningModal remoteId={device.id} topic={device.topic + "/learn"} visible={modalVisible}
                               loadButtons={this.loadButtons}
                               mqttMessage={this.props.mqttMessage}
                               handleCancelLearning={this.props.handleCancelLearning}/>
            </Fragment>
        )
    }
}

const RemoteTV = ({sendIrValue}) => (
    <Row className="remote__tv">
        <Col span={6} className="remote__tv__volume">
            <p>Âm Lượng</p>
            <Button onClick={() => sendIrValue("VOLUME_UP")}><Icon type="plus"/></Button>
            <br/>
            <Button onClick={() => sendIrValue("VOLUME_DOWN")}><Icon type="minus"/></Button>
        </Col>
        <Col span={12} style={{textAlign: "center"}}>
            <p>Chọn Kênh</p>
            <Row className="remote__tv__channel-row">
                <Col span={8}>
                    <Button onClick={() => sendIrValue("1")}>1</Button>
                </Col>
                <Col span={8}>
                    <Button onClick={() => sendIrValue("2")}>2</Button>
                </Col>
                <Col span={8}>
                    <Button onClick={() => sendIrValue("3")}>3</Button>
                </Col>
            </Row>
            <Row className="remote__tv__channel-row">
                <Col span={8}>
                    <Button onClick={() => sendIrValue("4")}>4</Button>
                </Col>
                <Col span={8}>
                    <Button onClick={() => sendIrValue("5")}>5</Button>
                </Col>
                <Col span={8}>
                    <Button onClick={() => sendIrValue("6")}>6</Button>
                </Col>
            </Row>
            <Row className="remote__tv__channel-row">
                <Col span={8}>
                    <Button onClick={() => sendIrValue("7")}>7</Button>
                </Col>
                <Col span={8}>
                    <Button onClick={() => sendIrValue("8")}>8</Button>
                </Col>
                <Col span={8}>
                    <Button onClick={() => sendIrValue("9")}>9</Button>
                </Col>
            </Row>
            <Row className="remote__tv__channel-row">
                <Button onClick={() => sendIrValue("0")}>0</Button>
            </Row>

        </Col>
        <Col span={6} className="remote__tv__channel">
            <p>Chuyển Kênh</p>
            <Button onClick={() => sendIrValue("CHANNEL_UP")}><Icon type="up"/></Button><br/>
            <Button onClick={() => sendIrValue("CHANNEL_DOWN")}><Icon type="down"/></Button>
        </Col>
    </Row>
)

class RemoteConditioner extends Component {
    render() {
        return (
            <div className="remote__air-conditioner">
                <h1>22 &#8451;</h1>
                <div>
                    <Button className="down-btn"><Icon type="minus"/></Button>
                    <Button className="up-btn"><Icon type="plus"/></Button>
                </div>
                <Row>
                    <Col span={8}>
                        <p>Quạt</p>
                        <img alt="fan-mode" src={`${DEVICE_IMG_URI}ac-fan-icon.png`}/>
                    </Col>
                    <Col span={8}>
                        <p>Xoay</p>
                        <img alt="swing-mode" src={`${DEVICE_IMG_URI}ac-swing-icon.png`}/>
                    </Col>
                    <Col span={8}>
                        <p>Ngủ</p>
                        <img alt="sleep-mode" src={`${DEVICE_IMG_URI}ac-sleep-icon.png`}/>
                    </Col>
                </Row>
            </div>
        )
    }
}