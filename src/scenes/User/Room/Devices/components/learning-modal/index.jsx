import React, {Component, Fragment} from "react";
import {mqttPublish, mqttSubscribe} from "../../../../../../services/MqttService";
import {Button, Col, Icon, Modal, Result, Row, Spin, Steps} from "antd";
import {REMOTE_ICON} from "../../../../../../constant/name";
import {DEVICE_IMG_URI} from "../../../../../../constant/uri";

import './learning.css';
import {saveRemoteButton} from "../../../../../../services/IRService";
import {ErrorNotification, SuccessNotification} from "../../../../../../components/notification";

const {Step} = Steps;

export default class LearningModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            buttonLogo: null,
            buttonValue: null
        }
    }

    prevStep = () => {
        this.setState({currentStep: this.state.currentStep - 1});
    }

    handleChooseLogo = (logo) => {
        this.setState({
            buttonLogo: logo,
            currentStep: this.state.currentStep + 1
        });
        mqttPublish(this.props.topic, "1");
        mqttSubscribe(this.props.topic);
    }

    handleDoneLearning = () => {
        const button = {
            logo: this.state.buttonLogo,
            data: this.state.buttonValue,
            remoteId: this.props.remoteId
        }
        saveRemoteButton(button).then(button => {
            this.setState({currentStep: 0});
            this.props.handleCancelLearning();
            this.props.loadButtons();
            SuccessNotification("Tạo nút mới thành công!")
        }).catch(error => {
            ErrorNotification(error.message || "Đã có lỗi xảy ra")
        })
    }

    handleCancelLearning = () => {
        this.setState({currentStep: 0});
        this.props.handleCancelLearning();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {mqttMessage, topic} = this.props;
        if (mqttMessage !== prevProps.mqttMessage && mqttMessage.topic === topic &&
            mqttMessage.message !== "1" && mqttMessage.message !== "0") {
            this.setState({
                buttonValue: mqttMessage.message,
                currentStep: 2
            });
        }
    }

    render() {
        const {visible} = this.props;
        const {currentStep} = this.state;
        const steps = [
            {
                title: 'Chọn Icon',
                content:
                    <div className="learning__icon">
                        <h5>Hãy chọn icon cho nút</h5>
                        <Row gutter={[18, 24]}>
                            {REMOTE_ICON.map((item, i) => {
                                return (
                                    <Col key={i} span={6} onClick={() => this.handleChooseLogo(item)}>
                                        <Icon type={item}/>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
            },
            {
                title: 'Học Lệnh',
                content:
                    <div className="learning__learn">
                        <h5>Hãy bấm nút cần học<br/>hướng về phía IRX</h5>
                        <img alt="learning-icon" src={`${DEVICE_IMG_URI}learning-icon.png`}/>
                        <br/><br/>
                        <Spin/>
                    </div>
            },
            {
                title: 'Hoàn Tất',
                content:
                    <Result status="success" title="Học Lệnh Hoàn Tất"/>
            }
        ];
        return (
            <Modal visible={visible} closable={false}
                   title="HỌC LỆNH"
                   centered
                   width='30vw'
                   footer={(
                       <Fragment>
                           {currentStep !== 0 ?
                               <Button onClick={this.prevStep}>
                                   Quay Về
                               </Button>
                               : null}
                           {currentStep !== 2 ? (
                               <Button type="danger" onClick={this.handleCancelLearning}>
                                   Hủy Học Lệnh
                               </Button>
                           ) : (
                               <Button type="primary" onClick={this.handleDoneLearning}>
                                   Xong
                               </Button>
                           )}
                       </Fragment>
                   )}>
                <Steps current={currentStep}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
                <div className="learning">{steps[currentStep].content}</div>
            </Modal>
        )
    }
}