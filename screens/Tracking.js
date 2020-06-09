import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView} from 'react-native'
import TrackingScreenMap from '../components/tracking/TrackingScreenMap'
import GenericScreenStyle from '../styles/GenericScreenSS'

export default function Tracking() {
    return (
      <SafeAreaView style={GenericScreenStyle.safeAreaViewContainer}>
        <View style={GenericScreenStyle.full}>
          <TrackingScreenMap/>
        </View>
      </SafeAreaView>
    );
}
  
