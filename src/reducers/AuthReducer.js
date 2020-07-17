import { 
    LOGIN_USER_START,
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_RESULT,
    CLEAR_SESSION_MODAL,
    LOGOUT_USER,
    AUTO_LOGIN_CHANGED,
    SET_SESSION_FROM_STORAGE,
    EXPIRE_SESSION,
    LOGIN_SUCCESS,
    NVR_SEARCH_TEXT_CHANGED
  } from '../actions/types';
  
  const INITIAL_STATE = { 
    username: '', 
    password: '',
    loading: false,
    autoLoginStatus: false,
    loginResult: '',
    sSess: '',
    isLoggedIn: false,
    nvrSearchText: ''
  };
  
  export default ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
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
      case  NVR_SEARCH_TEXT_CHANGED:
        console.log('from reducer', action.payload)
        return { 
          ...state, 
          nvrSearchText: action.payload
        }
      case SET_SESSION_FROM_STORAGE:
        return { 
          ...state, 
          sSess: action.payload
        }
      case LOGIN_USER_START:
        return { 
          ...state, 
          loading: true
        }
      case EXPIRE_SESSION:
        let uName = '';
        let uPass = '';
        if(action.payload) {
          uName = localStorage.getItem('username');
          uPass = localStorage.getItem('password');
        }
        return { 
          ...state, 
          username: uName, 
          password: uPass,
          loading: false,
          loginResult: 'expired',
          sSess: '',
          isLoggedIn: false
        }
      case LOGIN_SUCCESS:
        return { 
          ...state, 
          loginResult: '',
          loading: false,
          sSess: action.payload,
          isLoggedIn: true
        }
      case LOGIN_RESULT:
        return { 
          ...state, 
          loginResult: action.payload,
          loading: false
        }
      case LOGOUT_USER:
        return { 
          ...state, 
          username: '', 
          password: '',
          loading: false,
          loginResult: '',
          sSess: '',
          isLoggedIn: false
        }
      case CLEAR_SESSION_MODAL:
        return { 
          ...state, 
          loginResult: ''
        }
      default:
        return state;
    };
  };