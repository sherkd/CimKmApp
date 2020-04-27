import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import * as DbRidesApi from '../../database/DbRidesApi'
import { Button } from 'react-native-paper'

function Item({ fromAddress, toAddress, distance }) {
    return (
        <View style={styles.item}>
            <View style={styles.itemContainerLeft}>
                <Text style={styles.itemTitle}>Van {fromAddress}</Text>
                <Text style={styles.itemTitle}>Naar {toAddress}</Text>
                <Text style={styles.itemText}>Afstand: {distance}</Text>
            </View>
            <View style={styles.itemContainerRight}> 
                <Button style={styles.button} title='START'><Text style={styles.itemText}>Wijzig</Text></Button>
            </View>
        </View>
    );
}

class RidesScreen extends Component {
    state = {

    }

    componentDidMount = () => {
        DbRidesApi.createRidesTable()
    }
    
    componentDidUpdate = () => {

    }

    componentWillUnmount = () => {

    }
   
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>RIDES</Text>
                    </View>
                </View>
                <View style={styles.middle}>
                    <View style={styles.boxView}>
                        {/* <FlatList
                        data={}
                        renderItem={({ item }) => <Item fromAddress={item.fromAddress} toAddress={item.toAddress} distance={item.distance} />}
                        keyExtractor={item => item.id}
                        /> */}
                        <Item fromAddress={"Teststraat"} toAddress={"Straattest"} distance={"26"} />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Button onPress={() => <Item/>}>Add Item</Button>

                    <Button onPress={() => DbRidesApi.InsertRides('a', 'a','a','a','a','a','a','a','a')}>Insert Table</Button>
                    <Button onPress={() => DbRidesApi.getRides()}>Get Table</Button>
                    <Button onPress={() => DbRidesApi.clearRidesTable()}>Clear Table</Button>
                </View>
            </View>
        )
    }
}
export default RidesScreen

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'red',
        width: '100%'
    },
    top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middle:{
        flex: 6,
    },
    bottom: {
        flex: 2
    },
    boxView: {
        flex: 1,
        borderWidth: 2,
        backgroundColor: 'gray',
    },
    titleContainer: {
        borderWidth: 2,
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        height: '70%',
    },
    item: {
        flexDirection: "row",
        backgroundColor: 'silver',
        borderWidth: 2,
        padding: 10,
        margin: 10,
    },
    itemContainerLeft: {
        flex: 4
    },
    itemContainerRight: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    itemText: {
        fontSize: 13,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",    
    },
    button: {
        backgroundColor: 'lightgreen',
    },
    centered:{
        alignItems: 'center',
        justifyContent: 'center',
    },
})