import React from 'react';
import { Dimensions } from 'react-native';
import { Video } from 'expo-av';

const VideoStream = props => {
  console.log(props.streamUrl)
  return (
    <Video
                    ref={props.video}
                    source={{ uri: props.streamUrl }}
                    posterSource={ require('../images/dtplaceholder.gif' )}
                    posterStyle={{width:'100%', height: '100%', marginTop: -10 }}
                    usePoster={true}
                    // rate={this.props.playbackRate}
                    // volume={this.state.volume}
                    isMuted={true}
                    resizeMode="contain"
                    shouldPlay
                    // androidImplementation
                    useNativeControls={true}
                    onPlaybackStatusUpdate={props.videoStatus}
                    onError={error => console.log(error)}
                    style={{ width:'100%', height: Dimensions.get('window').height /2 }}
                /> 
  )
}

export default VideoStream;