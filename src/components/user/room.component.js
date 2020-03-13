import React from 'react';

import '../../styles/user/room.component.css';
import { getCookie } from '../../service/cookie.service'

const Room = () => {
    let currentUser = JSON.parse(getCookie('user')); 

    return(
        <div className='user-room'>
            
        </div>
    )
}

export default Room;