import React from 'react'
import { StyleSheet, View, Button} from 'react-native'
import HomeScreenMap from '../components/home/HomeScreenMap'
import HomeScreenQuickStart from '../components/home/HomeScreenQuickStart'
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Button } from 'react-native-paper'
import GenericScreenStyle from '../styles/GenericScreenSS'

export default function Home({ navigation }) {
    return (
      <SafeAreaView style={GenericScreenStyle.safeAreaViewContainer}>
        <View style={styles.upper}>
          <HomeScreenMap />
        </View>
        <View style={styles.middle}>
          <Button title='Start Navigatie' onPress={() => navigation.navigate('Tracking')}></Button>
          {/* <Button onPress={() => navigation.navigate('Tracking')}>Start Navigatie</Button> */}
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
      padding: '.3%',
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
