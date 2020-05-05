import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import { Button } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import * as DbAddressApi from '../../database/DbAddressesApi'

function Item({ item, updateFunction, deleteFunction, refreshFunction, modalFunction }) {
    return (
        <View style={styles.item}>
            <View style={styles.itemContainerLeft}>
                <Text style={styles.itemTitle}>Naam: {item.nickname}</Text>
                <Text style={styles.itemText}>Adres: {item.street} {item.city} </Text>
                <Text style={styles.itemText}>{item.country} {item.postalCode}</Text>
            </View>
            <View style={styles.itemContainerRight}> 
                <View style={styles.itemContainerRightTop}>
                    <Button onPress={() => {updateFunction(item); refreshFunction()}} style={styles.editBtn}><FontAwesome name="edit" color="black" size="16"/></Button>
                    <Button onPress={() => {deleteFunction(item.id); refreshFunction()}} style={styles.deleteBtn}><FontAwesome name="trash" color="white" size="16"/></Button>
                </View>
                <View style={styles.itemContainerRightBottom}>
                    <Button onPress={() => {modalFunction()}} style={styles.editBtn}><Text style={styles.itemText}>Bekijk</Text></Button>
                </View>
            </View>
        </View>
    )
}

class AddressScreen extends Component {
    state = {
        data: [],
        isModalVisible: false,
        selectedItem: null,
    }

    _getAddress = async () => {
        this.setState( {
            data: await DbAddressApi.getAddresses()
        });
    }

    _updateAddress = async (item) => {
        console.log(item);
        await DbAddressApi.updateAddresses(item.id);
    }

    _deleteAddress = async (id) => {
        await DbAddressApi.deleteAddresses(id);
    }
    
    _toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    componentDidMount = () => {
        DbAddressApi.createAddressTable()
        this._getAddress()
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
                        <Text style={styles.title}>ADDRESSES</Text>
                    </View>
                </View>
                <View style={styles.middle}>
                    <View style={styles.boxView}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => 
                                <Item item={item} updateFunction = {this._updateAddress} deleteFunction = {this._deleteAddress} 
                                refreshFunction = {this._getAddress} modalFunction= {this._toggleModal} />}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    
                </View>
                <View style={styles.bottom}>
                    <Button onPress={() => {DbAddressApi.insertAddresses('a','a','a','a','a','a'); this._getAddress()}}>Insert Table</Button>
                    <Button onPress={() => {DbAddressApi.clearAddressesTable(); this._getAddress()}}>Clear Table</Button>
                </View>
                <View >
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={styles.modalView} >
                            <Text>Hello!</Text>                  
                            <Button onPress={this._toggleModal}>Close</Button>
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }
}
export default AddressScreen

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'red',
        width: '100%',
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
    item: {
        flexDirection: "row",
        backgroundColor: 'silver',
        borderWidth: 2,
        padding: 10,
        margin: 10,
    },
    itemContainerLeft: {
        flex: 4,
        borderWidth: 2,
        borderColor: 'yellow'
    },
    itemContainerRight: {

        borderWidth: 2,
        borderColor: 'blue'
    },
    itemContainerRightTop: {
        flexDirection: 'row',
    },
    itemContainerRightBottom: {

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
    editBtn: {
        backgroundColor: 'lightgreen',
        margin: 2.5,
    },
    deleteBtn: {
        backgroundColor: 'red',
        margin: 2.5,
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
        height: '20%',
    }, 
})