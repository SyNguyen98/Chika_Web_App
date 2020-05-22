import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {BackTop, Layout} from 'antd';
import './App.css';

import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import SideNavComponent from '../components/sidenav';
import ContactMenuComponent from '../components/contact-menu';

import HomeComponent from "../scenes/Guest/Home";
import IntroduceComponent from "../scenes/Guest/Introduction";
import GoogleComponent from "../scenes/Guest/Solutions/GoogleAssistant";
import ConditionerTiviComponent from "../scenes/Guest/Solutions/ConditionerTivi";
import LightControlComponent from "../scenes/Guest/Solutions/LightControl";
import EnvironmentalControlComponent from "../scenes/Guest/Solutions/EnvironmentalControl";
import SecuritySystemComponent from "../scenes/Guest/Solutions/SecuritySystem";
import RgbLedComponent from "../scenes/Guest/Solutions/RgbLed";

import ProductComponent from "../scenes/Guest/Products";
import SwitchSensorComponent from "../scenes/Guest/Products/SwitchSensor";
import SwitchComponent from "../scenes/Guest/Products/Switch";
import ModuleIrComponent from "../scenes/Guest/Products/ModuleIr";
import HomeCentralComponent from "../scenes/Guest/Products/HomeCentral";
import DoorSensorComponent from "../scenes/Guest/Products/DoorSensor";
import MotionDetectorComponent from "../scenes/Guest/Products/MotionDetector";

import SupportComponent from '../scenes/Guest/Supporting';
import QuestionComponent from '../scenes/Guest/Supporting/Question';
import DocumentComponent from '../scenes/Guest/Supporting/Document';

import LoginComponent from '../scenes/Guest/Sign/Login';

import UserManagementComponent from '../scenes/Admin/UserManagement';
import UserListComponent from '../scenes/Admin/UserManagement/UserList';
import AddUserComponent from '../scenes/Admin/UserManagement/AddUser';
import PurchaseComponent from '../scenes/Admin/UserManagement/Purchase';
import FeedbackComponent from '../scenes/Admin/UserManagement/Feedback';
import AdminProductComponent from '../scenes/Admin/ProductManagement';
import SwitchWifiListComponent from '../scenes/Admin/ProductManagement/SwitchWifi';
import SwitchRfListComponent from '../scenes/Admin/ProductManagement/SwitchRf';
import ModuleIrListComponent from '../scenes/Admin/ProductManagement/ModuleIr';
import HomeCenterListComponent from '../scenes/Admin/ProductManagement/HomeCentral';
import SensorListComponent from '../scenes/Admin/ProductManagement/Sensor';
import AdminInfoComponent from '../scenes/Admin/PersonalInfo';
import AdminSettingComponent from '../scenes/Admin/Setting';

import UserHomeComponent from '../scenes/User/Home';
import ListRoomComponent from '../scenes/User/Room';
import UserRoomComponent from '../scenes/User/Room/Devices';
import ListScriptComponent from "../scenes/User/Script";
import UserPersonalComponent from '../scenes/User/PersonalInfo'

import {ErrorNotification, SuccessNotification} from "../components/notification";

import {getUserInfo, updateAdminInfo} from '../services/UserService';
import {deleteAllCookies} from '../services/CookieService'
import {getClient, mqttConnect} from "../services/MqttService";

import {ACCESS_TOKEN} from '../constant';
import {
    ADMIN_ADD_USER_LINK,
    ADMIN_FEEDBACK_LINK,
    ADMIN_HOME_CENTRAL_LINK,
    ADMIN_INFO_LINK,
    ADMIN_MODULE_IR_LINK,
    ADMIN_PRODUCT_LINK,
    ADMIN_PURCHASE_LINK,
    ADMIN_SENSOR_LINK,
    ADMIN_SETTING_LINK,
    ADMIN_SWITCH_RF_LINK,
    ADMIN_SWITCH_WIFI_LINK,
    ADMIN_USER_LINK,
    ADMIN_USER_LIST_LINK,
    CONDITIONER_TV_LINK,
    DOCUMENT_LINK,
    DOOR_SENSOR_LINK,
    ENVIRONMENTAL_CONTROL_LINK,
    GOOGLE_ASSISTANT_LINK,
    HOME_CENTRAL_LINK,
    INTRODUCTION_LINK,
    LIGHT_CONTROL_LINK,
    LOGIN_LINK,
    MODULE_IR_LINK,
    MOTION_DETECTOR_LINK,
    PRODUCT_LINK,
    QUESTION_LINK,
    RGB_LED_LINK,
    SECURITY_SYSTEM_LINK,
    SUPPORTING_LINK,
    SWITCH_LINK,
    SWITCH_SENSOR_LINK,
    USER_HOME_LINK,
    USER_INFO_LINK,
    USER_ROOM_LINK,
    USER_SCRIPT_LINK
} from "../constant/link";

