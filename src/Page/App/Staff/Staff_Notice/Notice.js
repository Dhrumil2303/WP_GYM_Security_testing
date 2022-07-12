import React, { Component } from 'react';
import {
    BackHandler,
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { NavigationEvents } from 'react-navigation';
import { staffloginAction } from '../../../../util/action';
import { t } from '../../../../../locals';
import { WebView } from 'react-native-webview';
import styleCss from '../../../../style'
export default class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            ImageLoading: false,
            dataSource: '',
        };

    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false,
        };
    };
    toggleDrawer = ({ navigation }) => {
        this.props.navigation.toggleDrawer();
    };
    componentDidMount() {
        const { navigation } = this.props;
        this.setState({ loader: true })
        this.stafflogin();

        this.focusListener = navigation.addListener("didFocus", () => {
            this.stafflogin();
        });

        this.setState({ loader: false })
    }

    async stafflogin() {
        const StaffData = {
            "page_name": "notice"
        };
        this.setState({ loader: true });
        staffloginAction(StaffData).then(responseJson => {
            if (responseJson.status == 1) {

                this.setState({
                    dataSource: responseJson.result,
                    loader: false,
                });
            } else {
                this.setState({ loader: false });
            }
        });
    }

    onRefresh() {
        this.stafflogin();
    }

    LoadingIndicatorView() {
        return <ActivityIndicator style={styleCss.loading} size="large" color="#102b46" />
    }

    _onBlurr = () => {
        BackHandler.removeEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _onFocus = () => {
        BackHandler.addEventListener('hardwareBackPress',
            this._handleBackButtonClick);
    }

    _handleBackButtonClick = () => this.props.navigation.navigate('staffDashboard')

    render() {
        const { loader, dataSource } = this.state;
        const { navigate } = this.props.navigation;
        if (!loader) {
            return (
                <View style={styleCss.container}>
                    <NavigationEvents
                        onWillFocus={this._onFocus}
                        onWillBlur={this._onBlurr}
                    />
                    <StatusBar />
                    <Row style={styleCss.NaveBar}>
                        <Col>
                            <TouchableOpacity onPress={this.toggleDrawer.bind(this)} style={styleCss.menu_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../../images/Menu-white.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col>
                            <TouchableOpacity onPress={() => navigate("staffDashboard")} style={styleCss.back_arrow}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../../images/Back-Arrow-White.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col style={styleCss.name_col}>
                            <Text style={styleCss.NaveText}>{t("Notice")}</Text>
                        </Col>

                        <Col>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("Attendance_Scanner")}
                                style={styleCss.workout_col}
                            >
                                <Image
                                    style={styleCss.Naveicon}
                                    source={require("../../../../images/barcode-scanner.png")}
                                />
                            </TouchableOpacity>
                        </Col>
                        <Col>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Message')} style={styleCss.message_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../../images/Message-white.png')}
                                />
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <WebView
                        source={{ uri: dataSource }}
                        renderLoading={this.LoadingIndicatorView}
                        startInLoadingState={true}
                        javaScriptEnabled={false}
                        domStorageEnabled={true}
                    />
                </View>
            );
        } else {
            return (
                <View style={styleCss.container}>
                    <NavigationEvents
                        onWillFocus={this._onFocus}
                        onWillBlur={this._onBlurr}
                    />
                    <StatusBar />
                    <Row style={styleCss.NaveBar}>
                        <Col>
                            <TouchableOpacity onPress={this.toggleDrawer.bind(this)} style={styleCss.menu_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../../images/Menu-white.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col>
                            <TouchableOpacity onPress={() => navigate("staffDashboard")} style={styleCss.back_arrow}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../../images/Back-Arrow-White.png')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col style={styleCss.name_col}>
                            <Text style={styleCss.NaveText}>{t("Notice")}</Text>
                        </Col>

                        <Col>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("Attendance_Scanner")}
                                style={styleCss.workout_col}
                            >
                                <Image
                                    style={styleCss.Naveicon}
                                    source={require("../../../../images/barcode-scanner.png")}
                                />
                            </TouchableOpacity>
                        </Col>
                        <Col>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Message')} style={styleCss.message_col}>
                                <Image style={styleCss.Naveicon}
                                    source={require('../../../../images/Message-white.png')}
                                />
                            </TouchableOpacity>
                        </Col>
                    </Row>

                    <ActivityIndicator
                        style={styleCss.loading}
                        size="large"
                        color="#102b46"
                    />
                </View>

            );
        }
    }

}