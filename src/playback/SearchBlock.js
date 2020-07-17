import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

class SearchBlock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            camSelected: '1',
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
            <View style={{ width: '100%', maxWidth: 600, height: 'auto', padding: 10, flexDirection: 'row', marginTop: 30 }}>

                <View style={{ width: '60%' }}>
                    <RNPickerSelect
                                    useNativeAndroidPickerStyle={false}
                                    style={{ 
                                        inputAndroid:  styles.pickerSelectStyle,
                                        inputIOS: styles.pickerSelectStyle
                                    }}
                                    Icon={() => {
                                        return <Ionicons name="md-arrow-down" size={20} color="#135CA3" style={{ display: 'none' }} />;
                                    }}
                                    value={this.state.camSelected}
                                    onValueChange={(value) => this.setState({camSelected: value}) }
                                    items={[
                                        { label: 'Cam 1', value: '1' },
                                        { label: 'Cam 2', value: '2' },
                                        { label: 'Cam 3', value: '3' },
                                        { label: 'Cam 4', value: '4' },
                                        { label: 'Cam 5', value: '5' },
                                    ]}
                                />
                    <RNPickerSelect
                                    useNativeAndroidPickerStyle={false}
                                    style={{ 
                                        inputAndroid:  styles.pickerSelectStyle,
                                        inputIOS: styles.pickerSelectStyle
                                    }}
                                    Icon={() => {
                                        return <Ionicons name="md-arrow-down" size={20} color="#135CA3" style={{ display: 'none' }} />;
                                    }}
                                    value={this.state.camSelected}
                                    onValueChange={(value) => this.setState({camSelected: value}) }
                                    items={[
                                        { label: 'Cam 1', value: '1' },
                                        { label: 'Cam 2', value: '2' },
                                        { label: 'Cam 3', value: '3' },
                                        { label: 'Cam 4', value: '4' },
                                        { label: 'Cam 5', value: '5' },
                                    ]}
                                />

                    <TouchableOpacity style={styles.confirmButtonStyle}
                                    onPress={ () => alert('find button pressed')}>
                        <Text style={styles.confirmButtonTextStyle}>Find</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '40%', alignItems: 'center'}}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: 1.2, marginBottom: 5 }}>Filters</Text>
                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <Text style={{ marginRight: 10, fontSize: 14, color: 'white' }}>Archive</Text>
                        <Switch 
                            value={this.state.archive}
                            onValueChange={this.toggleArchive}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10}}>
                        <Text style={{ marginRight: 10, fontSize: 14, color: 'white' }}>Export</Text>
                        <Switch 
                            value={this.state.export}
                            onValueChange={this.toggleExport}
                        />
                    </View>  
                </View>
               
            </View>
        )
    }
}

export default SearchBlock;

const styles = {
    pickerSelectStyle: {
        fontSize: 16, 
        color: '#135CA3', 
        backgroundColor: 'white', 
        textAlign: 'center', 
        borderRadius: 5, 
        marginBottom: 10,
        width: '100%'
    },
    confirmButtonStyle: {
        padding: 5,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 5
    },
    confirmButtonTextStyle: {
        fontSize: 16,
        color: 'blue',
        textAlign: 'center'
    }
}