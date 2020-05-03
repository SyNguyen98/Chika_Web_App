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

export function getDevicesByRoomId(roomId) {
    return request({
        url: `${API_BASE_URL}/device/room/${roomId}`,
        method: 'GET',
    });
}

export function getSwitchButtonsByDeviceTopic(topic) {
    return request({
        url: `${API_BASE_URL}/device/topic/${topic}`,
        method: 'GET',
    });
}

export function getDeviceHistories(deviceId) {
    return request({
        url: `${API_BASE_URL}/device-history/${deviceId}?page=0&size=10`,
        method: 'GET',
    });
}

export function saveDevice(deviceRequest) {
    return request({
        url: `${API_BASE_URL}/device/`,
        method: 'POST',
        body: JSON.stringify(deviceRequest)
    });
}

export function updateDevice(deviceRequest) {
    return request({
        url: `${API_BASE_URL}/device/`,
        method: 'PUT',
        body: JSON.stringify(deviceRequest)
    });
}

export function deleteDevice(deviceId) {
    return request({
        url: `${API_BASE_URL}/device/${deviceId}`,
        method: 'DELETE'
    });
}
