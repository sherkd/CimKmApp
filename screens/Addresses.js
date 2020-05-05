import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView} from 'react-native'
import AddressScreen from '../components/addresses/AddressScreen'

export default function Rides() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.full}>
        <AddressScreen/>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  full:{
    flex: 1,
    alignItems: 'center',
  },
});
