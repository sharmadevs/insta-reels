import React, { createContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { DEFAULT_THEME, Theme } from '../theme';
import APPSTRING from '../theme/String';
import { height } from '../utils/Constant';
import { setItemInStorage, getItemFromStorage } from '../utils/Storage';

const APP_THEME = APPSTRING.LIGHT;

// App Conext for App Theme, display height and Video Volume
export const AppContext = createContext({
  appTheme: DEFAULT_THEME,
  initializeAppTheme: () => { },
  setAppTheme: () => { },
});

export const AppContextProvider = ({ children }:any) => {
  const [appTheme, setAppTheme] = useState(DEFAULT_THEME);
  const [isInit, setIsInit] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [displayHeight, setDisplayHeight] = useState(height);

  useEffect(() => {
    setInitialLoad();
  });

  const setInitialLoad = async () => {
    if (isInit) {
      await initializeAppTheme(APP_THEME);
      setIsInit(false);
    }
  };

  const setTheme = (theme: string) => {
    setAppTheme(theme);
    setItemInStorage(APP_THEME, theme);
  };

  const initializeAppTheme = async (themeType: string) => {
    const currentTheme: string | null | any = await getItemFromStorage(APP_THEME);
    if (!currentTheme && !themeType) {
      const colorScheme = Appearance.getColorScheme();
      setAppTheme((colorScheme && colorScheme) || DEFAULT_THEME);
    } else {
      if (themeType) {
        setAppTheme(themeType);
        setItemInStorage(APP_THEME, themeType);
      } else {
        setAppTheme(currentTheme);
      }
    }
  };

  const onSetIsMute = () => {
    setIsMute(!isMute);
  };
  console.log(appTheme);
  
  return (
    <AppContext.Provider
      value={{
        isMute,
        setIsMute: onSetIsMute,
        displayHeight,
        setDisplayHeight,
        appTheme: Theme[appTheme],
        setAppTheme: setTheme,
        ...initializeAppTheme,
      }}>
      {children}
    </AppContext.Provider>
  );
};
