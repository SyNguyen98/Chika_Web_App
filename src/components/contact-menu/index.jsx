import React, {Fragment} from 'react';

import './contact-menu.css';

import {SUPPORTING_LINK} from "../../constant/link";

const imageUri = "/image/contact-menu/";

const ContactMenuComponent = ({history}) => (
    <Fragment>
        <div className="contact contact-facebook"
             onClick={() => {
                 window.open("https://www.facebook.com/chikacorporation/")
             }}>
            <img alt="facebook" src={`${imageUri}facebook.png`}/>
            <h1>FACEBOOK</h1>
        </div>
        <div className="contact contact-email"
             onClick={() => {
                 window.open("https://mail.google.com/mail/u/0/?view=cm&fs=1&to=chikacorporation@gmail.com")
             }}>
            <img alt="mail" src={`${imageUri}gmail.png`}/>
            <h1>EMAIL</h1>
        </div>
        <div className="contact contact-support"
             onClick={() => {
                 history.push(SUPPORTING_LINK)
             }}>
            <img alt="ho-tro" src={`${imageUri}ho-tro.png`}/>
            <h1>HỖ TRỢ</h1>
        </div>
        <div className="contact contact-phone">
            <img alt="phone" src={`${imageUri}phone.png`}/>
            <h1>070 123 4567</h1>
        </div>
    </Fragment>
)

export default ContactMenuComponent;