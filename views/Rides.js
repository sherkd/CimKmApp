import React from 'react'
import { View, SafeAreaView } from 'react-native'
import RidesScreen from '../components/rides/RidesScreen'
import GenericScreenStyle from '../styles/GenericScreenSS'

export default function Rides() {
  return (
    <SafeAreaView style={GenericScreenStyle.safeAreaViewContainer}>
      <View style={GenericScreenStyle.full}>
        <RidesScreen/>
      </View>
    </SafeAreaView>
  )
}
