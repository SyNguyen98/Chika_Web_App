import { API_BASE_URL, ACCESS_TOKEN } from '../constant';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getRooms() {
    return request({
        url: `${API_BASE_URL}/room`,
        method: 'GET',
    });
}

export function addRoom(addRoomRequest) {
    return request({
        url: `${API_BASE_URL}/room`,
        method: 'POST',
        body: JSON.stringify(addRoomRequest)
    });
}

export function updateRoom(updateRoomRequest) {
    return request({
        url: `${API_BASE_URL}/room`,
        method: 'PUT',
        body: JSON.stringify(updateRoomRequest)
    });
}

export function deleteRoom(roomId) {
    return request({
        url: `${API_BASE_URL}/room/${roomId}`,
        method: 'DELETE',
    });
}