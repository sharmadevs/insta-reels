import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { AppContextProvider } from './src/context';
import CommonStyle from './src/theme/CommonStyle';
import { NoConnection } from './src/components';
import AppNavigation from './src/navigation';


const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  let netInfoSubscription: (() => void) | null = null;

  useEffect(() => {
    manageConnection();
    return () => {
      if (netInfoSubscription) {
        netInfoSubscription();
      }
    };
  }, []);

  const manageConnection = () => {
    retryConnection();
    netInfoSubscription = NetInfo.addEventListener(handleConnectivityChange);
  };

  // Managed internet connection
  const handleConnectivityChange = (info: { type: string; isConnected: any; }) => {
    if (info.type === 'none' || !info.isConnected) {
      setIsConnected(false);
    } else {
      setIsConnected(true);
    }
  };

  // Check network connection
  const retryConnection = () => {
    NetInfo.fetch().then(handleConnectivityChange);
  };
  return (
    <AppContextProvider>
      <View style={CommonStyle.flexContainer}>
        <AppNavigation />
        {(!isConnected && <NoConnection retryConnection={retryConnection} />) ||
          null}
      </View>
    </AppContextProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
