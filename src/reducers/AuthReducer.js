import { 
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    AUTO_LOGIN_CHANGED,
    LOGIN_USER_START,
    LOGIN_RESULT,
    CLEAR_LOGIN_RESULT,
    LOGIN_SUCCESS,
    LOGOUT_USER,

    EXPIRE_SESSION,
    CLEAR_SESSION_MODAL,

    NVR_SEARCH_TEXT_CHANGED,
    SET_NVR_SEARCH_RESULTS,
    SET_NVR_SELECTED,
    CLEAR_SELECTED_NVR,

    JUMP_START,
    JUMP_STATUS,
    SET_VIEWS,
    GET_SERVER,
    SET_USER_DATA,
    SERVER_CONNECTION_ERROR
  } from '../actions/types';
  
  const INITIAL_STATE = { 
    username: '', 
    password: '',
    loginLoading: false,
    autoLoginStatus: false,
    loginResult: '',
    sSess: '',
    isLoggedIn: false,
    nvrSearchText: '',
    nvrSearchResults: [],
    nvrSelectedIp: '',
    nvrSelected: {},
    nvrSearchReturnedEmpty: false,
    jumpLoading: false,
    jumpStatus: '',
    jumpSystemName: '',
    loggingIntoNewServer: false,
    gettingNewSession: false,
    preppingData: false,
    serverConnectionError: false
  };
  
  export default ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
      case SET_USER_DATA:
        return {
          ...state,
          preppingData: true
        }
      case SET_VIEWS:
        return {
          ...state,
          loginLoading: false
        }
      case USERNAME_CHANGED:
        return { 
          ...state, 
          username: action.payload 
        }
      case PASSWORD_CHANGED:
        return { 
          ...state, 
          password: action.payload 
        }
      case AUTO_LOGIN_CHANGED:
        return { 
          ...state, 
         autoLoginStatus: action.payload
        }
      case JUMP_START:
        return {
          ...state,
          jumpLoading: true,
          jumpSystemName: action.payload,
          loggingIntoNewServer: false,
          gettingNewSession: false,
          preppingData: false
        }
      case GET_SERVER:
        return {
          ...state,
          gettingNewSession: true,
          serverConnectionError: false
        }
      case JUMP_STATUS:
        return {
          ...state,
          jumpLoading: false,
          jumpStatus: action.payload
        }
      case NVR_SEARCH_TEXT_CHANGED:
        let resultArr = state.nvrSearchResults;
        if(action.payload.trim().length < 3){
          resultArr = []
        }
        return { 
          ...state, 
          nvrSearchText: action.payload,
          nvrSearchResults: resultArr
        }
      case SET_NVR_SEARCH_RESULTS:
        return { 
          ...state, 
          nvrSearchResults: action.payload,
          nvrSearchReturnedEmpty: action.payload.length < 1 ? true : false,
          loginLoading: false,
          serverConnectionError: false
        }
      case SET_NVR_SELECTED: {
        return { 
          ...state,
          nvrSelected: action.payload,
          nvrSelectedIp: action.selectedServerIp,
          nvrSearchText: action.payload.sName,
          serverConnectionError: false
        }
      }
      case SERVER_CONNECTION_ERROR: {
        return { 
          ...state,
          serverConnectionError: true,
          nvrSearchText: action.payload,
          nvrSelected: {sName: action.payload},
        }
      }
      case CLEAR_LOGIN_RESULT: {
        return {
          ...state,
          loginResult: '',
          loginLoading: false
        }
      }
      case CLEAR_SELECTED_NVR:
        return {
          ...state,
          username: '', 
          password: '',
          loginloading: false,
          autoLoginStatus: false,
          loginResult: '',
          sSess: '',
          isLoggedIn: false,
          nvrSelected: {},
          nvrSelectedIp: '',
          nvrSearchReturnedEmpty: false,
          serverConnectionError: false
        }
      case LOGIN_USER_START:
        return { 
          ...state, 
          loginLoading: true
        }
      case EXPIRE_SESSION:
        return { 
          ...state, 
          loginLoading: false,
          loginResult: 'expired',
          sSess: '',
          isLoggedIn: false
        }
      case LOGIN_SUCCESS:
        return { 
          ...state, 
          loginResult: '',
          sSess: action.payload,
          isLoggedIn: true,
          loggingIntoNewServer: true,
        }
      case LOGIN_RESULT:
        return { 
          ...state, 
          loginResult: action.payload,
          loginLoading: false
        }
      case LOGOUT_USER:
        return { 
          ...state, 
          loginResult: '',
          loginLoading: false,
          sSess: '',
          isLoggedIn: false,
          jumpLoading: false,
          jumpStatus: '',
          serverConnectionError: false
        }
      case CLEAR_SESSION_MODAL:
        return { 
          ...state, 
          loginLoading: false,
          autoLoginStatus: false,
          loginResult: '',
          sSess: '',
          isLoggedIn: false
        }
      default:
        return state;
    };
  };