import React from 'react'
import { StyleSheet, Text, View, Button, TextInput} from 'react-native'
import HomeScreenMap from '../components/Home/HomeScreenMap'
import HomeScreenQuickStart from '../components/Home/HomeScreenQuickStart'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({ navigation }) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.upper}>
          {/* <Text>Upper Screen</Text> */}
          <HomeScreenMap />
        </View>
        <View style={styles.middle}>
          {/* <Text>Middle Screen</Text> */}
          <Button title='Start Navigation' onPress={() => navigation.navigate('Tracking')}></Button>
        </View>
        <View style={styles.bottom}>
          {/* <Text>Lower Screen</Text> */}
          <HomeScreenQuickStart/>
        </View>
      </SafeAreaView>
    );
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
      // borderColor: 'black',
      // borderWidth: 2
    },
    upper:{
      flex: 4,
      alignItems: 'center',
      justifyContent: 'center',
      // borderColor: 'red',
      borderWidth: 2,
      // margin: 1
    },
    middle:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // borderColor: 'blue',
      // borderWidth: 2,
      // margin: 1
    },
    bottom:{
      flex: 3,
      // alignItems: 'center',
      // justifyContent: 'center',
      // borderColor: 'green',
      // borderWidth: 2,
      // paddingTop: 15
    },
    centered:{
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      
    }
});