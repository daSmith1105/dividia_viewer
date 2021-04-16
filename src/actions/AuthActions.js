import { 
    LOGIN_USER_START, // begin user login sequence / show loader
    LOGIN_SUCCESS, 
    LOGIN_RESULT, // result of user login attemp
    CLEAR_LOGIN_RESULT, 
    LOGOUT_USER, // logout user and clear specified persisted data
    EXPIRE_SESSION, // set our session expired to trigger modal

    USERNAME_CHANGED, // set username text changed to state
    PASSWORD_CHANGED, // set password text changed to state
    AUTO_LOGIN_CHANGED, // set change to auto-login 
    CLEAR_SESSION_MODAL, // clear our login session modal

    SCREEN_CHANGE, // navigate to a different screen

    NVR_SEARCH_TEXT_CHANGED, // set new text to state and run autocomlete on login view
    SET_NVR_SEARCH_RESULTS, // display the results of our auto comlete search bar on login view
    SET_NVR_SELECTED, // set the selected nvr from login screen to state
    CLEAR_SELECTED_NVR, // remove the currently selected nvr from state

    JUMP_START, // begin the jump sequence / displays loader
    JUMP_STATUS, // resolution of jump sequence

    GET_SERVER, // get basic infor for the provided server

    SET_VIEWS, // set views the user has access to

    SET_CAMERAS, // set cameras for this server
    // SET_TIMEZONE, // set timezone for the current server
    // SET_TIMESTAMP, // set timestamp for the current server
    // SET_DATE_FORMAT, // set date format for the current server
    SET_USER_DATA, // set user data for the current user
    SET_USER_RIGHTS , // array of rights for all auth servers for the current user
    SET_CAMERA_RIGHTS , // camera permissions bys dvr serial for the current user

  } from './types';
  
import axios from 'axios';
  
export const usernameChanged = text => {
    return {
        type: USERNAME_CHANGED,
        payload: text
    };
};
    
export const passwordChanged = text => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};
  
export const autoLoginChanged = (status) => {
    return {
        type: AUTO_LOGIN_CHANGED,
        payload: status ? true : null
    };
};

export const clearSessionModal = () => {
    return {
        type: CLEAR_SESSION_MODAL
    }
}

export const clearLoginResult = () => {
    return {
        type: CLEAR_LOGIN_RESULT
    }
}

export const setLoginResult = (result) => {
    return({
        type: LOGIN_RESULT,
        payload: result
    })
}

export const clearSelectedNvr = () => {
    return {
        type: CLEAR_SELECTED_NVR
    }
}

export const autoComplete = (string) => {
    return (dispatch) => {
        const reqBody = {   
            "jsonrpc": 2.0,
            "method": "stats.autocompleteServer",
            "id": 200,
            "params": [string]
        };
        axios({
            method: 'post',
            url: 'http://monarch-backend.dividia.net/JSON/',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: reqBody,
            timeout: 2000
        })
        .then( response => {
            let data = response.data.result[1];

            dispatch({
                type: SET_NVR_SEARCH_RESULTS,
                payload: data
            })
        })
        .catch( (error) => {
            console.log(error)
        }); 
    }
}

export const nvrSearchTextChanged = text => {

    return (dispatch) => {
    // check and set nvrSearch results if < than 3 characters have been entered
    if(text.trim().length > 2) {
        const reqBody = {   
            "jsonrpc": 2.0,
            "method": "stats.autocompleteServer",
            "id": 200,
            "params": [text]
        };
        axios({
            method: 'post',
            url: 'http://monarch-backend.dividia.net/JSON/',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: reqBody,
            timeout: 2000
        })
        .then( response => {
            let data = response.data.result[1];

            dispatch({
                type: SET_NVR_SEARCH_RESULTS,
                payload: data
            })
        })
        .catch( (error) => {
            console.log(error)
        }); 
    }
    dispatch({
        type: NVR_SEARCH_TEXT_CHANGED,
        payload: text
        })
    }
}

export const setNumcams = (num) => {
    return {
        type: GET_SERVER,
        bNumcams: num
    }
}

