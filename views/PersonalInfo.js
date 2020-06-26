import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView} from 'react-native'
import PersonalInfoScreen from '../components/personal/PersonalInfoScreen'
import GenericScreenStyle from '../styles/GenericScreenSS'

export default function PersonalInfo({ navigation }) {
  return (
    <SafeAreaView style={GenericScreenStyle.safeAreaViewContainer}>
      <View style={GenericScreenStyle.full}>
          <View style={styles.top}>
              <PersonalInfoScreen/>
          </View>
          <View style={GenericScreenStyle.bottom}>
              <Button title='Terug' onPress={() => navigation.navigate('Persoonlijk Home')}></Button>  
          </View>
      </View>  
    </SafeAreaView>
  );
}
  

const styles = StyleSheet.create({
  top: {
      flex: 10,
  },
});
