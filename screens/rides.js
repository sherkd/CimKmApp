import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView } from 'react-native'
import RidesScreen from '../components/rides/RidesScreen'

export default function Rides() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.full}>
        <RidesScreen/>
      </View>
    </SafeAreaView>
  )
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  full:{
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
})