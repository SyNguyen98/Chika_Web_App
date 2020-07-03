import React, {Component} from "react";

import {Tabs} from "antd";
import ChangePassComponent from "../../../components/change-pass";
import FeedbackComponent from "./components/feedback";
import './support.scss';

const { TabPane } = Tabs;

export default class UserSupportComponent extends Component {

    onChange = (value) => {
        this.setState({feedback: value});
    }

    render() {
        return (
            <div className="user-support">
                <div className="container">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Đổi mật khẩu" key="1">
                            <div className="change-password">
                                <ChangePassComponent onLogout={this.props.onLogout}/>
                            </div>
                        </TabPane>
                        <TabPane tab="Phản hồi" key="2">
                            <div className="feedback">
                                <FeedbackComponent user={this.props.currentUser} />
                            </div>
                        </TabPane>
                    </Tabs>

                </div>
            </div>
        )
    }
}