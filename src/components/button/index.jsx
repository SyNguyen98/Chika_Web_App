import React from "react";
import {Button, Icon} from "antd";

const RoundOrangeButton = ({onClick}) => {
    return (
        <Button className="round-button-orange" shape="round" onClick={() => onClick()}>
            Xem thêm<Icon type="double-right" />
        </Button>
    )
}

export default RoundOrangeButton;