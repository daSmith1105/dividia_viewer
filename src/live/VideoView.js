import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { configChange, setSingleView, camViewChange, logoutUser } from '../actions';
import CameraStreamContainer from './CameraStreamContainer1';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Entypo } from '@expo/vector-icons';

let dataSequence = [];

const VideoView = props => {

    const forcedSingleView = 
                        <View>
                            {props.currentSelectedView && props.currentSelectedView.length > 0 &&
                                <CameraStreamContainer key={props.singleCamSelected} camera={ props.currentSelectedView.find(c => c.ixSlot === (parseInt(props.singleCamSelected) - 1)) } /> 
                            }
                        </View>

    const singleView =  
                        <View>
                            {props.currentSelectedView && props.currentSelectedView.length > 0 && props.currentSelectedView.findIndex(c =>  c => c.ixSlot === (parseInt(props.currentCamView) - 1)) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                <CameraStreamContainer  key={props.currentCamView} camera={props.currentSelectedView.find( c => c.ixSlot === (parseInt(props.currentCamView) - 1)) }/> :
                                <CameraStreamContainer key={props.currentCamView} camNum={props.currentCamView} placeholder />   
                            }
                        </View>            
    
    const quadView =    <View>
                       { props.currentCamView === "1-4" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 0) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'1'} camera={props.currentSelectedView.find(c => c.ixSlot === 0)} onDoublePress={() => props.setSingleView(1) } /> :
                                    <CameraStreamContainer key={'1'} camNum={'1'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 1) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'2'} camera={props.currentSelectedView.find(c => c.ixSlot === 1)} onDoublePress={() => props.setSingleView(2) } /> :
                                    <CameraStreamContainer key={'2'} camNum={'2'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 2) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'3'} camera={props.currentSelectedView.find(c => c.ixSlot === 2)} onDoublePress={() => props.setSingleView(3) } /> :
                                    <CameraStreamContainer key={'3'} camNum={'3'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 3) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'4'}  camera={props.currentSelectedView.find(c => c.ixSlot === 3)} onDoublePress={() => props.setSingleView(4) } /> :
                                    <CameraStreamContainer key={'4'} camNum={'4'} placeholder />
                                }
                            </View> }

                        {props.currentCamView === "5-8" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 4) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'5'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 4)]} onDoublePress={() => props.setSingleView(5) } /> :
                                    <CameraStreamContainer key={'5'} camNum={'5'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 5) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'6'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 5)]} onDoublePress={() => props.setSingleView(6) } /> :
                                    <CameraStreamContainer key={'6'} camNum={'6'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 6) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'7'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 6)]} onDoublePress={() => props.setSingleView(7) } /> :
                                    <CameraStreamContainer key={'7'} camNum={'7'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 7) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'8'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 7)]} onDoublePress={() => props.setSingleView(8) } /> :
                                    <CameraStreamContainer key={'8'} camNum={'8'} placeholder />
                                }
                            </View> }

                        {props.currentCamView === "9-12" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 8) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'9'} camera={props.currentSelectedView.find(c => c.ixSlot === 8)} onDoublePress={() => props.setSingleView(9) } /> :
                                    <CameraStreamContainer key={'9'} camNum={'9'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 9) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'10'} camera={props.currentSelectedView.find(c => c.ixSlot === 9)} onDoublePress={() => props.setSingleView(10) } /> :
                                    <CameraStreamContainer key={'10'} camNum={'10'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 10) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'11'} camera={props.currentSelectedView.find(c => c.ixSlot === 10)} onDoublePress={() => props.setSingleView(11) } /> :
                                    <CameraStreamContainer key={'11'} camNum={'11'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 11) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'12'} camera={props.currentSelectedView.find(c => c.ixSlot === 11)} onDoublePress={() => props.setSingleView(12) } /> :
                                    <CameraStreamContainer key={'12'} camNum={'12'} placeholder />
                                }
                            </View>}
                        
                        {props.currentCamView === "13-16" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 12) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'13'} camera={props.currentSelectedView.find(c => c.ixSlot === 12)} onDoublePress={() => props.setSingleView(13) } /> :
                                    <CameraStreamContainer key={'13'} camNum={'13'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 13) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'14'} camera={props.currentSelectedView.find(c => c.ixSlot === 13)} onDoublePress={() => props.setSingleView(14) } /> :
                                    <CameraStreamContainer key={'14'} camNum={'14'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 14) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'15'} camera={props.currentSelectedView.find(c => c.ixSlot === 14)} onDoublePress={() => props.setSingleView(15) } /> :
                                    <CameraStreamContainer key={'15'} camNum={'15'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 15) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'16'} camera={props.currentSelectedView.find(c => c.ixSlot === 15)} onDoublePress={() => props.setSingleView(16) } /> :
                                    <CameraStreamContainer key={'16'} camNum={'16'} placeholder />
                                }
                            </View>}

                        {props.currentCamView === "17-20" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 16) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'17'} camera={props.currentSelectedView.find(c => c.ixSlot === 16)} onDoublePress={() => props.setSingleView(17) } /> :
                                    <CameraStreamContainer key={'17'} camNum={'17'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 17) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'18'} camera={props.currentSelectedView.find(c => c.ixSlot === 17)} onDoublePress={() => props.setSingleView(18) } /> :
                                    <CameraStreamContainer key={'18'} camNum={'18'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 18) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'19'} camera={props.currentSelectedView.find(c => c.ixSlot === 18)} onDoublePress={() => props.setSingleView(19) } /> :
                                    <CameraStreamContainer key={'19'} camNum={'19'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 19) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'20'} camera={props.currentSelectedView.find(c => c.ixSlot === 19)} onDoublePress={() => props.setSingleView(20) } /> :
                                    <CameraStreamContainer key={'20'} camNum={'20'} placeholder />
                                }
                            </View>}

                        {props.currentCamView === "21-24" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 20) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'21'} camera={props.currentSelectedView.find(c => c.ixSlot === 20)} onDoublePress={() => props.setSingleView(21) } /> :
                                    <CameraStreamContainer key={'21'} camNum={'21'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 21) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'22'} camera={props.currentSelectedView.find(c => c.ixSlot === 21)} onDoublePress={() => props.setSingleView(22) } /> :
                                    <CameraStreamContainer key={'22'} camNum={'22'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 22) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'23'} camera={props.currentSelectedView.find(c => c.ixSlot === 22)} onDoublePress={() => props.setSingleView(23) } /> :
                                    <CameraStreamContainer key={'23'} camNum={'23'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 23) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'24'} camera={props.currentSelectedView.find(c => c.ixSlot === 23)} onDoublePress={() => props.setSingleView(24) } /> :
                                    <CameraStreamContainer key={'24'} camNum={'24'} placeholder />
                                }
                            </View>}

                        {props.currentCamView === "25-28" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 24) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'25'} camera={props.currentSelectedView.find(c => c.ixSlot === 24)} onDoublePress={() => props.setSingleView(25) } /> :
                                    <CameraStreamContainer key={'25'} camNum={'25'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 25) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'26'} camera={props.currentSelectedView.find(c => c.ixSlot === 25)} onDoublePress={() => props.setSingleView(26) } /> :
                                    <CameraStreamContainer key={'26'} camNum={'26'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 26) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'27'} camera={props.currentSelectedView.find(c => c.ixSlot === 26)} onDoublePress={() => props.setSingleView(27) } /> :
                                    <CameraStreamContainer key={'27'} camNum={'27'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 27) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'28'} camera={props.currentSelectedView.find(c => c.ixSlot === 27)} onDoublePress={() => props.setSingleView(28) } /> :
                                    <CameraStreamContainer key={'28'} camNum={'28'} placeholder />
                                }
                            </View>}

                        {props.currentCamView === "29-32" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 28) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'29'} camera={props.currentSelectedView.find(c => c.ixSlot === 28)} onDoublePress={() => props.setSingleView(29) } /> :
                                    <CameraStreamContainer key={'29'} camNum={'29'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 29) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'30'} camera={props.currentSelectedView.find(c => c.ixSlot === 29)} onDoublePress={() => props.setSingleView(30) } /> :
                                    <CameraStreamContainer key={'30'} camNum={'30'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 30) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'31'} camera={props.currentSelectedView.find(c => c.ixSlot === 30)} onDoublePress={() => props.setSingleView(31) } /> :
                                    <CameraStreamContainer key={'31'} camNum={'31'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 31) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'32'} camera={props.currentSelectedView.find(c => c.ixSlot === 31)} onDoublePress={() => props.setSingleView(32) } /> :
                                    <CameraStreamContainer key={'32'} camNum={'32'} placeholder />
                                }
                            </View>}
                            
                        {props.currentCamView === "33-36" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 32) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'33'} camera={props.currentSelectedView.find(c => c.ixSlot === 32)} onDoublePress={() => props.setSingleView(33) } /> :
                                    <CameraStreamContainer key={'33'} camNum={'33'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 33) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'34'} camera={props.currentSelectedView.find(c => c.ixSlot === 33)} onDoublePress={() => props.setSingleView(34) } /> :
                                    <CameraStreamContainer key={'34'} camNum={'34'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 34) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'35'} camera={props.currentSelectedView.find(c => c.ixSlot === 34)} onDoublePress={() => props.setSingleView(35) } /> :
                                    <CameraStreamContainer key={'35'} camNum={'35'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 35) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'36'} camera={props.currentSelectedView.find(c => c.ixSlot === 35)} onDoublePress={() => props.setSingleView(36) } /> :
                                    <CameraStreamContainer key={'36'} camNum={'36'} placeholder />
                                }
                            </View>}

                        {props.currentCamView === "37-40" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 36) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'37'} camera={props.currentSelectedView.find(c => c.ixSlot === 36)} onDoublePress={() => props.setSingleView(37) } /> :
                                    <CameraStreamContainer key={'37'} camNum={'37'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 37) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'38'} camera={props.currentSelectedView.find(c => c.ixSlot === 25)} onDoublePress={() => props.setSingleView(26) } /> :
                                    <CameraStreamContainer key={'38'} camNum={'38'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 38) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'39'} camera={props.currentSelectedView.find(c => c.ixSlot === 26)} onDoublePress={() => props.setSingleView(27) } /> :
                                    <CameraStreamContainer key={'39'} camNum={'39'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 39) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'40'} camera={props.currentSelectedView.find(c => c.ixSlot === 27)} onDoublePress={() => props.setSingleView(28) } /> :
                                    <CameraStreamContainer key={'40'} camNum={'40'} placeholder />
                                }
                            </View>}

                        {props.currentCamView === "41-44" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 40) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'41'} camera={props.currentSelectedView.find(c => c.ixSlot === 40)} onDoublePress={() => props.setSingleView(41) } /> :
                                    <CameraStreamContainer key={'41'} camNum={'41'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 41) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'42'} camera={props.currentSelectedView.find(c => c.ixSlot === 41)} onDoublePress={() => props.setSingleView(42) } /> :
                                    <CameraStreamContainer key={'42'} camNum={'42'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 42) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'43'} camera={props.currentSelectedView.find(c => c.ixSlot === 42)} onDoublePress={() => props.setSingleView(43) } /> :
                                    <CameraStreamContainer key={'43'} camNum={'43'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 43) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'44'} camera={props.currentSelectedView.find(c => c.ixSlot === 43)} onDoublePress={() => props.setSingleView(44) } /> :
                                    <CameraStreamContainer key={'44'} camNum={'44'} placeholder />
                                }
                            </View>}

                        {props.currentCamView === "45-48" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 44) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'45'} camera={props.currentSelectedView.find(c => c.ixSlot === 44)} onDoublePress={() => props.setSingleView(45) } /> :
                                    <CameraStreamContainer key={'45'} camNum={'45'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 45) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'46'} camera={props.currentSelectedView.find(c => c.ixSlot === 45)} onDoublePress={() => props.setSingleView(46) } /> :
                                    <CameraStreamContainer key={'46'} camNum={'46'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 46) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'47'} camera={props.currentSelectedView.find(c => c.ixSlot === 46)} onDoublePress={() => props.setSingleView(47) } /> :
                                    <CameraStreamContainer key={'47'} camNum={'47'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 47) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'48'} camera={props.currentSelectedView.find(c => c.ixSlot === 47)} onDoublePress={() => props.setSingleView(48) } /> :
                                    <CameraStreamContainer key={'48'} camNum={'48'} placeholder />
                                }
                            </View>}

                        {props.currentCamView === "49-52" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 48) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'49'} camera={props.currentSelectedView.find(c => c.ixSlot === 48)} onDoublePress={() => props.setSingleView(49) } /> :
                                    <CameraStreamContainer key={'49'} camNum={'49'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 49) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'50'} camera={props.currentSelectedView.find(c => c.ixSlot === 49)} onDoublePress={() => props.setSingleView(50) } /> :
                                    <CameraStreamContainer key={'50'} camNum={'50'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 50) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'51'} camera={props.currentSelectedView.find(c => c.ixSlot === 50)} onDoublePress={() => props.setSingleView(51) } /> :
                                    <CameraStreamContainer key={'51'} camNum={'51'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 51) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'52'} camera={props.currentSelectedView.find(c => c.ixSlot === 51)} onDoublePress={() => props.setSingleView(52) } /> :
                                    <CameraStreamContainer key={'52'} camNum={'52'} placeholder />
                                }
                            </View>}
                            
                        {props.currentCamView === "53-56" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 52) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'53'} camera={props.currentSelectedView.find(c => c.ixSlot === 52)} onDoublePress={() => props.setSingleView(53) } /> :
                                    <CameraStreamContainer key={'53'} camNum={'53'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 53) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'54'} camera={props.currentSelectedView.find(c => c.ixSlot === 53)} onDoublePress={() => props.setSingleView(54) } /> :
                                    <CameraStreamContainer key={'54'} camNum={'54'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 54) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'55'} camera={props.currentSelectedView.find(c => c.ixSlot === 54)} onDoublePress={() => props.setSingleView(55) } /> :
                                    <CameraStreamContainer key={'55'} camNum={'55'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 55) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'56'} camera={props.currentSelectedView.find(c => c.ixSlot === 55)} onDoublePress={() => props.setSingleView(56) } /> :
                                    <CameraStreamContainer key={'56'} camNum={'56'} placeholder />
                                }
                            </View>}

                        {props.currentCamView === "57-60" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 56) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'57'} camera={props.currentSelectedView.find(c => c.ixSlot === 56)} onDoublePress={() => props.setSingleView(57) } /> :
                                    <CameraStreamContainer key={'57'} camNum={'57'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 57) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'58'} camera={props.currentSelectedView.find(c => c.ixSlot === 57)} onDoublePress={() => props.setSingleView(58) } /> :
                                    <CameraStreamContainer key={'58'} camNum={'58'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 58) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'59'} camera={props.currentSelectedView.find(c => c.ixSlot === 58)} onDoublePress={() => props.setSingleView(59) } /> :
                                    <CameraStreamContainer key={'59'} camNum={'59'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 59) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'60'} camera={props.currentSelectedView.find(c => c.ixSlot === 59)} onDoublePress={() => props.setSingleView(60) } /> :
                                    <CameraStreamContainer key={'60'} camNum={'60'} placeholder />
                                }
                            </View>}

                        {props.currentCamView === "61-64" &&
                            <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 60) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'61'} camera={props.currentSelectedView.find(c => c.ixSlot === 60)} onDoublePress={() => props.setSingleView(61) } /> :
                                    <CameraStreamContainer key={'61'} camNum={'61'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 61) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'62'} camera={props.currentSelectedView.find(c => c.ixSlot === 61)} onDoublePress={() => props.setSingleView(62) } /> :
                                    <CameraStreamContainer key={'62'} camNum={'62'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 62) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'63'} camera={props.currentSelectedView.find(c => c.ixSlot === 62)} onDoublePress={() => props.setSingleView(63) } /> :
                                    <CameraStreamContainer key={'63'} camNum={'63'} placeholder />
                                }
                                { props.currentSelectedView.findIndex(c => c.ixSlot === 63) > -1 ?
                                // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'64'} camera={props.currentSelectedView.find(c => c.ixSlot === 63)} onDoublePress={() => props.setSingleView(64) } /> :
                                    <CameraStreamContainer key={'64'} camNum={'64'} placeholder />
                                }
                            </View>}
                       </View>
    
    const sixView =     <View>
                            { props.currentCamView === "1-6" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 0) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                    <CameraStreamContainer key={'1'} camera={props.currentSelectedView.find(c => c.ixSlot === 0)} onDoublePress={() => props.setSingleView(1) } /> :
                                    <CameraStreamContainer key={'1'} camNum={'1'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 1) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'2'} camera={props.currentSelectedView.find(c => c.ixSlot === 1)} onDoublePress={() => props.setSingleView(2) } /> :
                                        <CameraStreamContainer key={'2'} camNum={'2'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 2) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'3'} camera={props.currentSelectedView.find(c => c.ixSlot === 2)} onDoublePress={() => props.setSingleView(3) } /> :
                                        <CameraStreamContainer key={'3'} camNum={'3'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 3) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'4'}  camera={props.currentSelectedView.find(c => c.ixSlot === 3)} onDoublePress={() => props.setSingleView(4) } /> :
                                        <CameraStreamContainer key={'4'} camNum={'4'} placeholder />
                                    }   
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 4) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'5'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 4)]} onDoublePress={() => props.setSingleView(5) } /> :
                                        <CameraStreamContainer key={'5'} camNum={'5'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 5) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'6'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 5)]} onDoublePress={() => props.setSingleView(6) } /> :
                                        <CameraStreamContainer key={'6'} camNum={'6'} placeholder />
                                    }                            
                                </View>
                            }

                            { props.currentCamView === "7-12" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 6) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'7'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 6)]} onDoublePress={() => props.setSingleView(7) } /> :
                                        <CameraStreamContainer key={'7'} camNum={'7'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 7) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'8'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 7)]} onDoublePress={() => props.setSingleView(8) } /> :
                                        <CameraStreamContainer key={'8'} camNum={'8'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 8) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'9'} camera={props.currentSelectedView.find(c => c.ixSlot === 8)} onDoublePress={() => props.setSingleView(9) } /> :
                                        <CameraStreamContainer key={'9'} camNum={'9'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 9) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'10'} camera={props.currentSelectedView.find(c => c.ixSlot === 9)} onDoublePress={() => props.setSingleView(10) } /> :
                                        <CameraStreamContainer key={'10'} camNum={'10'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 10) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'11'} camera={props.currentSelectedView.find(c => c.ixSlot === 10)} onDoublePress={() => props.setSingleView(11) } /> :
                                        <CameraStreamContainer key={'11'} camNum={'11'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 11) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'12'} camera={props.currentSelectedView.find(c => c.ixSlot === 11)} onDoublePress={() => props.setSingleView(12) } /> :
                                        <CameraStreamContainer key={'12'} camNum={'12'} placeholder />
                                    }
                                    </View>
                            }

                            { props.currentCamView === "13-18" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 12) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'13'} camera={props.currentSelectedView.find(c => c.ixSlot === 12)} onDoublePress={() => props.setSingleView(13) } /> :
                                        <CameraStreamContainer key={'13'} camNum={'13'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 13) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'14'} camera={props.currentSelectedView.find(c => c.ixSlot === 13)} onDoublePress={() => props.setSingleView(14) } /> :
                                        <CameraStreamContainer key={'14'} camNum={'14'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 14) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'15'} camera={props.currentSelectedView.find(c => c.ixSlot === 14)} onDoublePress={() => props.setSingleView(15) } /> :
                                        <CameraStreamContainer key={'15'} camNum={'15'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 15) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'16'} camera={props.currentSelectedView.find(c => c.ixSlot === 15)} onDoublePress={() => props.setSingleView(16) } /> :
                                        <CameraStreamContainer key={'16'} camNum={'16'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 16) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'17'} camera={props.currentSelectedView.find(c => c.ixSlot === 16)} onDoublePress={() => props.setSingleView(17) } /> :
                                        <CameraStreamContainer key={'17'} camNum={'17'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 17) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'18'} camera={props.currentSelectedView.find(c => c.ixSlot === 17)} onDoublePress={() => props.setSingleView(18) } /> :
                                        <CameraStreamContainer key={'18'} camNum={'18'} placeholder />
                                    }
                                </View>
                            }

                            { props.currentCamView === "19-24" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 18) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'19'} camera={props.currentSelectedView.find(c => c.ixSlot === 18)} onDoublePress={() => props.setSingleView(19) } /> :
                                        <CameraStreamContainer key={'19'} camNum={'19'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 19) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'20'} camera={props.currentSelectedView.find(c => c.ixSlot === 19)} onDoublePress={() => props.setSingleView(20) } /> :
                                        <CameraStreamContainer key={'20'} camNum={'20'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 20) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'21'} camera={props.currentSelectedView.find(c => c.ixSlot === 20)} onDoublePress={() => props.setSingleView(21) } /> :
                                        <CameraStreamContainer key={'21'} camNum={'21'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 21) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'22'} camera={props.currentSelectedView.find(c => c.ixSlot === 21)} onDoublePress={() => props.setSingleView(22) } /> :
                                        <CameraStreamContainer key={'22'} camNum={'22'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 22) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'23'} camera={props.currentSelectedView.find(c => c.ixSlot === 22)} onDoublePress={() => props.setSingleView(23) } /> :
                                        <CameraStreamContainer key={'23'} camNum={'23'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 23) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'24'} camera={props.currentSelectedView.find(c => c.ixSlot === 23)} onDoublePress={() => props.setSingleView(24) } /> :
                                        <CameraStreamContainer key={'24'} camNum={'24'} placeholder />
                                    }
                                </View>
                            }

                            { props.currentCamView === "25-30" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 24) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'25'} camera={props.currentSelectedView.find(c => c.ixSlot === 24)} onDoublePress={() => props.setSingleView(25) } /> :
                                        <CameraStreamContainer key={'25'} camNum={'25'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 25) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'26'} camera={props.currentSelectedView.find(c => c.ixSlot === 25)} onDoublePress={() => props.setSingleView(26) } /> :
                                        <CameraStreamContainer key={'26'} camNum={'26'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 26) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'27'} camera={props.currentSelectedView.find(c => c.ixSlot === 26)} onDoublePress={() => props.setSingleView(27) } /> :
                                        <CameraStreamContainer key={'27'} camNum={'27'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 27) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'28'} camera={props.currentSelectedView.find(c => c.ixSlot === 27)} onDoublePress={() => props.setSingleView(28) } /> :
                                        <CameraStreamContainer key={'28'} camNum={'28'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 28) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'29'} camera={props.currentSelectedView.find(c => c.ixSlot === 28)} onDoublePress={() => props.setSingleView(29) } /> :
                                        <CameraStreamContainer key={'29'} camNum={'29'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 29) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'30'} camera={props.currentSelectedView.find(c => c.ixSlot === 29)} onDoublePress={() => props.setSingleView(30) } /> :
                                        <CameraStreamContainer key={'30'} camNum={'30'} placeholder />
                                    }
                                </View>
                            }

                            { props.currentCamView === "31-36" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 30) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'31'} camera={props.currentSelectedView.find(c => c.ixSlot === 30)} onDoublePress={() => props.setSingleView(31) } /> :
                                        <CameraStreamContainer key={'31'} camNum={'31'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 31) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'32'} camera={props.currentSelectedView.find(c => c.ixSlot === 31)} onDoublePress={() => props.setSingleView(32) } /> :
                                        <CameraStreamContainer key={'32'} camNum={'32'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 32) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'33'} camera={props.currentSelectedView.find(c => c.ixSlot === 32)} onDoublePress={() => props.setSingleView(33) } /> :
                                        <CameraStreamContainer key={'33'} camNum={'33'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 33) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'34'} camera={props.currentSelectedView.find(c => c.ixSlot === 33)} onDoublePress={() => props.setSingleView(34) } /> :
                                        <CameraStreamContainer key={'34'} camNum={'34'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 34) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'35'} camera={props.currentSelectedView.find(c => c.ixSlot === 34)} onDoublePress={() => props.setSingleView(35) } /> :
                                        <CameraStreamContainer key={'35'} camNum={'35'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 35) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'36'} camera={props.currentSelectedView.find(c => c.ixSlot === 35)} onDoublePress={() => props.setSingleView(36) } /> :
                                        <CameraStreamContainer key={'36'} camNum={'36'} placeholder />
                                    }
                                </View>
                            }

                            { props.currentCamView === "37-42" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 36) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'37'} camera={props.currentSelectedView.find(c => c.ixSlot === 36)} onDoublePress={() => props.setSingleView(37) } /> :
                                        <CameraStreamContainer key={'37'} camNum={'37'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 37) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'38'} camera={props.currentSelectedView.find(c => c.ixSlot === 25)} onDoublePress={() => props.setSingleView(26) } /> :
                                        <CameraStreamContainer key={'38'} camNum={'38'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 38) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'39'} camera={props.currentSelectedView.find(c => c.ixSlot === 26)} onDoublePress={() => props.setSingleView(27) } /> :
                                        <CameraStreamContainer key={'39'} camNum={'39'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 39) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'40'} camera={props.currentSelectedView.find(c => c.ixSlot === 27)} onDoublePress={() => props.setSingleView(28) } /> :
                                        <CameraStreamContainer key={'40'} camNum={'40'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 40) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'41'} camera={props.currentSelectedView.find(c => c.ixSlot === 40)} onDoublePress={() => props.setSingleView(41) } /> :
                                        <CameraStreamContainer key={'41'} camNum={'41'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 41) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'42'} camera={props.currentSelectedView.find(c => c.ixSlot === 41)} onDoublePress={() => props.setSingleView(42) } /> :
                                        <CameraStreamContainer key={'42'} camNum={'42'} placeholder />
                                    }
                                </View>
                            }

                            { props.currentCamView === "43-48" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                   { props.currentSelectedView.findIndex(c => c.ixSlot === 42) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'43'} camera={props.currentSelectedView.find(c => c.ixSlot === 42)} onDoublePress={() => props.setSingleView(43) } /> :
                                        <CameraStreamContainer key={'43'} camNum={'43'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 43) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'44'} camera={props.currentSelectedView.find(c => c.ixSlot === 43)} onDoublePress={() => props.setSingleView(44) } /> :
                                        <CameraStreamContainer key={'44'} camNum={'44'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 44) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'45'} camera={props.currentSelectedView.find(c => c.ixSlot === 44)} onDoublePress={() => props.setSingleView(45) } /> :
                                        <CameraStreamContainer key={'45'} camNum={'45'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 45) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'46'} camera={props.currentSelectedView.find(c => c.ixSlot === 45)} onDoublePress={() => props.setSingleView(46) } /> :
                                        <CameraStreamContainer key={'46'} camNum={'46'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 46) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'47'} camera={props.currentSelectedView.find(c => c.ixSlot === 46)} onDoublePress={() => props.setSingleView(47) } /> :
                                        <CameraStreamContainer key={'47'} camNum={'47'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 47) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'48'} camera={props.currentSelectedView.find(c => c.ixSlot === 47)} onDoublePress={() => props.setSingleView(48) } /> :
                                        <CameraStreamContainer key={'48'} camNum={'48'} placeholder />
                                    }
                                </View>
                            }

                            { props.currentCamView === "49-54" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                   { props.currentSelectedView.findIndex(c => c.ixSlot === 48) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'49'} camera={props.currentSelectedView.find(c => c.ixSlot === 48)} onDoublePress={() => props.setSingleView(49) } /> :
                                        <CameraStreamContainer key={'49'} camNum={'49'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 49) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'50'} camera={props.currentSelectedView.find(c => c.ixSlot === 49)} onDoublePress={() => props.setSingleView(50) } /> :
                                        <CameraStreamContainer key={'50'} camNum={'50'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 50) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'51'} camera={props.currentSelectedView.find(c => c.ixSlot === 50)} onDoublePress={() => props.setSingleView(51) } /> :
                                        <CameraStreamContainer key={'51'} camNum={'51'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 51) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'52'} camera={props.currentSelectedView.find(c => c.ixSlot === 51)} onDoublePress={() => props.setSingleView(52) } /> :
                                        <CameraStreamContainer key={'52'} camNum={'52'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 52) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'53'} camera={props.currentSelectedView.find(c => c.ixSlot === 52)} onDoublePress={() => props.setSingleView(53) } /> :
                                        <CameraStreamContainer key={'53'} camNum={'53'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 53) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'54'} camera={props.currentSelectedView.find(c => c.ixSlot === 53)} onDoublePress={() => props.setSingleView(54) } /> :
                                        <CameraStreamContainer key={'54'} camNum={'54'} placeholder />
                                    }
                                </View>
                            }

                            { props.currentCamView === "55-60" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                   { props.currentSelectedView.findIndex(c => c.ixSlot === 54) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'55'} camera={props.currentSelectedView.find(c => c.ixSlot === 54)} onDoublePress={() => props.setSingleView(55) } /> :
                                        <CameraStreamContainer key={'55'} camNum={'55'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 55) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'56'} camera={props.currentSelectedView.find(c => c.ixSlot === 55)} onDoublePress={() => props.setSingleView(56) } /> :
                                        <CameraStreamContainer key={'56'} camNum={'56'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 56) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'57'} camera={props.currentSelectedView.find(c => c.ixSlot === 56)} onDoublePress={() => props.setSingleView(57) } /> :
                                        <CameraStreamContainer key={'57'} camNum={'57'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 57) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'58'} camera={props.currentSelectedView.find(c => c.ixSlot === 57)} onDoublePress={() => props.setSingleView(58) } /> :
                                        <CameraStreamContainer key={'58'} camNum={'58'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 58) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'59'} camera={props.currentSelectedView.find(c => c.ixSlot === 58)} onDoublePress={() => props.setSingleView(59) } /> :
                                        <CameraStreamContainer key={'59'} camNum={'59'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 59) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'60'} camera={props.currentSelectedView.find(c => c.ixSlot === 59)} onDoublePress={() => props.setSingleView(60) } /> :
                                        <CameraStreamContainer key={'60'} camNum={'60'} placeholder />
                                    }
                                </View>
                            }

                            { props.currentCamView === "61-66" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                   { props.currentSelectedView.findIndex(c => c.ixSlot === 60) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'61'} camera={props.currentSelectedView.find(c => c.ixSlot === 60)} onDoublePress={() => props.setSingleView(61) } /> :
                                        <CameraStreamContainer key={'61'} camNum={'61'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 61) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'62'} camera={props.currentSelectedView.find(c => c.ixSlot === 61)} onDoublePress={() => props.setSingleView(62) } /> :
                                        <CameraStreamContainer key={'62'} camNum={'62'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 62) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'63'} camera={props.currentSelectedView.find(c => c.ixSlot === 62)} onDoublePress={() => props.setSingleView(63) } /> :
                                        <CameraStreamContainer key={'63'} camNum={'63'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 63) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'64'} camera={props.currentSelectedView.find(c => c.ixSlot === 63)} onDoublePress={() => props.setSingleView(64) } /> :
                                        <CameraStreamContainer key={'64'} camNum={'64'} placeholder />
                                    }
                                    <CameraStreamContainer key={'65'} camNum={'65'} placeholder />
                                    <CameraStreamContainer key={'66'} camNum={'66'} placeholder /> 
                                </View>
                            }           
                        
                        </View> 
    
    const nineView =    <View>
                            { props.currentCamView === "1-9" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 0) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'1'} camera={props.currentSelectedView.find(c => c.ixSlot === 0)} onDoublePress={() => props.setSingleView(1) } /> :
                                        <CameraStreamContainer key={'1'} camNum={'1'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 1) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'2'} camera={props.currentSelectedView.find(c => c.ixSlot === 1)} onDoublePress={() => props.setSingleView(2) } /> :
                                        <CameraStreamContainer key={'2'} camNum={'2'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 2) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'3'} camera={props.currentSelectedView.find(c => c.ixSlot === 2)} onDoublePress={() => props.setSingleView(3) } /> :
                                        <CameraStreamContainer key={'3'} camNum={'3'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 3) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'4'}  camera={props.currentSelectedView.find(c => c.ixSlot === 3)} onDoublePress={() => props.setSingleView(4) } /> :
                                        <CameraStreamContainer key={'4'} camNum={'4'} placeholder />
                                    }   
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 4) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'5'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 4)]} onDoublePress={() => props.setSingleView(5) } /> :
                                        <CameraStreamContainer key={'5'} camNum={'5'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 5) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'6'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 5)]} onDoublePress={() => props.setSingleView(6) } /> :
                                        <CameraStreamContainer key={'6'} camNum={'6'} placeholder />
                                    } 
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 6) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'7'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 6)]} onDoublePress={() => props.setSingleView(7) } /> :
                                        <CameraStreamContainer key={'7'} camNum={'7'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 7) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'8'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 7)]} onDoublePress={() => props.setSingleView(8) } /> :
                                        <CameraStreamContainer key={'8'} camNum={'8'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 8) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'9'} camera={props.currentSelectedView.find(c => c.ixSlot === 8)} onDoublePress={() => props.setSingleView(9) } /> :
                                        <CameraStreamContainer key={'9'} camNum={'9'} placeholder />
                                    }                        
                                </View>
                            }  

                            { props.currentCamView === "8-16" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                  { props.currentSelectedView.findIndex(c => c.ixSlot === 7) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'8'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 7)]} onDoublePress={() => props.setSingleView(8) } /> :
                                        <CameraStreamContainer key={'8'} camNum={'8'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 8) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'9'} camera={props.currentSelectedView.find(c => c.ixSlot === 8)} onDoublePress={() => props.setSingleView(9) } /> :
                                        <CameraStreamContainer key={'9'} camNum={'9'} placeholder />
                                    }     
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 9) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'10'} camera={props.currentSelectedView.find(c => c.ixSlot === 9)} onDoublePress={() => props.setSingleView(10) } /> :
                                        <CameraStreamContainer key={'10'} camNum={'10'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 10) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'11'} camera={props.currentSelectedView.find(c => c.ixSlot === 10)} onDoublePress={() => props.setSingleView(11) } /> :
                                        <CameraStreamContainer key={'11'} camNum={'11'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 11) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'12'} camera={props.currentSelectedView.find(c => c.ixSlot === 11)} onDoublePress={() => props.setSingleView(12) } /> :
                                        <CameraStreamContainer key={'12'} camNum={'12'} placeholder />
                                    }   
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 12) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'13'} camera={props.currentSelectedView.find(c => c.ixSlot === 12)} onDoublePress={() => props.setSingleView(13) } /> :
                                        <CameraStreamContainer key={'13'} camNum={'13'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 13) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'14'} camera={props.currentSelectedView.find(c => c.ixSlot === 13)} onDoublePress={() => props.setSingleView(14) } /> :
                                        <CameraStreamContainer key={'14'} camNum={'14'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 14) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'15'} camera={props.currentSelectedView.find(c => c.ixSlot === 14)} onDoublePress={() => props.setSingleView(15) } /> :
                                        <CameraStreamContainer key={'15'} camNum={'15'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 15) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'16'} camera={props.currentSelectedView.find(c => c.ixSlot === 15)} onDoublePress={() => props.setSingleView(16) } /> :
                                        <CameraStreamContainer key={'16'} camNum={'16'} placeholder />
                                    }
                                </View>
                            }  

                            { props.currentCamView === "16-24" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                   { props.currentSelectedView.findIndex(c => c.ixSlot === 15) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'16'} camera={props.currentSelectedView.find(c => c.ixSlot === 15)} onDoublePress={() => props.setSingleView(16) } /> :
                                        <CameraStreamContainer key={'16'} camNum={'16'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 16) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'17'} camera={props.currentSelectedView.find(c => c.ixSlot === 16)} onDoublePress={() => props.setSingleView(17) } /> :
                                        <CameraStreamContainer key={'17'} camNum={'17'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 17) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'18'} camera={props.currentSelectedView.find(c => c.ixSlot === 17)} onDoublePress={() => props.setSingleView(18) } /> :
                                        <CameraStreamContainer key={'18'} camNum={'18'} placeholder />
                                    }
                                     { props.currentSelectedView.findIndex(c => c.ixSlot === 18) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'19'} camera={props.currentSelectedView.find(c => c.ixSlot === 18)} onDoublePress={() => props.setSingleView(19) } /> :
                                        <CameraStreamContainer key={'19'} camNum={'19'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 19) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'20'} camera={props.currentSelectedView.find(c => c.ixSlot === 19)} onDoublePress={() => props.setSingleView(20) } /> :
                                        <CameraStreamContainer key={'20'} camNum={'20'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 20) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'21'} camera={props.currentSelectedView.find(c => c.ixSlot === 20)} onDoublePress={() => props.setSingleView(21) } /> :
                                        <CameraStreamContainer key={'21'} camNum={'21'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 21) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'22'} camera={props.currentSelectedView.find(c => c.ixSlot === 21)} onDoublePress={() => props.setSingleView(22) } /> :
                                        <CameraStreamContainer key={'22'} camNum={'22'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 22) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'23'} camera={props.currentSelectedView.find(c => c.ixSlot === 22)} onDoublePress={() => props.setSingleView(23) } /> :
                                        <CameraStreamContainer key={'23'} camNum={'23'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 23) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'24'} camera={props.currentSelectedView.find(c => c.ixSlot === 23)} onDoublePress={() => props.setSingleView(24) } /> :
                                        <CameraStreamContainer key={'24'} camNum={'24'} placeholder />
                                    }
                                </View>
                            }    

                            { props.currentCamView === "24-32" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 23) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'24'} camera={props.currentSelectedView.find(c => c.ixSlot === 23)} onDoublePress={() => props.setSingleView(24) } /> :
                                        <CameraStreamContainer key={'24'} camNum={'24'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 24) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'25'} camera={props.currentSelectedView.find(c => c.ixSlot === 24)} onDoublePress={() => props.setSingleView(25) } /> :
                                        <CameraStreamContainer key={'25'} camNum={'25'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 25) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'26'} camera={props.currentSelectedView.find(c => c.ixSlot === 25)} onDoublePress={() => props.setSingleView(26) } /> :
                                        <CameraStreamContainer key={'26'} camNum={'26'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 26) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'27'} camera={props.currentSelectedView.find(c => c.ixSlot === 26)} onDoublePress={() => props.setSingleView(27) } /> :
                                        <CameraStreamContainer key={'27'} camNum={'27'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 27) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'28'} camera={props.currentSelectedView.find(c => c.ixSlot === 27)} onDoublePress={() => props.setSingleView(28) } /> :
                                        <CameraStreamContainer key={'28'} camNum={'28'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 28) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'29'} camera={props.currentSelectedView.find(c => c.ixSlot === 28)} onDoublePress={() => props.setSingleView(29) } /> :
                                        <CameraStreamContainer key={'29'} camNum={'29'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 29) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'30'} camera={props.currentSelectedView.find(c => c.ixSlot === 29)} onDoublePress={() => props.setSingleView(30) } /> :
                                        <CameraStreamContainer key={'30'} camNum={'30'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 30) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'31'} camera={props.currentSelectedView.find(c => c.ixSlot === 30)} onDoublePress={() => props.setSingleView(31) } /> :
                                        <CameraStreamContainer key={'31'} camNum={'31'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 31) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'32'} camera={props.currentSelectedView.find(c => c.ixSlot === 31)} onDoublePress={() => props.setSingleView(32) } /> :
                                        <CameraStreamContainer key={'32'} camNum={'32'} placeholder />
                                    }
                                </View>
                            }         

                            { props.currentCamView === "32-40" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 31) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'32'} camera={props.currentSelectedView.find(c => c.ixSlot === 31)} onDoublePress={() => props.setSingleView(32) } /> :
                                        <CameraStreamContainer key={'32'} camNum={'32'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 32) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'33'} camera={props.currentSelectedView.find(c => c.ixSlot === 32)} onDoublePress={() => props.setSingleView(33) } /> :
                                        <CameraStreamContainer key={'33'} camNum={'33'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 33) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'34'} camera={props.currentSelectedView.find(c => c.ixSlot === 33)} onDoublePress={() => props.setSingleView(34) } /> :
                                        <CameraStreamContainer key={'34'} camNum={'34'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 34) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'35'} camera={props.currentSelectedView.find(c => c.ixSlot === 34)} onDoublePress={() => props.setSingleView(35) } /> :
                                        <CameraStreamContainer key={'35'} camNum={'35'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 35) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'36'} camera={props.currentSelectedView.find(c => c.ixSlot === 35)} onDoublePress={() => props.setSingleView(36) } /> :
                                        <CameraStreamContainer key={'36'} camNum={'36'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 36) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'37'} camera={props.currentSelectedView.find(c => c.ixSlot === 36)} onDoublePress={() => props.setSingleView(37) } /> :
                                        <CameraStreamContainer key={'37'} camNum={'37'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 37) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'38'} camera={props.currentSelectedView.find(c => c.ixSlot === 25)} onDoublePress={() => props.setSingleView(26) } /> :
                                        <CameraStreamContainer key={'38'} camNum={'38'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 38) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'39'} camera={props.currentSelectedView.find(c => c.ixSlot === 26)} onDoublePress={() => props.setSingleView(27) } /> :
                                        <CameraStreamContainer key={'39'} camNum={'39'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 39) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'40'} camera={props.currentSelectedView.find(c => c.ixSlot === 27)} onDoublePress={() => props.setSingleView(28) } /> :
                                        <CameraStreamContainer key={'40'} camNum={'40'} placeholder />
                                    }
                                </View>
                            }    

                            { props.currentCamView === "40-48" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 39) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'40'} camera={props.currentSelectedView.find(c => c.ixSlot === 27)} onDoublePress={() => props.setSingleView(28) } /> :
                                        <CameraStreamContainer key={'40'} camNum={'40'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 40) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'41'} camera={props.currentSelectedView.find(c => c.ixSlot === 40)} onDoublePress={() => props.setSingleView(41) } /> :
                                        <CameraStreamContainer key={'41'} camNum={'41'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 41) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'42'} camera={props.currentSelectedView.find(c => c.ixSlot === 41)} onDoublePress={() => props.setSingleView(42) } /> :
                                        <CameraStreamContainer key={'42'} camNum={'42'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 42) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'43'} camera={props.currentSelectedView.find(c => c.ixSlot === 42)} onDoublePress={() => props.setSingleView(43) } /> :
                                        <CameraStreamContainer key={'43'} camNum={'43'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 43) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'44'} camera={props.currentSelectedView.find(c => c.ixSlot === 43)} onDoublePress={() => props.setSingleView(44) } /> :
                                        <CameraStreamContainer key={'44'} camNum={'44'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 44) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'45'} camera={props.currentSelectedView.find(c => c.ixSlot === 44)} onDoublePress={() => props.setSingleView(45) } /> :
                                        <CameraStreamContainer key={'45'} camNum={'45'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 45) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'46'} camera={props.currentSelectedView.find(c => c.ixSlot === 45)} onDoublePress={() => props.setSingleView(46) } /> :
                                        <CameraStreamContainer key={'46'} camNum={'46'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 46) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'47'} camera={props.currentSelectedView.find(c => c.ixSlot === 46)} onDoublePress={() => props.setSingleView(47) } /> :
                                        <CameraStreamContainer key={'47'} camNum={'47'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 47) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'48'} camera={props.currentSelectedView.find(c => c.ixSlot === 47)} onDoublePress={() => props.setSingleView(48) } /> :
                                        <CameraStreamContainer key={'48'} camNum={'48'} placeholder />
                                    }
                                </View>
                            }         

                            { props.currentCamView === "48-56" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 47) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'48'} camera={props.currentSelectedView.find(c => c.ixSlot === 47)} onDoublePress={() => props.setSingleView(48) } /> :
                                        <CameraStreamContainer key={'48'} camNum={'48'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 48) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'49'} camera={props.currentSelectedView.find(c => c.ixSlot === 48)} onDoublePress={() => props.setSingleView(49) } /> :
                                        <CameraStreamContainer key={'49'} camNum={'49'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 49) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'50'} camera={props.currentSelectedView.find(c => c.ixSlot === 49)} onDoublePress={() => props.setSingleView(50) } /> :
                                        <CameraStreamContainer key={'50'} camNum={'50'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 50) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'51'} camera={props.currentSelectedView.find(c => c.ixSlot === 50)} onDoublePress={() => props.setSingleView(51) } /> :
                                        <CameraStreamContainer key={'51'} camNum={'51'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 51) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'52'} camera={props.currentSelectedView.find(c => c.ixSlot === 51)} onDoublePress={() => props.setSingleView(52) } /> :
                                        <CameraStreamContainer key={'52'} camNum={'52'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 52) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'53'} camera={props.currentSelectedView.find(c => c.ixSlot === 52)} onDoublePress={() => props.setSingleView(53) } /> :
                                        <CameraStreamContainer key={'53'} camNum={'53'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 53) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'54'} camera={props.currentSelectedView.find(c => c.ixSlot === 53)} onDoublePress={() => props.setSingleView(54) } /> :
                                        <CameraStreamContainer key={'54'} camNum={'54'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 54) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'55'} camera={props.currentSelectedView.find(c => c.ixSlot === 54)} onDoublePress={() => props.setSingleView(55) } /> :
                                        <CameraStreamContainer key={'55'} camNum={'55'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 55) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'56'} camera={props.currentSelectedView.find(c => c.ixSlot === 55)} onDoublePress={() => props.setSingleView(56) } /> :
                                        <CameraStreamContainer key={'56'} camNum={'56'} placeholder />
                                    }
                                </View>
                            }     

                            { props.currentCamView === "56-64" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 55) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'56'} camera={props.currentSelectedView.find(c => c.ixSlot === 55)} onDoublePress={() => props.setSingleView(56) } /> :
                                        <CameraStreamContainer key={'56'} camNum={'56'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 56) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'57'} camera={props.currentSelectedView.find(c => c.ixSlot === 56)} onDoublePress={() => props.setSingleView(57) } /> :
                                        <CameraStreamContainer key={'57'} camNum={'57'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 57) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'58'} camera={props.currentSelectedView.find(c => c.ixSlot === 57)} onDoublePress={() => props.setSingleView(58) } /> :
                                        <CameraStreamContainer key={'58'} camNum={'58'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 58) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'59'} camera={props.currentSelectedView.find(c => c.ixSlot === 58)} onDoublePress={() => props.setSingleView(59) } /> :
                                        <CameraStreamContainer key={'59'} camNum={'59'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 59) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'60'} camera={props.currentSelectedView.find(c => c.ixSlot === 59)} onDoublePress={() => props.setSingleView(60) } /> :
                                        <CameraStreamContainer key={'60'} camNum={'60'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 60) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'61'} camera={props.currentSelectedView.find(c => c.ixSlot === 60)} onDoublePress={() => props.setSingleView(61) } /> :
                                        <CameraStreamContainer key={'61'} camNum={'61'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 61) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'62'} camera={props.currentSelectedView.find(c => c.ixSlot === 61)} onDoublePress={() => props.setSingleView(62) } /> :
                                        <CameraStreamContainer key={'62'} camNum={'62'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 62) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'63'} camera={props.currentSelectedView.find(c => c.ixSlot === 62)} onDoublePress={() => props.setSingleView(63) } /> :
                                        <CameraStreamContainer key={'63'} camNum={'63'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 63) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'64'} camera={props.currentSelectedView.find(c => c.ixSlot === 63)} onDoublePress={() => props.setSingleView(64) } /> :
                                        <CameraStreamContainer key={'64'} camNum={'64'} placeholder />
                                    }
                                </View>
                            }     
                        
                        </View> 
    
    const twelveView =  <View>
                            { props.currentCamView === "1-12" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 0) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'1'} camera={props.currentSelectedView.find(c => c.ixSlot === 0)} onDoublePress={() => props.setSingleView(1) } /> :
                                        <CameraStreamContainer key={'1'} camNum={'1'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 1) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'2'} camera={props.currentSelectedView.find(c => c.ixSlot === 1)} onDoublePress={() => props.setSingleView(2) } /> :
                                        <CameraStreamContainer key={'2'} camNum={'2'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 2) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'3'} camera={props.currentSelectedView.find(c => c.ixSlot === 2)} onDoublePress={() => props.setSingleView(3) } /> :
                                        <CameraStreamContainer key={'3'} camNum={'3'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 3) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'4'}  camera={props.currentSelectedView.find(c => c.ixSlot === 3)} onDoublePress={() => props.setSingleView(4) } /> :
                                        <CameraStreamContainer key={'4'} camNum={'4'} placeholder />
                                    }   
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 4) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'5'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 4)]} onDoublePress={() => props.setSingleView(5) } /> :
                                        <CameraStreamContainer key={'5'} camNum={'5'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 5) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'6'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 5)]} onDoublePress={() => props.setSingleView(6) } /> :
                                        <CameraStreamContainer key={'6'} camNum={'6'} placeholder />
                                    } 
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 6) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'7'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 6)]} onDoublePress={() => props.setSingleView(7) } /> :
                                        <CameraStreamContainer key={'7'} camNum={'7'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 7) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'8'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 7)]} onDoublePress={() => props.setSingleView(8) } /> :
                                        <CameraStreamContainer key={'8'} camNum={'8'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 8) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'9'} camera={props.currentSelectedView.find(c => c.ixSlot === 8)} onDoublePress={() => props.setSingleView(9) } /> :
                                        <CameraStreamContainer key={'9'} camNum={'9'} placeholder />
                                    }   
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 9) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'10'} camera={props.currentSelectedView.find(c => c.ixSlot === 9)} onDoublePress={() => props.setSingleView(10) } /> :
                                        <CameraStreamContainer key={'10'} camNum={'10'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 10) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'11'} camera={props.currentSelectedView.find(c => c.ixSlot === 10)} onDoublePress={() => props.setSingleView(11) } /> :
                                        <CameraStreamContainer key={'11'} camNum={'11'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 11) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'12'} camera={props.currentSelectedView.find(c => c.ixSlot === 11)} onDoublePress={() => props.setSingleView(12) } /> :
                                        <CameraStreamContainer key={'12'} camNum={'12'} placeholder />
                                    }                        
                                </View>
                            }  

                            { props.currentCamView === "13-24" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 12) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'13'} camera={props.currentSelectedView.find(c => c.ixSlot === 12)} onDoublePress={() => props.setSingleView(13) } /> :
                                        <CameraStreamContainer key={'13'} camNum={'13'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 13) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'14'} camera={props.currentSelectedView.find(c => c.ixSlot === 13)} onDoublePress={() => props.setSingleView(14) } /> :
                                        <CameraStreamContainer key={'14'} camNum={'14'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 14) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'15'} camera={props.currentSelectedView.find(c => c.ixSlot === 14)} onDoublePress={() => props.setSingleView(15) } /> :
                                        <CameraStreamContainer key={'15'} camNum={'15'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 15) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'16'} camera={props.currentSelectedView.find(c => c.ixSlot === 15)} onDoublePress={() => props.setSingleView(16) } /> :
                                        <CameraStreamContainer key={'16'} camNum={'16'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 16) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'17'} camera={props.currentSelectedView.find(c => c.ixSlot === 16)} onDoublePress={() => props.setSingleView(17) } /> :
                                        <CameraStreamContainer key={'17'} camNum={'17'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 17) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'18'} camera={props.currentSelectedView.find(c => c.ixSlot === 17)} onDoublePress={() => props.setSingleView(18) } /> :
                                        <CameraStreamContainer key={'18'} camNum={'18'} placeholder />
                                    }
                                     { props.currentSelectedView.findIndex(c => c.ixSlot === 18) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'19'} camera={props.currentSelectedView.find(c => c.ixSlot === 18)} onDoublePress={() => props.setSingleView(19) } /> :
                                        <CameraStreamContainer key={'19'} camNum={'19'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 19) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'20'} camera={props.currentSelectedView.find(c => c.ixSlot === 19)} onDoublePress={() => props.setSingleView(20) } /> :
                                        <CameraStreamContainer key={'20'} camNum={'20'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 20) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'21'} camera={props.currentSelectedView.find(c => c.ixSlot === 20)} onDoublePress={() => props.setSingleView(21) } /> :
                                        <CameraStreamContainer key={'21'} camNum={'21'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 21) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'22'} camera={props.currentSelectedView.find(c => c.ixSlot === 21)} onDoublePress={() => props.setSingleView(22) } /> :
                                        <CameraStreamContainer key={'22'} camNum={'22'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 22) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'23'} camera={props.currentSelectedView.find(c => c.ixSlot === 22)} onDoublePress={() => props.setSingleView(23) } /> :
                                        <CameraStreamContainer key={'23'} camNum={'23'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 23) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'24'} camera={props.currentSelectedView.find(c => c.ixSlot === 23)} onDoublePress={() => props.setSingleView(24) } /> :
                                        <CameraStreamContainer key={'24'} camNum={'24'} placeholder />
                                    }
                                </View>
                            } 

                            { props.currentCamView === "25-36" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 24) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'25'} camera={props.currentSelectedView.find(c => c.ixSlot === 24)} onDoublePress={() => props.setSingleView(25) } /> :
                                        <CameraStreamContainer key={'25'} camNum={'25'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 25) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'26'} camera={props.currentSelectedView.find(c => c.ixSlot === 25)} onDoublePress={() => props.setSingleView(26) } /> :
                                        <CameraStreamContainer key={'26'} camNum={'26'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 26) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'27'} camera={props.currentSelectedView.find(c => c.ixSlot === 26)} onDoublePress={() => props.setSingleView(27) } /> :
                                        <CameraStreamContainer key={'27'} camNum={'27'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 27) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'28'} camera={props.currentSelectedView.find(c => c.ixSlot === 27)} onDoublePress={() => props.setSingleView(28) } /> :
                                        <CameraStreamContainer key={'28'} camNum={'28'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 28) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'29'} camera={props.currentSelectedView.find(c => c.ixSlot === 28)} onDoublePress={() => props.setSingleView(29) } /> :
                                        <CameraStreamContainer key={'29'} camNum={'29'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 29) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'30'} camera={props.currentSelectedView.find(c => c.ixSlot === 29)} onDoublePress={() => props.setSingleView(30) } /> :
                                        <CameraStreamContainer key={'30'} camNum={'30'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 30) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'31'} camera={props.currentSelectedView.find(c => c.ixSlot === 30)} onDoublePress={() => props.setSingleView(31) } /> :
                                        <CameraStreamContainer key={'31'} camNum={'31'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 31) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'32'} camera={props.currentSelectedView.find(c => c.ixSlot === 31)} onDoublePress={() => props.setSingleView(32) } /> :
                                        <CameraStreamContainer key={'32'} camNum={'32'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 32) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'33'} camera={props.currentSelectedView.find(c => c.ixSlot === 32)} onDoublePress={() => props.setSingleView(33) } /> :
                                        <CameraStreamContainer key={'33'} camNum={'33'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 33) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'34'} camera={props.currentSelectedView.find(c => c.ixSlot === 33)} onDoublePress={() => props.setSingleView(34) } /> :
                                        <CameraStreamContainer key={'34'} camNum={'34'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 34) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'35'} camera={props.currentSelectedView.find(c => c.ixSlot === 34)} onDoublePress={() => props.setSingleView(35) } /> :
                                        <CameraStreamContainer key={'35'} camNum={'35'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 35) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'36'} camera={props.currentSelectedView.find(c => c.ixSlot === 35)} onDoublePress={() => props.setSingleView(36) } /> :
                                        <CameraStreamContainer key={'36'} camNum={'36'} placeholder />
                                    }
                                </View>
                            }  

                            { props.currentCamView === "37-48" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 36) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'37'} camera={props.currentSelectedView.find(c => c.ixSlot === 36)} onDoublePress={() => props.setSingleView(37) } /> :
                                        <CameraStreamContainer key={'37'} camNum={'37'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 37) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'38'} camera={props.currentSelectedView.find(c => c.ixSlot === 25)} onDoublePress={() => props.setSingleView(26) } /> :
                                        <CameraStreamContainer key={'38'} camNum={'38'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 38) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'39'} camera={props.currentSelectedView.find(c => c.ixSlot === 26)} onDoublePress={() => props.setSingleView(27) } /> :
                                        <CameraStreamContainer key={'39'} camNum={'39'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 39) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'40'} camera={props.currentSelectedView.find(c => c.ixSlot === 27)} onDoublePress={() => props.setSingleView(28) } /> :
                                        <CameraStreamContainer key={'40'} camNum={'40'} placeholder />
                                    }
                                     { props.currentSelectedView.findIndex(c => c.ixSlot === 40) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'41'} camera={props.currentSelectedView.find(c => c.ixSlot === 40)} onDoublePress={() => props.setSingleView(41) } /> :
                                        <CameraStreamContainer key={'41'} camNum={'41'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 41) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'42'} camera={props.currentSelectedView.find(c => c.ixSlot === 41)} onDoublePress={() => props.setSingleView(42) } /> :
                                        <CameraStreamContainer key={'42'} camNum={'42'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 42) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'43'} camera={props.currentSelectedView.find(c => c.ixSlot === 42)} onDoublePress={() => props.setSingleView(43) } /> :
                                        <CameraStreamContainer key={'43'} camNum={'43'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 43) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'44'} camera={props.currentSelectedView.find(c => c.ixSlot === 43)} onDoublePress={() => props.setSingleView(44) } /> :
                                        <CameraStreamContainer key={'44'} camNum={'44'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 44) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'45'} camera={props.currentSelectedView.find(c => c.ixSlot === 44)} onDoublePress={() => props.setSingleView(45) } /> :
                                        <CameraStreamContainer key={'45'} camNum={'45'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 45) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'46'} camera={props.currentSelectedView.find(c => c.ixSlot === 45)} onDoublePress={() => props.setSingleView(46) } /> :
                                        <CameraStreamContainer key={'46'} camNum={'46'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 46) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'47'} camera={props.currentSelectedView.find(c => c.ixSlot === 46)} onDoublePress={() => props.setSingleView(47) } /> :
                                        <CameraStreamContainer key={'47'} camNum={'47'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 47) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'48'} camera={props.currentSelectedView.find(c => c.ixSlot === 47)} onDoublePress={() => props.setSingleView(48) } /> :
                                        <CameraStreamContainer key={'48'} camNum={'48'} placeholder />
                                    }
                                </View>
                            }   

                            { props.currentCamView === "49-60" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 48) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'49'} camera={props.currentSelectedView.find(c => c.ixSlot === 48)} onDoublePress={() => props.setSingleView(49) } /> :
                                        <CameraStreamContainer key={'49'} camNum={'49'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 49) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'50'} camera={props.currentSelectedView.find(c => c.ixSlot === 49)} onDoublePress={() => props.setSingleView(50) } /> :
                                        <CameraStreamContainer key={'50'} camNum={'50'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 50) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'51'} camera={props.currentSelectedView.find(c => c.ixSlot === 50)} onDoublePress={() => props.setSingleView(51) } /> :
                                        <CameraStreamContainer key={'51'} camNum={'51'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 51) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'52'} camera={props.currentSelectedView.find(c => c.ixSlot === 51)} onDoublePress={() => props.setSingleView(52) } /> :
                                        <CameraStreamContainer key={'52'} camNum={'52'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 52) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'53'} camera={props.currentSelectedView.find(c => c.ixSlot === 52)} onDoublePress={() => props.setSingleView(53) } /> :
                                        <CameraStreamContainer key={'53'} camNum={'53'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 53) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'54'} camera={props.currentSelectedView.find(c => c.ixSlot === 53)} onDoublePress={() => props.setSingleView(54) } /> :
                                        <CameraStreamContainer key={'54'} camNum={'54'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 54) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'55'} camera={props.currentSelectedView.find(c => c.ixSlot === 54)} onDoublePress={() => props.setSingleView(55) } /> :
                                        <CameraStreamContainer key={'55'} camNum={'55'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 55) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'56'} camera={props.currentSelectedView.find(c => c.ixSlot === 55)} onDoublePress={() => props.setSingleView(56) } /> :
                                        <CameraStreamContainer key={'56'} camNum={'56'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 56) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'57'} camera={props.currentSelectedView.find(c => c.ixSlot === 56)} onDoublePress={() => props.setSingleView(57) } /> :
                                        <CameraStreamContainer key={'57'} camNum={'57'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 57) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'58'} camera={props.currentSelectedView.find(c => c.ixSlot === 57)} onDoublePress={() => props.setSingleView(58) } /> :
                                        <CameraStreamContainer key={'58'} camNum={'58'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 58) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'59'} camera={props.currentSelectedView.find(c => c.ixSlot === 58)} onDoublePress={() => props.setSingleView(59) } /> :
                                        <CameraStreamContainer key={'59'} camNum={'59'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 59) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'60'} camera={props.currentSelectedView.find(c => c.ixSlot === 59)} onDoublePress={() => props.setSingleView(60) } /> :
                                        <CameraStreamContainer key={'60'} camNum={'60'} placeholder />
                                    }
                                </View>
                            }     

                            { props.currentCamView === "61-72" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 60) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'61'} camera={props.currentSelectedView.find(c => c.ixSlot === 60)} onDoublePress={() => props.setSingleView(61) } /> :
                                        <CameraStreamContainer key={'61'} camNum={'61'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 61) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'62'} camera={props.currentSelectedView.find(c => c.ixSlot === 61)} onDoublePress={() => props.setSingleView(62) } /> :
                                        <CameraStreamContainer key={'62'} camNum={'62'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 62) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'63'} camera={props.currentSelectedView.find(c => c.ixSlot === 62)} onDoublePress={() => props.setSingleView(63) } /> :
                                        <CameraStreamContainer key={'63'} camNum={'63'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 63) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'64'} camera={props.currentSelectedView.find(c => c.ixSlot === 63)} onDoublePress={() => props.setSingleView(64) } /> :
                                        <CameraStreamContainer key={'64'} camNum={'64'} placeholder />
                                    }
                                     <CameraStreamContainer key={'65'} camNum={'65'} placeholder />
                                     <CameraStreamContainer key={'66'} camNum={'66'} placeholder />
                                     <CameraStreamContainer key={'67'} camNum={'67'} placeholder />
                                     <CameraStreamContainer key={'68'} camNum={'68'} placeholder />
                                     <CameraStreamContainer key={'69'} camNum={'69'} placeholder />
                                     <CameraStreamContainer key={'70'} camNum={'70'} placeholder />
                                     <CameraStreamContainer key={'71'} camNum={'71'} placeholder />
                                     <CameraStreamContainer key={'72'} camNum={'72'} placeholder />
                                </View>
                            }     
     
                        </View> 
                    
    const sixteenView = <View>
                            { props.currentCamView === "1-16" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                   { props.currentSelectedView.findIndex(c => c.ixSlot === 0) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'1'} camera={props.currentSelectedView.find(c => c.ixSlot === 0)} onDoublePress={() => props.setSingleView(1) } /> :
                                        <CameraStreamContainer key={'1'} camNum={'1'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 1) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'2'} camera={props.currentSelectedView.find(c => c.ixSlot === 1)} onDoublePress={() => props.setSingleView(2) } /> :
                                        <CameraStreamContainer key={'2'} camNum={'2'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 2) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'3'} camera={props.currentSelectedView.find(c => c.ixSlot === 2)} onDoublePress={() => props.setSingleView(3) } /> :
                                        <CameraStreamContainer key={'3'} camNum={'3'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 3) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'4'}  camera={props.currentSelectedView.find(c => c.ixSlot === 3)} onDoublePress={() => props.setSingleView(4) } /> :
                                        <CameraStreamContainer key={'4'} camNum={'4'} placeholder />
                                    }   
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 4) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'5'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 4)]} onDoublePress={() => props.setSingleView(5) } /> :
                                        <CameraStreamContainer key={'5'} camNum={'5'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 5) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'6'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 5)]} onDoublePress={() => props.setSingleView(6) } /> :
                                        <CameraStreamContainer key={'6'} camNum={'6'} placeholder />
                                    } 
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 6) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'7'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 6)]} onDoublePress={() => props.setSingleView(7) } /> :
                                        <CameraStreamContainer key={'7'} camNum={'7'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 7) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'8'} camera={props.currentSelectedView[props.currentSelectedView.findIndex(c => c.ixSlot === 7)]} onDoublePress={() => props.setSingleView(8) } /> :
                                        <CameraStreamContainer key={'8'} camNum={'8'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 8) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'9'} camera={props.currentSelectedView.find(c => c.ixSlot === 8)} onDoublePress={() => props.setSingleView(9) } /> :
                                        <CameraStreamContainer key={'9'} camNum={'9'} placeholder />
                                    }   
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 9) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'10'} camera={props.currentSelectedView.find(c => c.ixSlot === 9)} onDoublePress={() => props.setSingleView(10) } /> :
                                        <CameraStreamContainer key={'10'} camNum={'10'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 10) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'11'} camera={props.currentSelectedView.find(c => c.ixSlot === 10)} onDoublePress={() => props.setSingleView(11) } /> :
                                        <CameraStreamContainer key={'11'} camNum={'11'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 11) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'12'} camera={props.currentSelectedView.find(c => c.ixSlot === 11)} onDoublePress={() => props.setSingleView(12) } /> :
                                        <CameraStreamContainer key={'12'} camNum={'12'} placeholder />
                                    }    
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 12) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'13'} camera={props.currentSelectedView.find(c => c.ixSlot === 12)} onDoublePress={() => props.setSingleView(13) } /> :
                                        <CameraStreamContainer key={'13'} camNum={'13'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 13) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'14'} camera={props.currentSelectedView.find(c => c.ixSlot === 13)} onDoublePress={() => props.setSingleView(14) } /> :
                                        <CameraStreamContainer key={'14'} camNum={'14'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 14) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'15'} camera={props.currentSelectedView.find(c => c.ixSlot === 14)} onDoublePress={() => props.setSingleView(15) } /> :
                                        <CameraStreamContainer key={'15'} camNum={'15'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 15) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'16'} camera={props.currentSelectedView.find(c => c.ixSlot === 15)} onDoublePress={() => props.setSingleView(16) } /> :
                                        <CameraStreamContainer key={'16'} camNum={'16'} placeholder />
                                    }                    
                                </View>
                            }   

                            { props.currentCamView === "17-32" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 16) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'17'} camera={props.currentSelectedView.find(c => c.ixSlot === 16)} onDoublePress={() => props.setSingleView(17) } /> :
                                        <CameraStreamContainer key={'17'} camNum={'17'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 17) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'18'} camera={props.currentSelectedView.find(c => c.ixSlot === 17)} onDoublePress={() => props.setSingleView(18) } /> :
                                        <CameraStreamContainer key={'18'} camNum={'18'} placeholder />
                                    }
                                     { props.currentSelectedView.findIndex(c => c.ixSlot === 18) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'19'} camera={props.currentSelectedView.find(c => c.ixSlot === 18)} onDoublePress={() => props.setSingleView(19) } /> :
                                        <CameraStreamContainer key={'19'} camNum={'19'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 19) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'20'} camera={props.currentSelectedView.find(c => c.ixSlot === 19)} onDoublePress={() => props.setSingleView(20) } /> :
                                        <CameraStreamContainer key={'20'} camNum={'20'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 20) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'21'} camera={props.currentSelectedView.find(c => c.ixSlot === 20)} onDoublePress={() => props.setSingleView(21) } /> :
                                        <CameraStreamContainer key={'21'} camNum={'21'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 21) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'22'} camera={props.currentSelectedView.find(c => c.ixSlot === 21)} onDoublePress={() => props.setSingleView(22) } /> :
                                        <CameraStreamContainer key={'22'} camNum={'22'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 22) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'23'} camera={props.currentSelectedView.find(c => c.ixSlot === 22)} onDoublePress={() => props.setSingleView(23) } /> :
                                        <CameraStreamContainer key={'23'} camNum={'23'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 23) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'24'} camera={props.currentSelectedView.find(c => c.ixSlot === 23)} onDoublePress={() => props.setSingleView(24) } /> :
                                        <CameraStreamContainer key={'24'} camNum={'24'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 24) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'25'} camera={props.currentSelectedView.find(c => c.ixSlot === 24)} onDoublePress={() => props.setSingleView(25) } /> :
                                        <CameraStreamContainer key={'25'} camNum={'25'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 25) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'26'} camera={props.currentSelectedView.find(c => c.ixSlot === 25)} onDoublePress={() => props.setSingleView(26) } /> :
                                        <CameraStreamContainer key={'26'} camNum={'26'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 26) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'27'} camera={props.currentSelectedView.find(c => c.ixSlot === 26)} onDoublePress={() => props.setSingleView(27) } /> :
                                        <CameraStreamContainer key={'27'} camNum={'27'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 27) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'28'} camera={props.currentSelectedView.find(c => c.ixSlot === 27)} onDoublePress={() => props.setSingleView(28) } /> :
                                        <CameraStreamContainer key={'28'} camNum={'28'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 28) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'29'} camera={props.currentSelectedView.find(c => c.ixSlot === 28)} onDoublePress={() => props.setSingleView(29) } /> :
                                        <CameraStreamContainer key={'29'} camNum={'29'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 29) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'30'} camera={props.currentSelectedView.find(c => c.ixSlot === 29)} onDoublePress={() => props.setSingleView(30) } /> :
                                        <CameraStreamContainer key={'30'} camNum={'30'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 30) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'31'} camera={props.currentSelectedView.find(c => c.ixSlot === 30)} onDoublePress={() => props.setSingleView(31) } /> :
                                        <CameraStreamContainer key={'31'} camNum={'31'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 31) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'32'} camera={props.currentSelectedView.find(c => c.ixSlot === 31)} onDoublePress={() => props.setSingleView(32) } /> :
                                        <CameraStreamContainer key={'32'} camNum={'32'} placeholder />
                                    }
                                </View>
                            }     

                            { props.currentCamView === "33-48" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                   { props.currentSelectedView.findIndex(c => c.ixSlot === 32) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'33'} camera={props.currentSelectedView.find(c => c.ixSlot === 32)} onDoublePress={() => props.setSingleView(33) } /> :
                                        <CameraStreamContainer key={'33'} camNum={'33'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 33) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'34'} camera={props.currentSelectedView.find(c => c.ixSlot === 33)} onDoublePress={() => props.setSingleView(34) } /> :
                                        <CameraStreamContainer key={'34'} camNum={'34'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 34) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'35'} camera={props.currentSelectedView.find(c => c.ixSlot === 34)} onDoublePress={() => props.setSingleView(35) } /> :
                                        <CameraStreamContainer key={'35'} camNum={'35'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 35) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'36'} camera={props.currentSelectedView.find(c => c.ixSlot === 35)} onDoublePress={() => props.setSingleView(36) } /> :
                                        <CameraStreamContainer key={'36'} camNum={'36'} placeholder />
                                    }
                                     { props.currentSelectedView.findIndex(c => c.ixSlot === 36) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'37'} camera={props.currentSelectedView.find(c => c.ixSlot === 36)} onDoublePress={() => props.setSingleView(37) } /> :
                                        <CameraStreamContainer key={'37'} camNum={'37'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 37) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'38'} camera={props.currentSelectedView.find(c => c.ixSlot === 25)} onDoublePress={() => props.setSingleView(26) } /> :
                                        <CameraStreamContainer key={'38'} camNum={'38'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 38) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'39'} camera={props.currentSelectedView.find(c => c.ixSlot === 26)} onDoublePress={() => props.setSingleView(27) } /> :
                                        <CameraStreamContainer key={'39'} camNum={'39'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 39) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'40'} camera={props.currentSelectedView.find(c => c.ixSlot === 27)} onDoublePress={() => props.setSingleView(28) } /> :
                                        <CameraStreamContainer key={'40'} camNum={'40'} placeholder />
                                    }
                                     { props.currentSelectedView.findIndex(c => c.ixSlot === 40) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'41'} camera={props.currentSelectedView.find(c => c.ixSlot === 40)} onDoublePress={() => props.setSingleView(41) } /> :
                                        <CameraStreamContainer key={'41'} camNum={'41'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 41) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'42'} camera={props.currentSelectedView.find(c => c.ixSlot === 41)} onDoublePress={() => props.setSingleView(42) } /> :
                                        <CameraStreamContainer key={'42'} camNum={'42'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 42) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'43'} camera={props.currentSelectedView.find(c => c.ixSlot === 42)} onDoublePress={() => props.setSingleView(43) } /> :
                                        <CameraStreamContainer key={'43'} camNum={'43'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 43) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'44'} camera={props.currentSelectedView.find(c => c.ixSlot === 43)} onDoublePress={() => props.setSingleView(44) } /> :
                                        <CameraStreamContainer key={'44'} camNum={'44'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 44) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'45'} camera={props.currentSelectedView.find(c => c.ixSlot === 44)} onDoublePress={() => props.setSingleView(45) } /> :
                                        <CameraStreamContainer key={'45'} camNum={'45'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 45) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'46'} camera={props.currentSelectedView.find(c => c.ixSlot === 45)} onDoublePress={() => props.setSingleView(46) } /> :
                                        <CameraStreamContainer key={'46'} camNum={'46'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 46) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'47'} camera={props.currentSelectedView.find(c => c.ixSlot === 46)} onDoublePress={() => props.setSingleView(47) } /> :
                                        <CameraStreamContainer key={'47'} camNum={'47'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 47) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'48'} camera={props.currentSelectedView.find(c => c.ixSlot === 47)} onDoublePress={() => props.setSingleView(48) } /> :
                                        <CameraStreamContainer key={'48'} camNum={'48'} placeholder />
                                    }
                                </View>
                            }    

                            { props.currentCamView === "49-64" && 
                                <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 48) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'49'} camera={props.currentSelectedView.find(c => c.ixSlot === 48)} onDoublePress={() => props.setSingleView(49) } /> :
                                        <CameraStreamContainer key={'49'} camNum={'49'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 49) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'50'} camera={props.currentSelectedView.find(c => c.ixSlot === 49)} onDoublePress={() => props.setSingleView(50) } /> :
                                        <CameraStreamContainer key={'50'} camNum={'50'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 50) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'51'} camera={props.currentSelectedView.find(c => c.ixSlot === 50)} onDoublePress={() => props.setSingleView(51) } /> :
                                        <CameraStreamContainer key={'51'} camNum={'51'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 51) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'52'} camera={props.currentSelectedView.find(c => c.ixSlot === 51)} onDoublePress={() => props.setSingleView(52) } /> :
                                        <CameraStreamContainer key={'52'} camNum={'52'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 52) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'53'} camera={props.currentSelectedView.find(c => c.ixSlot === 52)} onDoublePress={() => props.setSingleView(53) } /> :
                                        <CameraStreamContainer key={'53'} camNum={'53'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 53) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'54'} camera={props.currentSelectedView.find(c => c.ixSlot === 53)} onDoublePress={() => props.setSingleView(54) } /> :
                                        <CameraStreamContainer key={'54'} camNum={'54'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 54) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'55'} camera={props.currentSelectedView.find(c => c.ixSlot === 54)} onDoublePress={() => props.setSingleView(55) } /> :
                                        <CameraStreamContainer key={'55'} camNum={'55'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 55) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'56'} camera={props.currentSelectedView.find(c => c.ixSlot === 55)} onDoublePress={() => props.setSingleView(56) } /> :
                                        <CameraStreamContainer key={'56'} camNum={'56'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 56) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'57'} camera={props.currentSelectedView.find(c => c.ixSlot === 56)} onDoublePress={() => props.setSingleView(57) } /> :
                                        <CameraStreamContainer key={'57'} camNum={'57'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 57) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'58'} camera={props.currentSelectedView.find(c => c.ixSlot === 57)} onDoublePress={() => props.setSingleView(58) } /> :
                                        <CameraStreamContainer key={'58'} camNum={'58'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 58) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'59'} camera={props.currentSelectedView.find(c => c.ixSlot === 58)} onDoublePress={() => props.setSingleView(59) } /> :
                                        <CameraStreamContainer key={'59'} camNum={'59'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 59) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'60'} camera={props.currentSelectedView.find(c => c.ixSlot === 59)} onDoublePress={() => props.setSingleView(60) } /> :
                                        <CameraStreamContainer key={'60'} camNum={'60'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 60) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'61'} camera={props.currentSelectedView.find(c => c.ixSlot === 60)} onDoublePress={() => props.setSingleView(61) } /> :
                                        <CameraStreamContainer key={'61'} camNum={'61'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 61) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'62'} camera={props.currentSelectedView.find(c => c.ixSlot === 61)} onDoublePress={() => props.setSingleView(62) } /> :
                                        <CameraStreamContainer key={'62'} camNum={'62'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 62) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'63'} camera={props.currentSelectedView.find(c => c.ixSlot === 62)} onDoublePress={() => props.setSingleView(63) } /> :
                                        <CameraStreamContainer key={'63'} camNum={'63'} placeholder />
                                    }
                                    { props.currentSelectedView.findIndex(c => c.ixSlot === 63) > -1 ?
                                    // if there is a slot render it - if not render placeholder
                                        <CameraStreamContainer key={'64'} camera={props.currentSelectedView.find(c => c.ixSlot === 63)} onDoublePress={() => props.setSingleView(64) } /> :
                                        <CameraStreamContainer key={'64'} camNum={'64'} placeholder />
                                    }
                                </View>
                            }        
        
                        </View> 

    const onSwipeLeft = (gestureState) => {
        getConfAndIndex('inc') 
    };
    
    const onSwipeRight = (gestureState) =>{
        getConfAndIndex('dec') 
    };

    const getConfAndIndex = (type) => {
        if(props.currentCamView){
            switch (props.conf) {
                case "conf-1": 
                let camset1 = props.singleView.indexOf(props.currentCamView);
                if(type === 'dec') {
                    if(props.singleView[camset1 - 1]){
                        props.camViewChange(props.singleView[camset1 - 1])
                    } else {
                        props.camViewChange(props.singleView[props.singleView.length - 1])
                    }
                }
                if(type === 'inc') {
                    if((camset1 < props.singleView.length - 1) && props.singleView[camset1 + 1]){
                    props.camViewChange(props.singleView[camset1 + 1])
                    } else {
                    props.camViewChange(props.singleView[0])
                    }
                }
                break

                case "conf-4": 
                let camset4 = props.quadView.indexOf(props.currentCamView);
                if(type === 'dec') {
                    if(props.quadView[camset4 - 1]){
                    props.camViewChange(props.quadView[camset4 - 1])
                    } else {
                    props.camViewChange(props.quadView[props.quadView.length - 1])
                    }
                }
                if(type === 'inc') {
                    // check if we should subtract 1 from length or not
                    if(camset4 < props.quadView.length -1 && props.quadView[camset4 + 1]){
                    props.camViewChange(props.quadView[camset4 + 1])
                    } else {
                    props.camViewChange(props.quadView[0])
                    }
                }
                break

                case "conf-6": 
                let camset6 = props.sixView.indexOf(props.currentCamView);
                if(type === 'dec') {
                    if(props.sixView[camset6 - 1]){
                    props.camViewChange(props.sixView[camset6 - 1])
                    } else {
                    props.camViewChange(props.sixView[props.sixView.length - 1])
                    }
                }
                if(type === 'inc') {
                    if(camset6 < props.sixView.length -1 && props.sixView[camset6 + 1]){
                    props.camViewChange(props.sixView[camset6 + 1])
                    } else {
                    props.camViewChange(props.sixView[0])
                    }
                }
                break

                case "conf-9": 
                let camset9 = props.nineView.indexOf(props.currentCamView);
                if(type === 'dec') {
                    if(props.nineView[camset9 - 1]){
                    props.camViewChange(props.nineView[camset9 - 1])
                    } else {
                    props.camViewChange(props.nineView[props.nineView.length - 1])
                    }
                }
                if(type === 'inc') {
                    if(camset9 < props.nineView.length -1 && props.nineView[camset9 + 1]){
                    props.camViewChange(props.nineView[camset9 + 1])
                    } else {
                    props.camViewChange(props.nineView[0])
                    }
                }
                break

                case "conf-12": 
                let camset12 = props.twelveView.indexOf(props.currentCamView);
                if(type === 'dec') {
                    if(props.twelveView[camset12 - 1]){
                    props.camViewChange(props.twelveView[camset12 - 1])
                    } else {
                    props.camViewChange(props.twelveView[props.twelveView.length - 1])
                    }
                }
                if(type === 'inc') {
                    if(camset12 < props.twelveView.length -1 && props.twelveView[camset12 + 1]){
                    props.camViewChange(props.twelveView[camset12 + 1])
                    } else {
                    props.camViewChange(props.twelveView[0])
                    }
                }
                break

                case "conf-16": 
                let camset16 = props.sixteenView.indexOf(props.currentCamView);
                if(type === 'dec') {
                    if(props.sixteenView[camset16 - 1]){
                    props.camViewChange(props.sixteenView[camset16 - 1])
                    } else {
                    props.camViewChange(props.sixteenView[props.sixteenView.length - 1])
                    }
                }
                if(type === 'inc') {
                    if(camset16 < props.sixteenView.length -1 && props.sixteenView[camset16 + 1]){
                    props.camViewChange(props.sixteenView[camset16 + 1])
                    } else {
                    props.camViewChange(props.sixteenView[0])
                    }
                }
                break

                default:
                console.log('should not get called')
            }
        } else {
            alert('nada')
        }
    }

    return (
            <GestureRecognizer  onSwipeLeft={(state) => onSwipeLeft(state)}
                                onSwipeRight={(state) => onSwipeRight(state)} 
                                style={{ flex: 1, width: '100%', height: '100%', marginTop: 8 }}>
                {   props.jumpLoading ?
                        <View style={{ alignItems: 'flex-start', width: '70%', marginLeft: '15%', paddingTop: '25%' }}>
                            <Text style={{ color: 'white', fontSize: 16,  }}>logging out of current server...</Text>
                            { props.loggingIntoNewServer && <Text style={{ color: 'lime', fontSize: 16}}>logging into new server...</Text> }
                            { props.gettingNewSession && <Text style={{ color: 'lime', fontSize: 16 }}>getting new session...</Text> }
                            { props.preppingData && <Text style={{ color: 'lime', fontSize: 16 }}>preparing data...</Text> }
                        </View> :
                        <View>
                             { props.fSingle ? 
                                    forcedSingleView :
                                props.conf === "conf-1" ?
                                    singleView :
                                props.conf === "conf-4" ?
                                    quadView :
                                props.conf === "conf-6" ? 
                                    sixView :
                                props.conf === "conf-9" ?
                                    nineView :
                                props.conf === "conf-12" ?
                                    twelveView :
                                props.conf === "conf-16" ? 
                                    sixteenView :
                                    null
                             }
                             <View style={{ marginTop: 5, paddingRight: 10, paddingLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <TouchableOpacity onPress={() => onSwipeRight()}>
                                    <Entypo name="arrow-with-circle-left" size={28} color="white" />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 12, color: 'white' }}>{props.currentCamView.length < 3 ? 'Cam ' : 'Cams '}{props.currentCamView}</Text>
                                <TouchableOpacity onPress={() => onSwipeLeft()}>
                                    <Entypo name="arrow-with-circle-right" size={28} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>       
                }   

            </GestureRecognizer>   
    )
}

const mapStateToProps = state => {
    const {  
        sName,
        cameras, 
        bNumCams, 
        features,
        currentSelectedView
       } = state.server;
    const { conf } = state.config;
    const { fFullscreen, singleCamSelected, fSingle } = state.video;
    const { sSess, jumpLoading, loggingIntoNewServer, gettingNewSession, preppingData } = state.auth;
    const { currentCamView, autoScrollEnabled, singleView, quadView, sixView, nineView, twelveView, sixteenView } = state.camera;
    return {
        singleView,
        quadView,
        sixView,
        nineView,
        twelveView,
        sixteenView,
        sName,
        cameras, 
        bNumCams, 
        features,
        currentSelectedView,
        conf,
        fFullscreen, 
        singleCamSelected, 
        fSingle,
        sSess,
        jumpLoading, 
        loggingIntoNewServer, 
        gettingNewSession, 
        preppingData,
        currentCamView, 
        autoScrollEnabled 
    }
}

export default connect(mapStateToProps, { configChange, setSingleView, camViewChange, logoutUser } )(VideoView);
