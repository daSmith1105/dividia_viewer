import React from 'react';
import { Video } from 'expo-av'
import { View, Text, Switch, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PlaybackControls from './PlaybackControls';

let node;
class PlayerWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            volume: 0.0,
            rate: 1,
            isPlaying: false,
            isPaused: false
        }

        this.videoPlayer = React.createRef();
    }

    componentDidMount = () => {
        node = this.videoPlayer.current
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
        alert('get previous video clip')
    }

    getNextVideo = () => {
        alert('get next video clip')
    }

    setVideoVolume = (volume) => {
        this.setState({ volume: volume})
    }

    setVideoSpeed = (speed) => {
        this.setState({ rate: speed })
    }

    render() {
        return (
            <View style={{ width: '100%' }}>
                 <Video
                    ref={this.videoPlayer}
                    source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                    rate={this.state.rate}
                    volume={this.state.volume}
                    isMuted={this.state.volume > 0 ? false : true}
                    resizeMode="contain"
                    // shouldPlay
                    style={{ width: Dimensions.get('window').width, height: 250 }}
                />
                <PlaybackControls 
                    play={this.playVideo} 
                    pause={this.pauseVideo} 
                    stop={this.stopVideo}
                    rewind={this.rewindVideo}
                    fastforward={this.fastforwardVideo}
                    getPrevious={this.getPreviousVideo}
                    getNext={ this.getNextVideo}
                    setVolume={this.setVideoVolume}
                    setSpeed={ this.setVideoSpeed}
                    isPlaying={this.state.isPlaying}
                    isPaused={this.state.isPaused}
                />
            </View>
        )
    }
}

export default PlayerWindow;

const styles = {
}