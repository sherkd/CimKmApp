import React from 'react'
import { StyleSheet, Text, View, SafeAreaView,} from 'react-native'
import GenericScreenStyle from '../styles/GenericScreenSS'
import { Button } from 'react-native-paper'

export default function Personal({ navigation }) {
  return (
    <SafeAreaView style={GenericScreenStyle.safeAreaViewContainer}>
      <View style={GenericScreenStyle.full}>
        <View style={styles.container}>
          <View style={GenericScreenStyle.top}>
              <View style={GenericScreenStyle.titleContainer}>
                  <Text style={GenericScreenStyle.smallTitle}>PERSOONLIJK</Text>
              </View>
          </View>
          <View style={styles.bottom}>
              <Button title='Persoonlijke Info' onPress={() => navigation.navigate('Persoonlijk Info')}>Persoonlijke Info</Button>
              <Button title='Export naar Excel' onPress={() => navigation.navigate('ExportToExcel')}>Export naar Excel</Button>
              {/* <Button title='Verwijder data van ritten' onPress={() => navigation.navigate('Persoonlijk Info')}>Verwijder data van ritten</Button> */}
              <Button title='Bugs/Tips Reporter' onPress={() => navigation.navigate('BugReporter')}>Bugs/Tips Reporter</Button>
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
  container: {
    flex: 1,
    width: '100%',
  }
});
