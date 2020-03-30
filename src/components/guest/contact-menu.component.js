import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/guest/contact-menu.component.css';
import { LINK_SUPPORTING } from '../../constant'

const imageUri = "/image/contact-menu/";

class ContactMenuComponent extends Component {

  handleOpenLink = (link) => {
    window.open(link);
  }

  handleToSupportPage = () => {
    this.props.history.push(LINK_SUPPORTING);
  }

  render() {
    return(
      <Fragment>
        <div className="contact contact-facebook" onClick={() => this.handleOpenLink("https://www.facebook.com/chikacorporation/")}>
          <img alt="facebook" src={`${imageUri}facebook.png`}/>
          <h1>FACEBOOK</h1>
        </div>
        <div className="contact contact-email" onClick={() => this.handleOpenLink("https://mail.google.com/mail/u/0/?view=cm&fs=1&to=chikacorporation@gmail.com")}>
          <img alt="mail" src={`${imageUri}gmail.png`}/>
          <h1>EMAIL</h1>
        </div>
        <div className="contact contact-support" onClick={this.handleToSupportPage}>
          <img alt="ho-tro" src={`${imageUri}ho-tro.png`}/>
          <h1>HỖ TRỢ</h1>         
        </div>
        <div className="contact contact-phone">
          <img alt="phone" src={`${imageUri}phone.png`}/>
          <h1>070 123 4567</h1>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(ContactMenuComponent);
