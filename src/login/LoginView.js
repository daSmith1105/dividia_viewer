import React from 'react';
import { connect } from 'react-redux';
import { 
    usernameChanged, 
    passwordChanged, 
    autoLoginChanged, 
    nvrSearchTextChanged, 
    loginUser, 
    clearSessionModal,
    clearSelectedNvr,
    clearLoginResult,
    whichIp,
    setLoginResult
} from './../actions';
import { View, Text, Image, Switch, TouchableOpacity, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Keyboard, ActivityIndicator } from 'react-native'; // Note: Picker import will be deprecated, but as of right now the below import will not work without ejecting the project
import RNPickerSelect from 'react-native-picker-select';
import logo from '../images/logo_transparent.png';
import config from '../../app.json';
import { Ionicons } from '@expo/vector-icons';
import SessionExistsModal from './SessionExistsModal';
import SessionErrorModal from './SessionErrorModal';
import SessionExpiredModal from './SessionExpiredModal';
import NvrSearch from './NvrSearch';

const version = config.expo.version;
const mapify = (arr) => {
    return new Map(arr.map(i => [i.key, i.val]));
  }

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyboardVisible: false,
            showPass: false,
            autoLogin: false,
            system: '1',
            searchFocused: false,
            inputFocused: false,
            loginError: '',
            loadingNewServer: false,
            serverToLoad: {}
        }
    }

    componentDidMount = () => {
        this.setState({ loginError: '', loadingNewServer: false, serverToLoad: {} });
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
        this.setState({ loginError: '', inputFocused: false, searchFocused: false }, () => {
            if(this.props.username.trim().length < 1 && this.props.password.trim().length < 1) {
                this.setState({ loginError: ' * must provide username and password. *' })
            } else if ( this.props.username.trim().length < 1 ) {
                this.setState({ loginError: '* must provide password. *' })
            } else if ( this.props.password.trim().length < 1 ){
                this.setState({ loginError: '* must provide password. *' })
            } else {
                Keyboard.dismiss()
                this.props.loginUser( this.props.username, this.props.password, false, false, this.props.sServerJson, this.props.autoLoginStatus, this.props.bSerial ) //[sName,sPass,fForce,fLocal,this.props.sServer,fAuto,bSerial]
            }
        })
    }

    forceLogin = () => {
        this.props.loginUser( this.props.username, this.props.password, true, false, this.props.sServerJson, this.props.autoLoginStatus, this.props.bSerial ) //[sName,sPass,fForce,fLocal,this.props.sServer,fAuto,bSerial]
    }

    setInputFocus = () => {
        this.setState({ inputFocused: true });
        this.props.clearLoginResult();
    }

    removeInputFocus = () => {
        this.setState({ inputFocused: false })
        Keyboard.dismiss()
    }

    setSearchFocus = () => {
       this.setState({ searchFocused: true });
       this.props.nvrSearchTextChanged('');
       this.props.clearSelectedNvr();
    }

    removeSearchFocus = () => {
        this.setState({ searchFocused: false })
        Keyboard.dismiss()
    }

    checkFields = () => {
        // attempt login if submit button is pressed after editing password field
        if(this.props.username.trim().length > 0 && this.props.password.trim().length > 0 ){
            this.attemptLogin()
        }
    }

    setNewSystem = async (value) => {
        if(this.props.nvrSelected.bSerial !== value) {
            if(this.props.authServers.has(value)) {
                this.setState({ 
                    loadingNewServer: true , 
                    serverToLoad: this.props.authServers.get(value)
                }, async() => {
                    let newServer = this.props.authServers.get(value);
                    await this.props.whichIp(newServer, newServer.sLocalIP, newServer.sIP, newServer.bPort);
                    this.setState({ loadingNewServer: false});
                })
            } else {
                alert('could not find server in auth servers.')
            }
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.loginViewContainerStyle}>
            { !this.state.searchFocused && !this.state.inputFocused &&
                <Image style={{ transform: [{ scale: .5 }], marginTop: -20 }}
                       source={logo} />
            }

            { this.props.loginResult !== 'maxsession' && 
              this.props.loginResult !== 'noremote' && 
              this.props.loginResult !== 'error' && 
              this.props.loginResult !== 'expired' && 
              this.props.loginResult !== 'exists' ?

              <TouchableWithoutFeedback onPress={() => { this.removeSearchFocus(); this.removeInputFocus() }}>
                <View style={{
                    position: 'relative',
                     padding: 10,
                     height: 'auto',
                     width: '95%',
                     maxWidth: 600,
                     borderRadius: 10,
                     backgroundColor: this.props.bSerial > 0 ? '#135CA3' : '#A8A8A8',
                     marginTop: this.state.searchFocused || this.state.inputFocused ? 40 : -30
                }}>
                    { this.props.features.includes('eview') ?
                        <Text style={styles.formHeadingText}>Enterprise Viewer</Text> :
                        <Text style={styles.formHeadingText}>Dividia Video System</Text>
                    }
                    <Text style={styles.appVersionText}>Version: {version}</Text>
                    { this.state.searchFocused && 
                        <View style={{ position: 'absolute', top: 5, right: 10 }}>
                            <Ionicons name="md-backspace" size={40} color={ this.props.bSerial > 0 ? "goldenrod" : 'rgba(0,0,0,0.5)' } />
                            <Text style={{ padding: 0, marginTop: -6, color: this.props.bSerial > 0 ? 'goldenrod' : 'rgba(0,0,0,0.5)', fontSize: 16 }}>Back</Text>
                        </View>
                    }
                {/* current system and picker -if ability to jump between systems /controller setup */}
                { !this.state.searchFocused &&
                    <View>
                        <View style={{ color: 'white', margin: 'auto', paddingTop: 5 }}>
                            {   this.state.loadingNewServer ?
                                    <View style={ [styles.pickerSelectStyle, { flexDirection :'row', alignItems: 'center', justifyContent: 'center', paddingTop: 5, paddingBottom: 5 }] }>
                                        <Text style={{ fontSize: 18 }}>{this.state.serverToLoad.sName}</Text>
                                    </View> :
                                // this.props.bSerial > 0 && this.props.authServers && this.props.authServers.size > 1 ?
                                //     <RNPickerSelect
                                //         useNativeAndroidPickerStyle={false}
                                //         style={{ 
                                //             inputAndroid:  styles.pickerSelectStyle,
                                //             inputIOS: styles.pickerSelectStyle
                                //         }}
                                //         Icon={() => {
                                //             return <Ionicons name="md-arrow-down" size={20} color="#135CA3" style={{ display: 'none' }} />;
                                //         }}
                                //         value={this.props.nvrSelected.bSerial}
                                //         onValueChange={(value) => this.setNewSystem(value) }
                                //         items={Array.from(this.props.authServers, ([label, value]) => ({ label: value.sName, value: value.bSerial }))}
                                //     /> :
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
                                editable={this.props.bSerial > 0 ? true : false}
                                onSubmitEditing={this.removeInputFocus}
                                onFocus={this.setInputFocus}
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
                                editable={this.props.bSerial > 0 ? true : false}
                                onFocus={this.setInputFocus}
                                onSubmitEditing={this.checkFields}
                                secureTextEntry
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
                        {   this.props.loginLoading ?
                                <ActivityIndicator color="white" /> :
                            this.props.loginResult === 'noauth' ? 
                                <Text style={{ textAlign: 'center', color: 'goldenrod', fontWeight: 'bold', fontSize: 14 }}>Access Denied</Text> :
                                <Text style={{ textAlign: 'center', color: 'goldenrod', fontWeight: 'bold', fontSize: 14 }}>{this.state.loginError}</Text>
                        }

                        <View style={styles.loginConfirmBlockStyle}>
                            <TouchableOpacity style={[ styles.confirmButtonStyle, { opacity: this.props.loginLoading ? .4 : 1 } ]}
                                            onPress={ () => this.attemptLogin() }
                                            disabled={this.props.bSerial > 0 || this.props.loginLoading ? false : true }
                                            >
                                <Text style={{
                                        color: this.props.bSerial > 0 ? '#135CA3' : 'grey',
                                        fontSize: 18}}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.onlineCountStyle}>{ this.props.bSerial > 0 && this.props.usersOnline && this.props.usersOnline.length > 0 ? this.props.usersOnline.length : '0'} Online</Text>
                        </View> 
                    </View>
                    }
                </View>
                </TouchableWithoutFeedback> :

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

                    { this.props.loginResult === 'expired' ?
                        <View style={{ marginTop: 20, width: '100%' }}>
                            <SessionExpiredModal onAccept={ () => { this.props.setLoginResult(''); this.props.clearSessionModal() } } />
                        </View>  :
                        null  
                    }

                    { this.props.loginResult === 'exists' ?
                        <View style={{ marginTop: 20, width: '100%' }}>
                            <SessionExistsModal
                                onDeny={ () => this.props.clearSessionModal() }
                                onAccept={ () => this.forceLogin() } /> 
                        </View>:
                        null  
                    }   
                </View>
                }

                <NvrSearch  
                            onFocus={this.setSearchFocus}
                            onBlur={this.removeSearchFocus} 
                            searchFocused={this.state.searchFocused} 
                            removeSearchFocus={this.removeSearchFocus}
                            loadingNewServer={this.state.loadingNewServer}
                            serverToLoad={this.state.serverToLoad} />

                { !this.state.searchFocused && !this.state.inputFocused ?
                    <Text style={styles.footerTextStyle}>Improving Business Management</Text> :
                    null
                }
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = state => {
    const { username, password, autoLoginStatus, nvrSearchText, loginResult, nvrSelected, nvrSelectedIp, loginLoading } = state.auth;
    const { bSerial, bNumCams, sName, sServerJson, authServers, usersOnline, serialIpList, currentSelectedView, features } = state.server;
    const { screen } = state.nav;
    return {
      username,
      password,
      autoLoginStatus,
      nvrSearchText,
      loginResult,
      nvrSelected, 
      nvrSelectedIp,
      loginLoading, 
      bSerial,
      bNumCams,
      sName,
      sServerJson,
      authServers,
      usersOnline,
      serialIpList,
      currentSelectedView,
      features,
      screen
  }
}

export default connect(mapStateToProps, {usernameChanged, passwordChanged, autoLoginChanged, nvrSearchTextChanged, loginUser, clearSessionModal, clearSelectedNvr, clearLoginResult, whichIp, setLoginResult })(LoginView);

const styles = {
    loginViewContainerStyle: {
        position: 'relative',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    loginFormStyle: {
        padding: 10,
        height: 'auto',
        width: '95%',
        maxWidth: 600,
        borderRadius: 10,
        backgroundColor: '#135CA3',
        marginTop: -10
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
        paddingRight: 26,
        paddingLeft: 20,
        backgroundColor: 'white',
    },
    confirmButtonTextStyle: {
        color: 'dodgerblue',
        fontSize: 18
    },
    onlineCountStyle: {
        color: 'white', 
        fontSize: 14
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
        bottom: 20,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    }
}