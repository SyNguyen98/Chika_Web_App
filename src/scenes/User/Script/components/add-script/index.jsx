import React, {Component} from "react";
import {Button, Modal, Result, Steps} from "antd";

import "./add-script.scss";
import InfoFormComponent from "../info-form";
import DeviceFormComponent from "../device-form";
import {createScript} from "../../../../../services/ScriptService";
import {ErrorNotification} from "../../../../../components/notification";

const {Step} = Steps;

export default class AddScriptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            scriptInfo: null,
            scriptDevice: null
        }
    }

    handleCancelModal = () => {
        this.setState({currentStep: 0})
        this.props.loadDevices();
        this.props.handleCancelModal();
    }

    prevStep = () => {
        const currentStep = this.state.currentStep - 1;
        this.setState({currentStep});
    };

    nextStep = () => {
        const {currentStep} = this.state;
        switch (currentStep) {
            case 0:
                let scriptInfo = this.infoForm.handleSubmit();
                if (scriptInfo) {
                    const currentStep = this.state.currentStep + 1;
                    this.setState({currentStep, scriptInfo});
                }
                break;
            case 1:
                let scriptDevice = this.deviceForm.handleSubmit();
                if (scriptDevice) {
                    const {scriptInfo} = this.state;
                    let request = {
                        logo: scriptInfo.logo,
                        name: scriptInfo.name,
                        time: scriptInfo.time,
                        days: scriptInfo.days,
                        devices: scriptDevice
                    }
                    console.log(request);
                    createScript(request).then(response => {
                        const currentStep = this.state.currentStep + 1;
                        this.setState({currentStep, scriptDevice});
                    }).catch(error => {
                        ErrorNotification("Đã có lỗi xảy ra")
                    });
                }
                break;
            default:
                break;
        }
    }

    render() {
        const {visible} = this.props;
        const {currentStep} = this.state;
        const steps = [
            {
                title: 'Điền thông tin',
                content: <InfoFormComponent ref={instance => { this.infoForm = instance; }}/>
            },
            {
                title: 'Chọn thiết bị',
                content: <DeviceFormComponent ref={instance => { this.deviceForm = instance; }}/>
            },
            {
                title: 'Hoàn tất',
                content: <Result status="success" title="Tạo kịch bản hoàn tất"/>
            }
        ];
        return (
            <Modal visible={visible} closable={false}
                   title="THÊM KỊCH BẢN"
                   centered
                   width='800px'
                   footer={(
                       <div>
                           {currentStep > 0 && (
                               <Button style={{marginLeft: 8}} onClick={this.prevStep}>Quay Về</Button>
                           )}
                           {currentStep === 0 && (
                               <span>
                                   <Button type="danger" onClick={this.handleCancelModal}>Hủy</Button>
                                   <Button type="primary" onClick={this.nextStep}>Tiếp Tục</Button>
                               </span>

                           )}
                           {currentStep === 1 && (
                               <Button type="primary" onClick={this.nextStep}>Tạo Kịch Bản</Button>
                           )}
                           {currentStep === 2 && (
                               <Button type="primary" onClick={this.handleCancelModal}>Hoàn Tất</Button>
                           )}

                       </div>
                   )}>
                <Steps current={currentStep}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
                <div className="steps-content">{steps[currentStep].content}</div>
            </Modal>
        )
    }
}