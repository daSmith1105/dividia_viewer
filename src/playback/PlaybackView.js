import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native'; 
import { Ionicons, Foundation, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import SearchBlock from './SearchBlock';
import PlayerWindow from './PlayerWindow';
import PlaybackControls from './PlaybackControls';
import FlagBlock from './FlagBlock';
import UtilityBar from './UtilityBar';

class PlaybackView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: 1
        }
    }

    render(){
        return (
            <View style={styles.playbackViewContainerStyle}>
              <SearchBlock />
              <PlayerWindow />
              <FlagBlock />
              <UtilityBar />
            </View>
                
        )
    }
}

const mapStateToProps = state => {
    return {
      state
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