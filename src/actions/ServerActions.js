import { 
    CLEAR_SERVER_HISTORY,
    REMOVE_ITEM_FROM_SERVER_HISTORY,
    SET_CURRENT_SELECTED_VIEW,
    VIEW_CHANGE_STARTED,
    VIEW_CHANGE_COMPLETE
  } from './types';
  
import axios from 'axios';

export const clearServerHistory = () => {
    return {
        type: CLEAR_SERVER_HISTORY
    };
};

export const removeItemFromServerHistory = (bSerial) => {
    return {
        type: REMOVE_ITEM_FROM_SERVER_HISTORY,
        payload: bSerial
    };
};
  
export const isAlive = (serverUrl) => {
    return async( dispatch ) => {
        const reqBody = {   "jsonrpc": 2.0,
                            "method": "info.isAlive",
                            "id": 200
                        };
        await axios({
            method: 'post',
            url: serverUrl,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: reqBody,
            timeout: 2000
        })
        .then( response => {
   
            const data = response.data.result[1]
        
            if(!data) {
                return false;
            }
            return true;
        })
        .catch(error => {
            console.error('Error:', error);
            return false;
        }); 
    };
};

export const changeSets = () => {
    // get the selected set and set the currentSetView to the next one
}

export const buildCameraView = (selectedView, selectedViewName ) => {
    return (dispatch) => {
        dispatch({ type: VIEW_CHANGE_STARTED })

        dispatch({
            type: SET_CURRENT_SELECTED_VIEW,
            payload: selectedView,
            setName:  selectedViewName 
        })
    }
}

export const getCamera = (sServer, bSerial, bCamera) => {
    // make an axios request to get the requested camera given the dvs serial and cam number
    return async( dispatch ) => {
        const reqBody = {   "jsonrpc": 2.0,
                            "method": "config.server.getCamerasBySerial",
                            "id": 200,
                            "params": ["1094", bSerial]
                        };
        await axios({
            method: 'post',
            url: sServer + '/JSON/',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: reqBody,
            timeout: 2000
        })
        .then( response => {
            const data = response.data.result[1]
            const targetCamera = data.find( t => t.bID === bCamera);
            return targetCamera;
        })
        .catch(error => {
            console.error('Error:', error);
            return false;
        }); 
    };

}

 // "config.camera.toggleActivity"

// stuff to do with sets

// "config.user.addSet" sSess, bID, rgoData 
// "config.user.delSet" sSess, bID, sName
// "config.user.updateSet" sSess, bID, rgoData