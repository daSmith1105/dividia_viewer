import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native'; 
import { Ionicons, Foundation, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
class UtilityBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: 1
        }
    }

    render(){
        return (
            <View style={styles.confButtonsViewContainerStyle}>
                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('playback button pressed')}>
                    <Foundation name="play-video" size={30} color="white" />
                    <Text style={styles.confButtonTextStyle}>live</Text>
                    <Text style={styles.confButtonTextStyle}>view</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('info button pressed')}>
                     <MaterialCommunityIcons name="cloud-download" size={30} color="white" />
                     <Text style={styles.confButtonTextStyle}>save</Text>
                     <Text style={styles.confButtonTextStyle}>video</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('audio button pressed')}>
                    <Ionicons name="ios-camera" size={30} color="white" />
                    <Text style={styles.confButtonTextStyle}>take</Text>
                    <Text style={styles.confButtonTextStyle}>photo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('dewarp button pressed')}>
                    <Feather name="aperture" size={30} color="white" />
                    <Text style={styles.confButtonTextStyle}>fish</Text>
                    <Text style={styles.confButtonTextStyle}>eye</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('photo button pressed')}>
                    <Foundation name="info" size={30} color="white" />
                    <Text style={styles.confButtonTextStyle}>toggle</Text>
                    <Text style={styles.confButtonTextStyle}>info</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('logout button pressed')}>
                    <MaterialCommunityIcons name="logout-variant" size={31} color="white" />
                    <Text style={styles.confButtonTextStyle}>logout</Text>
                    <Text style={styles.confButtonTextStyle}></Text>
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
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10
    },
    confButtonStyle: {
        padding: 5,
        width: '13%', 
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center'
    },
    confButtonTextStyle: {
        color: 'white', 
        fontSize: 10,
        textAlign: 'center'
    }
}