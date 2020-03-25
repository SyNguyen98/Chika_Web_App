import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Badge, Row, Col } from 'antd';

import '../../../styles/admin/user/admin-user.component.css';
import {LINK_ADMIN_LIST_USER, LINK_ADMIN_ADD_USER, LINK_ADMIN_SHOP, LINK_ADMIN_FEEDBACK } from '../../../constant';

class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            haveFeedback: false
        }
    }
  
    handleChangeComponent = (link) => {
        this.props.history.push(link);
    }
  
    componentDidMount() {
        window.scrollTo(0, 0);
    }
  
    render() {
        const { haveFeedback } = this.state;
        return(
        <div className="admin-user">
            <Row className="admin-user__menu" gutter={[48, 16]}>
                <Col className='admin-user__item' span={8}  onClick={() => this.handleChangeComponent(LINK_ADMIN_LIST_USER)}>
                    <Icon type="solution" />
                    <h1>DANH SÁCH<br/>NGƯỜI DÙNG</h1>
                </Col>
                <Col className='admin-user__item' span={8}  onClick={() => this.handleChangeComponent(LINK_ADMIN_ADD_USER)}>
                    <Icon type="user-add" />
                    <h1>THÊM NGƯỜI DÙNG</h1>
                </Col>
                <Col className='admin-user__item' span={8}  onClick={() => this.handleChangeComponent(LINK_ADMIN_SHOP)}>
                    <Icon type="shopping-cart" />
                    <h1>MUA HÀNG</h1>
                </Col>
                <Col className='admin-user__item' span={8}  onClick={() => this.handleChangeComponent(LINK_ADMIN_FEEDBACK)}>
                    <Icon type="message" />
                    <h1>PHẢN HỒI</h1>
                </Col>
            </Row>
        </div>
      )
    }
}
  
export default withRouter(UserComponent);