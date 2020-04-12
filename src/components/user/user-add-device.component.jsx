import React, { Component } from 'react';
import { Button, Modal, Steps, message, notification, Row, Col, Form, Input, Icon, Radio } from 'antd';
import { getProductByUser } from '../../service/product.service';

const { Step } = Steps;
const imgProductUri = "/image/admin/product/"

export default class AddDeviceModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            product: null,
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

    handleChooseProduct = (product) => {
        console.log(product);
        const currentStep = this.state.currentStep + 1;
        this.setState({ currentStep, product })
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
        const { currentStep, productList, product } = this.state;
        const AntProductInfoForm = Form.create()(ProductInfoForm)
        const steps = [
            {
                title: 'Chọn Thiết Bị',
                content: (
                    <ProductListComponent productList={productList} handleChooseProduct={this.handleChooseProduct}/>
                )
            },
            {
                title: 'Điền thông tin',
                content: (
                    <AntProductInfoForm product={product}/>
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
                            {currentStep > 0 && (
                                <Button style={{ marginLeft: 8 }} onClick={this.prevStep}>Quay Về</Button>
                            )}
                            {currentStep < steps.length && (
                                <Button type="danger" onClick={handleCancelModal}>Hủy</Button>
                            )}
                            {/* {currentStep === steps.length - 1 && (
                                <Button type="primary" onClick={this.done}>Xác Nhận</Button>
                            )} */}
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

const ProductListComponent = ({ productList, handleChooseProduct }) => {
    return(
        <Row>
            {productList.map((item, i) => (
                <Col key={i} span={6} style={{textAlign: 'center', cursor: 'pointer'}} onClick={() => handleChooseProduct(item)}>
                    {item.type.includes("Switch Wifi") ? [
                        <img key={i} alt={item.type} src={`${imgProductUri}switch-wifi.png`} style={{width: '10vw'}}/>,
                        <p>{item.name}</p>
                    ] : null}
                    {item.type.includes("Switch Rf") ? [
                        <img key={i} alt={item.type} src={`${imgProductUri}switch-rf.png`} style={{width: '10vw'}}/>,
                        <p>{item.name}</p>
                    ] : null}
                    {item.type === "Module Ir" ? [
                        <img key={i} alt={item.type} src={`${imgProductUri}module-ir.png`} style={{width: '10vw', marginTop: '1vw'}}/>,
                        <p>{item.name}</p>
                    ] : null}
                    {item.type === "Sensor" ? [
                        <img key={i} alt={item.type} src={`${imgProductUri}sensor.png`} style={{width: '10vw'}}/>,
                        <p>{item.name}</p>
                    ] : null}
                </Col>
            ))}
        </Row>
    )
}

class ProductInfoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoModalVisible: false,
            logoName: ''
        }
    }
    
    render() {
        const { product } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { logoModalVisible, logoName } = this.state;
        const buttonCheckbox = [];       
        for (let i = 1; i <= parseInt(product.type.charAt(product.type.length - 1), 10); i++) {
            buttonCheckbox.push(
                <Radio value={i}>Nút {i}</Radio>
            )
        }
        return(
            <Form autoComplete='off'>
                <Form.Item label='Tên thiết bị'>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Vui lòng nhập tên thiết bị!' }]
                    })(
                        <Input  size="large"
                                prefix={<Icon type="form" />}
                                placeholder="Tên thiết bị"/>
                    )}
                </Form.Item>
                <Form.Item label='Logo'>
                    {getFieldDecorator('logo', {
                        rules: [{ required: true, message: 'Vui lòng chọn logo!' }]
                    })(
                        <Input type='hidden' />
                    )}
                    {/* {logoName !== 'Logo' ? <img alt={logoName} src={`${imageUri}${logoName}-icon.png`} style={{width: '5vw', marginRight: '2vw'}}/> : null } */}
                    <Button type='dashed' onClick={this.handleShowModal}>
                        {logoName === '' ? 'Chọn Logo' : 'Chọn Lại'}
                    </Button>
                </Form.Item>
                {product.type.includes("Switch") ? (
                    <Form.Item label='Tên thiết bị'>
                        {getFieldDecorator('button', {
                            rules: [{ required: true, message: 'Vui lòng chọn nút!' }]
                        })(
                            <Radio.Group>
                                {buttonCheckbox}
                            </Radio.Group>
                        )}
                    </Form.Item>
                ) : null}   
                <Button type="primary" htmlType="submit" size="large">Thêm Thiết Bị</Button>
            </Form>
        )
    }
}