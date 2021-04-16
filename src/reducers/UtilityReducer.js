import { 
    UPDATE_CURRENT_TIME,
    SET_NVR_TIMESTAMP
  } from '../actions/types';

  import moment from 'moment';
  
  const INITIAL_STATE = { 
    currentTimeLong: moment(new Date()).format('hh:mm:ss a'),
    currentTimeShort: moment(new Date()).format('hh:mm a'),
    nvrTimestamp: '',
    nvrTimestampShort: ''
  };
  
  export default ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
      case SET_NVR_TIMESTAMP:
        return { 
          ...state, 
          nvrTimestamp: action.nvrTimestamp,
          nvrTimestampShort: action.nvrTimestampShort
        }
      case UPDATE_CURRENT_TIME:
        return { 
          ...state, 
          currentTimeLong: moment(new Date()).format('hh:mm:ss a'),
          currentTimeShort: moment(new Date()).format('hh:mm a')
        }
      default:
        return state;
    };
  };