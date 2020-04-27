import React from 'react'
import { StyleSheet, Text, View, Button} from 'react-native'
import TrackingScreenMap from '../components/tracking/TrackingScreenMap'

export default function Tracking() {
    return (
      <View style={styles.container}>
        <TrackingScreenMap/>
      </View>
    );
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    upper:{
      flex: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottom:{
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    centered:{
      alignItems: 'center',
      justifyContent: 'center',
    }
});