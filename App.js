import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './routes/app-navigator.js'

export default function App() {
  return (
    <Navigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textinput: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  button:{
    padding: 10,
  }
});
