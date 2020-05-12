import React, {Component, Fragment} from "react";
import {Button, Col, Icon, Row} from "antd";

import "./remote.css";
import {DEVICE_IMG_URI} from "../../../../../../constant/uri";

export default class RemoteComponent extends Component {
    render() {
        const {device, sendIrValue} = this.props;
        return (
            <Fragment>
                {device.logo === "television" ? <RemoteTV sendIrValue={sendIrValue}/> : <RemoteConditioner/>}
            </Fragment>

        )
    }
}

const RemoteTV = ({sendIrValue}) => (
    <Row className="remote">
        <Col span={6} className="remote__volume">
            <p>Âm Lượng</p>
            <Button onClick={() => sendIrValue("VOLUME_UP")}><Icon type="plus"/></Button>
            <br/>
            <Button onClick={() => sendIrValue("VOLUME_DOWN")}><Icon type="minus"/></Button>
        </Col>
        <Col span={12} style={{textAlign: "center"}}>
            <p>Chọn Kênh</p>
            <Row className="remote__channel-row">
                <Col span={8}>
                    <Button onClick={() => sendIrValue("CHANNEL_1")}>1</Button>
                </Col>
                <Col span={8}>
                    <Button onClick={() => sendIrValue("CHANNEL_2")}>2</Button>
                </Col>
                <Col span={8}>
                    <Button onClick={() => sendIrValue("CHANNEL_3")}>3</Button>
                </Col>
            </Row>
            <Row className="remote__channel-row">
                <Col span={8}>
                    <Button onClick={() => sendIrValue("CHANNEL_4")}>4</Button>
                </Col>
                <Col span={8}>
                    <Button onClick={() => sendIrValue("CHANNEL_5")}>5</Button>
                </Col>
                <Col span={8}>
                    <Button onClick={() => sendIrValue("CHANNEL_6")}>6</Button>
                </Col>
            </Row>
            <Row className="remote__channel-row">
                <Col span={8}>
                    <Button onClick={() => sendIrValue("CHANNEL_7")}>7</Button>
                </Col>
                <Col span={8}>
                    <Button onClick={() => sendIrValue("CHANNEL_8")}>8</Button>
                </Col>
                <Col span={8}>
                    <Button onClick={() => sendIrValue("CHANNEL_9")}>9</Button>
                </Col>
            </Row>
            <Row className="remote__channel-row">
                <Button onClick={() => sendIrValue("CHANNEL_0")}>0</Button>
            </Row>

        </Col>
        <Col span={6} className="remote__channel">
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
                    <Button className="down-btn"><Icon type="minus" /></Button>
                    <Button className="up-btn"><Icon type="plus" /></Button>
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

