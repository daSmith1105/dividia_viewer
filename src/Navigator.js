import React from 'react';
import { connect } from 'react-redux';
import { checkExists, expireSession, clearLoginResult, setLoginResult, getServer } from './actions';
import LoginView from './login/LoginView';
import LiveView from './live/LiveView';
import PlaybackView from './playback/PlaybackView';

class Navigator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test: 1
        }
        this.verifySessionHandler = 0;
    }
  
    componentDidMount = () => {
      this.verifySession();
    };
  
    componentWillUnmount = () => {
      clearTimeout(this.verifySessionHandler);
    };

    componentDidUpdate = async () => {
        if(!this.props.authServers || this.props.authServers === {} ) {
            await this.props.getServer(this.props.sServerJson);
        }
    }
  
    verifySession = async(notFirstRun) => {
        if(this.props.isLoggedIn) {
            const sessionValidation = this.props.checkExists(this.props.sSess, this.props.sServerJson);
            Promise.all([sessionValidation])
            .then( (exists) => {
                if(exists && exists[0] === false) {
                    if(this.props.isLoggedIn){
                        this.props.expireSession(this.props.sSess, this.props.sServerJson, this.props.autoLoginStatus); 
                        return;
                    }
                     this.verifySessionHandler = setTimeout( () => { this.verifySession(); this.verifySessionHandler = 0 }, 5000 );
                } else {
                     this.verifySessionHandler = setTimeout( () => { this.verifySession(); this.verifySessionHandler = 0 }, 5000 );
                 }
             }) 
        } else {
            this.verifySessionHandler = setTimeout( () => { this.verifySession(); this.verifySessionHandler = 0 }, 5000 );
        }
    };
    
    render() {
        return (
            !this.props.isLoggedIn && !this.props.jumpLoading ? 
                <LoginView /> :
            this.props.screen === 'login' && !this.props.jumpLoading?
                <LoginView /> :
            this.props.screen === 'live' || this.props.jumpLoading ?
                <LiveView /> :
            this.props.screen === 'playback' ?
                <PlaybackView /> :
                null
        )
    }
}

const mapStateToProps = state => {
    const { isLoggedIn, sSess, autoLoginStatus, jumpLoading } = state.auth;
    const { screen } = state.nav;
    const { sServerJson, bPort, authServers } = state.server;
    const { userRights } = state.user;
    return {
        isLoggedIn,
        sSess,
        autoLoginStatus,
        jumpLoading,
        screen,
        sServerJson,
        bPort,
        authServers,
        userRights
    }
}

export default connect(mapStateToProps, { checkExists, expireSession, clearLoginResult, setLoginResult, getServer })(Navigator);