const {Content} = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isLoading: false,
            alertModal: false,
            sidenavVisible: false,
            mqttMessage: null
        }
    }

    loadCurrentUser = () => {
        getUserInfo().then(response => {
            this.setState({currentUser: response});
            console.log(response);
            switch (response.role) {
                case 'ADMIN':
                    this.props.history.push(ADMIN_USER_LINK);
                    this.onCloseSidenav();
                    break;
                case 'HOME_MASTER':
                case 'HOME_USER':
                    this.props.history.push(USER_ROOM_LINK);
                    this.onCloseSidenav();
                    break;
                default:
            }
        }).catch(error => {
            // ErrorNotification("Đã có lỗi xảy ra")
        });
    }

    updateAdminInfo = (updateRequest) => {
        this.setState({isLoading: true});
        updateAdminInfo(updateRequest).then(response => {
            this.setState({
                currentUser: response,
                isLoading: false
            });
            this.props.history.push(ADMIN_INFO_LINK);
            SuccessNotification("Thông tin đã được cập nhật.")
        }).catch(error => {
            this.setState({isLoading: false});
            let message;
            if (error.message.includes('Phone')) {
                message = 'Số điện thoại đã được sử dụng';
            } else if (error.message.includes('Email')) {
                message = 'Email đã được sử dụng';
            }
            ErrorNotification(message || "Đã có lỗi xảy ra. Vui lòng thử lại sau!")
        });
    }

    handleOpenSidenav = () => {
        this.setState({sidenavVisible: true});
    }

    onCloseSidenav = () => {
        this.setState({sidenavVisible: false,});
    };

    handleLogin = () => {
        SuccessNotification("Đăng nhập thành công.")
        this.loadCurrentUser();
    }

    handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        deleteAllCookies();

        this.setState({currentUser: null,});

        this.props.history.push("/");
        SuccessNotification("Đăng xuất thành công.");
    }

    onChangePasswordLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({currentUser: null,});

        this.props.history.push("/");
        SuccessNotification("Đổi mật khẩu thành công.");
    }

    componentDidMount() {
        this.loadCurrentUser();
        mqttConnect();
        getClient().on('message', (topic, message) => {
            console.log(`From: ${topic} , message: ${message.toString()}`);
            this.setState({
                mqttMessage: {
                    topic: topic,
                    message: message.toString()
                }
            })
        })
    }

    render() {
        const {currentUser, sidenavVisible, mqttMessage} = this.state;
        return (
            <Layout>
                <HeaderComponent currentUser={currentUser} onOpenSidenav={this.handleOpenSidenav} {...this.props}/>
                <Content>
                    <Switch>
                        <Route exact path="/" component={HomeComponent}/>
                        <Route exact path={INTRODUCTION_LINK} component={IntroduceComponent}/>

                        <Route exact path={GOOGLE_ASSISTANT_LINK} component={GoogleComponent}/>
                        <Route exact path={CONDITIONER_TV_LINK} component={ConditionerTiviComponent}/>
                        <Route exact path={LIGHT_CONTROL_LINK} component={LightControlComponent}/>
                        <Route exact path={ENVIRONMENTAL_CONTROL_LINK} component={EnvironmentalControlComponent}/>
                        <Route exact path={SECURITY_SYSTEM_LINK} component={SecuritySystemComponent}/>
                        <Route exact path={RGB_LED_LINK} component={RgbLedComponent}/>

                        <Route exact path={PRODUCT_LINK} component={ProductComponent}/>
                        <Route exact path={SWITCH_SENSOR_LINK} component={SwitchSensorComponent}/>
                        <Route exact path={SWITCH_LINK} component={SwitchComponent}/>
                        <Route exact path={MODULE_IR_LINK} component={ModuleIrComponent}/>
                        <Route exact path={HOME_CENTRAL_LINK} component={HomeCentralComponent}/>
                        <Route exact path={DOOR_SENSOR_LINK} component={DoorSensorComponent}/>
                        <Route exact path={MOTION_DETECTOR_LINK} component={MotionDetectorComponent}/>

                        <Route exact path={SUPPORTING_LINK} component={SupportComponent}/>
                        <Route exact path={QUESTION_LINK} component={QuestionComponent}/>
                        <Route exact path={DOCUMENT_LINK} component={DocumentComponent}/>

                        <Route path={LOGIN_LINK}
                               render={(props) => <LoginComponent onLogin={this.handleLogin} {...props} />}/>

                        <Route exact path={ADMIN_USER_LINK} render={(props) => <UserManagementComponent {...props} />}/>
                        <Route exact path={ADMIN_USER_LIST_LINK} render={(props) => <UserListComponent {...props} />}/>
                        <Route exact path={ADMIN_ADD_USER_LINK} render={(props) => <AddUserComponent {...props} />}/>
                        <Route exact path={ADMIN_PURCHASE_LINK} render={(props) => <PurchaseComponent {...props} />}/>
                        <Route exact path={ADMIN_FEEDBACK_LINK} render={(props) => <FeedbackComponent {...props} />}/>

                        <Route exact path={ADMIN_PRODUCT_LINK}
                               render={(props) => <AdminProductComponent {...props} />}/>
                        <Route exact path={ADMIN_SWITCH_WIFI_LINK}
                               render={(props) => <SwitchWifiListComponent {...props} />}/>
                        <Route exact path={ADMIN_SWITCH_RF_LINK}
                               render={(props) => <SwitchRfListComponent {...props} />}/>
                        <Route exact path={ADMIN_MODULE_IR_LINK}
                               render={(props) => <ModuleIrListComponent {...props} />}/>
                        <Route exact path={ADMIN_HOME_CENTRAL_LINK}
                               render={(props) => <HomeCenterListComponent {...props} />}/>
                        <Route exact path={ADMIN_SENSOR_LINK} render={(props) => <SensorListComponent {...props} />}/>

                        <Route exact path={ADMIN_INFO_LINK}
                               render={(props) => <AdminInfoComponent currentUser={currentUser} {...props} />}/>
                        <Route exact path={ADMIN_SETTING_LINK}
                               render={(props) => <AdminSettingComponent currentUser={currentUser}
                                                                         updateAdminInfo={this.updateAdminInfo}
                                                                         onLogout={this.onChangePasswordLogout} {...props} />}/>

                        <Route exact path={USER_HOME_LINK} render={(props) => <UserHomeComponent {...props}/>}/>
                        <Route exact path={USER_ROOM_LINK} render={(props) => <ListRoomComponent {...props}/>}/>
                        <Route exact path={`${USER_ROOM_LINK}/:id`}
                               render={(props) => <UserRoomComponent mqttMessage={mqttMessage}
                                                                     currentUser={currentUser} {...props}/>}/>
                        <Route exact path={USER_SCRIPT_LINK} render={(props) => <ListScriptComponent {...props}/>}/>

                        <Route exact path={USER_INFO_LINK}
                               render={(props) => <UserPersonalComponent currentUser={currentUser} {...props}/>}/>

                    </Switch>
                </Content>

                {currentUser ? (
                    <SideNavComponent history={this.props.history}
                                      currentUser={currentUser}
                                      sidenavVisible={sidenavVisible}
                                      onCloseSidenav={this.onCloseSidenav}
                                      handleLogout={this.handleLogout}/>
                ) : [
                    <FooterComponent key={0}/>,
                    <ContactMenuComponent key={1} history={this.props.history}/>
                ]}

                <BackTop/>
            </Layout>
        );
    }
}

export default withRouter(App);