import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Icon, notification } from 'antd';

import '../../styles/user/user-home.component.css';

import { LINK_USER_ROOM, LINK_USER_SCRIPT, LINK_USER_CAMERA } from '../../constant'

const imageUri = "/image/user/home/";

class UserHomeComponent extends Component {    

    componentDidMount() {
      window.scrollTo(0, 0);
    }

    handleChangeUserComponent = (link) => {
        this.props.history.push(link);
    }
  
    render() {
        const { currentUser } = this.props;
        return(
            <div className='user-home'>
                <Row className='user-home__row'>
                    <Col className='user-home__col col1' span={6}>
                        <p>An Ninh <Icon type="caret-right" /></p>
                        <img alt="shield-icon" src={`${imageUri}shield-icon.png`} style={{width: '5vw'}}/><i>An toàn</i>
                    </Col>
                    <Col className='user-home__col col2' span={6}>
                        <p>Điện năng <Icon type="caret-right" /></p>
                        <b>190</b><i>kW</i>
                    </Col>
                    <Col className='user-home__col col3' span={6}>
                        <p>Nhiệt độ <Icon type="caret-right" /></p>
                        <b>27</b><i>&#8451;</i>
                    </Col>
                    <Col className='user-home__col col4' span={6}>
                        <p>Độ ẩm <Icon type="caret-right" /></p>
                        <b>90</b><i>&#37;</i>
                    </Col>
                    <Col className='user-home__col col5' span={6}>
                        <p>Không khí <Icon type="caret-right" /></p>
                        <b>270</b><i>aog</i>
                    </Col>
                </Row>
            </div>
        )
    }
}
  
export default withRouter(UserHomeComponent);