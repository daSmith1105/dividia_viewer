import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
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
                    <Text style={styles.confButtonTextStyle}>video</Text>
                    <Text style={styles.confButtonTextStyle}>player</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('swap button pressed')}>
                      <Ionicons name="md-swap" size={30} color="white" />
                      <Text style={styles.confButtonTextStyle}>swap</Text>
                      <Text style={styles.confButtonTextStyle}>cams</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('info button pressed')}>
                     <Foundation name="info" size={30} color="white" />
                     <Text style={styles.confButtonTextStyle}>toggle</Text>
                     <Text style={styles.confButtonTextStyle}>info</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('audio button pressed')}>
                    <Foundation name="volume" size={30} color="white" />
                    <Text style={styles.confButtonTextStyle}>cam</Text>
                    <Text style={styles.confButtonTextStyle}>audio</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('dewarp button pressed')}>
                    <Feather name="aperture" size={30} color="white" />
                    <Text style={styles.confButtonTextStyle}>dewarp</Text>
                    <Text style={styles.confButtonTextStyle}>cam</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => alert('photo button pressed')}>
                    <Ionicons name="ios-camera" size={30} color="white" />
                    <Text style={styles.confButtonTextStyle}>take</Text>
                    <Text style={styles.confButtonTextStyle}>photo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confButtonStyle}
                                  onPress={ () => this.props.logoutUser(this.props.sSess, 'http://205.201.69.172:7000/JSON/')}>
                    <MaterialCommunityIcons name="logout-variant" size={31} color="white" />
                    <Text style={styles.confButtonTextStyle}>logout</Text>
                    <Text style={styles.confButtonTextStyle}></Text>
                </TouchableOpacity>
            </View>
                
        )
    }
}

const mapStateToProps = state => {
    const { sSess } = state.auth;
    return {
      sSess
  }
}

export default connect(mapStateToProps, {logoutUser})(UtilityBar);

const styles = {
    confButtonsViewContainerStyle: {
        flexDirection: 'row',
        width: '100%',
        maxWidth: 600, 
        alignItems: 'center', 
        justifyContent: 'space-around',
        marginTop: 10,
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