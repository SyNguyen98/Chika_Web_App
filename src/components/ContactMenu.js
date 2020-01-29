import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import '../styles/ContactMenu.css';
import { LINK_SUPPORTING } from '../constant'

class ContactMenu extends Component {

  handleOpenLink = (event, link) => {
    window.open(link);
  }

  handleToSupportPage = (event) => {
    this.props.history.push(LINK_SUPPORTING);
  }

  render() {
    return(
      <div className="contact-menu">
        <div className="contact-menu_item" onClick={(event) => this.handleOpenLink(event, "https://www.facebook.com/groups/443966666386196/")}>
          <h1>FACEBOOK</h1>
          <img alt="facebook" src="/image/contact-menu/facebook.png"/>
        </div>
        <div className="contact-menu_item" onClick={(event) => this.handleOpenLink(event, "https://mail.google.com/mail/u/0/?view=cm&fs=1&to=chikacorporation@gmail.com")}>
          <h1>EMAIL</h1>
          <img alt="mail" src="/image/contact-menu/gmail.png"/>
        </div>
        <div className="contact-menu_item" onClick={this.handleToSupportPage}>
          <h1>HỖ TRỢ</h1>
          <img alt="ho-tro" src="/image/contact-menu/ho-tro.png"/>
        </div>
        <div className="contact-menu_item">
          <h1>070 123 4567</h1>
          <img alt="phone" src="/image/contact-menu/phone.png"/>
        </div>
      </div>
    );
  }
}

export default withRouter(ContactMenu);
