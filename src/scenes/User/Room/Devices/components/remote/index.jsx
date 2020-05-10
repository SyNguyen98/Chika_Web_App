import React, {Component} from "react";
import {Button, Col, Icon, Row} from "antd";

import "./remote.css";

export default class RemoteTV extends Component {
    render() {
        const {sendIrValue} = this.props
        return (
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
    }
}