import React, {Component} from 'react';
import {Icon, Input, Button, Modal, Radio, Popconfirm, notification} from 'antd';

import {getAllSwitchRf, saveSwitchRf, deleteSwitchRf} from '../../../../services/ProductService';
import TableComponent from '../../table';

export default class SwitchRfListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchRfList: [],
            modalVisible: false,
            buttonNum: 1,
            switchChannel: '',
            saveSwitchResponse: null,
            disableAddSwitch: false
        }
    }

    loadAllSwitchRf = () => {
        this.setState({isLoading: true});
        getAllSwitchRf().then(response => {
            this.setState({
                switchRfList: response,
                isLoading: false
            });
        }).catch(error => {
            this.setState({isLoading: false});
            notification.error({
                message: 'Chika Smarthome',
                description: error.message || "Đã có lỗi xảy ra. Vui lòng thử lại sau!",
            });
        });
    }

    handleShowModal = () => {
        this.setState({modalVisible: true});
    }

    handleCancelModal = () => {
        this.setState({
            modalVisible: false,
            saveSwitchResponse: null,
            disableAddSwitch: false
        });
    }

    handleAddSwitch = () => {
        this.setState({
            isLoading: true
        });
        saveSwitchRf(this.state.buttonNum, this.state.switchChannel).then(response => {
            this.setState({
                isLoading: false,
                saveSwitchResponse: response,
                disableAddSwitch: true
            });
            this.state.switchRfList.unshift(response);
            this.forceUpdate();
        }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    handleDeleteSwitch = (id) => {
        this.setState({
            isLoading: true
        });
        deleteSwitchRf(id).then(() => {
            this.setState({
                isLoading: false,
            });
            notification.success({
                message: 'Chika Smarthome',
                description: "Sản phẩm đã được xóa.",
            });
            let index = this.state.switchRfList.indexOf(this.state.switchRfList.find(s => s.id === id));
            this.state.switchRfList.splice(index, 1);
            this.forceUpdate();
        }).catch(error => {
            this.setState({
                isLoading: false
            });
            notification.error({
                message: 'Chika Smarthome',
                description: "Đã có lỗi xảy ra. Xin vui lòng thử lại sau!"
            });
        });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.loadAllSwitchRf();
    }

    render() {
        const {switchRfList, modalVisible, buttonNum, saveSwitchResponse, disableAddSwitch} = this.state;
        const columns = [
            {
                title: 'Ngày sản xuất',
                key: 'day',
            },
            {
                title: 'Mã sản phẩm',
                key: 'id',
            },
            {
                title: 'Loại',
                key: 'type',
            },
            {
                title: 'Kênh',
                key: 'channel',
            },
            {
                title: 'Mã người dùng',
                key: 'userId',
                render: (text) => <span>{text ? text : 'Chưa có'}</span>,
            },
            {
                dataIndex: 'delete',
                key: 'delete',
                render: (text, row) => <Popconfirm title="Bạn có chắc muốn xóa?"
                                                   onConfirm={() => this.handleDeleteSwitch(row.id)}
                                                   okText="Xóa"
                                                   cancelText="Hủy">
                    <b style={{cursor: 'pointer', color: 'blue'}}>Xóa</b>
                </Popconfirm>,
            },
        ];
        return (
            <div className="admin-device__list">
                <Button className="admin-device__list__add-btn" type="primary" onClick={this.handleShowModal}>
                    <Icon type="plus"/>
                </Button>
                <h1>DANH SÁCH CÔNG TẮC RF</h1>
                {switchRfList ? (
                    <TableComponent columns={columns} list={switchRfList}/>
                ) : null}

                <Modal visible={modalVisible}
                       title="Thêm sản phẩm"
                       centered
                       width='40vw'
                       footer={[
                           <Button key="back" onClick={this.handleCancelModal}>
                               Quay về
                           </Button>,
                           <Button disabled={disableAddSwitch} key="submit" type="primary"
                                   onClick={this.handleAddSwitch}>
                               Thêm
                           </Button>,
                       ]}>
                    <div style={{margin: '0 3vw 0 3vw'}}>
                        {saveSwitchResponse ? (
                            <div>
                                <div style={{marginBottom: '1vw', fontSize: '1.5vw'}}>
                                    <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/><b>&ensp;Đã thêm
                                    sản phẩm</b>
                                </div>
                                <div style={{fontSize: '1.2vw'}}>
                                    <p><b>Ngày sản xuất: </b>{saveSwitchResponse.day}</p>
                                    <p><b>Mã sản phẩm: </b></p>
                                    <p>{saveSwitchResponse.id}</p>
                                    <p><b>Loại: </b>{saveSwitchResponse.type}</p>
                                    <p><b>Kênh: </b>{saveSwitchResponse.channel}</p>
                                </div>
                            </div>
                        ) : (
                            <div style={{margin: '1vw 5vw 1vw 5vw', fontSize: '1.2vw'}}>
                                <p>&bull;&emsp;Chọn loại công tắc muốn thêm:</p>
                                <Radio.Group onChange={e => {
                                    this.setState({buttonNum: e.target.value})
                                }} value={buttonNum}>
                                    <Radio value={1}>1 nút</Radio>
                                    <Radio value={2} style={{marginLeft: '2vw'}}>2 nút</Radio>
                                    <Radio value={3} style={{marginLeft: '2vw'}}>3 nút</Radio>
                                </Radio.Group>
                                <br/><br/>
                                <p>&bull;&emsp;Kênh vô tuyến</p>
                                <Input placeholder='Vd: 83878217022001'
                                       size="large"
                                       prefix={<Icon type="wifi"/>}
                                       onChange={(e) => {
                                           this.setState({switchChannel: e.target.value})
                                       }}/>
                            </div>
                        )}
                    </div>
                </Modal>
            </div>
        )
    }
}