import React, {Component} from "react";
import {Col, Row} from "antd";

import "./scripts.css";

export default class ListScriptComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Row className="scripts">
                <Col span={6}>
                    Kịch bản 1
                </Col>
                <Col span={6}>
                    Kịch bản 2
                </Col>
                <Col span={6}>
                    Kịch bản 3
                </Col>
                <Col span={6}>
                    Kịch bản 4
                </Col>
            </Row>
        )
    }
}