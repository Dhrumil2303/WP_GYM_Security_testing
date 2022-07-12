import React, { Component } from 'react';
import { ActivityIndicator, View, Image, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { Col, Row } from "react-native-easy-grid";
import * as SecureStore from 'expo-secure-store';;
import { t } from '../../../../locals';
import styleCss from '../../../style';

import { connect } from "react-redux";
import { fetchUserdetails, loadingStart } from "../../redux/actions/auth";
class StaffCustomSidebarMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            ImageLoading: false,
            dataSource: [],
            user_image: '',
            First_Name: '',
            Last_Name: '',
            user_Address: '',
            user_City: '',
        };

    }

    async UNSAFE_componentWillMount() {
    }

    logout = async () => {
        Alert.alert(
            t("Gym App"),
            t("Are you sure you want to exit app?"),
            [
                {
                    text: t("No"),
                    onPress: () => this.props.navigation.navigate('staffDashboard'),
                    style: "cancel"
                },
                { text: t("Yes"), onPress: () => this.props.navigation.navigate('Auth') }
            ]
        );
        await SecureStore.deleteItemAsync('userid');
        await SecureStore.deleteItemAsync('mobile');
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('is_payment_method_save');
        await SecureStore.deleteItemAsync('payment_gateway_token');

    };
    /** Open / close sidemenu */
    toggleDrawer = (navigation) => {
        this.props.navigation.closeDrawer();
    };

    async componentDidMount() {
        this.singleMember();
    }

    async singleMember() {
        const { fetchUserdetails, loadingStart } = this.props;
        loadingStart();
        const Id = await SecureStore.getItemAsync("id");
        const Token = await SecureStore.getItemAsync("access_token");
        const userData = {
            "member_id": Id,
            "access_token": Token,
        };
        fetchUserdetails(userData)
    }

    /** Design part of page */
    render() {
        const { navigate } = this.props.navigation;
        const { First_Name, Last_Name, user_Address, user_City } = this.state;
        const { userData } = this.props;
        const full_address = user_Address + user_City;
        return (
            <View style={styleCss.sidebar_container}>

                <StatusBar />
                <Row style={styleCss.sidebar_NavRow}>

                    <Col style={styleCss.sidebar_NavColImg}>
                        <TouchableOpacity style={styleCss.sidebar_back_arrow} onPress={this.toggleDrawer.bind(this)}>
                            <Image source={require('../../../images/Close-white-512.png')} style={styleCss.sidebar_Close} />
                        </TouchableOpacity>
                    </Col>
                </Row>
                <TouchableOpacity style={styleCss.sidebar_ProfileRow} onPress={() => navigate('staffaccount')}>
                    <Row>
                        <Col style={styleCss.sidebar_ProfileContainer}>
                            <Row style={styleCss.sidebar_ProfileContainer_row}>
                                <Image
                                    onLoadStart={(e) => this.setState({ ImageLoading: true })}
                                    source={userData.member_image ? { uri: userData.member_image } : null}
                                    onLoadEnd={(e) => this.setState({ ImageLoading: false })}
                                    style={styleCss.sidebar_UserProfile} />
                                <ActivityIndicator
                                    style={styleCss.loading}
                                    animating={this.state.ImageLoading}
                                    size="small"
                                    color="#102b46"
                                />
                            </Row>
                        </Col>
                        <Col>
                            <Row style={styleCss.sidebar_ProfileName}>
                                <Text numberOfLines={1} style={styleCss.sidebar_sideNavText}>{userData.first_name} {userData.last_name}</Text>
                            </Row>
                            {this.state.user_Address || this.state.user_City != null ? (
                                <Row>
                                    <Text numberOfLines={1} style={styleCss.sidebar_address_text}>{userData.address} , {userData.city}</Text>
                                </Row>
                            ) : <View></View>}
                        </Col>
                    </Row>
                </TouchableOpacity>

                <Col style={styleCss.sidebar_menu_col}>
                    <ScrollView>
                        <TouchableOpacity onPress={() => navigate('staffDashboard')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Dashboard-White.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Dashboard")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('staffmemberlist')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Staff-Member-white.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Staff Member")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('AddMembership')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Membership-Type-White.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Membership Type")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('AddGroup')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Group-White.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Group")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('AddMember')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Staff-Member-white.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Member")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('AddActivity')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Class-Schedule-White.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Activity")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('AddClass')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Date.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Class Schedule")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('Attendance')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Attendance.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Attendance")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('Attendance_Scanner')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/barcode-scanner.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Attendance scanner")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('AddAssignWorkout')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Workout-White.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Assign Workouts")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('AddnutritionSchedule')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Nutrition-White.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Nutrition Schedule")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('Addworkout')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Workout-White.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Workouts")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('Accountant')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Account-White.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Accountant")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('AddProduct')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/product.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Product")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('AddStore')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Store.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Store")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('Message')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Message-white.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Message")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => navigate('Notice')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Notice-White.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Notice")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('AddReservation')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Events-White.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Reservation")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('staffaccount')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Account-White.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Account")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('SubscriptionHistory')}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Subscription-White.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Subscription History")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.logout()}>
                            <Row style={styleCss.sidebar_DrawerRow}>
                                <Col style={styleCss.sidebar_DrawerIcons}>
                                    <Image source={require('../../../images/Logout-white.png')} style={styleCss.sidebar_Close}></Image>
                                </Col>
                                <Col>
                                    <Text style={styleCss.sidebar_sideNavSubText}>{t("Logout")}</Text>
                                </Col>
                            </Row>
                        </TouchableOpacity>

                    </ScrollView>
                </Col>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.sidebarMenu.loading,
        userData: state.auth.userData,
    };
};

const mapDispatchToProps = {
    fetchUserdetails,
    loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffCustomSidebarMenu);