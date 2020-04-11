import React, { Component } from 'react';
import { Button, Modal, Steps, message, notification } from 'antd';
import { getProductByUser } from '../../service/product.service';

const { Step } = Steps;

export default class AddDeviceModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            productList: []
        }
    }

    nextStep = () => {
        const currentStep = this.state.currentStep + 1;
        this.setState({ currentStep });
    }
    
    prevStep = () => {
        const currentStep = this.state.currentStep - 1;
        this.setState({ currentStep });
    }

    done = () => {
        this.props.handleCancelModal();
        message.success('Processing complete!');
    }

    componentWillMount() {
        getProductByUser(this.props.currentUser.id).then(response => {
            console.log(response);
            this.setState({
                productList: response
            })
        }).catch(error => {
            notification.error({
                message: 'Chika Smarthome',
                description: error.message || "Tải danh sách thiết bị thất bại"
            })
        })
    }

    render() {
        const { modalVisible, handleCancelModal } = this.props;
        const { currentStep, productList } = this.state;
        const steps = [
            {
                title: 'Chọn Thiết Bị',
                content: (
                    <ProductListComponent productList={productList}/>
                )
            },
            {
                title: 'Chọn Nút',
                content: (
                    <div>
                        chọn 1 nút
                    </div>
                )
            },
            {
                title: 'Điền thông tin',
                content: (
                    <div>
                        điền thông tin
                    </div>
                )
            }
        ];
        return(
            <Modal visible={modalVisible} closable={false}
                    title="THÊM THIẾT BỊ"
                    centered
                    width='50vw'
                    footer={(
                        <div>
                            {currentStep === 0 && (
                                <Button style={{ marginLeft: 8 }} onClick={handleCancelModal}>Quay Về</Button>
                            )}
                            {currentStep > 0 && (
                                <Button style={{ marginLeft: 8 }} onClick={this.prevStep}>Quay Về</Button>
                            )}
                            {currentStep < steps.length - 1 && (
                                <Button type="primary" onClick={this.nextStep}>Tiếp Theo</Button>
                            )}
                            {currentStep === steps.length - 1 && (
                                <Button type="primary" onClick={this.done}>Thêm</Button>
                            )}
                        </div>
                    )}>
                <Steps current={currentStep}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{steps[currentStep].content}</div>
            </Modal>         
        )
    }
}

const ProductListComponent = ({ productList }) => {
    return(
        <div>
            {productList.map((item, i) => (
                <p key={i}>{item.name}</p>
                
            ))}
        </div>
    )
}