export const getServer = ( sServer ) => {
    return async( dispatch ) => {
        const reqBody = {   
            "jsonrpc": 2.0,
            "method": "config.meta.getStartup",
            "id": 200
        };

        await axios({
            method: 'post',
            url: sServer,
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: reqBody,
            timeout: 4000
        })
        .then( async response => {
            let authServers = new Map();
            const line1 = response.data.result[0];
            const data = response.data.result[1];
            let general =  data[Object.keys(data)[0]];
            let features = general.rgsFeature;
            let posTypes = general.rgsPosTypes;
            // create a hash map of auth servers
            data[Object.keys(data)[1]].forEach( sv => authServers.set(sv.bSerial, {'bSerial': sv.bSerial, 'sIP': sv.sIP, 'sLocalIP': sv.sLocalIP, 'bPort': sv.bPort, 'sName': sv.sName, 'sVersion': sv.sVersion }))
            let usersOnline = data[Object.keys(data)[2]]

            // console.log('get server: ', data)
            dispatch({
                type: GET_SERVER,
                bSerial: general.bSerial,
                sName: general.sName,
                sVersion: general.sVersion,
                bNumcams: general.bNumcams, // number of system supported cams
                features: features, // most notably 'eview'
                posTypes: posTypes, 
                authServers: authServers, // an array of objects with properties: { bPort, bRtspPort, bSerial, bTimestamp, fLocal, sIP, sLocalIP, sName, sVersion }
                usersOnline: usersOnline // an array of users online [ 'username', 'username' ]
            })   
        })
        .catch(err => {
            console.error('Error, yep:', err);
        }); 
    }
}; 
  
export const checkExists = (sSess, serverUrl) => {
    return async ( dispatch ) => {
        return new Promise( async(resolve, reject) => {
            let session = sSess;
            const reqBody = {   
                "jsonrpc": 2.0,
                "method": "auth.checkExists",
                "id": 200,
                "params": [session]
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
                if(data === false) {
                    return resolve(false);
                }
                resolve(true);
            })
            .catch( () => {
                resolve(false);
            }); 
        })
    }
}
  
const isAlive = async(serverUrl) => {
    return new Promise( async(resolve,reject) => {
        const reqBody = {   
            "jsonrpc": 2.0,
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
            if(data === false) {
                resolve(false);
            }
            resolve(true);
        })
        .catch( () => {
            resolve(false);
        }); 
    })
};
  
export const loginUser = ( sName, sPass, fForce, fLocal, sServer, fAuto, bSerial, bNumCams ) => {
    return async ( dispatch ) => {
        dispatch({ type: LOGIN_USER_START });
        if(sName.trim().length < 1 || sPass.trim().length < 1) {
            dispatch({ type: LOGIN_RESULT, payload: 'loginerror' });
            return setTimeout(() => dispatch({ type: LOGIN_RESULT, payload: '' }), 4000);
        };
        //check server is alive first using method: info.isAlive
        const online = isAlive(sServer);
        Promise.all([online])
        .then( async(result) => {
            if(result[0]){
            // if server is alive attempt login
                const reqBody = {   
                    "jsonrpc": 2.0,
                    "method": "auth.loginUser",
                    "id": 200,
                    "params": [ sName, sPass, fForce ? true : false, fLocal ? true : false ] // [sName, sPass, fForce, fLocal]
                };
                await axios({
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
                    const result = response.data.result[1];
                    // possible results: noauth, noremote, exists, maxsession, error
                    if(result) {
                        if(result.length > 8) {
                            // get all the data we need for user and system
                            getServer(sServer)
                            getPostLogin(dispatch, result, sServer, sName, sPass);
                            dispatch({ type: LOGIN_SUCCESS, payload: result });
                        } else {
                            dispatch({ type: LOGIN_RESULT, payload: result });
                        }
                    } else {
                        dispatch({ type: LOGIN_RESULT, payload: "error" });  
                    }
                })
                .catch(error => {
                    return dispatch({ type: LOGIN_RESULT, payload: "error" }); 
                })
            } else {
            // if server is not alive show error to user
                return dispatch({ type: LOGIN_RESULT, payload: "error" }); 
            }
        })
        .catch( error => {
        // display error to user
            console.error('Error:', error);
        })
    }
}
  
