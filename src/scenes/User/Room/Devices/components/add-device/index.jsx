import React, {Component, Fragment} from 'react';
import {Button, Modal, Steps, notification, Row, Col, Form, Input, Icon, Radio, Pagination} from 'antd';

import './add-device.css';

import {getProductByUser} from '../../../../../../services/ProductService';
import {getSwitchButtonsByDeviceTopic, saveDevice} from '../../../../../../services/DeviceService';

import {DEVICE_NAME} from "../../../../../../constant/name";
import {DEVICE_IMG_URI, USER_PRODUCT_IMG_URI} from "../../../../../../constant/uri";

const {Step} = Steps;

export default class AddDeviceModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            product: null,
            productList: [],
            usedButton: []
        }
    }

    loadProducts = () => {
        if (this.props.currentUser !== null) {
            getProductByUser(this.props.currentUser.id).then(productList => {
                this.setState({productList})
            }).catch(error => {
                notification.error({
                    message: 'Chika Smarthome',
                    description: error.message || "Tải danh sách thiết bị thất bại"
                })
            })
        }
    }

    prevStep = () => {
        const currentStep = this.state.currentStep - 1;
        this.setState({currentStep});
    };

    handleChooseProduct = (product) => {
        if (product.type.includes("SW") || product.type.includes("SR")) {
            getSwitchButtonsByDeviceTopic(product.id).then(usedButton => {
                console.log(usedButton);
                let currentStep = this.state.currentStep + 1;
                this.setState({currentStep, product, usedButton})
            }).catch(error => {
                notification.error({
                    message: 'Chika Smarthome',
                    description: error.message || "Tải danh sách thiết bị thất bại"
                })
            })
        } else {
            let currentStep = this.state.currentStep + 1;
            this.setState({currentStep, product})
        }
    };

    componentDidMount() {
        this.loadProducts();
    }

    render() {
        const {modalVisible, handleCancelModal} = this.props;
        const {currentStep, productList, product, usedButton} = this.state;
        const AntProductInfoForm = Form.create()(ProductInfoForm);
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
                    <AntProductInfoForm product={product} usedButton={usedButton} prevStep={this.prevStep}
                                        {...this.props}/>
                )
            }
        ];
        return (
            <Modal visible={modalVisible} closable={false}
                   title="THÊM THIẾT BỊ"
                   centered
                   width='50vw'
                   footer={(
                       <div>
                           {currentStep > 0 && (
                               <Button style={{marginLeft: 8}} onClick={this.prevStep}>Quay Về</Button>
                           )}
                           {currentStep < steps.length && (
                               <Button type="danger" onClick={handleCancelModal}>Hủy</Button>
                           )}
                       </div>
                   )}>
                <Steps current={currentStep}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
                {productList ? (
                    <div className="steps-content">{steps[currentStep].content}</div>
                ) : null}
            </Modal>
        )
    }
}

class ProductListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            productPage: this.props.productList.slice(0, 3)
        }
    }

    onChangePage = (currentPage) => {
        const {productList} = this.props;
        let productPage;
        productPage = productList.slice(currentPage * 3 - 3, currentPage * 3);
        this.setState({currentPage, productPage})

    }

    showProduct = (product, index) => {
        let imgSrc;
        if (product.type.includes("SW")) {
            imgSrc = `${USER_PRODUCT_IMG_URI}SW.png`;
        } else if (product.type.includes("SR")) {
            imgSrc = `${USER_PRODUCT_IMG_URI}SR.png`;
        } else {
            imgSrc = `${USER_PRODUCT_IMG_URI}${product.type}.png`;
        }
        return (
            <Col key={index} span={8} className="add-device__product-col"
                 onClick={() => this.props.handleChooseProduct(product)}>
                <img alt={product.type} src={imgSrc} style={{width: '10vw'}}/>
                <p>{product.name}</p>
            </Col>
        )
    }

    render() {
        const {productList} = this.props;
        const {currentPage, productPage} = this.state;
        return (
            <Fragment>
                <Row className="add-device__product-row">
                    {productPage.map((item, i) => this.showProduct(item, i))}
                </Row>
                <Pagination style={{textAlign: 'center'}} current={currentPage} pageSize={3} total={productList.length}
                            onChange={this.onChangePage}/>
            </Fragment>

        )
    }
}

class ProductInfoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoModalVisible: false,
        }
    }

    handleChangeLogo = (logoName) => {
        const {form} = this.props;
        form.setFieldsValue({logo: logoName});
        this.handleCancelModal();
    };

    handleShowModal = () => {
        this.setState({logoModalVisible: true})
    }

    handleCancelModal = () => {
        this.setState({logoModalVisible: false})
    };

    handleSubmitAddDevice = () => {
        const {product} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const request = Object.assign({}, values);
                request.type = product.type;
                request.roomId = window.location.pathname.substring(18);

                if (request.type.includes("SS")) {
                    switch (request.type) {
                        case "SS01":
                            request.logo = "door"
                            break;
                        case "SS02":
                            request.logo = "motion"
                            break;
                        case "SS03":
                            request.logo = "air"
                            break;
                        default:
                            request.logo = "fire"
                    }
                }

                if (request.type.includes("SW")) {
                    request.topic = `${product.id}/button${request.switchButton}`;
                } else {
                    request.topic = product.id;
                }
                console.log(request)
                saveDevice(request).then(() => {
                    this.props.handleCancelModal();
                    this.props.loadDevices(window.location.pathname.substring(18));
                    notification.success({
                        message: 'Chika Smarthome',
                        description: "Thêm thiết bị thành công"
                    })
                }).catch(error => {
                    notification.error({
                        message: 'Chika Smarthome',
                        description: error.message || "Vui lòng thử lại sau"
                    })
                })
            }
        });
    };

    render() {
        const {product, usedButton} = this.props;
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const {logoModalVisible} = this.state;
        const buttonCheckbox = [];
        for (let i = 1; i <= parseInt(product.type.charAt(product.type.length - 1), 10); i++) {
            if (usedButton.find(button => button === i) === undefined) {
                buttonCheckbox.push(
                    <Radio key={i} value={i}>Nút {i}</Radio>
                )
            }
        }
        if ((product.type.includes("SW") || product.type.includes("SR")) && buttonCheckbox.length === 0) {
            this.props.prevStep();
            notification.error({
                message: 'Chika Smarthome',
                description: "Công tắc đã sử dụng hết số nút"
            })
        }
        return (
            <Fragment>
                <Form autoComplete='off'>
                    <Form.Item label='Tên thiết bị'>
                        {getFieldDecorator('name', {
                            rules: [{required: true, message: 'Vui lòng nhập tên thiết bị!'}]
                        })(
                            <Input size="large"
                                   prefix={<Icon type="form"/>}
                                   placeholder="Vd: Đèn Trần, Quạt Trần ..."/>
                        )}
                    </Form.Item>

                    {product.type.includes("SW") || product.type.includes("SR") ? (
                        <Fragment>
                            <Form.Item label='Logo'>
                                {getFieldDecorator('logo', {
                                    rules: [{required: true, message: 'Vui lòng chọn logo!'}]
                                })(
                                    <Input type='hidden'/>
                                )}
                                {getFieldValue("logo") !== undefined ? <img alt={getFieldValue("logo")}
                                                                            src={`${DEVICE_IMG_URI}${getFieldValue("logo")}-icon.png`}
                                                                            style={{
                                                                                width: '5vw',
                                                                                marginRight: '2vw'
                                                                            }}/> : null}
                                <Button type='dashed' onClick={this.handleShowModal}>
                                    {getFieldValue("logo") === undefined ? 'Chọn Logo' : 'Chọn Lại'}
                                </Button>
                            </Form.Item>
                            <Form.Item label='Nút'>
                                {getFieldDecorator('switchButton', {
                                    rules: [{required: true, message: 'Vui lòng chọn nút!'}]
                                })(
                                    <Radio.Group>
                                        {buttonCheckbox}
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </Fragment>
                    ) : null}
                    <Button type="primary" htmlType="submit" size="large" onClick={this.handleSubmitAddDevice}>Thêm
                        Thiết Bị</Button>
                </Form>

                <Modal visible={logoModalVisible} closable={false}
                       title="LOGO"
                       centered
                       width='35vw'
                       footer={(
                           <Button type="primary" onClick={this.handleCancelModal}>
                               Quay về
                           </Button>
                       )}>
                    <Row gutter={[18, 24]}>
                        {DEVICE_NAME.map((item, i) => {
                            return (
                                <Col key={i} span={6} onClick={() => this.handleChangeLogo(item)}>
                                    <img className="modal__room-icon" alt={`${DEVICE_IMG_URI}${item}-icon`}
                                         src={`${DEVICE_IMG_URI}${item}-icon.png`}/>
                                </Col>
                            )
                        })}
                    </Row>
                </Modal>
            </Fragment>
        )
    }
}