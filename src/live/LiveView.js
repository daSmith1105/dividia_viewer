import React from 'react';
import { connect } from 'react-redux';
import { loginUser, getNvrTimestamp, jumpServer, clearSelectedNvr, setJumpStatus, buildCameraView, setNumcams, getServer } from './../actions';
import { View, Text, Image, Dimensions, ActivityIndicator, FlatList } from 'react-native'; 
import logo from '../images/logo_transparent.png';
import config from '../../app.json';
import ConfButtonsView from './ConfButtonsView';
import UtilityBar from './UtilityBar';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import VideoView from './VideoView'
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

const width = Dimensions.get('window').width;

const version = config.expo.version;

class MyListItem extends React.PureComponent {
    render() {
      return (
            <View style={{paddingVertical: 5,}}>
                <TouchableOpacity style={{ borderBottomColor: 'lightgrey', borderBottomWidth: 2, height: 30, flexDirection: 'row', alignItems: 'center' }} onPress={ () => this.props.changeCamViewSet(this.props.name) }>
                    <Text style={{  color: '#000', 
                                    fontSize: 14, 
                                    justifyContent: 'center' }}>
                        {this.props.name}
                    </Text>
                </TouchableOpacity>
            </View>
      )
    }
  }


class LiveView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timestampHandlerRunning: false,
            jumpConnectionError: false,
            sets: [],
            camViewName: '',
            showSetList: false
        }
        this.nvrTimestampHandler = 0;
    }

    componentDidMount = () => {
        this.setState({ jumpConnectionError: false, sets: this.props.cameraSets, showSetlist: false, data: this.props.cameraSetNames.filter( c => c.label !== 'None') })
        clearInterval(this.nvrTimestampHandler);
        if(!this.state.timestampHandlerRunning){
            this.startNvrTimeUpdate();
          }    
    }

    componentWillUnmount = () => {
        clearInterval(this.nvrTimestampHandler);
    }

    startNvrTimeUpdate = () => {
        this.nvrTimestampHandler = setInterval(() => this.props.getNvrTimestamp(this.props.sSess, this.props.sServerJson ), 1000);
    }

    attemptSystemJump = (value) => {
        if(value !== this.props.nvrSelected.bSerial) {
            let newSystem = this.props.authServers.get(value);
            this.props.jumpServer(newSystem, this.props.nvrSelected, this.props.username, this.props.password, this.props.sSess, this.props.sServerJson, this.props.conf); 
        }
    }

    changeCamViewSet = async (value) => {
        this.setState({ showSetList: false })
        if(value !== this.props.selectedViewName) {
            const targetSet = this.props.cameraSets.get(value);
            // set the new selectedView and name
            this.props.buildCameraView(targetSet, value)
            // get bNumCam for cam buttons - this function will dispatch the GET_SERVER action with only the bNumcams getting set 
            this.props.setNumcams(targetSet.length)
            // get server details for 
        } 
    }

    renderItem = ({ item }) => (
        <MyListItem name={item.label} changeCamViewSet={this.changeCamViewSet} cameraSets={this.props.cameraSets} />
    )

    render(){
        this.props.jumpStatus === 'connection_error' && this.state.jumpConnectionError !== true && this.setState({ jumpConnectionError: true });

        return (
            <View style={styles.liveViewContainerStyle}>
                <View style={{ position: 'absolute', top: -50, left: -100}}>
                    <Image style={{transform: [{ scale: .3 }] }}
                           source={logo} />
                </View>
  
                <View style={{ height: 100, flexDirection: 'row',  justifyContent: 'space-between', marginLeft: 10, marginTop: 30, marginBottom: 10 }}>
                    <View style={{ width: '35%', position: 'relative' }}>
                        <Text style={{ position: 'absolute', bottom: 16, left: '25%', padding: 0, fontSize: 12, color: 'white' }}>
                            {this.props.nvrTimestamp.slice(0,10)}
                        </Text>
                        <Text style={{ position: 'absolute', bottom: 0, left: '25%', padding: 0, fontSize: 12, color: 'white' }}>
                            {this.props.nvrTimestamp.slice(11,14) + this.props.nvrTimestamp.slice(14,16) + this.props.nvrTimestamp.slice(16,19)}
                        </Text>
                    </View>
            
                    <View style={{ width: '65%', alignItems: 'flex-end', paddingRight: 10, marginTop :-20 }}>
                        <Text style={{ color: 'white', fontSize: 12, marginBottom: 5,  marginRight: 5 }}>{version}</Text>
                        <Text style={{ color: 'white', fontSize: 12, marginBottom: 5,  marginRight: 5 }}>USER: {this.props.username}</Text>
                       
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8 }} >

                            {   this.props.viewChangeLoading ? 
                                    <View style={ [styles.pickerSelectStyle, {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: 10, paddingLeft: 10 }] }>
                                        <Text style={{ fontSize: 16, color: 'grey' }}>loading  </Text>
                                        <ActivityIndicator color='grey' />
                                    </View> :
                                this.props.cameraSetNames && this.props.cameraSetNames.length > 1 && this.props.features.includes('eview') ? 
                                    <View>
                                        { !this.state.showSetList ?
                                            <View style={{ flexDirection: 'row'  }}>
                                                <Text style={{ color: 'white', fontSize: 16, marginRight: 10, marginBottom: 10 }}>View: </Text>
                                                <TouchableOpacity style={styles.pickerSelectStyle} onPress={() => { this.setState({ showSetList: true }) }}>
                                                    <Text>{this.props.selectedViewName}</Text>
                                                </TouchableOpacity>
                                            </View> :
                                            <FlatList
                                                style={{ position: 'relative', top: 0, right: Dimensions.get('window').width / 20,  height: Dimensions.get('window').height / 1.5, width: Dimensions.get('window').width / 1.2, backgroundColor: "white", margin: 'auto'}}
                                                data={this.state.data}
                                                renderItem={this.renderItem}
                                                keyExtractor={(item) => item.label}
                                            /> 
                                        } 
                                    </View> :
                                    <Text></Text>
                            }
                        </View>

                    {/* if eview in features show views only */}
                        { this.props.features && this.props.features.indexOf('eview') < 0 ?
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                                <Text style={{ color: 'white', fontSize: 16, marginRight: 10, marginBottom: 10 }}>System: </Text>
                                { this.props.jumpLoading ? 
                                        <View style={ [styles.pickerSelectStyle, {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: 10, paddingLeft: 10 }] }>
                                            <Text style={{ fontSize: 16, color: 'grey' }}>loading  </Text>
                                            <ActivityIndicator color='grey' />
                                        </View> :
                                    this.props.authServers && this.props.authServers.size > 1 ? 
                                        <RNPickerSelect
                                                useNativeAndroidPickerStyle={false}
                                                style={{ 
                                                    inputAndroid:  styles.pickerSelectStyle,
                                                    inputIOS: styles.pickerSelectStyle
                                                }}
                                                Icon={() => {
                                                    return <Ionicons name="md-arrow-down" size={20} color="#135CA3" style={{ display: 'none' }} />;
                                                }}
                                                value={this.props.nvrSelected.bSerial}
                                                onValueChange={(value) => this.attemptSystemJump(value) }
                                                // authServers is a hash Map nedd to convert to an array to be used with picker
                                                items={ Array.from(this.props.authServers, ([name, value]) => ({ label: value.sName, value: name })) }
                                            /> :
                                        <Text style={styles.pickerSelectStyle}>{this.props.sName}</Text>    
                                }
                            </View> :
                            null
                        }   
                    </View>
                </View>
                {this.state.jumpConnectionError ? 
                    <View style={{ width: '100%', padding: 3,backgroundColor: 'goldenrod', margin: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: - 5 }}>
                        <Text style={{ textAlign: 'center', marginRight: 20 }}>Jump to "{this.props.jumpSystemName}" failed. Is system offline?</Text> 
                        <TouchableOpacity onPress={ () => { this.props.setJumpStatus(''); this.setState({ jumpConnectionError: false }) }}
                                          style={{ padding: 2, paddingRight: 8, paddingLeft: 8, borderWidth: 2, borderColor: 'white', borderRadius: 5, backgroundColor: 'white' }}>
                            <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>OK</Text>
                        </TouchableOpacity>
                    </View>:
                    null
                }

                {!this.state.showSetList && <VideoView />}

                <View style={{position: 'absolute', top: width /.8, width: '100%' }}> 
                    <ConfButtonsView />                            
                    <UtilityBar />  
                </View>
            </View>
                
        )
    }
}

