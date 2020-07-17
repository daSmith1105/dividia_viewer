import React from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { setSingleView } from '../actions';
import CameraStreamContainer from './CameraStreamContainer';

const VideoView = props => {

    console.log(props.currentCamView)
    const forcedSingleView = <View>
                                <CameraStreamContainer enabled={ props.cameras.filter( c => c.bID === props.singleCamSelected)[0] } camNum={ props.singleCamSelected } />
                             </View>

    const singleView =  <View>
                            { props.cameras.find( c => c.bID.toString() === props.currentCamView.split('_')[1]) && props.cameras.find( c => c.bID.toString() === props.currentCamView.split('_')[1]).fEnable === true ? 
                                <CameraStreamContainer enabled={ props.cameras.find( c => c.bID.toString() === props.currentCamView.split('_')[1]) } camNum={ props.currentCamView.split('_')[1] } /> 
                                 :
                                <CameraStreamContainer enabled={ 'false' } camNum={ props.currentCamView.split('_')[1] } />
                            } 
                        </View>
    
    const quadView = <View style={{ width: '100%', flexWrap: 'wrap' }}>
                       
                        {/* { props.currentCamView === "cam_1-4" ? */}
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ height: 200, width: 200, backgroundColor: 'yellow', margin: 5 }}></View>
                                <View style={{ height: 200, width: 200, backgroundColor: 'yellow', margin: 5 }}></View>
                                <View style={{ height: 200, width: 200, backgroundColor: 'yellow', margin: 5 }}></View>
                                <View style={{ height: 200, width: 200, backgroundColor: 'yellow', margin: 5 }}></View>
                                {/* {props.cameras.slice(0,4).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID }/>) } */}
                            </View> 
                            {/* :
                            null } */}
                  
                        {/* { props.currentCamView === "cam_5-8" && props.cameras.slice(4,8).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                      
                        { props.currentCamView === "cam_9-12" && props.cameras.slice(8,12).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }  

            
                        { props.currentCamView === "cam_13-16" && props.cameras.slice(12,16).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
       
                 
                        { props.currentCamView === "cam_17-20" && props.cameras.slice(16,20).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                   
                        { props.currentCamView === "cam_21-24" && props.cameras.slice(20,24).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_25-28" && props.cameras.slice(24,28).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_29-32" && props.cameras.slice(28,32).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }

                        { props.currentCamView === "cam_33-36" && props.cameras.slice(32,36).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_37-40" && props.cameras.slice(36,40).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_41-44" && props.cameras.slice(40,44).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_45-48" && props.cameras.slice(44,48).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_49-52" && props.cameras.slice(48,52).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_53-56" && props.cameras.slice(52,56).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_57-60" && props.cameras.slice(56,60).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_61-64" && props.cameras.slice(60,64).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) } */}
                     </View>
    
    const sixView = <View>
                        { props.currentCamView === "cam_1-6" && props.cameras.slice(0,6).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_7-12" && props.cameras.slice(6,12).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_13-18" && props.cameras.slice(12,18).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID }/>) }
                        { props.currentCamView === "cam_19-24" && props.cameras.slice(18,24).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_25-30" && props.cameras.slice(24,30).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_31-36" && props.cameras.slice(30,36).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }

                        { props.currentCamView === "cam_37-42" && props.cameras.slice(36,42).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_43-48" && props.cameras.slice(42,48).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_49-54" && props.cameras.slice(48,54).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_55-60" && props.cameras.slice(54,60).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_61-66" && props.cameras.slice(60,66).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                    </View>
    
    const nineView = <View>
                        { props.currentCamView === "cam_1-9" && props.cameras.slice(0,9).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_8-16" && props.cameras.slice(7,16).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_16-24" && props.cameras.slice(15,24).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_24-32" && props.cameras.slice(23,32).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }

                        { props.currentCamView === "cam_32-40" && props.cameras.slice(31,40).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_40-48" && props.cameras.slice(39,48).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_48-56" && props.cameras.slice(47,56).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_56-64" && props.cameras.slice(55,64).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                     </View>
    
    const twelveView = <View>
                        { props.currentCamView === "cam_1-12" && props.cameras.slice(0,12).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_13-24" && props.cameras.slice(12,24).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        { props.currentCamView === "cam_25-36" && props.cameras.slice(24,36).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }   

                         { props.currentCamView === "cam_37-48" && props.cameras.slice(36,48).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                         { props.currentCamView === "cam_49-60" && props.cameras.slice(48,60).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                         { props.currentCamView === "cam_61-72" && props.cameras.slice(60,72).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }              
                     </View>
                    
    const sixteenView = <View>
                            { props.currentCamView === "cam_1-16" &&  props.cameras.slice(0,16).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } /> )}
                            { props.currentCamView === "cam_17-32" &&  props.cameras.slice(16,32).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }

                            { props.currentCamView === "cam_18-48" &&  props.cameras.slice(17,48).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                            { props.currentCamView === "cam_49-64" &&  props.cameras.slice(48,64).map( c => <CameraStreamContainer key={c.bID.toString()} enabled={c} camNum={c.bID } />) }
                        </View>

    return (
       
        <View style={{ flex: 1, width: '100%', height: '100%' }}>
        {   props.fSingle ? 
                forcedSingleView :
            props.conf === "conf-1" ?
                singleView :
            props.conf === "conf-4" ?
            <View style={{ height: 200, width: 200, backgroundColor: 'green'}}></View> :
                // quadView :
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
        </View>
    
    )
}

const mapStateToProps = state => {
    const { conf } = state.config;
    const { platform } = state.utility;
    const { currentCamView, autoScrollEnabled } = state.camera;
    const { sName, cameras, bNumCams, cameraArr, singleViewEnabledArr, quadView, octoView, nineView, sixteenView } = state.server;
    const { fFullscreen, fSingle, singleCamSelected } = state.video;
    return {
        conf,
        platform,
        currentCamView,
        autoScrollEnabled,
        sName,
        fFullscreen,
        fSingle,
        singleCamSelected,
        cameras,
        bNumCams,
        cameraArr, 
        singleViewEnabledArr, 
        quadView, 
        octoView, 
        nineView, 
        sixteenView,
        sUserName: state.user.sName
    }
}

export default connect(mapStateToProps, { setSingleView } )(VideoView);
