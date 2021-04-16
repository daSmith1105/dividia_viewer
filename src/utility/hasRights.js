export const hasRights = (kind, type, rights, serial, cam) => {  // ex: ('server', 'access', userRights, bSerial, null), ('cam', null, camRights, bSerial, bCamera)
    if(kind === 'server') {
        // see if we have access to the server by serial
        if(rights.has(serial)){
            const targetServer = rights.get(serial);
            if(type === 'access' && targetServer.indexOf(1) > -1){
                return true;
            };
            if(type === 'admin' && targetServer.indexOf(2) > -1){
                return true;
            };
            if(type === 'export' && targetServer.indexOf(4) > -1){
                return true;
            };
            if(type === 'remote' && targetServer.indexOf(8) > -1){
                return true;
            };
            if(type === 'ptz' && targetServer.indexOf(16) > -1){
                return true;
            };
            if(type === 'playback' && targetServer.indexOf(32) > -1){
                return true;
            };
        }

        return false;
    }

    if(kind === 'cam') {
        // see if we have camrights for the given camera by dvs serial
        if(rights.has(serial)){
            const targetServer = rights.get(serial);
            if(targetServer.indexOf(cam) > -1){
                return true;
            }
            return false
        }

        return false
    }

    return 'unknown kind supplied to hasRights'
}