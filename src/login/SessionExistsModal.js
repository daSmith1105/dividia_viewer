import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SessionExistsModal = props => {

  return(
    <View>
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>You are already logged in.</Text>
      <Text style={{textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: 'lightgrey', marginTop: 10 }}>Would you like to terminate your other session?</Text>
      <View style={styles.buttonContainerStyle}>
        <TouchableOpacity style={styles.modalButtonStyle}
                          onPress={props.onDeny}>
            <Text style={styles.modalButtonTextStyle}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalButtonStyle}
                          onPress={props.onAccept}>
            <Text style={styles.modalButtonTextStyle}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SessionExistsModal;

const styles = {
    buttonContainerStyle: {
        marginTop: 20, 
        width: '100%', 
        marginBottom: 10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around'
    },
    modalButtonStyle: {
        padding: 5, 
        backgroundColor: 'lightgrey', 
        width: '40%', 
        borderRadius: 5
    },
    modalButtonTextStyle: {
        textAlign: 'center', 
        fontSize: 16
    }
}