import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import * as firebase from 'firebase';
// import firebase from 'firebase'
// import '@firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA6vY-4C_RK98ZbHpFYF2OSxbFd7SVinVE",
  authDomain: "cim-km-app.firebaseapp.com",
  databaseURL: "https://cim-km-app.firebaseio.com/db/rides",
  storageBucket: "cim-km-app.appspot.com/",
  projectId: 'cim-km-app',
}

export default class RidesApi extends Component {
  state = {
    dbh: null,
    dataSource: Object,
  }
  
  _checkIfDuplicateAppExists = () => {!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()}

  _getRides = () => {

    var userId = firebase.auth().currentUser.uid;
    // var docRef = firebase.firestore().collection("db").doc("mario");

    // docRef.get()
    // console.log(docRef)

    // docRef.get().then(function(doc) {
    //   if (doc.exists) {
    //       console.log("Document data:", doc.data());
    //   } else {
    //       // doc.data() will be undefined in this case
    //       console.log("No such document!");
    //   }
    // }).catch(function(error) {
    //     console.log("Error getting document:", error);
    // })

    // docRef.get().then((snapshot) => {
    //   snapshot.forEach((doc) => {
    //     console.log(doc.id, '=>', doc.data());
    //   });
    // })
    // .catch((err) => {
    //   console.log('Error getting documents', err);
    // });  

    return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      // ...
    })

    // firebase.database().ref('db').on('value', snapshot => {
    //   let count = snapshot.val().count;
    //   this.setState({ count });
    //   snapshot.forEach((doc) => {
    //     console.log(doc.id, '=>', doc.data());
    //   });
    // });

  }

  _addRides = () => {
    // firebase.firestore().collection("db").doc("mario").set({
    //   employment: "plumber",
    //   outfitColor: "red",
    //   specialAttack: "fireball"
    // })


  }

  componentDidMount = () => {
    this._checkIfDuplicateAppExists()
    this._addRides()
    this._getRides()
  }

  render() {
    return (
        <View>
            <Text>TEST</Text>
        </View>
    )
  }
}
