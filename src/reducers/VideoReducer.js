import { 
    CONFIG_CHANGED,
    SET_SINGLE_VIEW,
    LOGOUT_USER,
    EXPIRE_SESSION
  } from '../actions/types';
  
  const INITIAL_STATE = { 
    singleCamView: false,
    singleCamSelected: '',
    bConf: 0,
    fSingle: false,
    fFullscreen: false,
  };
  
  export default ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
      case LOGOUT_USER:
          return { 
            ...state, 
            singleCamView: false,
            singleCamSelected: '',
            bConf: 0,
            fSingle: false,
            fFullscreen: false
          }
      case EXPIRE_SESSION:
        return { 
          ...state, 
          singleCamView: false,
          singleCamSelected: '',
          bConf: 0,
          fSingle: false,
          fFullscreen: false
        }
      case SET_SINGLE_VIEW:
        let cam = action.payload;
          return { 
            ...state, 
            fSingle:  cam !== '' ? cam : false,
            singleCamSelected: cam 
          }
        case CONFIG_CHANGED:
          if(action.payload === 'conf-fs'){
            return { 
              ...state, 
              fFullscreen: state.fFullscreen ? false : true
            }
          }
          return { 
            ...state
          }
        default:
            return state;
    };
  };