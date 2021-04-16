import { 
    SET_USER_DATA,
    SET_USER_RIGHTS,
    SET_CAMERA_RIGHTS,
    SET_VIEWS,
  } from '../actions/types';

  
  const INITIAL_STATE = { 
    bID: 0,
    sName: '',
    sDescription: '',
    sPassword: '',
    bType: 0,
    bInactivityTimeout: 0,

    cameraRights: [],
    userRights: [],

    cameraSets: [],
    cameraSetNames: [],
    cameraSetSerials: []
  };
  
  export default ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case SET_USER_DATA:
            return { 
                ...state, 
                bID: action.payload.bID,
                sName: action.payload.sName,
                spassword: action.sPass,
                sDescription: action.payload.sDescription,
                sPassword: action.payload.sPass,
                bType: action.payload.bType,
                bInactivityTimeout: action.payload.bInactivityTimeout
            }
        case SET_USER_RIGHTS:
            return { 
                ...state, 
                userRights: action.payload
            }
        case SET_CAMERA_RIGHTS:
            return { 
                ...state, 
                cameraRights: action.payload
            }
        case SET_VIEWS: 
            return { 
                ...state,
                cameraSets: action.setArr,
                cameraSetNames: action.nameArr.map(s => ({label: s, value: s})),
                cameraSetSerials: action.serialArr
            }
        default:
            return state;
    };
  };