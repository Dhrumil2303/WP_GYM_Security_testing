import React, { Component } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  BackHandler,
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { Col, Row } from "react-native-easy-grid";
import { ActivityIndicator } from "react-native-paper";
import validate from "validate.js";
import { t } from "../../../locals";
import styleCss from "../../style";
import { AlertHelper } from '../App/AlertHelper';

//Redux
import { connect } from "react-redux";
import { login, loadingStart } from "../redux/actions/auth";
class LoginPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    };
  };

  /* state function */

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      Password: "",
      visible: false,
      validationError: "",
      passwordshow: true,
    };
  }

  /* hide and show password */
  getPasswordshow = () => {
    if (this.state.passwordshow == true) {
      this.setState({ passwordshow: false })
    } else {
      this.setState({ passwordshow: true })
    }
  }

  /*data load before screen using this function */

  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    let email = await SecureStore.getItemAsync("email");
    let password = await SecureStore.getItemAsync("password");
    this.setState({ email: email, Password: password });
  }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  // }

  /* login function */
  async login() {
    const { login, loadingStart } = this.props;
    const { navigate } = this.props.navigation;

    var constraints = {
      email: {
        presence: {
          allowEmpty: false,
          message: "^" + t("Email is required"),
        },
        email: {
          message: "^" + t("The email is doesn't look like a valid"),
        },
      },
      Password: {
        presence: {
          allowEmpty: false,
          message: "^" + t("password is required"),
        },
      },
    };

    const result = validate(
      { email: this.state.email, Password: this.state.Password },
      constraints
    );

    if (result) {
      if (result.email) {
        AlertHelper.show("error", t("Error"), result.email);
        return false;
      }
      if (result.Password) {
        AlertHelper.show("error", t("Error"), result.Password);
        return false;
      }
    }

    const loginData = {
      username: this.state.email,
      password: this.state.Password,
    };

    if (!result) {
      loadingStart();

      // Redux action call to login
      login(loginData, navigate);
    }
  }
  handleBackPress() {
    Alert.alert(t("Hold on!"), t("Are you sure you want to exit app?"), [
      {
        text: t("No"),
        onPress: () => null,
        style: "cancel",
      },
      { text: t("Yes"), onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  }

  handleLogout() {
    this.props.navigation.navigate("Login");
  }

  /* Design section */
  render() {
    const { loading } = this.props;
    const { email, Password } = this.state;

    if (!loading) {
      return (
        <View style={styleCss.loign_container}>
          <ImageBackground
            source={require("../../images/Login-BG-Image.png")}
            style={styleCss.login_bg_image}
          >
            <StatusBar />
            <KeyboardAvoidingView
              behavior={Platform.select({ android: "height", ios: "padding" })}
              style={styleCss.loign_container}
            >
              <ScrollView style={styleCss.loign_page}>
                <Col style={styleCss.login_email_col}>
                  <Col style={styleCss.login_image_col}>
                    <Image
                      style={styleCss.login_image}
                      source={require("../../images/Logo.png")}
                    />
                  </Col>

                  <Row style={styleCss.login_input}>
                    <Col style={styleCss.login_input_col}>
                      <Image
                        style={styleCss.login_icon_image}
                        source={require("../../images/Email-white-512.png")}
                      />
                    </Col>
                    <Col>
                      <TextInput
                        style={styleCss.login_input_email}
                        value={email}
                        onChangeText={(email) =>
                          this.setState({ email: email })
                        }
                        maxLength={30}
                        placeholderTextColor="#ffffff"
                        placeholder={t("Email")}
                      />
                    </Col>
                  </Row>

                  <Row style={styleCss.login_input}>
                    <Col style={styleCss.login_input_col}>
                      <Image
                        style={styleCss.login_icon_image}
                        source={require("../../images/Password.png")}
                      />
                    </Col>
                    <Col>
                      <TextInput
                        style={styleCss.login_input_password}
                        value={Password}
                        onChangeText={(Password) =>
                          this.setState({ Password: Password })
                        }
                        placeholderTextColor="#ffffff"
                        placeholder={t("Password")}
                        secureTextEntry={this.state.passwordshow}
                      />
                    </Col>
                    <Col style={styleCss.login_input_password_show}>
                      {this.state.passwordshow ? (<TouchableOpacity
                        onPress={this.getPasswordshow}>
                        <Image source={require('../../images/Eye_White.png')}
                          style={styleCss.password_eye_image}></Image>
                      </TouchableOpacity>) : (<TouchableOpacity
                        onPress={this.getPasswordshow}>
                        <Image source={require('../../images/EyeClose_White.png')}
                          style={styleCss.password_eye_image}></Image>
                      </TouchableOpacity>)}
                    </Col>
                  </Row>

                  <TouchableOpacity
                    style={styleCss.login_btn}
                    onPress={this.login.bind(this)}
                  >
                    <Row style={styleCss.login_btn_container}>
                      <Text style={styleCss.login_btn_text}>{t("Login")}</Text>
                    </Row>
                  </TouchableOpacity>
                  <Row style={styleCss.login_signup_container}>
                    <TouchableOpacity
                      style={styleCss.login_signup_button}
                      onPress={() =>
                        this.props.navigation.navigate("RegistrationPage")
                      }
                    >
                      <Text style={styleCss.login_signup_text}>
                        {t("Signup with Email")}
                      </Text>
                    </TouchableOpacity>
                  </Row>
                </Col>
              </ScrollView>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styleCss.login_loding_container}>
          <ImageBackground
            source={require("../../images/Login-BG-Image.png")}
            style={styleCss.login_bg_image}
          >
            <StatusBar />
            <KeyboardAvoidingView
              behavior={Platform.select({ android: "height", ios: "padding" })}
              style={styleCss.loign_container}
            >
              <ScrollView style={styleCss.loign_page}>
                <Col style={styleCss.login_email_col}>
                  <Col style={styleCss.login_image_col}>
                    <Image
                      style={styleCss.login_image}
                      source={require("../../images/Logo.png")}
                    />
                  </Col>

                  <Row style={styleCss.login_input}>
                    <Col style={styleCss.login_input_col}>
                      <Image
                        style={styleCss.login_icon_image}
                        source={require("../../images/Email-white-512.png")}
                      />
                    </Col>
                    <Col>
                      <TextInput
                        style={styleCss.login_input_email}
                        value={email}
                        onChangeText={(email) =>
                          this.setState({ email: email })
                        }
                        maxLength={30}
                        placeholderTextColor="#ffffff"
                        placeholder={t("Email")}
                      />
                    </Col>
                  </Row>

                  <Row style={styleCss.login_input}>
                    <Col style={styleCss.login_input_col}>
                      <Image
                        style={styleCss.login_icon_image}
                        source={require("../../images/Password.png")}
                      />
                    </Col>
                    <Col>
                      <TextInput
                        style={styleCss.login_input_password}
                        value={Password}
                        onChangeText={(Password) =>
                          this.setState({ Password: Password })
                        }
                        placeholderTextColor="#ffffff"
                        placeholder={t("Password")}
                        secureTextEntry
                      />
                    </Col>
                  </Row>

                  <TouchableOpacity
                    style={styleCss.login_btn}
                    onPress={this.login.bind(this)}
                  >
                    <Row style={styleCss.login_btn_container}>
                      <Text style={styleCss.login_btn_text}>{t("Login")}</Text>
                    </Row>
                  </TouchableOpacity>
                  <Row style={styleCss.login_signup_container}>
                    <TouchableOpacity
                      style={styleCss.login_signup_button}
                      onPress={() =>
                        this.props.navigation.navigate("RegistrationPage")
                      }
                    >
                      <Text style={styleCss.login_signup_text}>
                        {t("Signup with Email")}
                      </Text>
                    </TouchableOpacity>
                  </Row>
                </Col>
              </ScrollView>
            </KeyboardAvoidingView>
          </ImageBackground>
          <ActivityIndicator
            style={styleCss.login_loader}
            size="large"
            color="#102b46"
          />
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = {
  login,
  loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
