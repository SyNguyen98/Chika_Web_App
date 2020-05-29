import React from "react";
import {Button, Col, Modal, Row} from "antd";

import "./modal.css";

export const IconModal = ({visible, logoName, imgUri, handleCancelModal, handleChangeLogo}) => (
    <Modal visible={visible} closable={false}
           title="LOGO"
           centered
           width='35vw'
           footer={(
               <Button type="primary" onClick={handleCancelModal}>
                   Quay về
               </Button>
           )}>
        <Row gutter={[18, 24]}>
            {logoName.map((item, i) => {
                return (
                    <Col key={i} span={6} onClick={() => handleChangeLogo(item)}>
                        <img className="modal-icon" alt={`${imgUri}${item}-icon`}
                             src={`${imgUri}${item}-icon.png`}/>
                    </Col>
                )
            })}
        </Row>
    </Modal>
)

export const AlertModal = ({type, visible, handleCancelModal}) => {

    const getHeader = () => {
        switch (type) {
            case 'SS01':
                return 'CẢNH BÁO ĐỘT NHẬP';
            case 'SS02':
                return 'CẢNH BÁO CÓ TRỘM';
            case 'SS04':
                return 'CẢNH BÁO CHÁY';
            default:
                break;
        }
    }

    const getImage = () => {
        switch (type) {
            case 'SS01':
                return 'https://cdn0.iconfinder.com/data/icons/security-protection-2/64/Security-152-512.png';
            case 'SS02':
                return 'https://cdn0.iconfinder.com/data/icons/people-lifestyle/100/Thief-02-512.png';
            case 'SS04':
                return 'https://www.snowdonia-fire.co.uk/images/icon-fire-alarms.png';
            default:
                break;
        }
    }

    return (
        <Modal className="fire-alert" visible={visible} closable={false}
               title={(<b>{getHeader()}</b>)}
               centered
               width='300px'
               footer={(
                   <Button type="danger" onClick={handleCancelModal}>
                       TẮT CẢNH BÁO
                   </Button>
               )}>
            <div>
                <img alt="alert" src={getImage()}/>
            </div>
        </Modal>
    )

}