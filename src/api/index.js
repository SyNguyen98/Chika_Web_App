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

export function getUserByPhone(phone) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/phone/" + phone,
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

export function updateAdminInfo(updateRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/admin_info",
        method: 'PUT',
        body: JSON.stringify(updateRequest)
    });
}

export function updatePassword(updateRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/password",
        method: 'PUT',
        body: JSON.stringify(updateRequest)
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

/* PRODUCT */
export function updateProductWithUser(updateRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/product",
        method: 'PUT',
        body: JSON.stringify(updateRequest)
    });
}

/* SWITCH WIFI */
export function getAllSwitchWifi() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/switch_wifi",
        method: 'GET'
    });
}

export function saveSwitchWifi(numOfButton) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/switch_wifi/num_of_button/" + numOfButton,
        method: 'POST'
    });
}

export function deleteSwitchWifi(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/switch_wifi/" + id,
        method: 'DELETE'
    });
}

/* SWITCH RF */
export function getAllSwitchRf() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/switch_rf",
        method: 'GET'
    });
}

export function saveSwitchRf(numOfButton, channel) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/switch_rf/num_of_button/" + numOfButton + "/channel/" + channel,
        method: 'POST'
    });
}

export function deleteSwitchRf(id) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/switch_rf/" + id,
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
