import React, {Component} from "react";
import {Button, Modal, Steps} from "antd";

import "./add-script.scss";
import InfoFormComponent from "../info-form";
import DeviceFormComponent from "../device-form";

const {Step} = Steps;

export default class AddScriptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
            scriptInfo: null,
            scriptDevice: null
        }
    }

    handleCancelModal = () => {
        this.setState({currentStep: 0})
        this.props.handleCancelModal();
    }

    prevStep = () => {
        const currentStep = this.state.currentStep - 1;
        this.setState({currentStep});
    };

    fillInForm = () => {
        let scriptInfo = this.infoForm.handleSubmit();
        if (scriptInfo) {
            const currentStep = this.state.currentStep + 1;
            this.setState({currentStep, scriptInfo});
        }
    }

    componentDidMount() {

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
                content: <DeviceFormComponent />
            },
            {
                title: 'Hoàn tất',
                content: ''
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
                               <Button type="danger" onClick={this.handleCancelModal}>Hủy</Button>
                           )}
                           <Button type="primary" onClick={this.fillInForm}>Tiếp Tục</Button>
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