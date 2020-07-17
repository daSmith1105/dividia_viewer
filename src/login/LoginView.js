import React from 'react';
import { connect } from 'react-redux';
import { 
    usernameChanged, 
    passwordChanged, 
    autoLoginChanged, 
    nvrSearchTextChanged, 
    loginUser, 
    clearSessionModal,
    getServer
} from './../actions';
import { View, Text, Image, Switch, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native'; // Note: Picker import will be deprecated, but as of right now the below import will not work without ejecting the project
import RNPickerSelect from 'react-native-picker-select';
import logo from '../images/logo_transparent.png';
import config from '../../app.json';
import { Ionicons } from '@expo/vector-icons';
import SessionExistsModal from './SessionExistsModal';
import SessionErrorModal from './SessionErrorModal';
import SessionExpiredModal from './SessionExpiredModal';

const version = config.expo.version;

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyboardVisible: false,
            showPass: false,
            autoLogin: false,
            system: '1'
        }
    }

    componentDidMount = () => {
        this.keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          this._keyboardDidHide,
        );
    }
    
    componentWillUnmount = () => {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({ keyboardVisible: true });
    }
    
    _keyboardDidHide = () => {
        this.setState({ keyboardVisible: false });
    }
    

    attemptLogin = () => {
        console.log('wtf')
        this.props.loginUser( this.props.username, this.props.password, false, false, 'http://205.201.69.172:7000/JSON/', this.props.autoLoginStatus, this.props.bSerial ) //[sName,sPass,fForce,fLocal,this.props.sServer,fAuto,bSerial]
    }

    forceLogin = () => {
        this.props.loginUser( this.props.username, this.props.password, true, false, 'http://205.201.69.172:7000/JSON/', this.props.autoLoginStatus, this.props.bSerial ) //[sName,sPass,fForce,fLocal,this.props.sServer,fAuto,bSerial]
    }

    render() {
        console.log(this.props.loginResult)
        return (
            <KeyboardAvoidingView style={styles.loginViewContainerStyle}>
                <Image style={{ transform: [{ scale: .5 }] }}
                       source={logo} />

            { this.props.loginResult !== 'maxsession' && 
              this.props.loginResult !== 'noremote' && 
              this.props.loginResult !== 'error' && 
              this.props.loginResult !== 'expired' && 
              this.props.loginResult !== 'exists' ?

                <View style={{
                     padding: 10,
                     height: 'auto',
                     width: '95%',
                     maxWidth: 400,
                     borderRadius: 10,
                     backgroundColor: this.props.bSerial > 0 ? '#135CA3' : '#A8A8A8',
                     marginTop: -20
                }}>
                    <Text style={styles.formHeadingText}>Dividia Video System</Text>
                    <Text style={styles.appVersionText}>Version: {version}</Text>
                {/* current system and picker -if ability to jump between systems /controller setup */}
                    <View style={{ color: 'white', margin: 'auto', paddingTop: 5 }}>
                        { this.props.bSerial > 0 && this.props.authServers.length > 0 ?
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                style={{ 
                                    inputAndroid:  styles.pickerSelectStyle,
                                    inputIOS: styles.pickerSelectStyle
                                }}
                                Icon={() => {
                                    return <Ionicons name="md-arrow-down" size={20} color="#135CA3" style={{ display: 'none' }} />;
                                }}
                                value={this.state.system}
                                onValueChange={(value) => this.setState({system: value}) }
                                items={[
                                    { label: 'Test System 1', value: '1' },
                                    { label: 'Test System 2', value: '2' },
                                    { label: 'Test System 3', value: '3' },
                                ]}
                            /> :
                        this.props.bSerial > 0 ?
                                <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>{this.props.sName}</Text> :
                                <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>DVR</Text>
                        }
                    </View>
                {/* form */}
                    <View style={styles.usernameBlockStyle}>
                        <Text style={styles.inputLabelStyle}>Username</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={text => this.props.usernameChanged(text)}
                            value={this.props.username}
                            autoCapitalize='none'
                            autoCorrect={false}
                            />
                    </View>

                    <View style={styles.passwordBlockStyle}>
                        <Text style={styles.inputLabelStyle}>Passsword</Text>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={text => this.props.passwordChanged(text)}
                            value={this.props.password}
                            autoCapitalize='none'
                            autoCorrect={false}
                            />
                    </View>

                    <View style={styles.autologinBlockStyle}>
                        <Text style={styles.inputLabelStyle}>Auto-Login</Text>
                        <Switch
                            onValueChange={(value) => this.setState({ autoLogin: value }, () => this.props.autoLoginChanged(value)) }
                            trackColor={{ false: "#767577", true: "grey" }}
                            thumbColor={this.state.autoLogin ? "lime" : "#f4f3f4"}
                            value={this.state.autoLogin}
                            disabled={this.props.bSerial > 0 ? false : true }
                        />
                    </View>

                    <View style={styles.loginConfirmBlockStyle}>
                        <TouchableOpacity style={styles.confirmButtonStyle}
                                         onPress={ () => this.attemptLogin() }
                                         disabled={this.props.bSerial > 0 ? false : true }
                                          >
                            <Text style={{
                                    color: this.props.bSerial > 0 ? '#135CA3' : 'grey',
                                    fontSize: 18}}>
                                Login
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.onlineCountStyle}>{ this.props.bSerial > 0 ? this.props.numOnline : '0'} Online</Text>
                    </View> 
                </View> :

                 <View  style={{
                            padding: 10,
                            height: 'auto',
                            width: '95%',
                            maxWidth: 400,
                            borderRadius: 10,
                            backgroundColor: '#135CA3',
                            marginTop: -20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>

                    {/* { this.props.loginResult === 'maxsession' ?
                        <MaxSessionsModal 
                            onAccept={ () => this.props.clearSessionModal() } /> :
                        null  
                    } */}

                    {/* { this.props.loginResult === 'noremote' ?
                        <NoRemoteModal 
                            onAccept={ () => this.props.clearSessionModal() } /> :
                        null  
                    } */}

                    { this.props.loginResult === 'error' ?
                        <SessionErrorModal 
                            onAccept={ () => this.props.clearSessionModal() } /> :
                        null  
                    }

                    {/* { this.props.loginResult === 'expired' ?
                        <SessionExpiredModal
                            onAccept={ () => this.props.clearSessionModal() } /> :
                        null  
                    } */}

                    { this.props.loginResult === 'exists' ?
                        <SessionExistsModal
                            onDeny={ () => this.props.clearSessionModal() }
                            onAccept={ () => this.forceLogin() } /> :
                        null  
                    }   
                </View>
            }

            {/* NVR search and set */}
                <View style={styles.searchBlockStyle}>
                    <View style={styles.searchRowStyle}>
                        <TextInput style={styles.searchInputStyle}
                                onChangeText={text => this.props.nvrSearchTextChanged(text)}
                                value={this.props.nvrSearchText}
                                />

                        <TouchableOpacity style={styles.setNvrButtonStyle}
                                          onPress={ () => alert('set pressed')}>
                            <Text style={styles.setNvrButtonTextStyle}>Set</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchRowStyle}>
                        <Text style={styles.searchIpTextStyle}>192.168.111.222:8080</Text>
                        <Text style={styles.searchOnlineIndicatorText}>Online</Text>
                    </View>
                </View>

                { !this.state.keyboardVisible ?
                    <Text style={styles.footerTextStyle}>Improving Business Management</Text> :
                    null
                }
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => {
    const { username, password, autoLoginStatus, nvrSearchText, loginResult } = state.auth;
    const { bSerial, authServers, sName, sServer } = state.server;
    const { screen } = state.nav;
    return {
      username,
      password,
      autoLoginStatus,
      nvrSearchText,
      loginResult,
      bSerial,
      authServers,
      sName,
      sServer,
      screen
  }
}

export default connect(mapStateToProps, {usernameChanged, passwordChanged, autoLoginChanged, nvrSearchTextChanged, loginUser, clearSessionModal, getServer})(LoginView);

const styles = {
    loginViewContainerStyle: {
        position: 'relative',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'grey'
    },
    loginFormStyle: {
        padding: 10,
        height: 'auto',
        width: '95%',
        maxWidth: 400,
        borderRadius: 10,
        backgroundColor: '#135CA3',
        marginTop: -20
    },
    formHeadingText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    },
    appVersionText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14
    },
    pickerSelectStyle: {
        fontSize: 18, 
        color: '#135CA3', 
        backgroundColor: 'white', 
        textAlign: 'center', 
        borderRadius: 5, 
        marginBottom: 10
    },
    usernameBlockStyle: {
        marginTop: 0
    },
    passwordBlockStyle: {
        marginTop: 10
    },
    autologinBlockStyle: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    loginConfirmBlockStyle: {
        marginTop: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
        marginLeft: '40%'
    },
    inputLabelStyle: {
        color: 'white',
        fontSize: 16,
        margin: 0,
        padding: 0,
        marginBottom: 5,
        marginRight: 5
    },
    inputStyle: {
        fontSize: 16,
        padding: 4,
        paddingLeft: 10,
        backgroundColor: 'white',
        borderRadius: 5
    },
    confirmButtonStyle: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        padding: 2,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: 'white'
    },
    confirmButtonTextStyle: {
        color: 'dodgerblue',
        fontSize: 18
    },
    onlineCountStyle: {
        color: 'white', 
        fontSize: 16
    },
    searchBlockStyle: {
        marginTop:5,
        padding: 10,
        paddingRight: 10,
        paddingLeft: 10,
        height: 'auto',
        width: '95%',
        maxWidth: 400,
        borderRadius: 10,
        backgroundColor: '#135CA3'
    },
    searchRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchInputStyle: {
        fontSize: 16,
        padding: 4,
        paddingLeft: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        width: '85%'
    },
    setNvrButtonStyle: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        padding: 2,
        paddingRight: 10,
        paddingLeft: 10,
        backgroundColor: 'white',
        marginLeft: 5
    },
    setNvrButtonTextStyle: {
        color: 'dodgerblue',
        fontSize: 18
    },
    searchIpTextStyle: {
        color: 'white',
        fontSize: 14,
        marginTop: 5
    },
    searchOnlineIndicatorText: {
        color: 'white',
        fontSize: 14,
        marginRight: 5,
        marginTop: 5
    },
    footerTextStyle: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
}