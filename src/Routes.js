import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginPage from './Page/Auth/LoginPage';
import RegistrationPage from './Page/Auth/RegistrationPage';
import Drawer from './Page/App/DrawerStack';
import staffDrawer from './Page/App/Staff/StaffdrawerStack';
import DropdownAlert from "react-native-dropdownalert";
import NetInfo from "@react-native-community/netinfo";

class AuthLoadingScreen extends Component {

    constructor() {
        super();
        this.state = {
            Role_name: '',
            connection_status: true,
            connection_type: null,
            connection_net_reachable: false,
            connection_wifi_enabled: false,
            connection_details: null,
        };
        this._bootstrapAsync();
    }

    async componentDidMount() {
        // internet not connected alert code
        this.NetInfoSubscribtion = NetInfo.addEventListener(
            this._handleConnectivityChange
        );
            
        if (!this.state.connection_status) {
            this.dropdown.alertWithType(
                "error",
                "OH!!",
                "Sorry you're not connected to the Internet"
            );
        }
        this._bootstrapAsync();
    }

    _handleConnectivityChange = async (state) => {
        this.setState({
            connection_status: state.isConnected,
            connection_type: state.type,
            connection_net_reachable: state.isInternetReachable,
            connection_wifi_enabled: state.isWifiEnabled,
            connection_details: state.details,
        });
        if (this.state.connection_status) {
            const userToken = await SecureStore.getItemAsync('access_token');
        }
    };

    _bootstrapAsync = async () => {
        const userToken = await SecureStore.getItemAsync('access_token');
        const role_name = await SecureStore.getItemAsync('role_name');
        if (this.state.connection_status) {
            if (userToken) {
                if (role_name == 'member') {
                    this.props.navigation.navigate("App");
                }
                else if (role_name == 'staff_member') {
                    this.props.navigation.navigate("Staff");
                }
                else {
                    this.props.navigation.navigate("Auth");
                }
            }
            else {
                this.props.navigation.navigate("Auth");
            }
        }
    };

    render() {
        const { loader, mobile, connection_status } = this.state;
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    style={styles.loader}
                    size="large"
                    color="#0f4471"
                />
                {
                    connection_status == false ? (<DropdownAlert ref={(ref) => (this.dropdown = ref)} />) : (<View></View>)
                }
            </View>
        );
    }
}

const MemberStack = createStackNavigator({ Drawer: { screen: Drawer, } }, { headerMode: 'screen', })
const StaffStack = createStackNavigator({ staffDrawer: { screen: staffDrawer, } }, { headerMode: 'screen', })
const AuthStack = createStackNavigator({ LoginPage: LoginPage, RegistrationPage: RegistrationPage });

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: Drawer,
        Staff: staffDrawer,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    loader: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    },
});









