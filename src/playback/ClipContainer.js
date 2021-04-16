import React from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { setCurrentClipPlaying, getVideo } from '../actions';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const placeholderArr = [1,2,3,4,5];

const PreviewBlock = props => {
  const year = props.video.sTimestamp.slice(0,4)
  const month = props.video.sTimestamp.slice(4,6)
  const day = props.video.sTimestamp.slice(6,8)
  const hour = props.video.sTimestamp.slice(8,10);
  const min = props.video.sTimestamp.slice(10,12);
  const sec = props.video.sTimestamp.slice(12,14);
  const ts= `${month}/${day}/${year}  ${hour}:${min}:${sec}`;
  const timestamp = `${hour}:${min}:${sec}`;
  return (
    <TouchableOpacity key={props.video.bID} 
         style={{  height: (Dimensions.get('window').width / 6) / 1.3, width: Dimensions.get('window').width / 5.7, borderRadius: 5, borderWidth: 2, borderColor: props.component.currentClipPlayingId === props.video.bID ? 'goldenrod' : 'lightgrey' }}
         className="hoverable"
         onPress={ () => props.component.setCurrentClipPlaying(props.video.bID)}>
      {props.component.features.includes('eview') ?
        <Image source={{ uri: props.component.currentClipPlayingIp + '/camstream/?cmd=fetch&session=1094&file=' + props.video.sPreview + '.112x84' }} style={{ height:'100%', width:'100%',  borderTopRightRadius: 5, borderTopLeftRadius: 5 }} /> :
        <Image source={{ uri: props.component.sServer + '/camstream/?cmd=fetch&session=' + props.component.sSess + '&file=' + props.video.sPreview + '.112x84' }} style={{ height:'100%', width:'100%',  borderTopRightRadius: 5, borderTopLeftRadius: 5 }} /> 
      }
      <Text style={{ textAlign: 'center', color: 'white', fontSize: 8, margin: 0, marginTop: 5, fontFamily: 'monospace' }}>{timestamp}</Text> 
    </TouchableOpacity>
  )
}

const ClipContainer = (props) => {

  const onSwipeLeft = (gestureState) => {
    if(props.nextClipsetTimestamp !== '' && props.videoClipsRequested.length > 4){
      props.getVideo(props.sServer + '/JSON/', props.sSess, props.selectedCam, props.nextClipsetTimestamp, 0, 5);
      return;
    }
    alert('No additional clips to display.');
  };
  
  const onSwipeRight = (gestureState) =>{
    if(props.prevClipsetTimestamp !== ''){
      props.getVideo(props.sServer + '/JSON/', props.sSess, props.selectedCam, props.prevClipsetTimestamp, 0, 5);
      return;
    }
    alert('No previous clips to display.');
  };

  return (
    <GestureRecognizer
      onSwipeLeft={(state) => onSwipeLeft(state)}
      onSwipeRight={(state) => onSwipeRight(state)} 
      style={{ flexDirection: 'row', 
               alignItems: 'center', 
               justifyContent: 'space-around', 
               width: '100%', 
               height: (Dimensions.get('window').width / 6), 
               marginBottom: 10 }}>

        { props.videoClipsRequested && props.videoClipsRequested.length > 0 ?

          props.videoClipsRequested.map( v => <PreviewBlock key={v.bID} video={v} component={props} />) :

          placeholderArr.map( c => 
            <View key={Math.random().toString()}>
              <TouchableOpacity onPress={() => alert('pressed!')}>
                <Image source={require('../images/dtplaceholder.gif')} alt='' style={{ borderRadius: 5, height: 60, width: 70 }} />
              </TouchableOpacity>
            </View>
          ) 
        } 

    </GestureRecognizer>
  )
}

const mapStateToProps = state => {
  const { videoClipsRequested, currentClipPlayingId, currentClipPlayingIp, playbackCamera, nextClipsetTimestamp, prevClipsetTimestamp, selectedCam } = state.playback;
  const { sSess } = state.auth;
  const { sServer, sServerJson, features } = state.server;
  return {
    videoClipsRequested,
    currentClipPlayingId,
    currentClipPlayingIp, 
    playbackCamera,
    nextClipsetTimestamp,
    prevClipsetTimestamp,
    sSess,
    sServer, 
    sServerJson,
    features,
    selectedCam
  }
}

export default connect(mapStateToProps, { setCurrentClipPlaying, getVideo })(ClipContainer);