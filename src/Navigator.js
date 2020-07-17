import React from 'react';
import { connect } from 'react-redux';
import { getServer } from './actions';
import LoginView from './login/LoginView';
import LiveView from './live/LiveView';
import PlaybackView from './playback/PlaybackView';

class Navigator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test: 1
        }
    }

    componentDidMount = async() => {
        await this.props.getServer(`http://205.201.69.172:7000/JSON/`)
    }
    
    render() {
        return (
            !this.props.isLoggedIn ? 
                <LoginView /> :
            this.props.screen === 'login' ?
                <LoginView /> :
            this.props.screen === 'live' ?
                <LiveView /> :
            this.props.screen === 'playback' ?
                <PlaybackView /> :
                <LoginView />
        )
    }
}

const mapStateToProps = state => {
    const { isLoggedIn } = state.auth;
    const { screen } = state.nav;
    const { sServer, bPort } = state.server;
    return {
        isLoggedIn,
        screen,
        sServer,
        bPort
    }
}

export default connect(mapStateToProps, {getServer})(Navigator);