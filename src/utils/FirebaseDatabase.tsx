import React from "react";
import database from '@react-native-firebase/database';
import { Alert } from "react-native";
var fetching: boolean = false
class FirebaseDataService {

    async getData() {
        var reels: any[] = []
        return database().ref("data/").once('value', function (snapshot) {
            reels = snapshot.val();
            return reels
        });

    }
}
const FirebaseInstance = new FirebaseDataService();
export default FirebaseInstance;