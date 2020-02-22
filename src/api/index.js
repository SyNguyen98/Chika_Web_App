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

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

/* USER */
export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user",
        method: 'GET'
    });
}

export function getAdminInfo() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/admin",
        method: 'GET'
    });
}

export function getAllUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/user/all",
        method: 'GET'
    });
}

/* FEEDBACK */
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

export function updateFeedBackResponse(id, response) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/feedback/id/" + id + "/response/" + response,
        method: 'PUT'
    });
}

/* SWITCH */
export function getAllSwitch() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/switch",
        method: 'GET'
    });
}

export function saveSwitch(numOfDevice) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/switch/num_of_device/" + numOfDevice,
        method: 'POST'
    });
}

export function deleteSwitch(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/switch/" + id,
        method: 'DELETE'
    });
}

/* MODULE IR */
export function getAllModuleIr() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/module_ir",
        method: 'GET'
    });
}

export function saveModuleIr() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/module_ir",
        method: 'POST'
    });
}

export function deleteModuleIr(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/module_ir/" + id,
        method: 'DELETE'
    });
}

/* MODULE IR */
export function getAllHomeCenter() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/home_center",
        method: 'GET'
    });
}

export function saveHomeCenter() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/home_center",
        method: 'POST'
    });
}

export function deleteHomeCenter(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/home_center/" + id,
        method: 'DELETE'
    });
}

/* SENSOR */
export function getAllSensor() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/sensor",
        method: 'GET'
    });
}

export function saveSensor(name) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/sensor?name=" + name,
        method: 'POST'
    });
}

export function deleteSensor(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/sensor/" + id,
        method: 'DELETE'
    });
}
