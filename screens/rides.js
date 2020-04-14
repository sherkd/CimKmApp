import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput} from 'react-native'
import RidesApi from '../database/RidesApi'

export default function Rides() {
  return (
    <View style={styles.container}>
      <Text>RIDES</Text>
      <RidesApi/>
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})