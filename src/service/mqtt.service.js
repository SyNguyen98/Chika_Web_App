var mqtt = require('mqtt')

var option = {
  username: 'chika',
  password: '2502',
}

var client;
export var mqttMessage;

export function mqttConnect() {
    client = mqtt.connect('ws://chika.gq:8080', option);
    console.log("connect to mqtt successfully");
    client.on('message', (topic, message) => {
        // message is Buffer
        console.log(`From: ${topic} , message: ${message.toString()}`);
        mqttMessage = {
            topic: topic,
            message: message.toString()
        }
    })
}

export function mqttDisconnect() {
    client.end(); 
}

export function mqttSubscribe(topic) {
    client.subscribe(topic)
}

export function mqttPublish(topic, message) {
    let options = {
        retain: true
    }
    client.publish(topic, message, options);
}