const getPostLogin = (dispatch, sSess, sServer, sName, sPass) => {
    // Get/set all config data needed to display live and playback screens (Standard Viewer)
    const reqBody = {   
        "jsonrpc": 2.0,
        "method": "config.meta.getPostLogin",
        "id": 200,
        "params": [ sSess, sName ]
    };
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
    .then( async(response) => {  
        let userRights = new Map();
        let camRights = new Map();
        let authServers = new Map();
        const data = response.data.result[1];
        let authUsers =  data[Object.keys(data)[0]]; // auth users
        let cameras = data[Object.keys(data)[1]]; // cameras for this server
        let dTime = data[Object.keys(data)[3]] // .sTimezone, .sTimestamp, .sDateFormat
        let posTypes = data[Object.keys(data)[4]] // POS junk - {"bPos":1,"bObject":1,"sName":"Timestamp","sType":"date"},{"bPos":1,"bObject":2,"sName":"Function","sType":"int"},{"bPos":1,"bObject":3,"sName":"FuncName","sType":"str"}, etc.
        let storageUsage = data[Object.keys(data)[5]] // hard drive usage - [43,"17.90T","13.15T","74%"]
        let posConfig = data[Object.keys(data)[6]] // pos config
        let devices = data[Object.keys(data)[7]] // camera config / devices
        let reportTypes = data[Object.keys(data)[8]] // report types
        let data10 = data[Object.keys(data)[9]] // empty array
        let data11 = data[Object.keys(data)[10]] // boolean
        let userData = data[Object.keys(data)[11]] // user data
        let camData = data[Object.keys(data)[12]] // camera spec data for this server
        let data14 = data[Object.keys(data)[13]] // empty array
        // hash map of user rights
        await data[Object.keys(data)[14]].forEach( arr => userRights.set(arr[0], arr.slice(1) )) // serial list and user auth [1681,1,2,4,8,16,32,64,128,256],[1464,1,2,4,8,16,32,64,128,256],[1500,1,2,4,8,16,32,64,128,256], etc.
        let data16 = data[Object.keys(data)[15]] // empty array 
        let ioData = data[Object.keys(data)[16]] // I/O data
        // hash map of camera rights
        await data[Object.keys(data)[17]].forEach( arr => camRights.set(arr[0], arr.slice(1) )) // serial list of user camera rights [1681,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],[1464,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32], etc.
        // hash map of authServers
        await data[Object.keys(data)[2]].forEach( sv => authServers.set(sv.bSerial, {'bSerial': sv.bSerial, 'sIP': sv.sIP, 'sLocalIP': sv.sLocalIP, 'bPort': sv.bPort, 'sName': sv.sName, 'sVersion': sv.sVersion }))
        dispatch({ type: SET_CAMERAS, payload: cameras })

        // dispatch({ type: SET_TIMEZONE, payload: dTime.sTimezone })
        // dispatch({ type: SET_TIMESTAMP, payload: dTime.sTimestamp })
        // dispatch({ type: SET_DATE_FORMAT, payload: dTime.sDateFormat })

        dispatch({ type: SET_USER_DATA, payload: userData, pass: sPass }) // include password with this as well
        dispatch({ type: SET_USER_RIGHTS, payload: userRights, authServers: authServers })
        dispatch({ type: SET_CAMERA_RIGHTS, payload: camRights })
        getUserSets(dispatch, sSess, userData.bID, sServer, userRights, camRights )
    })
    .catch(error => {
        console.log(error)
    }); 
}

