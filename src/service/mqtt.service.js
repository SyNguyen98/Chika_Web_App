var mqtt = require('mqtt')

var option = {
  username: 'chika',
  password: '2502'
}

var client;

export function mqttConnect() {
    client = mqtt.connect('wxs://test.mosquitto.org');
    client.on('message', function (topic, message) {
        // message is Buffer
        console.log(`From: ${topic} , message: ${message.toString()}`)
    })  
}

export function mqttDisconnect() {
    client.end(); 
}

export function mqttSubscribe(topic) {
    client.subscribe(topic)
}

