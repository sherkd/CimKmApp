import React from 'react'
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView} from 'react-native'
import HomeScreenMap from '../components/home/HomeScreenMap'
import HomeScreenQuickStart from '../components/home/HomeScreenQuickStart'
// import { SafeAreaView } from 'react-native-safe-area-context';
import GenericScreenStyle from '../styles/GenericScreenSS'

export default function Home({ navigation }) {
    return (
      <SafeAreaView style={GenericScreenStyle.safeAreaViewContainer}>
        <View style={styles.upper}>
          <HomeScreenMap />
        </View>
        <View style={styles.middle}>
          <Button title='Start Navigation' onPress={() => navigation.navigate('Tracking')}></Button>
        </View>
        <View style={styles.bottom}>
          <HomeScreenQuickStart/>
        </View>
      </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    upper:{
      flex: 4,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
    },
    middle:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottom:{
      flex: 3,
      paddingBottom: 29
    }
});
