import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput} from 'react-native'

export default function Home() {
    return (
      <View style={styles.container}>
        <Text>HOME</Text>
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