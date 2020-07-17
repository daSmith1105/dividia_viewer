import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import placeholderImage from '../images/dtplaceholder.gif';
import moment from 'moment';
import { NoFlickerImage } from 'react-native-no-flicker-image';

const width = Dimensions.get('window').width;
const defaultHeight = Math.floor(w / 2);
let h = Math.floor(w / 1.3);
let w = width;

class CameraStreamContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            timestamp: '',
            enabled: false,
            imgError: false,
        }

        this.updateHandler = 0;
    }

    componentDidMount = () => {
        h = defaultHeight;
        this.setState({ 
            loading: true, 
            imgError: false
        }, () => {
            setTimeout( () => {
                let cam = this.props.enabled;

                if(cam && cam.fEnable){ 
                    this.setState({
                        enabled: cam.fEnable
                    }, () => {
                        this.setState({
                            loading: false
                        })
                    })
                } else {
                    this.setState({
                        loading: false
                    })
                }
            }, 300)
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
    
    render() {

        switch (this.props.conf){
            case 'conf-1':
                h = width / 1.3;
                w = width;
                break;
            case 'conf-4':
                h = w / 1;
                w = width / 2.5;
                break;
            case 'conf-6':
                h = w / 1;
                w = width / 3;
                break;
            case 'conf-9':
                h = 300;
                w = width / 3;
                break;
            case 'conf-12':
                h = 300;
                w = width / 4;
                break;
            case 'conf-16':
                h = 300;
                w = width / 4;
                break;
            default:
                h = 300;
                w = width;
        }

        return (
            <View style={{ flexDirection: 'column', height: h, width: w }}> 
               {/* </View> { this.state.enabled && !this.state.loading && this.props.enabled !== 'false' && this.props.userCameras.indexOf(parseInt(this.props.camNum)) > -1 ? */}
                   {/* <View style={{ height: Math.floor(w), width: Math.floor(h) }}>
                        <NoFlickerImage
                            style={{width: Math.floor(w), height: Math.floor(h) }}
                            source={{uri: `http://205.201.69.172:7000/mpe/cam${this.props.camNum}.jpg?sess=${this.props.sSess}&ts=${this.state.timestamp}`}}
                            />
                   <View style={styles.timestampContainerStyle}> */}

                     {/* for 12 and 16 view arrange 2 lines - top is cam num etc, bottom is date time */}
                       {/* <Text style={styles.timestampTextStyle}>
                           {this.props.camNum + ' - ' + this.props.cameras.find( c => c.bID === parseInt(this.props.camNum)).sName}
                       </Text>
                       <Text style={styles.timestampTextStyle}>
                           {moment(this.state.timestamp).format('MM/DD/YYYY HH:mm:ss')}
                       </Text>
                   </View>
               </View> 
                : */}
                 <View style={{ height: '100%', width: '100%' }}> 
                     <NoFlickerImage
                             style={{width: '100%', height: '100%' }}
                             source={placeholderImage}
                             />
                        {/* for 12 and 16 view arrange 2 lines - top is cam num etc, bottom is date time  */}
                        <Text style={styles.timestampTextStyle}>
                             {'Cam ' + this.props.camNum + ' - No Camera Enabled'}
                         </Text> 
                     </View> 
                 {/* </View>  */}
             {/* } */}
            
            </View>
        )
    }
}

const mapStateToProps = state => {
    const { sSess, sServerLiveMPE, isLoggedIn, username, password } = state.auth;
    const { sServer, bPort, cameras } = state.server;
    const { conf } = state.config
    const { fSingle } = state.video
    const { userCameras } = state.user;
    return {
        sSess,
        sServerLiveMPE,
        isLoggedIn,
        username,
        password,
        sServer,
        bPort,
        cameras,
        conf,
        fSingle,
        userCameras
    }
}

export default connect(mapStateToProps, {})(CameraStreamContainer);

const styles = { 
    innerContainerStyle: {
        height: '100%', 
        width: '100%'
    },
    timestampContainerStyle: {
        position: 'absolute', 
        bottom: 1, 
        left: 0,
        width: '99%', 
        marginLeft: '.5%', 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: 5
    },
    timestampContainerStyle1: {
        position: 'absolute', 
        bottom: 1, 
        left: 0,
        width: '99%', 
        marginLeft: '.5%', 
        backgroundColor: 'rgba(0,0,0,0.3)', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 5
    },
    timestampTextStyle: {
        margin: 0, 
        padding: 0, 
        fontWeight: 'bold',
        fontSize: 10,  
        color: 'white'
    }
}