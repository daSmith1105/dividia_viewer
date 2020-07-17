import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor} from './src/store';
import Navigator from './src/Navigator';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: 1
    }
  }

  render() {
    return (
      <Provider store={store}>
        //<PersistGate persistor={persistor}> 
          <View style={styles.container}>
            <Navigator />
          </View>
        //</PersistGate>
      </Provider>
    )
  }
}

export default App;
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    backgroundColor: 'grey' // without this there is a white line on either side of the view
  },
});
