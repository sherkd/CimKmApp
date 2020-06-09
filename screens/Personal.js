import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView} from 'react-native'
import GenericScreenStyle from '../styles/GenericScreenSS'
import PersonalInfoScreen from '../components/personal/PersonalInfoScreen'

export default function Personal({ navigation }) {
  return (
    <SafeAreaView style={GenericScreenStyle.safeAreaViewContainer}>
      <View style={GenericScreenStyle.full}>
        <View style={GenericScreenStyle.container}>
          <View style={GenericScreenStyle.top}>
              <View style={GenericScreenStyle.titleContainer}>
                  <Text style={GenericScreenStyle.smallTitle}>PERSOONLIJK</Text>
              </View>
          </View>
          <View style={styles.bottom}>
              {/* <Button title='Persoonlijke Info' onPress={() => navigation.navigate('Persoonlijk Info')}></Button> */}
              <Button title='Export naar Excel' onPress={() => navigation.navigate('ExportToExcel')}></Button>
              {/* <Button title='Verwijder data van ritten' onPress={() => navigation.navigate('Persoonlijk Info')}></Button> */}
              {/* <Button title='Bugs/Tips Reporter' onPress={() => navigation.navigate('Persoonlijk Info')}></Button> */}
          </View>
        </View>
      </View>  
    </SafeAreaView>
  );
}
  

const styles = StyleSheet.create({
  bottom: {
      flex: 6,
  },
  bigBtn:{
      flex: 1,
      borderColor: 'black',
      borderWidth: 2,   
  }
});
