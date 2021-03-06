import React from 'react';
import { connect } from 'react-redux';
import { logoutUser, screenChange } from '../actions';
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
                                  onPress={ () => this.props.screenChange('live')}>
                    <Foundation name="play-video" size={30} color="white" />
                    <Text style={styles.confButtonTextStyle}>live</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('info button pressed')}>
                     <MaterialCommunityIcons name="cloud-download" size={30} color="white" />
                     <Text style={styles.confButtonTextStyle}>save</Text>
                     <Text style={styles.confButtonTextStyle}>video</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('audio button pressed')}>
                    <Ionicons name="ios-camera" size={30} color="white" />
                    <Text style={styles.confButtonTextStyle}>take</Text>
                    <Text style={styles.confButtonTextStyle}>photo</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('dewarp button pressed')}>
                    <Feather name="aperture" size={30} color="white" />
                    <Text style={styles.confButtonTextStyle}>fish</Text>
                    <Text style={styles.confButtonTextStyle}>eye</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('photo button pressed')}>
                    <Foundation name="info" size={30} color="white" />
                    <Text style={styles.confButtonTextStyle}>toggle</Text>
                    <Text style={styles.confButtonTextStyle}>info</Text>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => this.props.logoutUser(this.props.sSess, this.props.sServerJson)}>
                    <MaterialCommunityIcons name="logout-variant" size={31} color="white" />
                    <Text style={styles.confButtonTextStyle}>logout</Text>
                </TouchableOpacity>
            </View>
                
        )
    }
}

const mapStateToProps = state => {
    const { sSess } = state.auth;
    const { sServerJson } = state.server;
    return {
      sSess,
      sServerJson
  }
}

export default connect(mapStateToProps, {logoutUser, screenChange})(UtilityBar);

const styles = {
    confButtonsViewContainerStyle: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center', 
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingTop: 6,
        paddingBottom: 8,
        marginTop: 6
    },
    confButtonStyle: {
        padding: 0,
        width: '13%', 
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center'
    },
    confButtonTextStyle: {
        color: 'white', 
        fontSize: 10,
        textAlign: 'center',
        marginBottom: 5
    }
}