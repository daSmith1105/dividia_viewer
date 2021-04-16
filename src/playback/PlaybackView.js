import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native'; 
import { Ionicons, Foundation, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import SearchBlock from './SearchBlock';
import PlayerWindow from './PlayerWindow';
import PlaybackControls from './PlaybackControls';
import FlagBlock from './FlagBlock';
import ClipContainer from './ClipContainer';
import UtilityBar from './UtilityBar';

class PlaybackView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timestamp: '',
            cameras: []
        }
    }

    setTimestamp = (stamp) => {
        this.setState({ timestamp: stamp })
    }

    componentWillUnmount = () => {
        this.setState({ timestamp: '' })
    }

    setCamerasEview = (cams) => {
        this.setState({ cameras: cams})
    }

    render(){
        return (
            <View style={styles.playbackViewContainerStyle}>
                <SearchBlock setCamerasEview={this.setCamerasEview} />
                <PlayerWindow timestamp={this.state.timestamp} setTimestamp={this.setTimestamp} camerasEview={this.state.cameras}/> 
                {/* <FlagBlock /> */}
                <ClipContainer timestamp={this.state.timestamp} setTimestamp={this.setTimestamp} />
                <UtilityBar />
            </View>
                
        )
    }
}

const mapStateToProps = state => {
    const { currentClipPlayingUrl } = state.playback;
    return {
        currentClipPlayingUrl
  }
}

export default connect(mapStateToProps, {})(PlaybackView);

const styles = {
    playbackViewContainerStyle: {
        flex: 1,
        position: 'relative',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'grey'
    },
    
}