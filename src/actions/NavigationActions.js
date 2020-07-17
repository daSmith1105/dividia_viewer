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

export const jumpSystem = (system) => {
  console.log(system)
  // get the system based off provided, id, name etc.
  // attem[t a connection to the new system using one of the provided ips (local, public) - basically ping system and see if it is there
  // attempt login to th enw system
  // if successful, set the new system data, numCams, cams etc. in ServerReducer
  // set the previous system data in NavigationReducer and set the current system data in NavigationReducer
  // logout of now previous system (system prior to initiating jump)
  // load the new server information and display it

  return (dispatch) => {
    dispatch({
      type: JUMP_SYSTEM,
      payload: system
    })
  };
};