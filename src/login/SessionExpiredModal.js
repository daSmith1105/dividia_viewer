import React from 'react';
import { View, Text } from 'react-native';

const SessionExpiredModal = props => {

  return(
    <View>
      <Text style={{ margin: 5, fontSize: 20, fontWeight: 'bold', color: 'white',  }}>Session Expired</Text>
      <Text style={{ margin: 5, fontSize: 14, color: 'lightgrey', fontWeight: 'bold'  }}>
        Someone has logged in from a different device with your username.
      </Text>
      <Text style={{ margin: 5, fontSize: 16, color: 'white', fontWeight: 'bold'  }}>
        Your session has been terminated.
      </Text>
      <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 10 }}>
      </View>
    </View>
  );
};

export default SessionExpiredModal;

