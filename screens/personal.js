import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput} from 'react-native'

export default function Rides() {
  return (
    <View style={styles.container}>
      <Text>PERSONAL</Text>
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
});