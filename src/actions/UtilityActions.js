import { 
    SET_PLATFORM_TYPE,
    UPDATE_CURRENT_TIME
  } from './types';
  
  export const getPlatform = () => {
    return (dispatch) => {
        let platform = navigator.platform;
        let type = '';
        if(platform.indexOf('Win') > -1) {
            type = 'Win'
        } else if(platform.indexOf('Mac') > -1) {
            type = 'Mac'
        } else if(platform.indexOf('iPad') > -1) {
            type = 'Ios'
        } else if(platform.indexOf('iPhone') > -1) {
            type = 'Ios'
        } else if(platform.indexOf('Android') > -1 || platform.indexOf('Linux') > -1 ) {
            type = 'Android'
        };

        dispatch({ type: SET_PLATFORM_TYPE, payload: type });
        return(type)
    };
};  

export const getBrowser = () => {
    return (dispatch) => {
        let platform = navigator.userAgent;
        let sBrowser = 'Unknown';
        if(platform.indexOf("Firefox") > -1) {
            sBrowser = "firefox";
        }
        if(platform.indexOf("Safari") > -1) {
            sBrowser = "safari";
        }
        if(platform.indexOf("Opera") > -1 || platform.indexOf("OPR") > -1 ) {
            sBrowser = "opera";
        } 
        if(platform.indexOf("Chrome") > -1) {
            sBrowser = "chrome";
        }
        if(platform.indexOf("Trident") > -1) {
            sBrowser = "explorer";
        }
        if(platform.indexOf("Edge") > -1) {
            sBrowser = "edge";
        }

        dispatch({ type: SET_BROWSER_TYPE, payload: sBrowser });
        return (sBrowser);
    };
};  

export const updateCurrentTime = () => {
    return {
        type: UPDATE_CURRENT_TIME
    }
}