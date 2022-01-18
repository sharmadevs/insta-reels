import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Animated, FlatList, StatusBar } from 'react-native';
import { FeedRow } from '../components';
import { AppContext } from '../context';
import CommonStyle from '../theme/CommonStyle';
import { height, isIOS } from '../utils/Constant';
import database from '@react-native-firebase/database';
import FirebaseInstance from '../utils/FirebaseDatabase';
const Home = () => {
  const { displayHeight, setDisplayHeight }: any = useContext(AppContext);
  const refFlatList = useRef<Animated.FlatList>();
  const [scrollY] = useState(new Animated.Value(0));
  const [scrollInfo, setScrollInfo] = useState({ isViewable: true, index: 0 });
  const [flatlistData, setFlatListData] = useState([])

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 80 };
  const onViewableItemsChanged = useRef((viewableItems: { changed: { index: any; }[]; }) => {
    const info = {
      isViewable: viewableItems.changed[0].isViewable,
      index: viewableItems.changed[0].index,
    };
    setScrollInfo(info);
  });

  const transitionAnimation = (index: number) => {
    const rowHeight = displayHeight * index;
    return {
      opacity: scrollY.interpolate({
        inputRange: [
          rowHeight,
          rowHeight + displayHeight / 2,
          rowHeight + displayHeight,
        ],
        outputRange: [1, 0.2, 0],
        useNativeDriver: true,
        extrapolate: 'clamp',
      }),
    };
  };

  const getItemLayout = (item: any, index: number) => ({
    length: displayHeight,
    offset: displayHeight * index,
    index,
  });

  const onLayout = ({ nativeEvent }: any) => {
    setDisplayHeight((!isIOS && nativeEvent.layout.height) || height);
  };

  const onEndReached = () => {
    // make api call here
  };

  const keyExtractor = (item: { id: any; }, index: any) => {
    return `${item.id}`;
  };

  const renderItem = ({ item, index }: any) => {
    var scrollIndex = scrollInfo?.index || 0;
    var isNext = index >= scrollIndex - 1 && index <= scrollIndex + 1;
    const onProgress = (videoObj: any) => {
      var progress = parseInt(videoObj.currentTime)
      if (progress >= 30) {
      

      } else {
        
      }
    }
    return (
      <FeedRow
        item={item}
        isNext={isNext}
        index={index}
        transitionAnimation={transitionAnimation}
        visible={scrollInfo}
        isVisible={scrollIndex === index}
        onProgress={(e: any) =>{}
        }
      />
    );
  };

  useEffect(() => {
    getFirebaseData()
  }, [])
  const getFirebaseData = async () => {
    var reels = await FirebaseInstance.getData();
    var newObj = JSON.stringify(reels);
    var element = JSON.parse(newObj)
    setFlatListData(element);
  }

  return (
    <>
    <StatusBar translucent backgroundColor="transparent" />
    <View style={CommonStyle.flexContainer} onLayout={onLayout}>
      <Animated.FlatList
        pagingEnabled
        showsVerticalScrollIndicator={false}
        ref={refFlatList}
        automaticallyAdjustContentInsets={true}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        data={flatlistData}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={20}
        onEndReached={onEndReached}
        removeClippedSubviews={true}
      />
    </View>
    </>
  );
};

export default Home;
