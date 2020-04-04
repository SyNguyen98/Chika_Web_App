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

export function getProductByUserForAdmin(userId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/product/user/" + userId,
        method: 'GET',
    });
}

export function getProductByUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/product",
        method: 'GET',
    });
}

export function getAllNumberOfProduct() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/product/number",
        method: 'GET',
    });
}

export function getAllNumberOfProductByUserId(userId) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/product/number/user_id/" + userId,
        method: 'GET',
    });
}

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

/* HOME CENTER */
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

export function saveSensor(sensorRequest) {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/sensor",
        method: 'POST',
        body: JSON.stringify(sensorRequest)
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
