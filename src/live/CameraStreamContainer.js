import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import { setSingleView } from '../actions';
import placeholderImage from '../images/dtplaceholder.gif';
import moment from 'moment';
import { NoFlickerImage } from 'react-native-no-flicker-image';
import DoubleClick from 'react-native-double-tap';

const width = Dimensions.get('window').width;
let h = w / 1.3;
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
        h =  w / 1.3;
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
        console.log(this.props.ts)

        return (
            <View style={{ height: this.props.fSingle ? width / 1.3 : h, width: this.props.fSingle ? width : w, borderWidth: 1, borderColor: "rgba(0,0,0,0.8)" }}> 
                { this.state.enabled && !this.state.loading && this.props.enabled !== 'false' && this.props.userCameras.indexOf(parseInt(this.props.camNum)) > -1 ? 
                    <View style={{ height: '100%', width: '100%' }}>
                         <DoubleClick
                                singleTap={() => {
                                    console.log("single tap");
                                }}
                                doubleTap={() => this.props.fSingle ? this.props.setSingleView() : this.props.conf !== 'conf-1' ? this.props.onDoublePress() : null }
                                delay={200}
                                >
                            <NoFlickerImage
                                style={{width: '100%', height: '100%' }}
                                source={{uri: `http://205.201.69.172:7000/mpe/cam${this.props.camNum}.jpg?sess=${this.props.sSess}&ts=${this.props.ts}`}}
                                />
                            <View style={[styles.timestampContainerStyle, {overflow: 'hidden', height: this.props.conf !== 'conf-12' && this.props.conf !== 'conf-16' && !this.props.fSingle ? 14 : 12 }] }> 
                                <Text style={[styles.timestampTextStyle, { fontSize: this.props.conf !== 'conf-12' && this.props.conf !== 'conf-16' && !this.props.fSingle ? 10 : 8 }]}>
                                    {this.props.camNum + ' - ' + this.props.cameras.find( c => c.bID === parseInt(this.props.camNum)).sName} 
                                </Text> 
                            </View>
                        </DoubleClick>
                    </View>  :
                    <View style={{ height: '100%', width: '100%' }}> 
                        <NoFlickerImage
                                style={{width: '100%', height: '100%' }}
                                source={placeholderImage}
                                />
                        <View style={styles.timestampContainerStyle}> 
                            <Text style={[styles.timestampTextStyle, { fontSize: this.props.conf !== 'conf-12' && this.props.conf !== 'conf-16' && !this.props.fSingle ? 10 : 8 }]}>
                                {'Cam ' + '  ' + this.props.camNum} 
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

export default connect(mapStateToProps, {setSingleView})(CameraStreamContainer);

const styles = { 
    innerContainerStyle: {
        height: '100%', 
        width: '100%'
    },
    timestampContainerStyle: {
        position: 'absolute', 
        bottom: 0, 
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