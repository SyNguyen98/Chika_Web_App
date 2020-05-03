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

export function sendFeedback(feedback) {
    return request({
        url: API_BASE_URL + "/feedback",
        method: 'POST',
        body: JSON.stringify(feedback)
    });
}

export function getAllFeedback() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/feedback",
        method: 'GET'
    });
}

export function haveFeedback() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/feedback/is_response",
        method: 'GET'
    });
}

export function updateFeedBackResponse(id, response) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/feedback/id/" + id + "/response/" + response,
        method: 'PUT'
    });
}