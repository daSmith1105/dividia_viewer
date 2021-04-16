import React from 'react';
import { connect } from 'react-redux';
import { setFilter, setCamera, getVideo, setDate, setSelectedCam } from '../actions';
import { View, Text, Switch, TouchableOpacity, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import axios from 'axios';

class SearchBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            camSelected: 0,
            archive: false,
            export: false,
            date: new Date(),
            showDatePicker: false,
            showTimePicker: false,
            cameras: [],
            loading: false,
            camSelectedIp: '',
            camSelectedName: '',
            camSelectedNumber: null
        }
    }

    componentDidMount = async () => {
        // ****** THIS IS A PROBLEM - APP CRASHES AND THEN WE NPO LONGER HAVE ACCESS TO AUTH SERVERS - RETURNS []
        this.setState({ cameras: [], date: new Date(), loading: true,  camSelectedIp: '', camSelectedName: '', camSelectedNumber: null })
        if( this.props.features.includes('eview') ) {
            const op1 = async () => this.props.currentSelectedView.forEach( async c => {
                let remoteIp = this.props.authServers.get(c.bSerial).sIP;
                let localIp = this.props.authServers.get(c.bSerial).sLocalIP;
                let port = this.props.authServers.get(c.bSerial).bPort;
                let serverName = this.props.authServers.get(c.bSerial).sName;
                let ixSlot = c.ixSlot + 1;

                // cache an array of serial and ip - if we already have the ip skip to getCamera()
                await this.whichIp(localIp, remoteIp, port, serverName, c.bSerial, c.bCamera, ixSlot)
            })
            await op1()
            Promise.all([op1])
        } else {
            this.setState({ loading: false })
        }
    }

    showDatePicker = () => {
        this.setState({ showDatePicker: true })
    }

    showTimePicker = () => {
        this.setState({ showTimePicker: true })
    }

    handleCameraSelect = cam => {
        if(cam) {
            const targetCam = this.state.cameras.find(a => a.value === cam);
            this.setState({ camSelected: cam });
            if(this.props.features.includes('eview')) {
                this.setState({ camSelectedIp: targetCam.ip, camSelectedName: targetCam.label, camSelectedNum: targetCam.camNum  });
            }
            this.props.setSelectedCam(cam);
        }
    }
    
    handleFilterChange = (type) => {
        this.props.setFilter(type);
    }

    handleDateSelect = (event, selectedDate) => {
        if( selectedDate ) {
            this.setState({ date: selectedDate, showDatePicker: false });
        } else {
            this.setState({ date: this.state.date.length > 0 ? this.state.date : new Date() })
        }
    }

    handleTimeSelect = (event, selectedDate) => {
        if( selectedDate ) {
            this.setState({ date: selectedDate, showTimePicker: false });
        }
    }

    toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    getCamera = async (sServer, bSerial, bCamera, serverName, ixSlot) => {
        if(sServer !== '') {
            // make an axios request to get the requested camera given the dvs serial and cam number
            const reqBody = {   "jsonrpc": 2.0,
                                "method": "config.server.getCamerasBySerial",
                                "id": 200,
                                "params": ["1094", bSerial]
                            };
            await axios({
                method: 'post',
                url: sServer + '/JSON/',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: reqBody,
                timeout: 3000
            })
            .then( response => {
                const data = response.data.result[1]
                const targetCamera = data.find( t => t.bID === bCamera);
                // add target camera to array with serverName - Cam # - Cam name
                this.setState({ cameras: [...this.state.cameras, {'label': serverName + ' - ' + bCamera + ' - ' + this.toTitleCase(targetCamera.sName), 'value': ixSlot, 'ip': sServer, camNum: bCamera } ]})
                if (this.state.cameras.length === this.props.currentSelectedView.length) {
                    this.setState({ loading: false })
                    this.props.setCamerasEview(this.state.cameras)
                }
            })
            .catch(error => {
                console.error('Error:', error);
            }); 
        } else {
            this.setState({ cameras: [...this.state.cameras, {'label': serverName + ' - ' + bCamera + ' - Connection Error', 'value': ixSlot, 'ip': '', camNum: bCamera } ]})
            if (this.state.cameras.length === this.props.currentSelectedView.length) {
                this.setState({ loading: false })
                this.props.setCamerasEview(this.state.cameras)
            }
        }
      }
  
      whichIp = async(localIp, remoteIp, port, serverName, bSerial, bCamera, ixSlot) => {
          // attempt local ip
          await axios({
              method: 'get',
              url: 'http://' + localIp,
              timeout: 3000
          })
          .then(async (response) => {
                await this.getCamera('http://' + localIp, bSerial, bCamera, serverName, ixSlot)
          })
          .catch( async (error) => {
              // attempt remote ip
              await axios({
                  method: 'get',
                  url: 'http://' + remoteIp + ':' + port,
                  timeout: 3000
              })
              .then(async (response) => {
                  await this.getCamera('http://' + remoteIp + ':' + port, bSerial, bCamera, serverName, ixSlot)
              })
              .catch(async (error) => {
                    console.log('ERROR: ', error)
                    await this.getCamera('', bSerial, bCamera, serverName, ixSlot)
              })
          })
      }

    requestVideoEvents = () => {
        if( !this.state.camSelected){
            alert('a camera must be selected.')
        } else {
            let date = moment(this.state.date).format('YYYYMMDDhhmmss')
            let date1 = moment(this.state.date).unix();
            let now = moment(new Date()).unix();
            let diff = parseInt(now) - parseInt(date1);
            let diffMin = Math.floor(diff / 60);

            // if the difference between current datetime and requested datetime is less than 10 minutes - set the requested time to 10 minutes prior
            if(diffMin < 10){
                let dt = new Date();
                dt.setMinutes( dt.getMinutes() - 15 );
                date = moment(dt).format('YYYYMMDDHHmmss');
            };
        
            let flags = 0
            if(this.props.archiveFilterState && !this.props.exportFilterState){
            flags = 1;
            };
            if(!this.props.archiveFilterState && this.props.exportFilterState) {
            flags = 2;
            }

            if(this.props.features.includes('eview')) {
                this.props.getVideo(this.state.camSelectedIp + '/JSON/', '1094', this.state.camSelectedNum, date, flags, 5) 
            } else {
                this.props.getVideo(this.props.sServerJson, this.props.sSess, this.state.camSelected, date, flags, 5)   // sServer, sSess, camID, sYMDHMS, bFlags, bNumEvents    0 - all, 1 -fArchive, 2 - fExport
            }
        }
    }

    render() {
    
        return (
            <View style={{ width: '100%', maxWidth: 760, height: 'auto', padding: 10, flexDirection: 'row', marginTop: 10 }}>

                <View style={{ width: '60%' }}>
                    <Text style={{ width: '100%', color: 'white', fontSize: 16, textAlign: 'center', marginTop : 0, marginRight: 10, marginBottom :20}}>System: {this.props.nvrSelected.sName}</Text>
                    { this.state.loading ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16, marginRight: 10, marginBottom: 10 }}>Loading Cameras</Text>
                            <ActivityIndicator color='white' style={{ marginBottom: 10 }} />
                        </View> :
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            style={{ 
                                inputAndroid:  styles.pickerSelectStyle,
                                inputIOS: styles.pickerSelectStyle
                            }}
                            Icon={() => {
                                return <Ionicons name="md-arrow-down" size={20} color="#135CA3" style={{ display: 'none' }} />;
                            }}
                            onValueChange={value => this.handleCameraSelect(value) }
                            value={ this.props.selectedCam }
                            // itemKey={ this.props.selectedCam }
                            items={ this.props.features.includes('eview') ? this.state.cameras.map( c => ({ 'label': c.label, 'value': c.value }) ).sort((a,b) => a.value > b.value) : this.props.cameras.map(c => ({ 'label': 'Cam ' + c.bID  + ' - ' + c.sName, 'value': c.bID }) )}
                        />
                    }
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text onPress={this.showDatePicker}
                              style={{ textAlign: 'center', padding: 3, width: '55%', fontSize: 16, color: 'blue', backgroundColor: 'white', borderRadius: 5 }}>
                                  {moment(this.state.date).format('MM/DD/YYYY')}
                        </Text>
                        <Text onPress={this.showTimePicker}
                              style={{ textAlign: 'center', padding: 3, width: '40%', fontSize: 16, color: 'blue', backgroundColor: 'white', borderRadius: 5 }}>
                                  {moment(this.state.date).format('hh:mm a')}
                        </Text>
                    </View>

                {/* Date select */}
                    {this.state.showDatePicker ? 
                        <DateTimePicker
                            testID="dateTimePicker1"
                            value={this.state.date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            maximumDate={new Date()}
                            onChange={this.handleDateSelect}
                        /> : null }

                {/* Time select */}
                    {this.state.showTimePicker ? 
                        <DateTimePicker
                            testID="dateTimePicker2"
                            value={this.state.date}
                            mode={'time'}
                            is24Hour={false}
                            display="default"
                            onChange={this.handleTimeSelect}
                        /> : null }
                
                    <TouchableOpacity style={styles.confirmButtonStyle}
                                    onPress={() => this.requestVideoEvents() }>
                        <Text style={styles.confirmButtonTextStyle}>Find</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '40%', alignItems: 'center', marginTop: 46 }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: 1.2, marginBottom: 5 }}>Filters</Text>
                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Text style={{ marginRight: 10, fontSize: 14, color: 'white' }}>Archive</Text>
                        <Switch 
                            value={this.props.archiveFilterState}
                            onValueChange={() => this.handleFilterChange('archive')}
                            style={{ marginRight: 16 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10}}>
                        <Text style={{ marginRight: 10, fontSize: 14, color: 'white' }}>Export</Text>
                        <Switch 
                            value={this.props.exportFilterState}
                            onValueChange={() => this.handleFilterChange('export')}
                            style={{ marginRight: 16 }}
                        />
                    </View>  
                </View>
               
            </View>
        )
    }
}

const mapStateToProps = state => {
    const { archiveFilterState, exportFilterState, playbackCamera, playbackDate, playbackTime, selectedCam } = state.playback;
    const { cameras, sServerJson, currentSelectedView, authServers, features } = state.server;
    const { sSess, nvrSelected } = state.auth;
    return {
      archiveFilterState,
      exportFilterState,
      playbackCamera,
      playbackDate, 
      playbackTime,
      selectedCam,
      cameras,
      sServerJson,
      currentSelectedView,
      authServers,
      features,
      sSess,
      nvrSelected
    }
  }
  
  export default connect(mapStateToProps,{ setFilter, setCamera, getVideo, setDate, setSelectedCam })(SearchBlock);

const styles = {
    pickerSelectStyle: {
        fontSize: 14, 
        color: '#135CA3', 
        backgroundColor: 'white', 
        textAlign: 'center', 
        borderRadius: 5, 
        marginBottom: 10,
        width: '100%',
        overflow: 'hidden'
    },
    confirmButtonStyle: {
        padding: 5,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 5
    },
    confirmButtonTextStyle: {
        fontSize: 16,
        color: 'blue',
        textAlign: 'center'
    }
}