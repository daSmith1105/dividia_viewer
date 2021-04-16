import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { nvrSearchTextChanged, whichIp, clearSelectedNvr, autoComplete, clearServerHistory, removeItemFromServerHistory, getServer } from './../actions';
import { Ionicons } from '@expo/vector-icons'; 


class NvrSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          inputFocused: false,
          searching: false,
          showWarningModal: false,
          toRemove: {},
          showClearHistoryModal: false
        }
    }

    componentDidMount = () => {
      this.setState({ searching: false, showWarningModal: false, showClearHistoryModal: false, toRemove: {} });
    }

    startNvrSearch = async (item, localIp, ip, port) => {
      this.props.removeSearchFocus();
      this.props.nvrSearchTextChanged(item.sName)
      this.setState({ searching: true });
      await this.props.whichIp(item, localIp, ip, port);
      this.setState({ searching: false });
      if(this.props.nvrSelectedIp && this.props.nvrSelectedIp.length > 1 &&  this.props.nvrSelectedIp !== 'none' ) {
        this.loadSelectedNvr()
      }
    }

    loadSelectedNvr = () => {
      // ** if nvrSelected is online
      // call get server and present login to user - change color from grey to blue 
      const serverUrl = this.props.nvrSelectedIp + '/JSON/';
      this.props.getServer(serverUrl);
      this.props.removeSearchFocus();
    }

    clearNvr = () => {
      this.props.clearSelectedNvr();     
    }

    showWarningModal = (item) => {
      this.setState({ showWarningModal: true, toRemove: item });
    }

    closewarningModal = () => {
      this.setState({ showWarningModal: false, showClearHistoryModal: false, toRemove: {} });
    }

    removeItemFromServerHistory = () => {
      this.props.removeItemFromServerHistory(this.state.toRemove.bSerial);
      this.closewarningModal();
    }

    showClearHistoryModal = () => {
      this.setState({ showClearHistoryModal: true });
    }

    clearServerHistory = () => {
      this.props.clearServerHistory()
      this.setState({ showClearHistoryModal: false });
    }

    render() {

      const Item = ({ item }) => {
          const name = item.sName;
          const port = item.bPort;
          const ip = item.sIP;
          const localIp = item.sLocalIP;
          return (
            // if less than 3 characters input show past history items
          this.props.nvrSearchText.trim().length > 2 && this.props.nvrSearchResults.length > 0 ? 
            <TouchableOpacity style={styles.item} onPress={ () => this.startNvrSearch(item, localIp, ip, port) }>
              <Text style={styles.title}>{name}</Text>
            </TouchableOpacity> :

            // history item
            <TouchableOpacity style={[styles.historyItem, {height: item.bSerial === 4000000 ? 24 : 30, backgroundColor: item.bSerial === 4000000 && 'rgba(0,0,0,0.6)'}] } onPress={ () => item.bSerial !== 4000000 ? this.startNvrSearch(item, localIp, ip, port) : null }>
              <Text style={[styles.title, {color: item.bSerial === 4000000 ? 'white' : 'black' }] }>{name}</Text>
              <TouchableOpacity onPress={ () => item.bSerial !== 4000000 ? this.showWarningModal(item) : this.showClearHistoryModal() }>
                <Ionicons name="ios-remove-circle" size={18} color={ item.bSerial === 4000000 ? 'lightgrey' : "red" } />
              </TouchableOpacity> 
            </TouchableOpacity>
        );
      }
      
      const renderItem = ({ item }) => (
          <Item key={item.bSerial} item={item} />
      );

      const historyItem = {
        "bPort": 8080,
        "bRtspPort": 554,
        "bSerial": 4000000,
        "bTimestamp": 1597069011,
        "fLocal": false,
        "sIP": "67.79.235.226",
        "sLocalIP": "10.11.50.11",
        "sName": "search history",
        "sVersion": "5.2.1",
      }

      return (
        <View style={styles.searchBlockStyle}>
          { this.state.showClearHistoryModal ?  
              <View style={{ width: '100%', height: 300, borderRadius: 5, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: 14 }}>Are you sure you want to remove</Text>
                <Text style={{ color: 'white', fontSize: 14 }}>entire search history?</Text>
                <View style={{ marginTop: 40, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                  <TouchableOpacity onPress={ this.closewarningModal }
                                    style={{ borderRadius: 5, width: '30%', padding: 5, backgroundColor: 'lightgrey' }}>
                    <Text style={{ textAlign: 'center', fontSize: 14}}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.clearServerHistory}
                                    style={{ borderRadius: 5, width: '30%', padding: 5, backgroundColor: 'lightgrey' }}>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>REMOVE</Text>
                  </TouchableOpacity>
                </View>
              </View> :
            this.state.showWarningModal ? 
              <View style={{ width: '100%', height: 300, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: 14 }}>Are you sure you want to remove</Text>
                <Text style={{ textAlign: 'center', padding: 5, paddingRight: 10, paddingLeft: 10, borderColor: 'lightgrey', borderRadius: 5, borderWidth: 2, color: 'white', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>
                  {this.state.toRemove.sName}
                </Text>
                <Text style={{ color: 'white', fontSize: 14 }}>from search history?</Text>
                <View style={{ marginTop: 40, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                  <TouchableOpacity onPress={ this.closewarningModal}
                                    style={{ borderRadius: 5, width: '30%', padding: 5, backgroundColor: 'lightgrey' }}>
                    <Text style={{ textAlign: 'center', fontSize: 14}}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.removeItemFromServerHistory}
                                    style={{ borderRadius: 5, width: '30%', padding: 5, backgroundColor: 'lightgrey' }}>
                    <Text style={{ textAlign: 'center', fontSize: 14 }}>REMOVE</Text>
                  </TouchableOpacity>
                </View>
              </View> :
              <View>
                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center', marginBottom: 5 }}>Enter company name or ip address to begin</Text>
                <View style={styles.searchRowStyle}>
                    <TextInput  style={[ styles.searchInputStyle, {
                                        textAlign: this.props.searchFocused ? 'left' : 'center',
                                        borderTopLeftRadius: 5,
                                        borderBottomLeftRadius: 5,
                                        borderTopRightRadius: this.props.searchFocused ? 0 : 5,
                                        borderBottomRightRadius: this.props.searchFocused ? 0 : 5
                                      }]}
                                onChangeText={text => this.props.nvrSearchTextChanged(text)}
                                value={this.props.loadingNewServer ? this.props.serverToLoad.sName : this.props.nvrSearchText}
                                placeholder="dvs search..."
                                placeholderTextColor="rgba(0,0,0,0.4)" 
                                onFocus={this.props.onFocus}
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChange={this.clearNvr}
                                onSubmitEditing={this.startNvrSearchManual} />

                  { this.props.searchFocused ? 
                    <TouchableOpacity style={{ zIndex:10, borderTopRightRadius: 5, borderBottomRightRadius: 5, backgroundColor: this.props.nvrSearchText.length > 0 ? '#cd5c5c' : 'white', paddingRight: 8, paddingLeft: 10,  height: 34, marginLeft: -24, alignItems: 'center', justifyContent: 'center' }} 
                                      onPress={() => this.props.onFocus() }>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{this.props.nvrSearchText.length > 0 ? 'X' : ''}</Text>
                    </TouchableOpacity> :
                    null
                  }

              </View>

              <View style={styles.searchRowStyle}>
                {this.state.searching || this.props.loadingNewServer ?
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.searchIpTextStyle}>loading server </Text> 
                    <ActivityIndicator size="small" color="white" style={{ marginLeft: 5, marginTop: 8 }} />
                  </View>:
                  <Text style={styles.searchIpTextStyle}>{this.props.nvrSearchReturnedEmpty ? 'no servers found for "' + this.props.nvrSearchText + '"' : this.props.nvrSelectedIp !== 'none' ? this.props.nvrSelectedIp : ''}</Text>
                }
                  <Text style={ [styles.searchOnlineIndicatorText, { color: (this.state.searching || this.props.nvrSelectedIp === '') ? 'transparent' : this.props.nvrSelectedIp !== 'none' ? 'lime' : 'goldenrod'}] }>
                    { ( this.state.searching || this.props.nvrSelectedIp === '' || this.props.loadingNewServer || this.props.nvrSearchReturnedEmpty ) ? '' : this.props.nvrSelectedIp !== 'none' ? 'Online' : 'Offline' } 
                  </Text>
              </View>

              { this.props.searchFocused && (this.props.serverHistory.length > 0 || (this.props.nvrSearchText.trim().length > 2 && this.props.nvrSearchResults.length > 0) ) ?
                  <FlatList
                    style={{ backgroundColor: "white", height: 200 }}
                    data={this.props.nvrSearchText.trim().length > 2 && 
                          this.props.nvrSearchResults.length > 0 ? 
                            this.props.nvrSearchResults : [
                              historyItem, 
                              ...this.props.serverHistory] 
                          } 
                    renderItem={ renderItem }
                    keyExtractor={item => item.bSerial.toString()} /> :
                    null
              }

            </View>
          }
        </View>
      )
    }
}

const mapStateToProps = state => {
  const { nvrSearchText, nvrSearchResults, nvrSelected, nvrSelectedIp, nvrSearchReturnedEmpty } = state.auth;
  const { serverHistory } = state.server;
    return {
      nvrSearchText,
      nvrSearchResults,
      nvrSelected,
      nvrSelectedIp,
      nvrSearchReturnedEmpty,
      serverHistory
  }
}

export default connect(mapStateToProps, { nvrSearchTextChanged, whichIp, clearSelectedNvr, autoComplete, clearServerHistory, removeItemFromServerHistory, getServer })(NvrSearch);

const styles = {
  searchBlockStyle: {
      marginTop:5,
      padding: 10,
      paddingRight: 10,
      paddingLeft: 10,
      height: 'auto',
      width: '95%',
      maxWidth: 600,
      borderRadius: 10,
      backgroundColor: '#135CA3'
  },
  searchRowStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 34
  },
  searchInputStyle: {
      fontSize: 16,
      padding: 4,
      paddingLeft: 10,
      backgroundColor: 'white',
      width: '95%'
  },
  setNvrButtonStyle: {
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 5,
      padding: 2,
      paddingRight: 10,
      paddingLeft: 10,
      backgroundColor: 'white',
      marginLeft: 5
  },
  setNvrButtonTextStyle: {
      color: 'dodgerblue',
      fontSize: 18
  },
  searchIpTextStyle: {
      color: 'white',
      fontSize: 14,
      marginTop: 5
  },
  searchOnlineIndicatorText: {
      color: 'white',
      fontSize: 14,
      marginRight: 5,
      marginTop: 5
  },
  item: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 8
  },
  title: {
    fontSize: 14
  },
  historyItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 8
  }
}