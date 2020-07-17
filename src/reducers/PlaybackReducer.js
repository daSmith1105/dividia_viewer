import { 
    RESET_PLAYBACK,
    SET_CAMERA,
    SET_DATE,
    SET_TIME,
    SET_FILTER,
    SET_VIDEO,
    SET_CURRENT_CLIP_PLAYING,
    SET_SPEED,
    LOGOUT_USER,
    EXPIRE_SESSION
  } from '../actions/types';
  
  import moment from 'moment';
  
  const INITIAL_STATE = { 
    playbackCamera: 1,
    playbackDate: new Date(),
    playbackTime: new Date(),
    archiveFilterState: false,
    exportFilterState: false,
    videoClipsRequested: [],
    prevClipsetTimestamp: '',
    nextClipsetTimestamp: '',
    curretClipPlayingId: 0,
    currentClipPlayingUrl: '',
    currentClipPlayingTimestamp: '',
    currentClipPlayingCameraId: 1,
    currentClipPlayingDuration: 0,
    playbackRate: 1.0
  };
  
  export default ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
      case LOGOUT_USER:
        return { 
          ...state, 
          playbackCamera: 1,
          playbackDate: new Date(),
          playbackTime: new Date(),
          archiveFilterState: false,
          exportFilterState: false,
          videoClipsRequested: [],
          prevClipsetTimestamp: '',
          nextClipsetTimestamp: '',
          curretClipPlayingId: 0,
          currentClipPlayingUrl: '',
          currentClipPlayingTimestamp: '',
          currentClipPlayingCameraId: 1,
          currentClipPlayingDuration: 0,
          playbackRate: 1.0
        }
      case EXPIRE_SESSION:
        return { 
          ...state, 
          playbackCamera: 1,
          playbackDate: new Date(),
          playbackTime: new Date(),
          archiveFilterState: false,
          exportFilterState: false,
          videoClipsRequested: [],
          prevClipsetTimestamp: '',
          nextClipsetTimestamp: '',
          curretClipPlayingId: 0,
          currentClipPlayingUrl: '',
          currentClipPlayingTimestamp: '',
          currentClipPlayingCameraId: 1,
          currentClipPlayingDuration: 0,
          playbackRate: 1.0
        }
      case SET_CAMERA:
        return { 
          ...state, 
          playbackCamera: action.payload,
          curretClipPlayingId: 0,
          currentClipPlayingUrl: '',
          currentClipPlayingTimestamp: '',
          currentClipPlayingCameraId: action.payload,
          videoClipsRequested: [],
          prevClipsetTimestamp: '',
          nextClipsetTimestamp: ''
        }
      case SET_DATE:
        console.log(action.payload)
        return { 
          ...state, 
          playbackDate: action.payload
        }
      case SET_SPEED:
        return { 
          ...state, 
          playbackRate: action.payload 
        }
      case SET_TIME:
        console.log(action.payload)
        return { 
          ...state, 
          playbackTime: action.payload 
        }
      case SET_CURRENT_CLIP_PLAYING:
        let newClip = state.videoClipsRequested.find( v => v.bID === action.payload);
        let newUrl = newClip.sMovie;
        let newDuration = newClip.bLength + 1;
        let newCameraId = newClip.bCamera;
        let tempTime = newClip.sTimestamp;
        let year = tempTime.slice(0,4);
        let month = tempTime.slice(4,6);
        let day = tempTime.slice(6,8);
        let hour = tempTime.slice(8,10);
        let min = tempTime.slice(10,12);
        let sec = tempTime.slice(12,14);
        let newTimestamp = `${month}/${day}/${year}  ${hour}:${min}:${sec}`
        return { 
          ...state, 
          currentClipPlayingId: action.payload,
          currentClipPlayingUrl: newUrl,
          currentClipPlayingTimestamp: newTimestamp,
          currentClipPlayingCameraId: newCameraId,
          currentClipPlayingDuration: newDuration
        }
      case SET_FILTER:
        let archiveFilterValue = state.archiveFilterState;
        let exportFilterValue = state.exportFilterState;
  
        if(action.filter === 'none') {
          archiveFilterValue = false;
          exportFilterValue = false;
        }
  
        if(action.filter === 'archive') {
          archiveFilterValue = !state.archiveFilterState
          if(archiveFilterValue === true) {
            exportFilterValue = false
          }
        }
  
        if(action.filter === 'export') {
          exportFilterValue = !state.exportFilterState;
          if(exportFilterValue === true) {
            archiveFilterValue = false
          }
        }
        return { 
          ...state, 
          archiveFilterState: archiveFilterValue,
          exportFilterState: exportFilterValue
        }
  
      case SET_VIDEO:
        let newClip1;
        let newUrl1;
        let newTimestamp1;
        let newCameraId1;
        let newDuration1;
        if(action.payload.length > 0) {
          newClip1 = action.payload[0].bID;
          newUrl1 = action.payload[0].sMovie;
          newCameraId1 = action.payload[0].bCamera;
          newDuration1 = action.payload[0].bLength + 1;
          let tempTime1 = action.payload[0].sTimestamp;
          let year1 = tempTime1.slice(0,4);
          let month1 = tempTime1.slice(4,6);
          let day1 = tempTime1.slice(6,8);
          let hour1 = tempTime1.slice(8,10);
          let min1 = tempTime1.slice(10,12);
          let sec1 = tempTime1.slice(12,14);
          newTimestamp1 = `${month1}/${day1}/${year1}  ${hour1}:${min1}:${sec1}`
        }
  
        return { 
          ...state, 
          videoClipsRequested: action.payload,
          prevClipsetTimestamp: action.prevClipsetTimestamp,
          nextClipsetTimestamp: action.nextClipsetTimestamp,
          currentClipPlayingId: newClip1 || state.currentClipPlayingId,
          currentClipPlayingUrl: newUrl1 || state.currentClipPlayingUrl,
          currentClipPlayingTimestamp: newTimestamp1 || state.currentClipPlayingTimestamp,
          currentClipPlayingCameraId: newCameraId1 || state.currentClipPlayingCameraId,
          currentClipPlayingDuration: newDuration1 || state.currentClipPlayingDuration
        }
      case RESET_PLAYBACK:
        return { 
          ...state, 
          playbackCamera: 1,
          playbackDate: moment(new Date()).format('YYYY-MM-DD'),
          playbackTime: moment(new Date()).format('HH:mm'),
          archiveFilterState: false,
          exportFilterState: false,
          videoClipsRequested: [],
          prevClipsetTimestamp: '',
          nextClipsetTimestamp: '',
          curretClipPlayingId: 0,
          currentClipPlayingUrl: '',
          currentClipPlayingTimestamp: ''
        }
      default:
        return state;
    };
    
  };