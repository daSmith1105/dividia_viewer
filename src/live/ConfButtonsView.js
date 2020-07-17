import React from 'react';
import { connect } from 'react-redux';
import { setSingleView, configChange, camViewChange } from '../actions';
import { View, Text, Image, TouchableOpacity } from 'react-native'; 


const  ConfButtonsView = props => {
    console.log(props.currentCamView)
    return (
        <View style={styles.confButtonsViewContainerStyle}>
            <TouchableOpacity style={styles.confButtonStyle1}
                                onPress={ () => { props.singleCamSelected && props.setSingleView(''); props.configChange("conf-1"); props.camViewChange("cam_1") } }>
                <Text style={styles.confButtonTextStyle}>1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confButtonStyle1}
                                onPress={ () => { props.singleCamSelected && props.setSingleView(''); props.configChange("conf-4"); props.camViewChange("cam_1-4") } }>
                <Text style={styles.confButtonTextStyle}>4</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confButtonStyle1}
                                onPress={ () => { props.singleCamSelected && props.setSingleView(''); props.configChange("conf-6"); props.camViewChange("cam_1-6") } }>
                <Text style={styles.confButtonTextStyle}>6</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confButtonStyle1}
                                onPress={ () => { props.singleCamSelected && props.setSingleView(''); props.configChange("conf-9"); props.camViewChange("cam_1-9") } }>
                <Text style={styles.confButtonTextStyle}>9</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confButtonStyle2}
                                onPress={ () => { props.singleCamSelected && props.setSingleView(''); props.configChange("conf-12"); props.camViewChange("cam_1-12") } }>
                <Text style={styles.confButtonTextStyle}>12</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confButtonStyle2}
                                onPress={ () => { props.singleCamSelected && props.setSingleView(''); props.configChange("conf-16"); props.camViewChange("cam_1-16") } }>
                <Text style={styles.confButtonTextStyle}>16</Text>
            </TouchableOpacity>
        </View>
            
    )
}

const mapStateToProps = state => {
    const { singleCamView, singleCamSelected } = state.video;
    const { conf } = state.config;
    const { bNumCams }  = state.server;
    const { currentCamView } = state.camera
    return {
        singleCamView, 
        singleCamSelected,
        conf,
        bNumCams,
        currentCamView
  }
}

export default connect(mapStateToProps, {setSingleView, configChange, camViewChange})(ConfButtonsView);

const styles = {
    confButtonsViewContainerStyle: {
        flexDirection: 'row',
        width: '90%',
        maxWidth: 600, 
        alignItems: 'center', 
        justifyContent: 'space-around',
        marginTop: 10,
    },
    confButtonStyle1: {
        padding: 10,
        paddingRight: 15,
        paddingLeft: 15, 
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center'
    },
    confButtonStyle2: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center'
    },
    confButtonTextStyle: {
        color: 'white',
        fontSize: 16
    }
}