import React, { useContext } from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Share,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppContext } from '../context';
import APPIMAGEURL from '../theme/Imges';
import { width } from '../utils/Constant';

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  sideBar: {
    width: 80,
    position: 'absolute',
    zIndex: 1000,
    right: 0,
    alignItems: 'center',
  },
  iconOuter: {
    marginVertical: 8,
  },
  center: {
    alignItems: 'center',
  },
  imageOuter: {
    width,
    justifyContent: 'center',
  },
});

const RenderIcon = ({ obj, onPress, exStyle = {} }: any) => {
  const { appTheme }: any = useContext(AppContext);
  const { iconOuter, center, icon, text } = styles;
  const { type, imageIcon, size = 30, disText } = obj;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress(type)}
      style={iconOuter}>
      <View style={center}>
        <Image
          source={imageIcon}
          style={[
            icon,
            {
              height: size,
              width: size,
              tintColor: appTheme?.tint,
            },
            exStyle,
          ]}
          resizeMode={'contain'}
        />
        {(disText && (
          <Text style={[text, { color: appTheme?.tint }]}>{`${disText}`}</Text>
        )) ||
          null}
      </View>
    </TouchableOpacity>
  );
};

const FeedSideBar = ({ item, animation }: any) => {
  const { appTheme } = useContext(AppContext);
  const insets = useSafeAreaInsets();
  const { sideBar } = styles;
  const { like, comment, likeStatus,post:{url} } = item;
  
  const makeAction = async (type: any) => {
    if (type === "Share") {
      try {
        const result = await Share.share({
          message:url,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error: any) {
        Alert.alert(error.message);
      }

    }

  };

  return (
    <Animated.View
      style={[
        sideBar,
        {
          bottom: insets.bottom + 10,
        },
        animation,
      ]}>
      <RenderIcon
        obj={{
          imageIcon: APPIMAGEURL.heart,
          disText: like,
          size: 35,
          type: 'Like',
        }}
        exStyle={{ tintColor: (likeStatus && appTheme?.red) || appTheme?.tint }}
        onPress={makeAction}
      />
      <RenderIcon
        obj={{ imageIcon: APPIMAGEURL.comment, disText: comment, type: 'Comment' }}
        onPress={makeAction}
      />
      <RenderIcon
        obj={{ imageIcon: APPIMAGEURL.share, type: 'Share' }}
        onPress={makeAction}
      />
      <RenderIcon
        obj={{ imageIcon: APPIMAGEURL.more, size: 35, type: 'More' }}
        onPress={makeAction}
      />
    </Animated.View>
  );
};

export { FeedSideBar };
