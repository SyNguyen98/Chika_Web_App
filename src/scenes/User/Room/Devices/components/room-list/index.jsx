import React, {Component, Fragment} from "react";

import {setHeaderBackground} from "../../../../services/CommonService";

import {ROOM_COLOR} from "../../../../../../constant/color";
import {ROOM_IMG_URI} from "../../../../../../constant/uri";

import './room-list.scss';

export default class RoomListComponent extends Component {
    render() {
        const { roomList, roomId, handleGoToRoomPage } = this.props;
        return (
            <Fragment>
                {roomList.map((item, i) => {
                    if (item.id === roomId) {
                        return null;
                    } else {
                        return (
                            <div className='room-item' key={i}
                                 style={setHeaderBackground(ROOM_COLOR[i], `${ROOM_IMG_URI}${item.logo}.jpg`)}
                                 onClick={() => handleGoToRoomPage(item.id)}>
                                <img alt="icon" src={`${ROOM_IMG_URI}${item.logo}-icon.png`}/>
                                <p>{item.name.toUpperCase()}</p>
                            </div>
                        )
                    }
                })}
            </Fragment>
        )
    }
}