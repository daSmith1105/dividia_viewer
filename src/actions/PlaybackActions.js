import { 
    RESET_PLAYBACK,
    SET_CAMERA,
    SET_VIDEO,
    SET_DATE,
    SET_TIME,
    SET_FILTER,
    SET_SPEED,
    PLAY,
    PAUSE,
    STOP,
    FAST_FORWARD,
    STEP_FORWARD,
    FAST_REVERSE,
    STEP_REVERSE,
    UPDATE_PROGRESS_BAR,
    TOGGLE_FULLSCREEN_PLAYBACK,
    INCREMENT_CLIPS,
    DECREMENT_CLIPS,
    SET_CURRENT_CLIP_PLAYING
  } from './types';
  
  import axios from 'axios';
  
  export const resetPlayback = () => {
    return {
      type: RESET_PLAYBACK
    }
  }
  
  export const setCamera = (cam) => {
    return {
      type: SET_CAMERA,
      payload: cam
    }
  }
  
  export const setDate = (date) => {
    console.log(date)
    return {
      type: SET_DATE,
      payload: date
    }
  }
  
  export const setTime = (time) => {
    return {
      type: SET_TIME,
      payload: time
    }
  }
  
  export const setFilter = (filter) => {
    return {
      type: SET_FILTER,
      filter
    }
  }
  
  export const play = () => {
    return {
      type: PLAY
    }
  }
  
  export const pause = () => {
    return {
      type: PAUSE
    }
  }
  
  export const stop = () => {
    return {
      type: STOP
    }
  }
  
  export const fastForward = () => {
    return {
      type: FAST_FORWARD
    }
  }
  
  export const stepForward = () => {
    return {
      type: STEP_FORWARD
    }
  }
  
  export const fastReverse = () => {
    return {
      type: FAST_REVERSE
    }
  }
  
  export const stepReverse = () => {
    return {
      type: STEP_REVERSE
    }
  }
  
  export const setPlaybackRate = (speed) => {
    console.log(speed)
    return {
      type: SET_SPEED,
      payload: speed
    }
  }
  
  export const updateProgressBar = (progress) => {
    return {
      type: UPDATE_PROGRESS_BAR,
      payload: progress
    }
  }
  
  export const toggleFullscreenPlayback = () => {
    return {
      type: TOGGLE_FULLSCREEN_PLAYBACK
    }
  }
  
  export const incrementPreviewClips = () => {
    return {
      type: INCREMENT_CLIPS
    }
  }
  
  export const decrementPreviewClips = () => {
    return {
      type: DECREMENT_CLIPS
    }
  }
  
  export const setCurrentClipPlaying = (id) => {
    return {
      type: SET_CURRENT_CLIP_PLAYING,
      payload: id
    }
  }
  
  export const getVideo = (sServer, sSess, bID, sYMDHMS, bFlags, bNumEvents) => {
    let date = sYMDHMS;
    let now = moment(new Date());
    // check if sYMDHMS is greater than 10 minutes before new Date() - if not set sYMDHMS to 10 minutes prior to new Date()
    let providedDate = moment(sYMDHMS, 'YYYY-MM-DD HH:mm:ss');
    let diff = diff_minutes(now, providedDate);
  
    // if the difference between current datetime and requested datetime is less than 10 minutes - set the requested time to 10 minutes prior
    if(diff < 10){
      let dt = new Date();
      dt.setMinutes( dt.getMinutes() - 10 );
      date = moment(dt).format('YYYYMMDDHHmmss');
    };
  
    return( dispatch ) => {
      const reqBody = {   
          "jsonrpc": 2.0,
          "method": "event.getEvents",
          "id": 200,
          "params": [ sSess, bID, date, bFlags, bNumEvents ]
      };
      axios({
          method: 'post',
          url: sServer,
          headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          data: reqBody,
          timeout: 6000
      })
      .then( (response) => {
          let data = response.data.result[1];
  
          dispatch({ 
            type: SET_VIDEO, 
            payload: data[2],
            prevClipsetTimestamp: data[0],
            nextClipsetTimestamp: data[1]
          }); 
      })
      .catch(error => {
          console.error('Error:', error);
      }); 
    }
  }
  
  // export const getPOS = (dispatch, sServer, sSess, bID, sYMDHMS, bFlags, bNumEvents) => {
  //   const reqBody = {   
  //       "jsonrpc": 2.0,
  //       "method": "event.getEvents",
  //       "id": 200,
  //       "params": [ sSess, bID, sYMDHMS, bFlags, bNumEvents ]
  //   };
  //   axios({
  //       method: 'post',
  //       url: sServer,
  //       headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //       },
  //       data: reqBody,
  //       timeout: 6000
  //   })
  //   .then( (response) => {
  //       let data = response.data.result[1];
  //       dispatch({ type: SET_VIDEO, payload: data })
       
  //   })
  //   .catch(error => {
  //       console.error('Error:', error);
  //   }); 
  // }