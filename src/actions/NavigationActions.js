import { 
    SCREEN_CHANGE,
    JUMP_SYSTEM
  } from './types';
  
export const screenChange = screen => {
  return {
    type: SCREEN_CHANGE,
    payload: screen
  };
};