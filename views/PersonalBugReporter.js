import React from 'react'
import { StyleSheet, View, Button, SafeAreaView} from 'react-native'
import BugReporterScreen from '../components/personal/BugReporter'
import GenericScreenStyle from '../styles/GenericScreenSS'

export default function PersonalExport({ navigation }) {
  return (
    <SafeAreaView style={GenericScreenStyle.safeAreaViewContainer}>
      <View style={GenericScreenStyle.full}>
          <View style={styles.top}>
              <BugReporterScreen/>
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
