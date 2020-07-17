import { 
    GET_SERVER,
    GET_VERSION,
    GET_IP
  } from './types';
  
import axios from 'axios';

export const getServer = ( sServer ) => {

    return (dispatch) => {
        // make an axios request to json-rpc
        const reqBody = {   
            "jsonrpc": 2.0,
            "method": "config.general.getAll",
            "id": 200
        };
        // being blocked by CORS
        axios({
            method: 'post',
            url: sServer,
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: reqBody,
            timeout: 6000
        })
        .then( response => {
            const data = response.data.result[1];
 
            dispatch({
                type: GET_SERVER,
                bSerial: data.bSerial,
                sName: data.sName,
                sVersion: data.sVersion,
                bNumcams: data.bNumcams
            })
        })
        .catch(error => {
            console.error('Error:', error);
        }); 
    };
}; 

export const getVersion = ( session, server ) => {
    return (dispatch) => {
        // make an axios request to json-rpc
        dispatch({ type: GET_VERSION })
    };
};
    
export const getIp = ( session, server ) => {
    return (dispatch) => {
        // make an axios request to json-rpc
        dispatch({ type: GET_IP })
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