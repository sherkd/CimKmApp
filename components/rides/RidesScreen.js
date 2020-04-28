import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import * as DbRidesApi from '../../database/DbRidesApi'
import { Button } from 'react-native-paper'

function Item({ item, updateFunction, deleteFunction, refreshFunction  }) {
    return (
        <View style={styles.item}>
            <View style={styles.itemContainerLeft}>
                <Text style={styles.itemTitle}>Van {item.fromAddress}</Text>
                <Text style={styles.itemTitle}>Naar {item.toAddress}</Text>
                <Text style={styles.itemText}>Afstand: {item.distance}</Text>
            </View>
            <View style={styles.itemContainerRight}> 
                <Button onPress={() => {updateFunction(item)}} style={styles.button} title='START'><Text style={styles.itemText}>Wijzig</Text></Button>
                <Button onPress={() => {deleteFunction(item.id); refreshFunction()}} style={styles.button} title='START'><Text style={styles.itemText}>Verwijder</Text></Button>
            </View>
        </View>
    );
}

class RidesScreen extends Component {
    state = {
        data: []
    }

    _getRides = async () => {
        this.setState( {
            data: await DbRidesApi.getRides()
        });
    }

    _deleteRide = async (id) => {
        await DbRidesApi.deleteRide(id);
    }

    _updateRide = async (item) => {
        console.log(item);
    }

    componentDidMount = () => {
        DbRidesApi.createRidesTable()
        this._getRides();
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
                        <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => <Item item={item} updateFunction = {this._updateRide} deleteFunction = {this._deleteRide} refreshFunction = {this._getRides}  />}
                        keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Button onPress={() => {DbRidesApi.InsertRides('a', 'a','a','a','a','a','a','a','a'); this._getRides()}}>Insert Table</Button>
                    <Button onPress={() => {DbRidesApi.clearRidesTable(); this._getRides()}}>Clear Table</Button>
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
        flex: 1,
        justifyContent: 'center',
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
        flex: 6,
        flexDirection: 'row',
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