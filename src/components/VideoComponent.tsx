import React, { useContext, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { AppContext } from '../context';
import CommonStyle from '../theme/CommonStyle';
import { width } from '../utils/Constant';
import { VolumeButton } from './AppButton';

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
interface VideoProps {
  post: any;
  isVisible: boolean;
  isNext: boolean;
  onProgress: (videoObj: any) => void
}
const VideoComponent = ({ post, isVisible, isNext, onProgress }: VideoProps) => {
  const { displayHeight }: any = useContext(AppContext);
  const { isMute }: any = useContext(AppContext);
  const videoRef = useRef(null);
  const { url } = post;
  const { videoOuter, videoView } = styles;

  useEffect(() => {
    if (!isVisible && isNext && videoRef) {
      // videoRef.current.seek(0);
    }
  }, [isVisible, isNext]);

  const videoError = () => {
    console.log('Video is not supported', url);
  };

  return (
    <View style={[videoOuter, { height: displayHeight }]}>
      <Video
        ref={videoRef}
        fullscreenAutorotate={true}
        source={{ uri: url }}
        autoPlay={true}
        repeat={true}
        onError={videoError}
        resizeMode={'cover'}
        muted={(!isVisible && true) || isMute}
        style={[videoView, { height: displayHeight }]}
        playInBackground={false}
        paused={!isVisible}
        ignoreSilentSwitch={'ignore'}
        onProgress={(e) => onProgress(e)}
      />
      <VolumeButton />
    </View>
  );
};

export { VideoComponent };
