export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://chika-server.herokuapp.com';
export const MQTT_URL = 'wss://soldier.cloudmqtt.com:36607';
export const ACCESS_TOKEN = 'accessToken';

export const LIST_ROOM = 'ListRoom';
export const LIST_SCRIPT = 'ListScript';
export const DOOR_SENSOR_TOPIC = 'DoorSensorTopic';
export const MOTION_DETECTOR_TOPIC = 'MotionDetectorTopic';
export const AIR_SENSOR_TOPIC = 'AirSensorTopic';
export const FIRE_SENSOR_TOPIC = 'FireSensorTopic';

export const SWITCH_WIFI = 'Switch Wifi';
export const SWITCH_RF = 'Switch Rf';
export const MODULE_IR = 'Module Ir';
export const HOME_CENTER = 'Home Center';
export const SENSOR = 'Sensor';

export const DAY_OF_WEEK = [
    {day: 'MON', name: 'T2'},  {day: 'TUE', name: 'T3'},  {day: 'WED', name: 'T4'},  {day: 'THU', name: 'T5'},
    {day: 'FRI', name: 'T6'},  {day: 'SAT', name: 'T7'},  {day: 'SUN', name: 'CN'},
]