import React from 'react';
import { View, Text, Dimensions, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux';
import { setSingleView} from '../actions';
import placeholderImage from '../images/dtplaceholder.gif';
import NoFlickerImage from '../utility/NoFlickerImage';
import DoubleTap from '../utility/DoubleTap';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import axios from 'axios';

// hasRights = (kind, type, rights, serial, cam)

const width = Dimensions.get('window').width;
let h = w / 1.3;
let w = width;

class CameraStreamContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            imgError: false,
            disconnectStream: false,
            connectionError: false,
            scale: 1,
            offset: 0,
            timestamp: '',
            bSerial: null,
            ixSlot: null,
            fAuth: true,
            fAudio: false, 
            fEnabled: true,
            fFishEye: false,
            fMPE: false,
            fPTZ: false,
            sAccessIP: '',
            sIP: '',
            sLocalIP: '',
            bPort: 80, 
            sServerName: '',
            sName: '',
            bID: null
        }
    }

    componentDidMount = async () => {

      // if props.camer.bSerail === 0 it is a placeholder 
      h =  w / 1.3;
      if(this.props.placeholder || !this.props.camera.length > 2 ){
        this.setState({ loading: false })
      } else {

        this.setState({ 
            imgError: false,
            disconnectStream: false,
            connectionError: false,
            scale: 1,
            offset: 0,
            timestamp: '',
            bSerial: null,
            ixSlot: null,
            fAuth: true,
            fAudio: false, 
            fEnabled: true,
            fFishEye: false,
            fMPE: false,
            fPTZ: false,
            sAccessIP: '',
            sIP: '',
            sLocalIP: '',
            bPort: 80, 
            sServerName: '',
            sName: '',
            bCamera: null,
            scale: 1
        }, async () => {
          if( this.props.camera.bSerial && this.props.camera.bSerial !== 0 && this.props.authServers && this.props.authServers.size > 0 ) {
            let targetAuthServer = this.props.authServers.get(this.props.camera.bSerial);
            let serverName = targetAuthServer.sName;
            let sIP = targetAuthServer.sIP;
            let sLocalIP = targetAuthServer.sLocalIP;
            let bPort = targetAuthServer.bPort;
            let bSerial = this.props.camera.bSerial
            let ixSlot = this.props.camera.ixSlot
            let bID = this.props.camera.bCamera
            let fAuth = this.props.camera.fAuth

            const op1 = await this.whichIp(sLocalIP, sIP, bPort)

            Promise.all([op1])
            // still need camera name and all properties associated with individual camera
            .then( op1 => {
              this.setState({ 
                sServerName: serverName,
                bID: bID,
                fAuth: fAuth,
                bSerial: bSerial,
                sIP: sIP,
                sLocalIP: sLocalIP,
                bPort: bPort, 
                ixSlot: ixSlot,
                disconnectedStream: false,
                connectionError: false, 
                imageError: false
              })
            }) 
          } else {
            // this is a placeholder - set dummy data
            this.setState({ 
              sServerName: '',
              bCamera: 100,
              fAuth: false,
              bSerial: 0,
              sIP: '',
              sLocalIP: '',
              bPort: 80, 
              ixSlot: 100,
              disconnectedStream: false,
              connectionError: false, 
              imageError: false
            })
          }
        })
      }
    }

    componentWillUnmount = async () => {
        await this.setState({ disconnectStream: true })
    };

    getCamera = async (sServer, bSerial, bCamera) => {
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
          timeout: 2000
      })
      .then( response => {
          const data = response.data.result[1]
          const targetCamera = data.find( t => t.bID === bCamera);
          this.setState({ 
            fAudio: targetCamera.fAudio,
            fEnable: targetCamera.fEnable,
            fFisheye: targetCamera.fFisheye,
            fMPE: targetCamera.fMPE,
            fPtz: targetCamera.fPtz,
            sName: targetCamera.sName,
            loading: false
          })
      })
      .catch(error => {
          console.error('Error:', error);
          this.setState({ 
            loading: false
          })
      }); 
    }

    whichIp = async(localIp, remoteIp, port) => {
        // attempt local ip
        await axios({
            method: 'get',
            url: 'http://' + localIp,
            timeout: 2000
        })
        .then((response) => {
              this.setState({ sAccessIP: 'http://' + localIp }, () => {
                // make a call to get the camera name
                this.getCamera('http://' + localIp, this.props.camera.bSerial, this.this.props.camera.bCamera)
              })
        })
        .catch( async (error) => {
            // attempt remote ip
            await axios({
                method: 'get',
                url: 'http://' + remoteIp + ':' + port,
                timeout: 2000
            })
            .then((response) => {
                this.setState({ sAccessIP: 'http://' + remoteIp + ':' + port }, () => {
                  // make a call to get the camera name
                  this.getCamera('http://' + remoteIp + ':' + port, this.props.camera.bSerial, this.props.camera.bCamera)
                })
            })
            .catch((error) => {
                this.setState({ connectionError: true })
            })
        })
    }

    onPinchGestureEvent = event => {
        if(this.props.conf === 'conf-1' || this.props.fSingle) {    
            if(event.nativeEvent.scale < 1 ) {
                this.setState({ scale: 1 })
            } else {
                this.setState({ scale: event.nativeEvent.scale })
            }
        }
      }
    
    render() {
        if(this.props.fSingle === 1){
            h = width / 1.3;
            w = width;
        } else {
            switch (this.props.conf){
                case 'conf-1':
                    h = width / 1.3;
                    w = width;
                    break;
                case 'conf-4':
                    h = w / 1.3;
                    w = width / 2;
                    break;
                case 'conf-6':
                    h = w / .87;
                    w = width / 3;
                    break;
                case 'conf-9': 
                    h = w / 1.3;
                    w = width / 3;
                    break;
                case 'conf-12':
                    h = width / 3.9;
                    w = width / 4;
                    break;
                case 'conf-16':
                    h = width / 5.2;
                    w = width / 4;
                    break;
                default:
                    h = width / 1.3;
                    w = width;
            }
        }

        return (
            <View style={{ height: this.props.fSingle ? width / 1.3 : h, width: this.props.fSingle ? width : w, borderWidth: 1, borderColor: "rgba(0,0,0,0.8)", overflow: 'hidden' }}> 
                { this.state.loading ?
                    <View style={{ height: '100%', width: '100%', position: 'relative' }}> 
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', postition: "absolute", top: '30%', left: 0, height: '30%', width: '100%', alignItems: 'center', jusitfyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <Text style={{ color: 'white', textAlign: 'center', margin: 'auto', fontSize: 16,  }}>
                                LOADING   
                            </Text>
                            <ActivityIndicator style={{ marginLeft: 10 }} color="white" />
                        </View>
                    </View>:
                  this.props.placeholder ?
                    <View style={{ height: '100%', width: '100%' }}> 
                        <Image style={{width: '100%', height: '100%' }} source={placeholderImage}/>
                        <View style={styles.timestampContainerStyle}> 
                            <Text style={[styles.timestampTextStyle, { fontSize: this.props.conf !== 'conf-12' && this.props.conf !== 'conf-16' && !this.props.fSingle ? 10 : 8 }]}>
                                {'Cam ' + '  ' + this.props.camNum}  
                            </Text> 
                        </View>
                    </View> :
                 1 === 1 ?   //this.state.fAuth && this.state.fEnabled
                    <PinchGestureHandler
                                onGestureEvent={this.onPinchGestureEvent}>
                        <View style={{ height: '100%', width: '100%', position: 'relative', paddingRight: this.state.offset }}>
                            <DoubleTap
                                    // singleTap={() => {
                                    //     console.log("single tap");
                                    // }}
                                    doubleTap={() => this.props.fSingle ? this.props.setSingleView() : this.props.conf !== 'conf-1' ? this.props.onDoublePress() : null }
                                    delay={200}
                                    >   
                                <NoFlickerImage
                                    style={{width: '100%', height: '100%', transform: [{ scale: this.state.scale }] }}
                                    source={{uri:   
                                                    this.props.fSingle ?
                                                      this.state.sAccessIP + `/mpe/cam${this.state.bCamera}.jpg?user=${this.props.username}&pass=${this.props.password}&ts=${this.props.nvrTimestampShort}` :
                                                    this.props.conf === 'conf-1' ? 
                                                        this.state.sAccessIP + `/mpe/cam${this.state.bCamera}.jpg?user=${this.props.username}&pass=${this.props.password}&ts=${this.props.nvrTimestampShort}` : 
                                                        this.state.sAccessIP + `/mpe/scam${this.state.bCamera}.jpg?user=${this.props.username}&pass=${this.props.password}&ts=${this.props.nvrTimestampShort}`}}
                                />
                
                                <View style={[styles.timestampContainerStyle, {overflow: 'hidden', height: this.props.conf !== 'conf-12' && this.props.conf !== 'conf-16' && !this.props.fSingle ? 14 : 12 }] }> 
                                  { this.props.features.includes('eview') ? 
                                    <Text style={[styles.timestampTextStyle, { fontSize: this.props.conf !== 'conf-9' && this.props.conf !== 'conf-12' && this.props.conf !== 'conf-16' && !this.props.fSingle ? 10 : 8 }]}>
                                      { this.state.sServerName.length > 0 && 
                                        this.state.sName.length > 0 &&
                                        this.state.sServerName + '  Cam ' + this.props.camera.bCamera + ' - ' + this.state.sName 
                                      }
                                    </Text>  : 
                                    <Text style={[styles.timestampTextStyle, { fontSize: this.props.conf !== 'conf-9' && this.props.conf !== 'conf-12' && this.props.conf !== 'conf-16' && !this.props.fSingle ? 10 : 8 }]}>
                                      { 'Cam ' + (this.state.ixSlot + 1) + ' - ' + this.props.cameras.find(c => c.bID === this.state.ixSlot + 1).sName } 
                                    </Text> 
                                  }
                                </View>
                            </DoubleTap>
                            
                        </View>
                    </PinchGestureHandler> :

                    <View style={{ height: '100%', width: '100%' }}> 
                        <NoFlickerImage
                                style={{width: '100%', height: '100%' }}
                                source={placeholderImage}
                                />
                        <View style={styles.timestampContainerStyle}> 
                            <Text style={[styles.timestampTextStyle, { fontSize: this.props.conf !== 'conf-12' && this.props.conf !== 'conf-16' && !this.props.fSingle ? 10 : 8 }]}>
                                {'Cam ' + '  ' + 'camera name'}  
                            </Text> 
                        </View>
                    </View> 
                } 
            
            </View>
        )
    }
}

const mapStateToProps = state => {
    const { sSess, sServerLiveMPE, isLoggedIn, username, password } = state.auth;
    const { sServerMPE, bPort, cameras, bSerial, features, currentSelectedView, authServers } = state.server;
    const { conf } = state.config
    const { fSingle } = state.video
    const { userCameras } = state.user;
    const { nvrTimestamp, nvrTimestampShort } = state.utility;
    return {
        sSess,
        sServerMPE,
        isLoggedIn,
        username,
        password,
        bPort,
        cameras,
        bSerial,
        features,
        currentSelectedView, 
        authServers,
        conf,
        fSingle,
        userCameras,
        nvrTimestamp, 
        nvrTimestampShort
    }
}

export default connect(mapStateToProps, {setSingleView })(CameraStreamContainer);

const styles = { 
    innerContainerStyle: {
        height: '100%', 
        width: '100%'
    },
    timestampContainerStyle: {
        position: 'absolute', 
        bottom: -1, 
        left: 0,
        width: '100%',  
        backgroundColor: 'rgba(0,0,0,0.8)', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: 0
    },
    timestampTextStyle: {
        margin: 0, 
        padding: 0, 
        color: 'white'
    }
}