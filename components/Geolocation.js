import React, { Component } from 'react'
import { View, Text, Switch, StyleSheet} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

class SwichExample extends Component {
   state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      currentPosition: {
         longitude: Number,
         latitude: Number,
      },
      watchID: Number,
      region: {
         latitude: 0,
         longitude: 0,
         latitudeDelta: 0.0025,
         longitudeDelta: 0.0025,
      }
   }

   componentDidMount = () => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            const initialPosition = JSON.stringify(position);
            this.setState({ initialPosition });
         },
         (error) => alert(error.message),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
         this.setState({ 
            lastPosition: JSON.stringify(position),
            currentPosition: {
               longitude: JSON.stringify(position.coords.longitude),
               latitude: JSON.stringify(position.coords.latitude),
            },
            region:{
               longitude: JSON.stringify(position.coords.longitude),
               latitude: JSON.stringify(position.coords.latitude),
               latitudeDelta: 0.0025,
            	longitudeDelta: 0.0025,
            }
         });
      });
      
   }
   componentWillUnmount = () => {
      navigator.geolocation.clearWatch(this.watchID)
   }
   
   render() {
      return (
         // <View style = {styles.container}>
         //    <Text style = {styles.boldText}>
         //       Initial position:
         //    </Text>
            
         //    <Text>
         //       {this.state.initialPosition}
         //    </Text>
            
         //    <Text style = {styles.boldText}>
         //       Current position:
         //    </Text>
            
         //    <Text>
         //       {this.state.lastPosition}
         //    </Text>
         // </View>
         <View>
            {/* <MapView style={styles.mapStyleSmall} showsUserLocation followsUserLocation loadingEnabled showsTraffic provider={PROVIDER_GOOGLE} region={this.state.region}/> */}
            <MapView style={styles.mapStyleSmall} showsUserLocation followsUserLocation loadingEnabled showsTraffic region={this.state.region} />
         </View>
      )
   }
}
export default SwichExample

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 50
   },
   boldText: {
      fontSize: 30,
      color: 'red',
   },
   mapStyleSmall: {
      width: 360,
      height: 300,
   }
})