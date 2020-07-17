import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SessionExpiredModal = props => {

  return(
    <View>
      <Text style={{ textAlign: 'center', margin: 5, marginTop: 20, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Server Error</Text>
      <Text style={{ textAlign: 'center', margin: 5, fontSize: 14, color: 'lightgrey', fontWeight: 'bold'  }}>
        An error occurred while attempting to login to the server. 
      </Text>
      <Text style={{textAlign: 'center', margin: 5, fontSize: 16, color: 'white', fontWeight: 'bold'  }}>
        If this problem persists, please contact Dividia at 866-348-4342.
      </Text>
      <View style={styles.buttonContainerStyle}>
        <TouchableOpacity style={styles.modalButtonStyle}
                          onPress={props.onAccept}>
            <Text style={styles.modalButtonTextStyle}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SessionExpiredModal;

const styles = {
    buttonContainerStyle: {
        marginTop: 20, 
        width: '100%', 
        marginBottom: 10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
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