import React, {Component} from 'react';
import {Icon, Badge, Row, Col} from 'antd';

import './user-management.css';

import {haveFeedback} from '../../../services/FeedbackService'
import {
    ADMIN_ADD_USER_LINK,
    ADMIN_FEEDBACK_LINK,
    ADMIN_PURCHASE_LINK,
    ADMIN_USER_LIST_LINK
} from "../../../constant/link";

export default class UserManagementComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            haveFeedback: false,
            isLoading: false
        }
    }

    loadFeedback = () => {
        this.setState({isLoading: true});
        haveFeedback().then(response => {
            this.setState({
                haveFeedback: response.success,
                isLoading: false
            });
        }).catch(error => {
            this.setState({isLoading: false});
        });
    }

    handleChangeComponent = (link) => {
        this.props.history.push(link);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.loadFeedback()
    }

    render() {
        const {haveFeedback} = this.state;
        return (
            <div className="admin-user">
                <Row className="admin-user__menu" gutter={[48, 16]}>
                    <Col className='admin-user__item' span={8}
                         onClick={() => this.handleChangeComponent(ADMIN_USER_LIST_LINK)}>
                        <Icon type="solution"/>
                        <h1>DANH SÁCH<br/>NGƯỜI DÙNG</h1>
                    </Col>
                    <Col className='admin-user__item' span={8}
                         onClick={() => this.handleChangeComponent(ADMIN_ADD_USER_LINK)}>
                        <Icon type="user-add"/>
                        <h1>THÊM NGƯỜI DÙNG</h1>
                    </Col>
                    <Col className='admin-user__item' span={8}
                         onClick={() => this.handleChangeComponent(ADMIN_PURCHASE_LINK)}>
                        <Icon type="shopping-cart"/>
                        <h1>MUA HÀNG</h1>
                    </Col>
                    <Col className='admin-user__item' span={8}
                         onClick={() => this.handleChangeComponent(ADMIN_FEEDBACK_LINK)}>
                        <Icon type="message"/> <br/>
                        {haveFeedback ? (
                            <Badge dot>
                                <h1>PHẢN HỒI</h1>
                            </Badge>
                        ) : (
                            <h1>PHẢN HỒI</h1>
                        )}
                    </Col>
                </Row>
            </div>
        )
    }
}