const getUserSets = async (dispatch, sSess, bID, sServer, userRights, camRights ) => {
    const reqBody = {   
        "jsonrpc": 2.0,
        "method": "config.user.getSets",
        "id": 200,
        "params": [ sSess, bID ]
    };
    await axios({
        method: 'post',
        url: sServer,
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        data: reqBody,
        timeout: 4000
    })
    .then( async (response) => {
        // may need to set auth servers to state - they were set in getServer() but that is only called if a server is selected from the dropdown wheras this will be called on login so will work for jump server as well
        let data = response.data.result[1];;
        // raw sets returned
        let sets1 = data;
        //rgbSerial - an array of all the cam set serial numbers
        let serialArr = new Map();
        // array of camera set names
        let nameArr = [];
        // rghSet - create hash map and add 'sName' - will later append camera slots to the name
        let setArr = new Map();
    
        const p1 = await sets1.forEach( async s => {
        // check that the user has access to the server
            if(userRights.get(s.bSerial) && userRights.get(s.bSerial).indexOf(1) > -1 ) {
                if(!nameArr.includes(s.sName) ) {
                    // push unique name to array
                    nameArr.push(s.sName);
                }
                if(!setArr.has(s.sName)) {
                    // push unique key to map table - slots will be added to it
                    setArr.set(s.sName, [])
                }
                if(camRights.get(s.bSerial).includes(s.bCamera)) {
                    setArr.set(s.sName, [...setArr.get(s.sName), {'ixSlot': s.ixSlot, 'bSerial': s.bSerial, 'bCamera': s.bCamera, fAuth: true } ])   
                } else {
                    setArr.set(s.sName, [...setArr.get(s.sName), {'ixSlot': s.ixSlot, 'bSerial': s.bSerial, 'bCamera': s.bCamera, fAuth: false } ]) 
                }
            // will also need fEnable, sName, sSess, fPtz, fAudio, fMPE, bFontSize, sFisheye, sModel, sAddress, sServername, sServerVersion
            }
        })

        dispatch({ type: JUMP_STATUS, payload: '' })

        dispatch({ 
            type: SET_VIEWS, 
            setArr: setArr,
            nameArr: nameArr,
            serialArr: serialArr
        })

        dispatch({ type: SCREEN_CHANGE, payload: 'live' })
    
    })
    .catch(error => {
        console.error('Error:', error);
    }); 
}

export const setJumpStatus = (status) => {
    return {
        type: JUMP_STATUS,
        payload: status
    }
}

export const jumpServer = ( newSystem, currentSystem, username, password, currentSession, currentServerUrl, conf ) => {
    return async (dispatch) => {
        dispatch({ type: JUMP_START, payload: newSystem.sName, config: conf })
        // logout of current server
        const reqBody = {   
            "jsonrpc": 2.0,
            "method": "auth.logoutUser",
            "id": 200,
            "params": [ currentSession ]
        };

        const logout = 
            await axios({
                method: 'post',
                url: currentServerUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                data: reqBody,
                timeout: 2000
            })
            .then( () => {
                console.log('jump logout complete.')
            })
            .catch(error => {
                console.log('error during jump logout: ', error)
            }); 

        Promise.all([logout])
        .then( async() => {
            // get the correct ip address and set new server object in state
            await axios({
                method: 'get',
                url: 'http://' + newSystem.sLocalIP,
                timeout: 2000
            })
            .then(async(response) => {
                dispatch({
                    type: SET_NVR_SELECTED,
                    payload: newSystem,
                    selectedServerIp: 'http://' + newSystem.sLocalIP 
                })
                // get server data 
                await getServer('http://' + newSystem.sLocalIP + '/JSON/')
                // login with local ip
                await loginUserFromJump( dispatch, username, password, 'http://' + newSystem.sLocalIP + '/JSON/', newSystem.bSerial )
            })
            .catch(async (error) => {
                // attempt remote ip
                await axios({
                    method: 'get',
                    url: 'http://' + newSystem.sIP + ':' + newSystem.bPort,
                    timeout: 2000
                })
                .then(async (response) => {
                    dispatch({
                        type: SET_NVR_SELECTED,
                        payload: newSystem,
                        selectedServerIp: 'http://' + newSystem.sIP + ':' + newSystem.bPort 
                    })
                    // get server data 
                    await getServer('http://' + newSystem.sIP + ':' + newSystem.bPort )
                    // login with remote ip
                    await loginUserFromJump( dispatch, username, password, 'http://' + newSystem.sIP + ':' + newSystem.bPort + '/JSON/', newSystem.bSerial )
                })
                .catch(async (error) => {
                    // we failed to make a conenction to the new server, set old server back and notify user
                    dispatch({
                        type: JUMP_STATUS,
                        payload: 'connection_error'
                    });
                    await loginUserFromJump( dispatch, username, password, currentServerUrl, currentSystem.bSerial )
                })
            })
        })
    }
}

