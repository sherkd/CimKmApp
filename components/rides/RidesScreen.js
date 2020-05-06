import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TextInput } from 'react-native'
import * as DbRidesApi from '../../database/DbRidesApi'
import { Button } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import RidesItemStyle from '../../styles/RidesItem'

class RidesScreen extends Component {
    state = {
        data: [],
        isModalVisible: false,
        selectedItem: null,
    }

    _getRides = async () => {
        this.setState( {
            data: await DbRidesApi.getRides()
        });
    }

    _updateRide = async (item) => {
        console.log(item);
        await DbRidesApi.updateRides(item.id);
    }

    _deleteRide = async (id) => {
        await DbRidesApi.deleteRide(id);
    }

    _toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible})
    }

    componentDidMount = () => {
        DbRidesApi.createRidesTable()
        this._getRides()
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
                            renderItem={({ item }) => 
                                <Item item={item} updateFunction = {this._updateRide} deleteFunction = {this._deleteRide} 
                                refreshFunction = {this._getRides} modalFunction= {this._toggleModal} />}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Button onPress={() => {DbRidesApi.insertRides('a','a','a','a','a','a','a','a','a'); this._getRides()}}>Insert Table</Button>
                    <Button onPress={() => {DbRidesApi.clearRidesTable(); this._getRides()}}>Clear Table</Button>
                </View>
                <ViewModal visibleState={this.state.isModalVisible} modalFunction={this._toggleModal} />
            </View>
        )
    }
}
export default RidesScreen

function Item({ item, updateFunction, deleteFunction, refreshFunction, modalFunction }) {
    return (
        <View style={RidesItemStyle.item}>
            <View style={RidesItemStyle.itemContainerLeft}>
                <Text style={RidesItemStyle.itemTitle}>Van {item.fromAddress}</Text>
                <Text style={RidesItemStyle.itemTitle}>Naar {item.toAddress}</Text>
                <Text style={RidesItemStyle.itemText}>Afstand: {item.distance}</Text>
            </View>
            <View style={RidesItemStyle.itemContainerRight}> 
                <View style={RidesItemStyle.itemContainerRightTop}>
                    <Button onPress={() => {updateFunction(item); refreshFunction()}} style={RidesItemStyle.button}><FontAwesome name="edit" color="black" size="16"/></Button>
                    <Button onPress={() => {deleteFunction(item.id); refreshFunction()}} style={RidesItemStyle.deleteBtn}><FontAwesome name="trash" color="white" size="16"/></Button>
                </View>
                <View style={RidesItemStyle.itemContainerRightBottom}>
                    <Button onPress={() => {modalFunction()}} style={RidesItemStyle.button}><Text style={RidesItemStyle.itemText}>Bekijk</Text></Button>
                </View>
            </View>
        </View>
    )
}

function ViewModal({visibleState, modalFunction}){
    return (
        <Modal isVisible={visibleState}>
            <View style={styles.modalView}>
                <Text>Hello!</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeText(text)}
                    value="placeholder"
                />                  
                <Button onPress={() => {modalFunction()}}>Close</Button>
            </View>
        </Modal>
    )
}

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
    title: {
        fontSize: 16,
        fontWeight: "bold",    
    },
    centered:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        backgroundColor: 'white', 
        padding: '5%', 
        borderWidth: 2, 
        borderColor: 'red',
        alignItems: 'center',
        // justifyContent: 'center',
        // height: '20%',
    }, 
})