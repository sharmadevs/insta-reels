import { ImageSourcePropType } from "react-native";

interface APPIMAGEURLS {
    mute: ImageSourcePropType;
    volume: ImageSourcePropType;
    more: ImageSourcePropType;
    heart: ImageSourcePropType;
    comment: ImageSourcePropType;
    share: ImageSourcePropType;
    user: ImageSourcePropType;
    splash:ImageSourcePropType
}
const APPIMAGEURL: APPIMAGEURLS = {
    mute: require('../assets/Icons/mute.png'),
    volume: require('../assets/Icons/volume.png'),
    more: require('../assets/Icons/more.png'),
    heart: require('../assets/Icons/heart.png'),
    comment: require('../assets/Icons/comment.png'),
    share: require('../assets/Icons/share.png'),
    user: require('../assets/user.webp'),
    splash: require('../assets/insta-splash.png'),
}
export default APPIMAGEURL;