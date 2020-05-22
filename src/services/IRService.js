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

export function getAllIrValueByDeviceAndProtocol(device, protocol) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: `${API_BASE_URL}/ir-value/batch?device=${device}&protocol=${protocol}`,
        method: 'GET'
    });
}

export function getAllButtonByRemoteId(remoteId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: `${API_BASE_URL}/remote-button/remote/${remoteId}`,
        method: 'GET'
    });
}

export function saveRemoteButton(button) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/remote-button",
        method: 'POST',
        body: JSON.stringify(button)
    });
}

export function deleteButtonById(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: `${API_BASE_URL}/remote-button/${id}`,
        method: 'DELETE'
    });
}