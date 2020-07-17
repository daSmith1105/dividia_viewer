import { 
    GET_SERVER,
    SET_AUTOSCAN_TIMEOUT,
    SET_PTZ_CONFIG,
    SET_PTZ_PRESETS,
    SET_ALL_CAMERAS,
    SET_AUTH_SERVERS,
    LOGOUT_USER,
    EXPIRE_SESSION
  } from '../actions/types';
  
  const INITIAL_STATE = { 
    bSerial: 247,
    bNumCams: 0,
    sIP: '',
    bPort: ':7000',
    sLocalIP: '',
    fLocal: false,
    sName: 'Store 83',
    sVersion: '',
    sVersionMajor: '',
    bTimestamp: 0,
    bTimeDiffmax: 36000,
    bAutoScanTimeout: 5,
    ptzConfig: [],
    ptzPresets: [],
    cameras: [],
    cameraArr: [],
    quadView: [],
    quadViewEnabledArr: [],
    sixView: [],
    sixViewEnabledArr: [],
    nineView: [],
    nineViewEnabledArr: [],
    twelveView: [],
    twelveViewEnabledArr: [],
    sixteenView: [],
    sixteenViewEnabledArr: [],
    singleViewEnabledArray: [],
    authServers: [],
    sServer: 'http://205.201.68.184:7000',
    sServerLiveMPE: '/mpe/',
    sServerPlayback: '/camstream/',
    sServerPreview: '?cmd=fetch&session=1234&file=test.jpg'
  };
  
  export default ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
      case LOGOUT_USER:
        return { 
          ...state, 
          bSerial: 247,
          bNumCams: 0,
          sIP: '',
          bPort: 0,
          sLocalIP: '',
          fLocal: false,
          bTimestamp: 0,
          bTimeDiffmax: 36000,
          bAutoScanTimeout: 5,
          ptzConfig: [],
          ptzPresets: [],
          cameras: [],
          cameraArr: [],
          quadView: [],
          quadViewEnabledArr: [],
          sixView: [],
          sixViewEnabledArr: [],
          nineView: [],
          nineViewEnabledArr: [],
          twelveView: [],
          twelveViewEnabledArr: [],
          sixteenView: [],
          sixteenViewEnabledArr: [],
          singleViewEnabledArray: [],
          authServers: [],
          sServer: '',
          sServerLiveMPE: '/mpe/',
          sServerPlayback: '/camstream/',
          sServerPreview: '?cmd=fetch&session=1234&file=test.jpg'
        }
      case EXPIRE_SESSION:
        return { 
          ...state, 
          bSerial: 247,
          bNumCams: 0,
          sIP: '',
          bPort: 0,
          sLocalIP: '',
          fLocal: false,
          bTimestamp: 0,
          bTimeDiffmax: 36000,
          bAutoScanTimeout: 5,
          ptzConfig: [],
          ptzPresets: [],
          cameras: [],
          cameraArr: [],
          quadView: [],
          quadViewEnabledArr: [],
          sixView: [],
          sixViewEnabledArr: [],
          nineView: [],
          nineViewEnabledArr: [],
          twelveView: [],
          twelveViewEnabledArr: [],
          sixteenView: [],
          sixteenViewEnabledArr: [],
          singleViewEnabledArray: [],
          authServers: [],
          sServer: '',
          sServerLiveMPE: '/mpe/',
          sServerPlayback: '/camstream/',
          sServerPreview: '?cmd=fetch&session=1234&file=test.jpg'
        }
      case GET_SERVER:
        return { 
          ...state, 
          bSerial: action.bSerial,
          sName: action.sName,
          sVersion: action.sVersion,
          sVersionMajor: action.sVersion.split('.')[0],
          bNumCams: action.bNumcams
        }
      case SET_AUTOSCAN_TIMEOUT:
        return { 
          ...state, 
          bAutoScanTimeout: action.payload
        }
      case SET_PTZ_CONFIG:
        return { 
          ...state, 
          ptzConfig: action.payload
        }
      case SET_PTZ_PRESETS:
        return { 
          ...state, 
          ptzPresets: action.payload
        }
      case SET_ALL_CAMERAS:
        let cameraArr = [];
        let singleViewEnabledArr = [];
        let quadView = [ ["1-4", true] ];
        let quadViewEnabledArr = [ "1-4" ];
        let sixView = [ ["1-6", true] ];
        let sixViewEnabledArr = [ "1-6" ];
        let nineView = [ ["1-9", true] ];
        let nineViewEnabledArr = [ "1-9" ];
        let twelveView = [ ["1-12", true] ];
        let twelveViewEnabledArr = [ "1-12" ];
        let sixteenView = [ ["1-16", true] ];
        let sixteenViewEnabledArr = [ "1-16" ];

        for( let i = 1; i < action.payload.length + 1; i++) {
            // check if camera is enabled
            let camEnabled = action.payload.filter(c => c.bID === i)[0] && action.payload.filter(c => c.bID === i)[0].fEnable ? action.payload.filter(c => c.bID === i)[0].fEnable : false;
            if(camEnabled){
              // this is an array of cam numbers that are enabled
               singleViewEnabledArr.push(i);
            };
            // set cam as string, index number and whether cam is enabled - all cameras
            cameraArr.push([`cam_${i}`, i, camEnabled]);
        };

      // > 4 Cams
        if(action.payload.length > 4) {
          // check that at least one cam in this group is enabled - used for as
          if( singleViewEnabledArr.indexOf(5) < 0 && singleViewEnabledArr.indexOf(6) < 0 && 
              singleViewEnabledArr.indexOf(7) < 0 && singleViewEnabledArr.indexOf(8) < 0) {
            quadView.push( ["5-8", false] );
          } else {
            quadView.push( ["5-8", true] );
            quadViewEnabledArr.push( "5-8" );
          };
        };

      // > 6 Cams
        if(action.payload.length > 6) {
          if( singleViewEnabledArr.indexOf(7) < 0 && singleViewEnabledArr.indexOf(8) < 0 && 
              singleViewEnabledArr.indexOf(9) < 0 && singleViewEnabledArr.indexOf(10) < 0 &&
              singleViewEnabledArr.indexOf(11) < 0 && singleViewEnabledArr.indexOf(12) < 0) {
            sixView.push( ["7-12", false] );
          } else {
            sixView.push( ["7-12", true] );
            sixViewEnabledArr.push( "7-12" );
          };
        };

      // > 8 Cams
        if(action.payload.length > 8) {
          if( singleViewEnabledArr.indexOf(9) < 0 && singleViewEnabledArr.indexOf(10) < 0 && 
              singleViewEnabledArr.indexOf(11) < 0 && singleViewEnabledArr.indexOf(12) < 0) {
            quadView.push( ["9-12", false] );
          } else {
            quadView.push( ["9-12", true] );
            quadViewEnabledArr.push( "9-12" );
          };
        };

      // > 9 Cams
        if(action.payload.length > 9) {
          if( singleViewEnabledArr.indexOf(8) < 0 &&
              singleViewEnabledArr.indexOf(9) < 0 && singleViewEnabledArr.indexOf(10) < 0 && 
              singleViewEnabledArr.indexOf(11) < 0 && singleViewEnabledArr.indexOf(12) < 0 &&
              singleViewEnabledArr.indexOf(13) < 0 && singleViewEnabledArr.indexOf(14) < 0 && 
              singleViewEnabledArr.indexOf(15) < 0 && singleViewEnabledArr.indexOf(16) < 0) {
            nineView.push( ["8-16", false] );
          } else {
            nineView.push( ["8-16", true] );
            nineViewEnabledArr.push( "8-16" );
          };
        };

      // > 12 Cams
        if(action.payload.length > 12) {
          if( singleViewEnabledArr.indexOf(13) < 0 && singleViewEnabledArr.indexOf(14) < 0 && 
              singleViewEnabledArr.indexOf(15) < 0 && singleViewEnabledArr.indexOf(16) < 0) {
            quadView.push( ["13-16", false] );
          } else {
            quadView.push( ["13-16", true] );
            quadViewEnabledArr.push( "13-16" );
          };

          if( singleViewEnabledArr.indexOf(13) < 0 && singleViewEnabledArr.indexOf(14) < 0 && 
              singleViewEnabledArr.indexOf(15) < 0 && singleViewEnabledArr.indexOf(16) < 0 &&
              singleViewEnabledArr.indexOf(17) < 0 && singleViewEnabledArr.indexOf(18) < 0) {
            sixView.push( ["13-18", false] );
          } else {
            sixView.push( ["13-18", true] );
            sixViewEnabledArr.push( "13-18" );
          };

          if( singleViewEnabledArr.indexOf(13) < 0 && singleViewEnabledArr.indexOf(14) < 0 &&
              singleViewEnabledArr.indexOf(15) < 0 && singleViewEnabledArr.indexOf(16) < 0 && 
              singleViewEnabledArr.indexOf(17) < 0 && singleViewEnabledArr.indexOf(18) < 0 &&
              singleViewEnabledArr.indexOf(19) < 0 && singleViewEnabledArr.indexOf(20) < 0 && 
              singleViewEnabledArr.indexOf(21) < 0 && singleViewEnabledArr.indexOf(22) < 0 &&
              singleViewEnabledArr.indexOf(23) < 0 && singleViewEnabledArr.indexOf(24) < 0) {
            twelveView.push( ["13-24", false] );
          } else {
            twelveView.push( ["13-24", true] );
            twelveViewEnabledArr.push( "13-24" );
          };
        };

      // > 16 Cams
        if(action.payload.length > 16) {
          if( singleViewEnabledArr.indexOf(17) < 0 && singleViewEnabledArr.indexOf(18) < 0 && 
              singleViewEnabledArr.indexOf(19) < 0 && singleViewEnabledArr.indexOf(20) < 0) {
            quadView.push( ["17-20", false] );
          } else {
            quadView.push( ["17-20", true] );
            quadViewEnabledArr.push( "17-20" );
          };

          if( singleViewEnabledArr.indexOf(16) < 0 &&
              singleViewEnabledArr.indexOf(17) < 0 && singleViewEnabledArr.indexOf(18) < 0 && 
              singleViewEnabledArr.indexOf(19) < 0 && singleViewEnabledArr.indexOf(20) < 0 &&
              singleViewEnabledArr.indexOf(21) < 0 && singleViewEnabledArr.indexOf(22) < 0 && 
              singleViewEnabledArr.indexOf(23) < 0 && singleViewEnabledArr.indexOf(24) < 0) {
            nineView.push( ["16-24", false] );
          } else {
            nineView.push( ["16-24", true] );
            nineViewEnabledArr.push( "16-24" );
          };

          if( singleViewEnabledArr.indexOf(17) < 0 && singleViewEnabledArr.indexOf(18) < 0 &&
              singleViewEnabledArr.indexOf(19) < 0 && singleViewEnabledArr.indexOf(20) < 0 && 
              singleViewEnabledArr.indexOf(21) < 0 && singleViewEnabledArr.indexOf(22) < 0 &&
              singleViewEnabledArr.indexOf(23) < 0 && singleViewEnabledArr.indexOf(24) < 0 && 
              singleViewEnabledArr.indexOf(25) < 0 && singleViewEnabledArr.indexOf(26) < 0 &&
              singleViewEnabledArr.indexOf(27) < 0 && singleViewEnabledArr.indexOf(28) < 0 &&
              singleViewEnabledArr.indexOf(29) < 0 && singleViewEnabledArr.indexOf(30) < 0 &&
              singleViewEnabledArr.indexOf(31) < 0 && singleViewEnabledArr.indexOf(32) < 0 ) {
            sixteenView.push( ["17-32", false] );
          } else {
            sixteenView.push( ["17-32", true] );
            sixteenViewEnabledArr.push( "17-32" );
          };
        };

      // > 18 cams six view 18-24
        if(action.payload.length > 12) {
          if( singleViewEnabledArr.indexOf(19) < 0 && singleViewEnabledArr.indexOf(20) < 0 && 
              singleViewEnabledArr.indexOf(21) < 0 && singleViewEnabledArr.indexOf(22) < 0 &&
              singleViewEnabledArr.indexOf(23) < 0 && singleViewEnabledArr.indexOf(24) < 0) {
            sixView.push( ["19-24", false] );
          } else {
            sixView.push( ["19-24", true] );
            sixViewEnabledArr.push( "19-24" );
          };
        };


      // > 20 Cams
        if(action.payload.length > 20) {
          if( singleViewEnabledArr.indexOf(21) < 0 && singleViewEnabledArr.indexOf(22) < 0 && 
              singleViewEnabledArr.indexOf(23) < 0 && singleViewEnabledArr.indexOf(24) < 0) {
            quadView.push( ["21-24", false] );
          } else {
            quadView.push( ["21-24", true] );
            quadViewEnabledArr.push( "21-24" );
          };
        };

      // > 24 Cams
        if(action.payload.length > 24) {
          if( singleViewEnabledArr.indexOf(21) < 0 && singleViewEnabledArr.indexOf(22) < 0 && 
              singleViewEnabledArr.indexOf(23) < 0 && singleViewEnabledArr.indexOf(24) < 0) {
            quadView.push( ["25-28", false] );
          } else {
            quadView.push( ["25-28", true] );
            quadViewEnabledArr.push( "25-28" );
          };

          if( singleViewEnabledArr.indexOf(25) < 0 && singleViewEnabledArr.indexOf(26) < 0 && 
            singleViewEnabledArr.indexOf(27) < 0 && singleViewEnabledArr.indexOf(28) < 0 &&
            singleViewEnabledArr.indexOf(29) < 0 && singleViewEnabledArr.indexOf(30) < 0) {
            sixView.push( ["25-30", false] );
          } else {
            sixView.push( ["25-30", true] );
            sixViewEnabledArr.push( "25-30" );
          };

          if( singleViewEnabledArr.indexOf(24) < 0 &&
              singleViewEnabledArr.indexOf(25) < 0 && singleViewEnabledArr.indexOf(26) < 0 && 
              singleViewEnabledArr.indexOf(27) < 0 && singleViewEnabledArr.indexOf(28) < 0 &&
              singleViewEnabledArr.indexOf(29) < 0 && singleViewEnabledArr.indexOf(30) < 0 && 
              singleViewEnabledArr.indexOf(31) < 0 && singleViewEnabledArr.indexOf(32) < 0) {
            nineView.push( ["24-32", false] );
          } else {
            nineView.push( ["24-32", true] );
            nineViewEnabledArr.push( "24-32" );
          };
          
          if( singleViewEnabledArr.indexOf(25) < 0 && singleViewEnabledArr.indexOf(26) < 0 &&
              singleViewEnabledArr.indexOf(27) < 0 && singleViewEnabledArr.indexOf(28) < 0 && 
              singleViewEnabledArr.indexOf(29) < 0 && singleViewEnabledArr.indexOf(30) < 0 &&
              singleViewEnabledArr.indexOf(31) < 0 && singleViewEnabledArr.indexOf(32) < 0 && 
              singleViewEnabledArr.indexOf(33) < 0 && singleViewEnabledArr.indexOf(34) < 0 &&
              singleViewEnabledArr.indexOf(35) < 0 && singleViewEnabledArr.indexOf(36) < 0) {
            twelveView.push( ["25-36", false] );
          } else {
            twelveView.push( ["25-36", true] );
            twelveViewEnabledArr.push( "25-36" );
          };
        };

      // > 30 cams
        if(action.payload.length > 30) {
          if( singleViewEnabledArr.indexOf(31) < 0 && singleViewEnabledArr.indexOf(32) < 0 && 
              singleViewEnabledArr.indexOf(33) < 0 && singleViewEnabledArr.indexOf(34) < 0 &&
              singleViewEnabledArr.indexOf(35) < 0 && singleViewEnabledArr.indexOf(36) < 0) {
            sixView.push( ["31-36", false] );
          } else {
            sixView.push( ["31-36", true] );
            sixViewEnabledArr.push( "31-36" );
          };
        };

      // > 32 cams
        if(action.payload.length > 32) {
          if( singleViewEnabledArr.indexOf(33) < 0 && singleViewEnabledArr.indexOf(34) < 0 && 
              singleViewEnabledArr.indexOf(35) < 0 && singleViewEnabledArr.indexOf(36) < 0) {
            quadView.push( ["33-36", false] );
          } else {
            quadView.push( ["33-36", true] );
            quadViewEnabledArr.push( "33-36" );
          };
        
          if( singleViewEnabledArr.indexOf(32) < 0 &&
              singleViewEnabledArr.indexOf(33) < 0 && singleViewEnabledArr.indexOf(34) < 0 && 
              singleViewEnabledArr.indexOf(35) < 0 && singleViewEnabledArr.indexOf(36) < 0 &&
              singleViewEnabledArr.indexOf(37) < 0 && singleViewEnabledArr.indexOf(38) < 0 && 
              singleViewEnabledArr.indexOf(39) < 0 && singleViewEnabledArr.indexOf(40) < 0) {
            nineView.push( ["32-40", false] );
          } else {
            nineView.push( ["32-40", true] );
            nineViewEnabledArr.push( "32-40" );
          };
      
          if( singleViewEnabledArr.indexOf(33) < 0 && singleViewEnabledArr.indexOf(34) < 0 &&
              singleViewEnabledArr.indexOf(35) < 0 && singleViewEnabledArr.indexOf(36) < 0 && 
              singleViewEnabledArr.indexOf(37) < 0 && singleViewEnabledArr.indexOf(38) < 0 &&
              singleViewEnabledArr.indexOf(39) < 0 && singleViewEnabledArr.indexOf(40) < 0 && 
              singleViewEnabledArr.indexOf(41) < 0 && singleViewEnabledArr.indexOf(42) < 0 &&
              singleViewEnabledArr.indexOf(43) < 0 && singleViewEnabledArr.indexOf(44) < 0 &&
              singleViewEnabledArr.indexOf(45) < 0 && singleViewEnabledArr.indexOf(46) < 0 &&
              singleViewEnabledArr.indexOf(47) < 0 && singleViewEnabledArr.indexOf(48) < 0 ) {
            sixteenView.push( ["33-48", false] );
          } else {
            sixteenView.push( ["33-48", true] );
            sixteenViewEnabledArr.push( "33-48" );
          };
        };

      // > 36 cams
        if(action.payload.length > 36) {
          if( singleViewEnabledArr.indexOf(37) < 0 && singleViewEnabledArr.indexOf(38) < 0 && 
              singleViewEnabledArr.indexOf(39) < 0 && singleViewEnabledArr.indexOf(40) < 0) {
            quadView.push( ["37-40", false] );
          } else {
            quadView.push( ["37-40", true] );
            quadViewEnabledArr.push( "37-40" );
          };
    
          if( singleViewEnabledArr.indexOf(37) < 0 && singleViewEnabledArr.indexOf(38) < 0 && 
              singleViewEnabledArr.indexOf(39) < 0 && singleViewEnabledArr.indexOf(40) < 0 &&
              singleViewEnabledArr.indexOf(41) < 0 && singleViewEnabledArr.indexOf(42) < 0) {
            sixView.push( ["37-42", false] );
          } else {
            sixView.push( ["37-42", true] );
            sixViewEnabledArr.push( "37-42" );
          };
      
          if( singleViewEnabledArr.indexOf(37) < 0 && singleViewEnabledArr.indexOf(38) < 0 &&
              singleViewEnabledArr.indexOf(39) < 0 && singleViewEnabledArr.indexOf(40) < 0 && 
              singleViewEnabledArr.indexOf(41) < 0 && singleViewEnabledArr.indexOf(42) < 0 &&
              singleViewEnabledArr.indexOf(43) < 0 && singleViewEnabledArr.indexOf(44) < 0 && 
              singleViewEnabledArr.indexOf(45) < 0 && singleViewEnabledArr.indexOf(46) < 0 &&
              singleViewEnabledArr.indexOf(47) < 0 && singleViewEnabledArr.indexOf(48) < 0) {
            twelveView.push( ["37-48", false] );
          } else {
            twelveView.push( ["37-48", true] );
            twelveViewEnabledArr.push( "37-48" );
          };
        };

      // > 40 cams
        if(action.payload.length > 40) {
          if( singleViewEnabledArr.indexOf(41) < 0 && singleViewEnabledArr.indexOf(42) < 0 && 
              singleViewEnabledArr.indexOf(43) < 0 && singleViewEnabledArr.indexOf(44) < 0) {
            quadView.push( ["41-44", false] );
          } else {
            quadView.push( ["41-44", true] );
            quadViewEnabledArr.push( "41-44" );
          };
        
          if( singleViewEnabledArr.indexOf(40) < 0 &&
              singleViewEnabledArr.indexOf(41) < 0 && singleViewEnabledArr.indexOf(42) < 0 && 
              singleViewEnabledArr.indexOf(43) < 0 && singleViewEnabledArr.indexOf(44) < 0 &&
              singleViewEnabledArr.indexOf(45) < 0 && singleViewEnabledArr.indexOf(46) < 0 && 
              singleViewEnabledArr.indexOf(47) < 0 && singleViewEnabledArr.indexOf(48) < 0) {
            nineView.push( ["40-48", false] );
          } else {
            nineView.push( ["40-48", true] );
            nineViewEnabledArr.push( "40-48" );
          };
        };

      // > 42 cams
        if(action.payload.length > 42) {
          if( singleViewEnabledArr.indexOf(31) < 0 && singleViewEnabledArr.indexOf(32) < 0 && 
              singleViewEnabledArr.indexOf(33) < 0 && singleViewEnabledArr.indexOf(34) < 0 &&
              singleViewEnabledArr.indexOf(35) < 0 && singleViewEnabledArr.indexOf(36) < 0) {
            sixView.push( ["31-36", false] );
          } else {
            sixView.push( ["31-36", true] );
            sixViewEnabledArr.push( "31-36" );
          };
        };

      // > 44 cams
        if(action.payload.length > 44) {
          if( singleViewEnabledArr.indexOf(45) < 0 && singleViewEnabledArr.indexOf(46) < 0 && 
              singleViewEnabledArr.indexOf(47) < 0 && singleViewEnabledArr.indexOf(48) < 0) {
            quadView.push( ["45-48", false] );
          } else {
            quadView.push( ["45-48", true] );
            quadViewEnabledArr.push( "45-48" );
          };
        };

      // > 48 cams
        if(action.payload.length > 48) {
          if( singleViewEnabledArr.indexOf(49) < 0 && singleViewEnabledArr.indexOf(50) < 0 && 
              singleViewEnabledArr.indexOf(51) < 0 && singleViewEnabledArr.indexOf(52) < 0) {
            quadView.push( ["49-52", false] );
          } else {
            quadView.push( ["49-52", true] );
            quadViewEnabledArr.push( "49-25" );
          };
        
          if( singleViewEnabledArr.indexOf(49) < 0 && singleViewEnabledArr.indexOf(50) < 0 && 
              singleViewEnabledArr.indexOf(51) < 0 && singleViewEnabledArr.indexOf(52) < 0 &&
              singleViewEnabledArr.indexOf(53) < 0 && singleViewEnabledArr.indexOf(54) < 0) {
            sixView.push( ["49-54", false] );
          } else {
            sixView.push( ["49-54", true] );
            sixViewEnabledArr.push( "49-54" );
          };
          
          if( singleViewEnabledArr.indexOf(48) < 0 &&
              singleViewEnabledArr.indexOf(49) < 0 && singleViewEnabledArr.indexOf(50) < 0 && 
              singleViewEnabledArr.indexOf(51) < 0 && singleViewEnabledArr.indexOf(52) < 0 &&
              singleViewEnabledArr.indexOf(53) < 0 && singleViewEnabledArr.indexOf(54) < 0 && 
              singleViewEnabledArr.indexOf(55) < 0 && singleViewEnabledArr.indexOf(56) < 0) {
            nineView.push( ["48-56", false] );
          } else {
            nineView.push( ["48-56", true] );
            nineViewEnabledArr.push( "48-56" );
          };
      
          if( singleViewEnabledArr.indexOf(49) < 0 && singleViewEnabledArr.indexOf(50) < 0 &&
              singleViewEnabledArr.indexOf(51) < 0 && singleViewEnabledArr.indexOf(52) < 0 && 
              singleViewEnabledArr.indexOf(53) < 0 && singleViewEnabledArr.indexOf(54) < 0 &&
              singleViewEnabledArr.indexOf(55) < 0 && singleViewEnabledArr.indexOf(56) < 0 && 
              singleViewEnabledArr.indexOf(57) < 0 && singleViewEnabledArr.indexOf(58) < 0 &&
              singleViewEnabledArr.indexOf(59) < 0 && singleViewEnabledArr.indexOf(60) < 0) {
            twelveView.push( ["49-60", false] );
          } else {
            twelveView.push( ["49-60", true] );
            twelveViewEnabledArr.push( "49-60" );
          };
  
          if( singleViewEnabledArr.indexOf(49) < 0 && singleViewEnabledArr.indexOf(50) < 0 &&
              singleViewEnabledArr.indexOf(51) < 0 && singleViewEnabledArr.indexOf(52) < 0 && 
              singleViewEnabledArr.indexOf(53) < 0 && singleViewEnabledArr.indexOf(54) < 0 &&
              singleViewEnabledArr.indexOf(55) < 0 && singleViewEnabledArr.indexOf(56) < 0 && 
              singleViewEnabledArr.indexOf(57) < 0 && singleViewEnabledArr.indexOf(58) < 0 &&
              singleViewEnabledArr.indexOf(59) < 0 && singleViewEnabledArr.indexOf(60) < 0 &&
              singleViewEnabledArr.indexOf(61) < 0 && singleViewEnabledArr.indexOf(62) < 0 &&
              singleViewEnabledArr.indexOf(63) < 0 && singleViewEnabledArr.indexOf(64) < 0 ) {
            sixteenView.push( ["49-64", false] );
          } else {
            sixteenView.push( ["49-64", true] );
            sixteenViewEnabledArr.push( "49-64" );
          };
        };

      // > 52 cams
        if(action.payload.length > 52) {
          if( singleViewEnabledArr.indexOf(53) < 0 && singleViewEnabledArr.indexOf(54) < 0 && 
              singleViewEnabledArr.indexOf(55) < 0 && singleViewEnabledArr.indexOf(56) < 0) {
            quadView.push( ["53-56", false] );
          } else {
            quadView.push( ["53-56", true] );
            quadViewEnabledArr.push( "53-56" );
          };
        };

      // > 54 cams
        if(action.payload.length > 54) {
          if( singleViewEnabledArr.indexOf(55) < 0 && singleViewEnabledArr.indexOf(56) < 0 && 
              singleViewEnabledArr.indexOf(57) < 0 && singleViewEnabledArr.indexOf(58) < 0 &&
              singleViewEnabledArr.indexOf(59) < 0 && singleViewEnabledArr.indexOf(60) < 0) {
            sixView.push( ["55-60", false] );
          } else {
            sixView.push( ["55-60", true] );
            sixViewEnabledArr.push( "55-60" );
          };
        };

      // > 56 cams
        if(action.payload.length > 56) {
          if( singleViewEnabledArr.indexOf(57) < 0 && singleViewEnabledArr.indexOf(58) < 0 && 
              singleViewEnabledArr.indexOf(59) < 0 && singleViewEnabledArr.indexOf(60) < 0) {
            quadView.push( ["57-60", false] );
          } else {
            quadView.push( ["57-60", true] );
            quadViewEnabledArr.push( "57-60" );
          };
        
          if( singleViewEnabledArr.indexOf(56) < 0 &&
              singleViewEnabledArr.indexOf(57) < 0 && singleViewEnabledArr.indexOf(58) < 0 && 
              singleViewEnabledArr.indexOf(59) < 0 && singleViewEnabledArr.indexOf(60) < 0 &&
              singleViewEnabledArr.indexOf(61) < 0 && singleViewEnabledArr.indexOf(62) < 0 && 
              singleViewEnabledArr.indexOf(63) < 0 && singleViewEnabledArr.indexOf(64) < 0) {
            nineView.push( ["56-64", false] );
          } else {
            nineView.push( ["56-64", true] );
            nineViewEnabledArr.push( "56-64" );
          };
        };

      // > 60 cams
        if(action.payload.length > 60) {
          if( singleViewEnabledArr.indexOf(61) < 0 && singleViewEnabledArr.indexOf(62) < 0 && 
              singleViewEnabledArr.indexOf(63) < 0 && singleViewEnabledArr.indexOf(64) < 0) {
            quadView.push( ["61-64", false] );
          } else {
            quadView.push( ["61-64", true] );
            quadViewEnabledArr.push( "61-64" );
          };
          
          if( singleViewEnabledArr.indexOf(61) < 0 && singleViewEnabledArr.indexOf(62) < 0 && 
              singleViewEnabledArr.indexOf(63) < 0 && singleViewEnabledArr.indexOf(64) < 0 &&
              singleViewEnabledArr.indexOf(65) < 0 && singleViewEnabledArr.indexOf(66) < 0) {
            sixView.push( ["61-66", false] );
          } else {
            sixView.push( ["61-66", true] );
            sixViewEnabledArr.push( "61-66" );
          };
          
          if( singleViewEnabledArr.indexOf(61) < 0 && singleViewEnabledArr.indexOf(62) < 0 &&
              singleViewEnabledArr.indexOf(63) < 0 && singleViewEnabledArr.indexOf(64) < 0 && 
              singleViewEnabledArr.indexOf(65) < 0 && singleViewEnabledArr.indexOf(66) < 0 &&
              singleViewEnabledArr.indexOf(67) < 0 && singleViewEnabledArr.indexOf(68) < 0 && 
              singleViewEnabledArr.indexOf(69) < 0 && singleViewEnabledArr.indexOf(70) < 0 &&
              singleViewEnabledArr.indexOf(71) < 0 && singleViewEnabledArr.indexOf(72) < 0) {
            twelveView.push( ["61-72", false] );
          } else {
            twelveView.push( ["61-72", true] );
            twelveViewEnabledArr.push( "61-72" );
          };
        };

        return { 
          ...state, 
          cameras: action.payload,
          cameraArr,
          singleViewEnabledArr,
          quadView,
          quadViewEnabledArr,
          sixView,
          sixViewEnabledArr,
          nineView,
          nineViewEnabledArr,
          twelveView,
          twelveViewEnabledArr,
          sixteenView,
          sixteenViewEnabledArr
        }
      case SET_AUTH_SERVERS:
        return { 
          ...state, 
          authServers: action.payload
        }
      default:
        return state;
    };
  };
