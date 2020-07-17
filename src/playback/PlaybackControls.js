import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native'; 
import { Ionicons, Foundation, MaterialCommunityIcons, Feather, Entypo } from '@expo/vector-icons';
class UtilityBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: 1
        }
    }

    showVolumeSlider = () => {
        alert('show volume slider')
    }

    showPlaybackRateSlider = () => {
        alert('show rate slider')
    }

    render(){
        return (
            <View style={styles.confButtonsViewContainerStyle}>
                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => this.props.getPrevious() }>
                    <Entypo name="arrow-with-circle-left" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => this.props.rewind() }>
                      <Entypo name="controller-fast-backward" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => this.props.stop()}>
                     <Entypo name="controller-stop" size={30} color="white" />
                </TouchableOpacity>

                { this.props.isPlaying ? 
                    <TouchableOpacity style={{ paddingRight: 8, paddingLeft: 8 }}
                                    onPress={ () => this.props.pause()}>
                        <Foundation name="pause" size={30} color="white" />
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.confButtonStyle}
                                    onPress={ () => this.props.play()}>
                        <Entypo name="controller-play" size={30} color="white" />
                    </TouchableOpacity>
                }

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => this.props.fastforward() }>
                    <Entypo name="controller-fast-forward" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => this.props.getNext() }>
                    <Entypo name="arrow-with-circle-right" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => this.showVolumeSlider() }>
                    <Entypo name="controller-volume" size={30} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => this.showVolumeSlider() }>
                    <Ionicons name="ios-speedometer" size={30} color="white" />
                </TouchableOpacity>
            </View>
                
        )
    }
}

const mapStateToProps = state => {
    return {
      state
  }
}

export default connect(mapStateToProps, {})(UtilityBar);

const styles = {
    confButtonsViewContainerStyle: {
        flexDirection: 'row',
        width: '100%',
        maxWidth: 600, 
        alignItems: 'center', 
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingBottom: 10
    }
}