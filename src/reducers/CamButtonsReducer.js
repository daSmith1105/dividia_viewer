import { 
    CAM_VIEW_CHANGED,
    LOGOUT_USER,
    EXPIRE_SESSION,
    GET_SERVER,
    JUMP_START
  } from '../actions/types';
  
  const INITIAL_STATE = { 
    currentCamView: '1',
    autoScrollEnabled: false,
    singleView: [],
    quadView: [],
    sixView: [],
    nineView: [],
    twelveView: [],
    sixteenView: [],
  };
  
  export default ( state = INITIAL_STATE, action ) => {

    switch ( action.type ) {
      case JUMP_START:
      let view = "";
      if(action.config === 'conf-1'){
        view = '1'
      } else if(action.config === 'conf-4' ) {
        view = '1-4'
      } else {
        view = '1'
      }
        return {
          ...state,
          singleView: [],
          quadView: [],
          sixView: [],
          nineView: [],
          twelveView: [],
          sixteenView: [],
          currentCamView: view
        }
      case GET_SERVER:
        // set the various cam button views based on bNumCams
        let singleArr = [];
        let quadArr = [ "1-4" ];
        let sixArr = [ "1-6" ];
        let nineArr = [ "1-9" ];
        let twelveArr = [ "1-12" ];
        let sixteenArr = [ "1-16" ];

        for( let i = 1; i < action.bNumcams + 1; i++) {
              singleArr.push(i.toString());
        };

      // > 4 Cams
         if(action.bNumcams > 4) {
            quadArr.push( "5-8" );
        };

      // > 6 Cams
        if(action.bNumcams > 6) {
          sixArr.push( "7-12" );
        };

      // > 8 Cams
        if(action.bNumcams > 8) {
          quadArr.push( "9-12" );
        };

      // > 9 Cams
        if(action.bNumcams > 9) {
          nineArr.push( "8-16" );
        };

      // > 12 Cams
        if(action.bNumcams > 12) {
          quadArr.push( "13-16" );
          sixArr.push( "13-18" );
          twelveArr.push( "13-24" );
        };

      // > 16 Cams
        if(action.bNumcams > 16) {
            quadArr.push( "17-20" );
            nineArr.push( "16-24" );
            sixteenArr.push( "17-32" );
          };

      // > 18 cams six view 18-24
        if(action.bNumcams > 12) {
          sixArr.push( "19-24" );
        };

      // > 20 Cams
        if(action.bNumcams > 20) {
          quadArr.push( "21-24" );
        };

      // > 24 Cams
        if(action.bNumcams > 24) {
          quadArr.push( "25-28" );
          sixArr.push( "25-30" );
          nineArr.push( "24-32" );
          twelveArr.push( "25-36" );
        };

      // > 30 cams
        if(action.bNumcams > 30) {
            sixArr .push( "31-36" );
        };

      // > 32 cams
        if(action.bNumcams > 32) {
          quadArr.push( "33-36" );
          nineArr.push( "32-40" );
          sixteenArr.push( "33-48" );
        };
        
      // > 36 cams
        if(action.bNumcams > 36) {
          quadArr.push( "37-40" );
          sixArr.push( "37-42" );
          twelveArr.push( "37-48" );
        };

      // > 40 cams
        if(action.bNumcams > 40) {
          quadArr.push( "41-44" );
          nineArr.push( "40-48" );
        };

      // > 42 cams
        if(action.bNumcams > 42) {
          sixArr.push( "31-36" );
        };

      // > 44 cams
        if(action.bNumcams > 44) {
          quadArr.push( "45-48" );
        };

      // > 48 cams
        if(action.bNumcams > 48) {
          quadArr.push( "49-25" );
          sixArr.push( "49-54" );
          nineArr.push( "48-56" );
          twelveArr.push( "49-60" );
          sixteenArr.push( "49-64" );
        };

      // > 52 cams
        if(action.bNumcams > 52) {
          quadArr.push( "53-56" );
        };

      // > 54 cams
        if(action.bNumcams > 54) {
          sixArr.push( "55-60" );
        };

      // > 56 cams
        if(action.bNumcams > 56) {
          quadArr.push( "57-60" );
          nineArr.push( "56-64" );
        };

      // > 60 cams
        if(action.bNumcams > 60) {
          quadArr.push( "61-64" );
          sixArr.push( "61-66" );
          twelveArr.push( "61-72" );
        };

        return { 
          ...state, 
          singleView: singleArr ,
          quadView: quadArr,
          sixView: sixArr,
          nineView: nineArr,
          twelveView: twelveArr,
          sixteenView: sixteenArr,
        }

      case CAM_VIEW_CHANGED:
        return { 
            ...state, 
            currentCamView: action.payload 
        }

      case LOGOUT_USER:
        return { 
            ...state, 
            currentCamView: '1',
            autoScrollEnabled: false
        }

      case EXPIRE_SESSION:
        return { 
            ...state, 
            currentCamView: '1',
            autoScrollEnabled: false
        }

      default:
          return state;
    };
  };