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

export const FireAlertModal = ({visible, handleCancelModal}) => (
    <Modal className="fire-alert" visible={visible} closable={false}
           title={(<b>CẢNH BÁO CHÁY</b>)}
           centered
           width='300px'
           footer={(
               <Button type="danger" onClick={handleCancelModal}>
                   TẮT CẢNH BÁO
               </Button>
           )}>
        <div>
            <img alt="alert" src="https://www.snowdonia-fire.co.uk/images/icon-fire-alarms.png"/>
        </div>
    </Modal>
)