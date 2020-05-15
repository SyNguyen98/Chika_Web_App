import {MQTT_URL} from "../constant";

const mqtt = require('mqtt');

const option = {
    username: 'chika',
    password: '2502',
};

let client;

export function mqttConnect() {
    client = mqtt.connect(MQTT_URL, option);
    console.log("connect to mqtt successfully");
}

export function getClient() {
    return client;
}

export function mqttDisconnect() {
    client.end();
}

export function mqttSubscribe(topic) {
    client.subscribe(topic)
}

export function mqttPublish(topic, message) {
    let options = {
        qos: 2
    };
    if (!topic.includes("button")) {
        options.retain = true;
    }
    client.publish(topic, message, options);
}