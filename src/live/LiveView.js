import React from 'react';
import { connect } from 'react-redux';
import { loginUser, getServer } from './../actions';
import { View, Text, Image, Dimensions } from 'react-native'; 
import logo from '../images/logo_transparent.png';
import config from '../../app.json';
import ConfButtonsView from './ConfButtonsView';
import UtilityBar from './UtilityBar';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import VideoView from './VideoView'
import moment from 'moment';

const width = Dimensions.get('window').width;

const version = config.expo.version;

class LiveView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedView: '1',
            selectedSystem: 0,
            systems: [],
            timestamp: Date.now()
        }
        this.updateHandler = 0;
    }

    componentDidMount = () => {
        this.setState({ 
            systems: this.props.authServers && this.props.authServers.length > 0 ? this.props.authServers.map(a => ( {label: a.sName, value: a.bSerial})) : [],
            selectedSystem: this.props.bSerial || this.props.authServers[0].bSerial
        })
        this.updateTimestamp();
    }

    componentWillUnmount = () => {
        clearTimeout(this.updateHandler);
    }

    updateTimestamp = () => {
        this.setState({
            timestamp: Date.now()
        }, () => {
            if(this.props.isLoggedIn) {
                this.setState({
                    timestamp: Date.now()
                }, () => {
                    this.updateHandler = setTimeout( () => { this.updateTimestamp(); this.updateHandler = 0 }, 1000 ) 
                })
                
            } else {
                clearTimeout(this.updateHandler);
            }
                
        });
    };

    render(){

        return (
            <View style={styles.liveViewContainerStyle}>
                <View style={{ position: 'absolute', top: -40, left: -120 }}>
                    <Image style={{transform: [{ scale: .3 }] }}
                           source={logo} />
                </View>
  
                <View style={{ height: 100, flexDirection: 'row',  justifyContent: 'space-between', marginTop: 40, marginBottom: 10 }}>
                    <View style={{ width: '35%', position: 'relative' }}>
                        <Text style={{ position: 'absolute', bottom: 16, left: '25%', padding: 0, fontSize: 12, color: 'white' }}>
                            {moment(this.state.timestamp).format("MM/DD/YYYY")}
                        </Text>
                        <Text style={{ position: 'absolute', bottom: 0, left: '25%', padding: 0, fontSize: 12, color: 'white' }}>
                            {moment(this.state.timestamp).format('hh:mm:ss a')}
                        </Text>
                    </View>
            
                    <View style={{ width: '65%', alignItems: 'flex-end', paddingRight: 10 }}>
                        <Text style={{ color: 'white', fontSize: 16, marginBottom: 2 }}>{version}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16, marginRight: 10, marginBottom: 10 }}>View: {this.props.sName}</Text>
                            {/* <RNPickerSelect
                                    useNativeAndroidPickerStyle={false}
                                    style={{ 
                                        inputAndroid:  styles.pickerSelectStyle,
                                        inputIOS: styles.pickerSelectStyle
                                    }}
                                    Icon={() => {
                                        return <Ionicons name="md-arrow-down" size={20} color="#135CA3" style={{ display: 'none' }} />;
                                    }}
                                    value={this.state.selectedView}
                                    onValueChange={(value) => this.setState({view: value}) }
                                    items={[
                                        { label: "Standard View", value: '1' },
                                        { label: "Custom View 1", value: '2' },
                                        { label: "Custom View 2", value: '3' },
                                        { label: "Custom View 3", value: '4' }
                                    ]}
                                /> */}
                        </View>
                       
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                            <Text style={{ color: 'white', fontSize: 16, marginRight: 10, marginBottom: 10 }}>System: {this.props.sName}</Text>
                            {/* <RNPickerSelect
                                    useNativeAndroidPickerStyle={false}
                                    style={{ 
                                        inputAndroid:  styles.pickerSelectStyle,
                                        inputIOS: styles.pickerSelectStyle
                                    }}
                                    Icon={() => {
                                        return <Ionicons name="md-arrow-down" size={20} color="#135CA3" style={{ display: 'none' }} />;
                                    }}
                                    value={this.state.selectedSystem}
                                    onValueChange={(value) => this.setState({selectedSystem: value}) }
                                    items={this.state.systems}
                                /> */}
                        </View>
                    </View>
                </View>

                <VideoView ts={this.state.timestamp} />

                <View style={{position: 'absolute', top: width /.8, width: '100%' }}> 
                    <ConfButtonsView />                            
                    <UtilityBar />  
                </View>
            </View>
                
        )
    }
}

const mapStateToProps = state => {
    const { cameras, authServers, bSerial, sName } = state.server;
    const { isLoggedIn } = state.auth
    return {
      state,
      cameras,
      authServers,
      bSerial,
      sName,
      isLoggedIn
  }
}

export default connect(mapStateToProps, { loginUser, getServer })(LiveView);

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
        fontSize: 16, 
        color: '#135CA3', 
        backgroundColor: 'white', 
        textAlign: 'center', 
        borderRadius: 5, 
        marginBottom: 10,
        padding: 2
    },
}