var mqtt = require('mqtt')

var option = {
  username: 'chika',
  password: '2502'
}

var client;

export function mqttConnect() {
    client = mqtt.connect('ws://chika.gq:8080', option);
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

export function mqttPublish(topic, message) {
    client.publish(topic, message)
}