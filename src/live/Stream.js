import React from 'react';
import { ImageBackground } from 'react-native';
import NoFlickerImage from '../utility/NoFlickerImage';


class Stream extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentSource: ''
    }
  }

  render() {
    return (
        <ImageBackground style={{ width: '100%', height: '100%', position: 'relative', }}
            source={{uri: this.props.source}}>
          <NoFlickerImage
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            source={{ uri: this.props.source }} />
        </ImageBackground>
    )
  }
}

export default Stream;