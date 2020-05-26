import React, {Component} from "react";
import {Button, Modal} from "antd";

import "./scripts.css";

export default class AddScriptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0
        }
    }

    handleCancelModal = () => {
        this.setState({currentStep: 0})
        this.props.handleCancelModal();
    }

    componentDidMount() {

    }

    render() {
        const {visible} = this.props;
        return (
            <Modal visible={visible} closable={false}
                   title="THÊM KỊCH BẢN"
                   centered
                   width='30vw'
                   footer={(
                       <Button type="primary" onClick={this.handleCancelModal}>
                           Quay về
                       </Button>
                   )}>
                Thêm
            </Modal>
        )
    }
}