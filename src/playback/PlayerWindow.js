import React from 'react';
import { connect } from 'react-redux';
import { setCurrentClipPlaying, setPlaybackRate, setCamera, getVideo } from '../actions';
import { Video } from 'expo-av';
import { View, Text, Dimensions } from 'react-native';
import moment from 'moment';

let node;

class PlayerWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            volume: 0.0,
            isPlaying: true,
            isPaused: false,
            mediaError: false,
            currentTime: '',
            date: '',
            loaded: false,
            timestamp: ''
        }

        this.video = React.createRef();
    }

    componentDidMount = () => {
        this.setState({ loaded: false });
        node = this.video.current;
        if(node.playbackRate !== this.props.playbackRate) {
          node.playbackRate = this.props.playbackRate
        };
        node.setStatusAsync({'progressUpdateIntervalMillis': 1000});
        this.setState({ loaded: true });
        this.props.setTimestamp(this.props.currentClipPlayingTimestamp);
    }

    componentDidUpdate = () => {
        if(node.playbackRate !== this.props.playbackRate) {
          node.playbackRate = this.props.playbackRate
        };
    }

    componentWillUnmount = () => {
        this.setState({ loaded: false, timestamp: '' })
        node.stopAsync();
        this.setState({ milis: 0 })
    }

    playVideo = () => {
        this.setState({ isPlaying: true, isPaused: false })
        node.playAsync();
    }

    pauseVideo = () => {
        this.setState({ isPlaying: false, isPaused: true })
        node.pauseAsync();
    }

    stopVideo = () => {
        this.setState({ isPlaying: false, isPaused: false })
        node.stopAsync();
    }

    rewindVideo = () => {
        node.stopAsync();
    }

    fastforwardVideo = () => {
        node.stopAsync();
    }

    getPreviousVideo = () => {
        if(this.props.prevClipsetTimestamp !== ''){
            this.props.setTimestamp('');
            this.props.getVideo(this.props.sServerJson, this.props.sSess, parseInt(this.props.currentClipPlayingCameraId), this.props.prevClipsetTimestamp, 0, 5);
        } else {
            alert('no previous clips to show')
        }
    }

    getNextVideo = () => {
        if(this.props.nextClipsetTimestamp !== ''){
            this.props.setTimestamp('');
            this.props.getVideo(this.props.sServerJson, this.props.sSess, parseInt(this.props.currentClipPlayingCameraId), this.props.nextClipsetTimestamp, 0, 5);
        } else {
            alert('no more clips to show')
        }
    }

    setVideoVolume = (volume) => {
        this.setState({ volume: volume})
    }

    setVideoSpeed = (rate) => {
        node.playbackRate = rate;
        this.props.setPlaybackRate(rate);
    }

    incrementVideoClip = async () => {
        // get the bId of the next clip
        const currentIndex = this.props.videoClipsRequested.findIndex( v => v.bID === this.props.currentClipPlayingId );
        const nextId = this.props.videoClipsRequested[currentIndex + 1] ? this.props.videoClipsRequested[currentIndex + 1].bID : '';
        if( nextId !== '' ) {
            await this.props.setCurrentClipPlaying(nextId);
            this.setState({ milis: 0 })
            this.props.setTimestamp(this.props.currentClipPlayingTimestamp);
        } else {
            await this.getNextVideo();
            this.setState({ milis: 0 })
            this.props.setTimestamp(this.props.currentClipPlayingTimestamp);
        }
        node = this.video.current;
    }

    videoStatus = component => {
        if(component.didJustFinish){
            this.incrementVideoClip();
        }
        if(component.error){
            console.log(component.error)
        }
    }

    render() {
        return (
            <View style={{ width: '100%', marginTop: -8 }}>
                <Video
                    ref={this.video}
                    source={{ uri: this.state.loaded && this.props.currentClipPlayingIp && this.props.currentClipPlayingUrl ? this.props.currentClipPlayingIp + '/camstream/?cmd=fetch&session=1094&file=' + this.props.currentClipPlayingUrl : null }}
                    posterSource={ require('../images/dtplaceholder.gif' )}
                    posterStyle={{width:'100%', height: '100%', marginTop: -10 }}
                    usePoster={true}
                    rate={this.props.playbackRate}
                    volume={this.state.volume}
                    isMuted={this.state.volume > 0 ? false : true}
                    resizeMode="contain"
                    shouldPlay
                    androidImplementation
                    useNativeControls={true}
                    onPlaybackStatusUpdate={this.videoStatus}
                    onError={error => console.log(error)}
                    style={{ width:'100%', height: Dimensions.get('window').height /2 }}
                /> 
          
                { this.state.loaded && this.props.currentClipPlayingIp && this.props.currentClipPlayingUrl && this.props.currentClipPlayingTimestamp && this.props.features.includes('eview') ?
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 12 }}>{this.props.camerasEview.find(c => c.value === this.props.selectedCam).label} {this.props.currentClipPlayingTimestamp}</Text> :
                  this.state.loaded && this.props.currentClipPlayingIp && this.props.currentClipPlayingUrl && this.props.currentClipPlayingTimestamp ?
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 12 }}>{'Cam ' + this.props.currentClipPlayingCameraId.toString() + ' - ' + this.props.cameras.filter(c => c.bID === this.props.currentClipPlayingCameraId)[0].sName}  {this.props.currentClipPlayingTimestamp} </Text> :
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 12, color: 'transparent'}} >aaaa</Text> 
                }

            </View>
        )
    }
}

const mapStateToProps = state => {
    const { videoClipsRequested, currentClipPlayingId, currentClipPlayingUrl, currentClipPlayingTimestamp, currentClipPlayingCameraId, currentClipPlayingDuration, playbackRate, playbackCamera, nextClipsetTimestamp, prevClipsetTimestamp, currentClipPlayingIp, selectedCam } = state.playback;
    const { sSess } = state.auth;
    const { sServerJson, sServerPlayback, cameras, nvrTimestamp, features, currentSelectedView, authServers } = state.server;
    return {
      videoClipsRequested,
      currentClipPlayingId,
      currentClipPlayingUrl,
      currentClipPlayingTimestamp,
      currentClipPlayingCameraId,
      currentClipPlayingDuration,
      currentClipPlayingIp,
      playbackRate,
      playbackCamera,
      nextClipsetTimestamp, 
      prevClipsetTimestamp,
      sSess,
      sServerJson,
      sServerPlayback,
      cameras,
      nvrTimestamp,
      features,
      currentSelectedView,
      authServers,
      selectedCam
    }
  }

export default connect(mapStateToProps, { setCurrentClipPlaying, setPlaybackRate, setCamera, getVideo })(PlayerWindow);
