import { 
    CAM_VIEW_CHANGED,
    SET_SINGLE_VIEW,
  } from './types';
  
export const camViewChange = camset => {
    return {
      type: CAM_VIEW_CHANGED,
      payload: camset
    };
  };

  export const setSingleView = (cam) => {
    return {
      type: SET_SINGLE_VIEW,
      payload: cam
    };
  }
