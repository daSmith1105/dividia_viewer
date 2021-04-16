import { 
    UPDATE_CURRENT_TIME,
    SET_NVR_TIMESTAMP,
    SET_NVR_SELECTED
  } from './types';

  import axios from 'axios';
  
export const updateCurrentTime = () => {
    return {
        type: UPDATE_CURRENT_TIME
    }
}

export const getNvrTimestamp = (sSess, sServer) => {
    return async (dispatch) => {
        const reqBody = {   
            "jsonrpc": 2.0,
            "method": "config.dtime.getAll",
            "id": 200,
            "params": [sSess]
        };
        await axios({
            method: 'post',
            url: sServer,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: reqBody,
            timeout: 2000
        })
        .then( async response => {
            let data = await response.data.result[1].sTimestamp;
            if(data && data.length > 4) {
                let year = data.slice(0,4);
                let month = data.slice(4,6);
                let day = data.slice(6,8);
                let hour = data.slice(8,10);
                let minute = data.slice(10,12);
                let second = data.slice(12,14);
                let datetime = `${month}/${day}/${year} ${hour}:${minute}:${second}`;
                dispatch({ type: SET_NVR_TIMESTAMP, nvrTimestamp: datetime, nvrTimestampShort: data });
            }
        })
        .catch(error => {
            console.log(error)
        })  
    }
}

export const whichIp = (server, localIp, remoteIp, port) => {
    return async (dispatch) => {
        // attempt local ip
        await axios({
            method: 'get',
            url: 'http://' + localIp,
            timeout: 2000
        })
        .then((response) => {
            dispatch({
                type: SET_NVR_SELECTED,
                payload: server,
                selectedServerIp: 'http://' + localIp
            })
        })
        .catch(async (error) => {
            // attempt remote ip
            await axios({
                method: 'get',
                url: 'http://' + remoteIp + ':' + port,
                timeout: 2000
            })
            .then((response) => {
                dispatch({
                    type: SET_NVR_SELECTED,
                    payload: server,
                    selectedServerIp: 'http://' + remoteIp + ':' + port
                })
            })
            .catch((error) => {
                dispatch({
                    type: SET_NVR_SELECTED,
                    payload: {},
                    selectedServerIp: 'none'
                })
            })
        })
    }
}