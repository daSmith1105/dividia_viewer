import { 
    SET_PLATFORM_TYPE,
    SET_BROWSER_TYPE,
    UPDATE_CURRENT_TIME,
    LOGOUT_USER,
    EXPIRE_SESSION
  } from '../actions/types';

  import moment from 'moment';
  
  const INITIAL_STATE = { 
    platform: '',
    sBrowser: '',
    currentTimeLong: moment(new Date()).format('hh:mm:ss a'),
    currentTimeShort: moment(new Date()).format('hh:mm a'),
  };
  
  export default ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
      case LOGOUT_USER:
        return { 
          ...state, 
          platform: ''
        }
      case EXPIRE_SESSION:
        return { 
          ...state, 
          platform: ''
        }
      case SET_PLATFORM_TYPE:
        return { 
          ...state, 
          platform: action.payload 
        }
      case SET_BROWSER_TYPE:
        return { 
          ...state, 
          sBrowser: action.payload 
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