import { 
    SCREEN_CHANGE,
    JUMP_SYSTEM,
    LOGOUT_USER,
    EXPIRE_SESSION
  } from '../actions/types';
  
  const INITIAL_STATE = { 
    screen: 'login',
    previousSystem: {},
    currentSystem: {}
  };
  
  export default ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
      case SCREEN_CHANGE:
        return { 
          ...state, 
          screen: action.payload 
        }
      case JUMP_SYSTEM:
        return { 
          ...state,
          currentSystem: action.payload
        }
      case LOGOUT_USER:
        return { 
          ...state,
          screen: 'login',
          previousSystem: {},
          currentSystem: {}
        }
      case EXPIRE_SESSION:
        return { 
          ...state,
          screen: 'login',
          previousSystem: {},
          currentSystem: {}
        }
      default:
        return state;
    };
  };