const mapStateToProps = state => {
    const { cameras, bSerial, sName, sServerJson, authServers, features, currentSelectedView, selectedViewName, viewChangeLoading } = state.server;
    const { isLoggedIn, sSess, nvrSelected, username, password, jumpLoading, jumpStatus, jumpSystemName } = state.auth;
    const { nvrTimestamp, nvrTimestampShort } = state.utility;
    const { bID, cameraSets, cameraSetNames, cameraSetSerials } = state.user;
    return {
      state,
      cameras,
      authServers,
      bSerial,
      sName,
      sServerJson,
      features,
      currentSelectedView,
      selectedViewName,
      viewChangeLoading,
      sSess, 
      isLoggedIn,
      nvrSelected,
      username,
      password,
      jumpLoading,
      jumpStatus,
      jumpSystemName,
      nvrTimestamp, 
      nvrTimestampShort,
      bID,
      cameraSets,
      cameraSetNames, 
      cameraSetSerials
  }
}

export default connect(mapStateToProps, { loginUser, getNvrTimestamp, jumpServer, clearSelectedNvr, setJumpStatus, buildCameraView, setNumcams, getServer })(LiveView);

const styles = {
    liveViewContainerStyle: {
        flex: 1,
        position: 'relative',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'grey',
        margin: 0,
        padding: 0
    },
    pickerSelectStyle: {
        height: 26, 
        fontSize: 16, 
        color: '#135CA3', 
        backgroundColor: 'white', 
        textAlign: 'center', 
        borderRadius: 5, 
        marginBottom: 10,
        padding: 2
    },
}