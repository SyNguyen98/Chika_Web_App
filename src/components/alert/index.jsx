import React from 'react';
import {Button, Modal} from "antd";

const AlertModal = ({type, visible, handleCancelModal}) => (
    <Modal visible={visible} closable={false}
           title="CẢNH BÁO"
           centered
           width='20vw'
           footer={(
               <Button type="danger" onClick={handleCancelModal}>
                   Tắt Cảnh Báo
               </Button>
           )}>
        {type === "SS04" ? (
            <img alt="fire-icon" src="/image/alert/fire-icon.png"/>
        ) : (
            <img alt="fire-icon" src="/image/alert/thief-icon.png"/>
        )}
    </Modal>
)

export default AlertModal;