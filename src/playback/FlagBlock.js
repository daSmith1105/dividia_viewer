import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

class FlagBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            archive: false,
            export: false
        }
    }

    toggleArchive = () => {
        this.setState({ archive: !this.state.archive })
    }

    toggleExport = () => { 
        this.setState({ export: !this.state.export })
    }

    render() {
        return (
            <View style={{ width: '100%', maxWidth: 600, height: 'auto',  flexDirection: 'row', padding: 10}}>

                <View style={{ flexDirection: 'row', width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ marginRight: 20, fontSize: 16 }}>Archive</Text>
                    <Switch 
                        value={this.state.archive}   
                        onValueChange={this.toggleArchive}
                    />
                </View>
                <View style={{ flexDirection: 'row', width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ marginRight: 20, fontSize: 16 }}>Export</Text>
                    <Switch
                        value={this.state.export}   
                        onValueChange={this.toggleExport} 
                    />
                </View>  
               
            </View>
        )
    }
}

export default FlagBlock;