import { 
    GET_SERVER,
    SET_CAMERAS,
    SET_NVR_SELECTED,
    CLEAR_SELECTED_NVR,
    CLEAR_SERVER_HISTORY,
    REMOVE_ITEM_FROM_SERVER_HISTORY,
    VIEW_CHANGE_STARTED,
    VIEW_CHANGE_COMPLETE,
    SET_VIEWS,
    LOGOUT_USER,
    SET_CURRENT_SELECTED_VIEW,
    JUMP_START,
    SET_USER_RIGHTS
  } from '../actions/types';
  
  const INITIAL_STATE = { 
    bSerial: 0,
    bNumCams: 0,
    sIP: '',
    bPort: '',
    sLocalIP: '',
    fLocal: false,
    sName: '',
    sVersion: '',
    sVersionMajor: '',
    bTimestamp: 0,
    bTimeDiffmax: 36000,
    bAutoScanTimeout: 8,
    features: [],
    posTypes: [],
    isController: false, // features.includes('eview')

    sServer: '',
    sServerJson: '',
    sServerMPE: '',
    sServerPlayback: '',
    sServerPreview: '',

    cameras: [],
    authServers: new Map(),

    singleView: [],
    quadView: [],
    sixView: [],
    nineView: [],
    twelveView: [],
    sixteenView: [],

    usersOnline: [],
    serverHistory: [],

    views: [],
    currentSelectedView: [],
    selectedViewName: '',
    viewChangeLoading: false,
  };
  
  export default ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {

      case GET_SERVER:
        if(action.bSerial) {
          return { 
            ...state, 
            bSerial: action.bSerial,
            sName: action.sName,
            sVersion: action.sVersion,
            sVersionMajor: action.sVersion.split('.')[0],
            bNumCams: action.bNumcams,
            authServers: action.authServers,
            usersOnline: action.usersOnline,
            features: action.features,
            posTypes: action.posTypes
          }
        } else {
          return { 
            ...state
          }
        }

      case SET_CAMERAS:
          return { 
            ...state, 
            cameras: action.payload,
          }

      case SET_USER_RIGHTS:
          return {
            ...state,
            authServers: action.authServers
          }

      case SET_VIEWS: 
        return { 
            ...state,
            selectedViewName: state.sName,
            currentSelectedView: action.setArr.get(state.sName),
            viewChangeLoading: false
        }

      case SET_CURRENT_SELECTED_VIEW: 
        return {
          ...state,
          currentSelectedView: action.payload,
          selectedViewName: action.setName,
          viewChangeLoading: false
        }

      case VIEW_CHANGE_STARTED: 
        return {
          ...state,
          viewChangeLoading: true
        }

      case VIEW_CHANGE_COMPLETE: 
        return {
          ...state,
          viewChangeLoading: false
        }

      case CLEAR_SELECTED_NVR: {
        return {
          ...state,
          bSerial: 0
        }
      }

      case SET_NVR_SELECTED:
        let s = [...state.serverHistory];
        let sHistory = s.length > 0 ? state.serverHistory : [];

        // if bSerial not already in list
        let findItem = sHistory.find(s => s.bSerial === action.payload.bSerial);
        if(!findItem && action.payload.bSerial){
          sHistory.push(action.payload);
        };

        return {
          ...state,
          sServer: action.selectedServerIp,
          sServerJson: action.selectedServerIp + '/JSON/',
          sServerMPE: action.selectedServerIp + '/mpe/',
          sServerPlayback: action.selectedServerIp + '/camstream/',
          serverHistory: sHistory
        }

      case CLEAR_SERVER_HISTORY:
        return {
          ...state,
          serverHistory: [],
          serialIpList: []
        }

      case REMOVE_ITEM_FROM_SERVER_HISTORY:
        let sh = state.serverHistory;
        let searchIndex = sh.findIndex( i => i.bSerial === action.payload);

        if(searchIndex > -1) {
          sh = [ ...sh.slice(0,searchIndex),
                 ...sh.slice(searchIndex +1) ]
        }
        return {
          ...state,
          serverHistory: sh
        }

      default:
        return state;
    };
  };