const loginUserFromJump = async( dispatch, sName, sPass, sServer, bSerial ) => {
    // attempt login
    const reqBody = {   
        "jsonrpc": 2.0,
        "method": "auth.loginUser",
        "id": 200,
        "params": [ sName, sPass, true, false ] // [sName, sPass, fForce, fLocal]
    };
    await axios({
        method: 'post',
        url: sServer,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: reqBody,
        timeout: 4000
    })
    .then( async response => {
        const result = response.data.result[1];
        // possible results: noauth, noremote, exists, maxsession, error
        if(result) {
            if(result.length > 8) {
                // get all the data we need for user and system
                dispatch({ type: LOGIN_SUCCESS, payload: result });
                const reqBody = {   
                    "jsonrpc": 2.0,
                    "method": "config.meta.getStartup",
                    "id": 200
                };
            // get server data
                await axios({
                    method: 'post',
                    url: sServer,
                        headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: reqBody,
                    timeout: 4000
                })
                .then( async response => {
                    let authServers = new Map();
                    const line1 = response.data.result[0];
                    const data = response.data.result[1];
                    let general =  data[Object.keys(data)[0]];
                    let features = general.rgsFeature;
                    let posTypes = general.rgsPosTypes;
                    // create a hash map of auth servers
                    data[Object.keys(data)[1]].forEach( sv => authServers.set(sv.bSerial, {'bSerial': sv.bSerial, 'sIP': sv.sIP, 'sLocalIP': sv.sLocalIP, 'bPort': sv.bPort, 'sName': sv.sName, 'sVersion': sv.sVersion }))
                    let usersOnline = data[Object.keys(data)[2]]

                    dispatch({
                        type: GET_SERVER,
                        bSerial: general.bSerial,
                        sName: general.sName,
                        sVersion: general.sVersion,
                        bNumcams: general.bNumcams, // number of system supported cams
                        features: features, // most notably 'eview'
                        posTypes: posTypes, 
                        authServers: authServers, // an array of objects with properties: { bPort, bRtspPort, bSerial, bTimestamp, fLocal, sIP, sLocalIP, sName, sVersion }
                        usersOnline: usersOnline // an array of users online [ 'username', 'username' ]
                    })   
                    getPostLogin(dispatch, result, sServer, sName, sPass)
                })
                .catch(err => {
                    console.error('Error, yep:', err);
                }); 
            } else {
                alert('we did not get a auth key so we need to revert back to previous system')
            }
        } else {
            alert('there was an error connecting to new system so we need to revert back to previous system')
        }
    })
    .catch(error => {
        alert('???: ', error)
    })
}

export const expireSession = ( sSess, serverUrl, autoLogin ) => {
    return ( dispatch ) => {
        dispatch({ type: EXPIRE_SESSION, payload: autoLogin ? autoLogin : null });
        const reqBody = {   
            "jsonrpc": 2.0,
            "method": "auth.logoutUser",
            "id": 200,
            "params": [ sSess ]
        };
        axios({
            method: 'post',
            url: serverUrl,
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            data: reqBody,
            timeout: 6000
        })
        .then( () => {
            dispatch({type: SCREEN_CHANGE, payload: 'login'})
        })
        .catch(error => {
            dispatch({type: SCREEN_CHANGE, payload: 'login'})
        }); 
    }
}

export const logoutUser = ( sSess, serverUrl, force) => {
    return async( dispatch ) => {
        dispatch({ type: LOGOUT_USER });
        const reqBody = {   
            "jsonrpc": 2.0,
            "method": "auth.logoutUser",
            "id": 200,
            "params": [ sSess ]
        };
        await axios({
            method: 'post',
            url: serverUrl,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: reqBody,
            timeout: 6000
        })
        .then( () => {
            if(!force){
                dispatch({type: SCREEN_CHANGE, payload: 'login'})
            } else {
                console.log('jump logout complete.')
            }
        })
        .catch(error => {
            if(!force){
                dispatch({type: SCREEN_CHANGE, payload: 'login'})
            } else {
                console.log('error during jump logout: ', error)
            }
        }); 
    }
}