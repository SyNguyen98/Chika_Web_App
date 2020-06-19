import React, {Component, Fragment} from "react";
import {Col, Row} from "antd";

import ScriptInfoModal from "./components/script-info";
import AddScriptModal from "./components/add-script";
import {ErrorNotification} from "../../../components/notification";
import {getAllScriptByUserId} from "../../../services/ScriptService";
import {setHeaderBackground} from "../services/CommonService";

import {ROOM_COLOR} from "../../../constant/color";
import {ROOM_IMG_URI, SCRIPT_IMG_URI} from "../../../constant/uri";
import {LIST_SCRIPT, DAY_OF_WEEK} from "../../../constant";

import "./scripts.scss";

export default class ListScriptComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scriptList: JSON.parse(sessionStorage.getItem(LIST_SCRIPT)) || [],
            script: null,
            addScriptModal: false,
            scriptInfoModal: false
        }
    }

    handleOpenAddModal = () => {
        this.setState({addScriptModal: true})
    }

    handleOpenInfoModal = script => {
        this.setState({
            script: script,
            scriptInfoModal: true
        })
    }

    handleCancelModal = () => {
        this.setState({addScriptModal: false, scriptInfoModal: false});
    }

    getDayOfWeek = days => {
        let dayOfWeek = [];
        days.split(",").forEach(day => {
            let dow = DAY_OF_WEEK.find(dow => dow.day === day);
            if (dow) {
                dayOfWeek.push(dow.name);
            }
        })
        if (dayOfWeek.length < 7) {
            return dayOfWeek.join('\xa0\xa0\xa0');
        }
        return 'MỖI NGÀY';
    }

    loadScripts = () => {
        getAllScriptByUserId().then(scripts => {
            sessionStorage.setItem(LIST_SCRIPT, JSON.stringify(scripts));
            this.setState({scriptList: scripts})
        }).catch(error => {
            ErrorNotification(error);
        })
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.loadScripts();
    }

    render() {
        const { scriptList } = this.state;
        return (
            <Fragment>
                <Row className="scripts">
                    {scriptList.map((item, i) => {
                        return (
                            <Col key={i} span={6} className='item' onClick={() => this.handleOpenInfoModal(item)}>
                                <div className='header'
                                     style={setHeaderBackground(ROOM_COLOR[i], `${SCRIPT_IMG_URI}${item.logo}.jpg`)}>
                                    <span>
                                        <img alt={item.logo} src={`${SCRIPT_IMG_URI}${item.logo}-icon.png`}/>
                                    </span>
                                    <p>{item.name.toUpperCase()}</p>
                                </div>
                                <div className='footer'>
                                    <p>{this.getDayOfWeek(item.days)}</p>
                                    <b>{item.time}</b>
                                </div>
                            </Col>
                        )
                    })}
                    <Col className='add' span={6} onClick={this.handleOpenAddModal}>
                        <h2>THÊM KỊCH BẢN</h2>
                        <img alt="add-icon" src={`${ROOM_IMG_URI}add-icon.png`}/>
                    </Col>
                </Row>

                <AddScriptModal visible={this.state.addScriptModal}
                                handleCancelModal={this.handleCancelModal}
                                loadDevices={this.loadScripts}/>

                <ScriptInfoModal visible={this.state.scriptInfoModal} script={this.state.script}
                                 handleCancelModal={this.handleCancelModal}
                                 loadDevices={this.loadScripts}/>
            </Fragment>

        )
    }
}