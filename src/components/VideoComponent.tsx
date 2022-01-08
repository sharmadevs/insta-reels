import React, {useContext, useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {AppContext} from '../context';
import CommonStyle from '../theme/CommonStyle';
import {width} from '../utils/Constant';
import {VolumeButton} from './AppButton';

const styles = StyleSheet.create({
  videoView: {
    width,
    opacity: 1,
  },
  videoOuter: {
    width,
    ...CommonStyle.center,
  },
});

const VideoComponent = ({post, isVisible, isNext}) => {
  const {displayHeight} = useContext(AppContext);
  const {isMute} = useContext(AppContext);
  const videoRef = useRef(null);
  const {url} = post;
  const {videoOuter, videoView} = styles;

  useEffect(() => {
    if (!isVisible && isNext && videoRef) {
      // videoRef.current.seek(0);
    }
  }, [isVisible, isNext]);

  const videoError = () => {
    // Manage error here
  };

  return (
    <View style={[videoOuter, {height: displayHeight}]}>
      <Video
        ref={videoRef}
        fullscreenAutorotate={true}
        source={url}
        autoPlay={true}
        repeat={true}
        onError={videoError}
        resizeMode={'cover'}
        muted={(!isVisible && true) || isMute}
        style={[videoView, {height: displayHeight}]}
        playInBackground={false}
        paused={!isVisible}
        ignoreSilentSwitch={'ignore'}
      />
      <VolumeButton />
    </View>
  );
};

export {VideoComponent};
