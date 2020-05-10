import {notification} from "antd";

export function SuccessNotification(description) {
    return (
        notification.success({
            message: 'Chika Smarthome',
            description: description,
        })
    )
}

export function ErrorNotification(description) {
    return (
        notification.error({
            message: 'Chika Smarthome',
            description: description,
        })
    )
}