# Insta Reels
# React Native

This project aims to be a strong foundation for react-native applications. It provides a clear and organized structure, core dependencies, and boilerplate to jumpstart development.

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)


### Getting Started

Make sure node version installed is `>=10.x.x`. Then install using yarn (or npm):
```
yarn install
```

Start the Metro Bundler:
```
yarn start
```

###### iOS

One time. Move to `ios` folder and install pods:

```
cd ios && pod install
```

Launch application from XCode (`Command + R`) Or launch from Terminal:

```
yarn ios
# runs the following command. change device name here
# `npx react-native run-ios`
```

###### Android

Start an Android Simulator from:
```
Android Studio > Tools > AVD Manager > Run any device
```

Similarly, run from Android Studio itself Or from Terminal:
```
yarn android
# runs the following command
# npx react-native run-android
```
