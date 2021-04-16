import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SessionExpiredModal = props => {

  return(
    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ margin: 5, fontSize: 20, fontWeight: 'bold', color: 'white',  }}>Session Expired</Text>
      <Text style={{textAlign: 'center', margin: 5, fontSize: 14, color: 'lightgrey', fontWeight: 'bold'  }}>
        Someone has logged in from a different device with your username.
      </Text>
      <Text style={{ margin: 5, fontSize: 16, color: 'white', fontWeight: 'bold'  }}>
        Your session has been terminated.
      </Text>

      <TouchableOpacity style={styles.modalButtonStyle}
                          onPress={props.onAccept}>
        <Text style={styles.modalButtonTextStyle}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SessionExpiredModal;

const styles = {
  modalButtonStyle: {
      padding: 5, 
      backgroundColor: 'lightgrey', 
      width: '40%', 
      borderRadius: 5,
      marginTop: 20,
      marginBottom: 20
  },
  modalButtonTextStyle: {
      textAlign: 'center', 
      fontSize: 16
  }
}