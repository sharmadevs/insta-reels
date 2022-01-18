import React, { useEffect, useContext } from 'react';
import { Image, View } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { AppContext } from '../context';
import { isIOS, height, width } from '../utils/Constant';
import CommonStyle from '../theme/CommonStyle';
import APPIMAGEURL from '../theme/Imges';

const Initial = () => {
  const { setDisplayHeight } = useContext(AppContext);
  const navigation = useNavigation();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      goToNextScreen('Home');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const goToNextScreen = async (name: string, params = {}) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name, params }],
      }),
    );
  };

  const onLayout = ({ nativeEvent }: any) => {
    setDisplayHeight((!isIOS && nativeEvent.layout.height) || height);
  };

  return (
    <>
      <View style={CommonStyle.flexContainer} onLayout={onLayout}>
        <View style={{flex:1}}>
          <Image source={APPIMAGEURL.splash} style={{ height: height+50, width: width }} />
        </View>
      </View>
    </>);
};

export default Initial;
