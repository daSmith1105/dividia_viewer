import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { configChange, setSingleView, camViewChange, logoutUser } from '../actions';
import CameraStreamContainer from './CameraStreamContainer';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const VideoView = props => {

    const forcedSingleView = <View>
                                <CameraStreamContainer enabled={ props.cameras.filter( c => c.bID === props.singleCamSelected)[0] } camNum={ props.singleCamSelected } ts={props.ts} />
                             </View>

    const singleView =  <View>
                            { props.cameras.find( c => c.bID.toString() === props.currentCamView.split('_')[1]) && props.cameras.find( c => c.bID.toString() === props.currentCamView.split('_')[1]).fEnable === true ? 
                                <CameraStreamContainer enabled={ props.cameras.find( c => c.bID.toString() === props.currentCamView.split('_')[1]) } camNum={ props.currentCamView.split('_')[1] } ts={props.ts} /> 
                                 :
                                <CameraStreamContainer enabled={ 'false' } camNum={ props.currentCamView.split('_')[1] } ts={props.ts} />
                            } 
                        </View>
    
    const quadView =  <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                        { props.currentCamView === "cam_1-4" && props.cameras.slice(0,4).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts} />) }

                        { props.currentCamView === "cam_5-8" && props.cameras.slice(4,8).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }       
                        { props.currentCamView === "cam_9-12" && props.cameras.slice(8,12).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }  
                        { props.currentCamView === "cam_13-16" && props.cameras.slice(12,16).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }    
                        { props.currentCamView === "cam_17-20" && props.cameras.slice(16,20).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) } 
                        { props.currentCamView === "cam_21-24" && props.cameras.slice(20,24).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_25-28" && props.cameras.slice(24,28).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_29-32" && props.cameras.slice(28,32).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }

                        { props.currentCamView === "cam_33-36" && props.cameras.slice(32,36).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_37-40" && props.cameras.slice(36,40).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_41-44" && props.cameras.slice(40,44).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_45-48" && props.cameras.slice(44,48).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_49-52" && props.cameras.slice(48,52).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_53-56" && props.cameras.slice(52,56).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_57-60" && props.cameras.slice(56,60).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_61-64" && props.cameras.slice(60,64).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                     </View>
    
    const sixView = <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                        { props.currentCamView === "cam_1-6" && props.cameras.slice(0,6).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_7-12" && props.cameras.slice(6,12).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_13-18" && props.cameras.slice(12,18).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_19-24" && props.cameras.slice(18,24).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_25-30" && props.cameras.slice(24,30).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_31-36" && props.cameras.slice(30,36).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }

                        { props.currentCamView === "cam_37-42" && props.cameras.slice(36,42).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_43-48" && props.cameras.slice(42,48).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_49-54" && props.cameras.slice(48,54).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_55-60" && props.cameras.slice(54,60).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_61-66" && props.cameras.slice(60,66).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                    </View>
    
    const nineView = <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                        { props.currentCamView === "cam_1-9" && props.cameras.slice(0,9).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_8-16" && props.cameras.slice(7,16).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_16-24" && props.cameras.slice(15,24).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_24-32" && props.cameras.slice(23,32).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }

                        { props.currentCamView === "cam_32-40" && props.cameras.slice(31,40).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_40-48" && props.cameras.slice(39,48).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_48-56" && props.cameras.slice(47,56).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_56-64" && props.cameras.slice(55,64).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                     </View>
    
    const twelveView = <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                        { props.currentCamView === "cam_1-12" && props.cameras.slice(0,12).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_13-24" && props.cameras.slice(12,24).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        { props.currentCamView === "cam_25-36" && props.cameras.slice(24,36).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }   

                         { props.currentCamView === "cam_37-48" && props.cameras.slice(36,48).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                         { props.currentCamView === "cam_49-60" && props.cameras.slice(48,60).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                         { props.currentCamView === "cam_61-72" && props.cameras.slice(60,72).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }              
                     </View>
                    
    const sixteenView = <View style={{ flexDirection :'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                            { props.currentCamView === "cam_1-16" &&  props.cameras.slice(0,16).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  /> )}
                            { props.currentCamView === "cam_17-32" &&  props.cameras.slice(16,32).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }

                            { props.currentCamView === "cam_18-48" &&  props.cameras.slice(17,48).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                            { props.currentCamView === "cam_49-64" &&  props.cameras.slice(48,64).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } onDoublePress={() => c.fEnable === true ? props.setSingleView(c.bID) : null } ts={props.ts}  />) }
                        </View>

    const onSwipeLeft = (gestureState) => {
        getConfAndIndex('inc')
    };
    
    const onSwipeRight = (gestureState) =>{
        getConfAndIndex('dec')
    };

    const getConfAndIndex = (type) => {
        const currentCamset = props.currentCamView.split('_')[1];
        if(currentCamset){
        switch (props.conf) {
            case "conf-1": 
            let camset1 = props.singleViewEnabledArr.indexOf(parseInt(currentCamset));
            if(type === 'dec') {
                if(props.singleViewEnabledArr[camset1 - 1]){
                props.camViewChange('cam_' + props.singleViewEnabledArr[camset1 - 1])
                } else {
                props.camViewChange('cam_' + props.singleViewEnabledArr[props.singleViewEnabledArr.length - 1])
                }
            }
            if(type === 'inc') {
                if((camset1 < props.singleViewEnabledArr.length) && props.singleViewEnabledArr[camset1 + 1]){
                props.camViewChange('cam_' + props.singleViewEnabledArr[camset1 + 1])
                } else {
                props.camViewChange('cam_' + props.singleViewEnabledArr[0])
                }
            }
            break

            case "conf-4": 
            let camset4 = props.quadViewEnabledArr.indexOf(currentCamset);
            if(type === 'dec') {
                if(props.quadViewEnabledArr[camset4 - 1]){
                props.camViewChange('cam_' + props.quadViewEnabledArr[camset4 - 1])
                } else {
                props.camViewChange('cam_' + props.quadViewEnabledArr[props.quadViewEnabledArr.length - 1])
                }
            }
            if(type === 'inc') {
                if(camset4 < props.quadViewEnabledArr.length -1 && props.quadViewEnabledArr[camset4 + 1]){
                props.camViewChange('cam_' + props.quadViewEnabledArr[camset4 + 1])
                } else {
                props.camViewChange('cam_' + props.quadViewEnabledArr[0])
                }
            }
            break

            case "conf-6": 
            let camset6 = props.sixViewEnabledArr.indexOf(currentCamset);
            if(type === 'dec') {
                if(props.sixViewEnabledArr[camset6 - 1]){
                props.camViewChange('cam_' + props.sixViewEnabledArr[camset6 - 1])
                } else {
                props.camViewChange('cam_' + props.sixViewEnabledArr[props.sixViewEnabledArr.length - 1])
                }
            }
            if(type === 'inc') {
                if(camset6 < props.sixViewEnabledArr.length -1 && props.sixViewEnabledArr[camset6 + 1]){
                props.camViewChange('cam_' + props.sixViewEnabledArr[camset6 + 1])
                } else {
                props.camViewChange('cam_' + props.sixViewEnabledArr[0])
                }
            }
            break

            case "conf-9": 
            let camset9 = props.nineViewEnabledArr.indexOf(currentCamset);
            if(type === 'dec') {
                if(props.nineViewEnabledArr[camset9 - 1]){
                props.camViewChange('cam_' + props.nineViewEnabledArr[camset9 - 1])
                } else {
                props.camViewChange('cam_' + props.nineViewEnabledArr[props.nineViewEnabledArr.length - 1])
                }
            }
            if(type === 'inc') {
                if(camset9 < props.nineViewEnabledArr.length -1 && props.nineViewEnabledArr[camset9 + 1]){
                props.camViewChange('cam_' + props.nineViewEnabledArr[camset9 + 1])
                } else {
                props.camViewChange('cam_' + props.nineViewEnabledArr[0])
                }
            }
            break

            case "conf-12": 
            let camset12 = props.twelveViewEnabledArr.indexOf(currentCamset);
            if(type === 'dec') {
                if(props.twelveViewEnabledArr[camset12 - 1]){
                props.camViewChange('cam_' + props.twelveViewEnabledArr[camset12 - 1])
                } else {
                props.camViewChange('cam_' + props.twelveViewEnabledArr[props.twelveViewEnabledArr.length - 1])
                }
            }
            if(type === 'inc') {
                if(camset12 < props.twelveViewEnabledArr.length -1 && props.twelveViewEnabledArr[camset12 + 1]){
                props.camViewChange('cam_' + props.twelveViewEnabledArr[camset12 + 1])
                } else {
                props.camViewChange('cam_' + props.twelveViewEnabledArr[0])
                }
            }
            break

            case "conf-16": 
            let camset16 = props.sixteenViewEnabledArr.indexOf(currentCamset);
            if(type === 'dec') {
                if(props.sixteenViewEnabledArr[camset16 - 1]){
                props.camViewChange('cam_' + props.sixteenViewEnabledArr[camset16 - 1])
                } else {
                props.camViewChange('cam_' + props.sixteenViewEnabledArr[props.sixteenViewEnabledArr.length - 1])
                }
            }
            if(type === 'inc') {
                if(camset16 < props.sixteenViewEnabledArr.length -1 && props.sixteenViewEnabledArr[camset16 + 1]){
                props.camViewChange('cam_' + props.sixteenViewEnabledArr[camset16 + 1])
                } else {
                props.camViewChange('cam_' + props.sixteenViewEnabledArr[0])
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
       
            <GestureRecognizer
                            // onSwipe={(direction, state) => this.onSwipe(direction, state)}
                            // onSwipeUp={(state) => this.onSwipeUp(state)}
                            // onSwipeDown={(state) => this.onSwipeDown(state)}
                            onSwipeLeft={(state) => onSwipeLeft(state)}
                            onSwipeRight={(state) => onSwipeRight(state)} 
                            style={{ flex: 1, width: '100%', height: '100%', marginTop: 8 }}>
        {   props.fSingle ? 
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
       </GestureRecognizer>
    
    )
}

const mapStateToProps = state => {
    const {  
        singleViewEnabledArr,
        quadViewEnabledArr,
        sixViewEnabledArr,
        nineViewEnabledArr,
        twelveViewEnabledArr,
        sixteenViewEnabledArr,
        sName,
        cameras, 
        bNumCams, 
        cameraArr,
        quadView, 
        octoView, 
        nineView, 
        sixteenView
       } = state.server;
    const { conf } = state.config;
    const { fFullscreen, singleCamSelected, fSingle } = state.video;
    const { sSess } = state.auth;
    const { currentCamView, autoScrollEnabled } = state.camera;
    return {
        singleViewEnabledArr,
        quadViewEnabledArr,
        sixViewEnabledArr,
        nineViewEnabledArr,
        twelveViewEnabledArr,
        sixteenViewEnabledArr,
        sName,
        cameras, 
        bNumCams, 
        cameraArr,
        quadView, 
        octoView, 
        nineView, 
        sixteenView,
        conf,
        fFullscreen, 
        singleCamSelected, 
        fSingle,
        sSess,
        currentCamView, 
        autoScrollEnabled 
    }
}

export default connect(mapStateToProps, { configChange, setSingleView, camViewChange, logoutUser } )(VideoView);
