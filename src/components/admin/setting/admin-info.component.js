import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';

import '../../../styles/admin/setting/admin-info.component.css';

class AdminInfoComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { currentUser } = this.props;
    return(
      <Fragment>
        <div className="admin-info">
          {currentUser ? (
            <div className="admin-info__float">
              <div className="admin-info__col1">
                <img alt="avatar" src={currentUser.avatar}/>
                <h1>{currentUser.name}</h1>
                <p><Icon type="code" />&ensp;{currentUser.employeeId}</p>
              </div>
              <div className="admin-info__col2">
                <h1><Icon type="idcard" />&emsp;Thông tin cá nhân</h1>
                <p><Icon type="mobile" />&emsp;&emsp;{currentUser.phone}</p>
                <p><Icon type="mail" />&emsp;&emsp;{currentUser.email}</p>
                <p><Icon type="calendar" />&emsp;&emsp;{currentUser.birthday}</p>
                <p><Icon type="home" />&emsp;&emsp;{currentUser.address}</p>
              
                <h1><Icon type="solution" />&emsp;Thông tin công việc</h1>
                <p><Icon type="team" />&emsp;&emsp;{currentUser.department}</p>
                <p><Icon type="laptop" />&emsp;&emsp;{currentUser.function}</p>
              </div>
              <div className="admin-info__corner1"></div>
              <div className="admin-info__corner2"></div>
            </div>
          ) : null}
        </div>
      </Fragment>
    )
  }
}

export default withRouter(AdminInfoComponent);