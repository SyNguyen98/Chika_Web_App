import React from 'react';
import {Layout, Icon, Divider} from 'antd';

import './footer.css';

const {Footer} = Layout;

const FooterComponent = () => (

    <Footer className="app-footer">
        <div style={{margin: '1vw 5vw 1vw 5vw'}}>
            <div className="app-footer_agency">
                <div>
                    <h1>HỒ CHÍ MINH</h1>
                    <p><Icon type="home" theme="filled"/>&ensp;227 Nguyễn Văn Cừ, Phường 4, Quận 5</p>
                    <p><Icon type="phone" theme="filled"/>&ensp;<b>0903 123 456</b></p>
                </div>
                <div style={{marginLeft: '11vw'}}>
                    <h1>ĐÀ LẠT</h1>
                    <p><Icon type="home" theme="filled"/>&ensp;40 Đồng Tâm, Phường 4</p>
                    <p><Icon type="phone" theme="filled"/>&ensp;<b>0904 765 432</b></p>
                </div>
                <div style={{marginLeft: '11vw'}}>
                    <h1>AN GIANG</h1>
                    <p><Icon type="home" theme="filled"/>&ensp;43 Trần Khắc Chung, Phường Đông Xuyên, Long Xuyên</p>
                    <p><Icon type="phone" theme="filled"/>&ensp;<b>0905 246 809</b></p>
                </div>
            </div>

            <Divider/>

            <div className="app-footer_contact">
                <img alt='web-icon' src='/image/website.png'/><span style={{marginRight: '5vw'}}>www.chika.vn</span>
                <img alt='web-icon' src='/image/mail.png'/><span>info@chika.vn</span>
            </div>
        </div>
    </Footer>
)

export default FooterComponent;
