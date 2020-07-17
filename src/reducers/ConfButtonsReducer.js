import { 
    CONFIG_CHANGED,
    LOGOUT_USER,
    EXPIRE_SESSION
  } from '../actions/types';
  
  const INITIAL_STATE = { 
    conf: 'conf-1'
  };
  
  export default ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case CONFIG_CHANGED:
          if(action.payload !== 'conf-fs') {
            return { 
              ...state, 
              conf: action.payload 
            }
          }
          return { 
            ...state
          }
        case LOGOUT_USER:
          return { 
            ...state,
            conf: 'conf-1'
          }
        case EXPIRE_SESSION:
          return { 
            ...state,
            conf: 'conf-1'
          }
        default:
            return state;
    };
  };