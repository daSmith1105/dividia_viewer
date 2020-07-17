import { 
    CAM_VIEW_CHANGED,
    SET_SINGLE_VIEW,
    SET_CAM_BROWSER_CAM
  } from './types';
  
export const camViewChange = camset => {
    return {
      type: CAM_VIEW_CHANGED,
      payload: camset
    };
  };

  export const setSingleView = (cam) => {
    console.log(cam)
    return {
      type: SET_SINGLE_VIEW,
      payload: cam
    };
  }

  export const setCameraBrowserCam = cam => {
    return {
      type: SET_CAM_BROWSER_CAM,
      payload: cam
    };
  }
