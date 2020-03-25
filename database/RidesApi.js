import firestore from '@react-native-firebase/firestore'

export async function getRides (ridesRetrieved) {
    var ridesList = []

    var snapshot = await firestore()
        .collection('db')
        .doc('rides')
        .get()
    
    snapshot.forEach((doc) => {
        ridesList.push(doc.data())
    })

    ridesRetrieved(ridesList)
}

        <View style={styles.container}>
          <View style={styles.upper}>
            {/* <Text>Upper Screen</Text> */}
            <HomeScreenMap/>
          </View>
          <View style={styles.middle}>
            {/* <Text>Middle Screen</Text> */}
            <Button title='Start Navigation' onPress={() => navigation.navigate('Tracking')}></Button>
          </View>
          <View style={styles.bottom}>
            {/* <Text>Lower Screen</Text> */}
            <HomeScreenQuickStart/>
          </View>
        </View>