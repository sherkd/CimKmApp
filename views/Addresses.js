import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView} from 'react-native'
import AddressScreen from '../components/addresses/AddressScreen'
import GenericScreenStyle from '../styles/GenericScreenSS'

export default function Rides() {
  return (
    <SafeAreaView style={GenericScreenStyle.safeAreaViewContainer}>
      <View style={GenericScreenStyle.full}>
        <AddressScreen/>
      </View>
    </SafeAreaView>
  );
}