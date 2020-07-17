import { 
    CONFIG_CHANGED
  } from './types';
  
  export const configChange = conf => {
      return {
        type: CONFIG_CHANGED,
        payload: conf
      };
    };