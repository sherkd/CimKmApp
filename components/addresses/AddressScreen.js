import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TextInput, Alert } from 'react-native'
import * as DbAddressApi from '../addresses/DbAddressesApi'
import { Button } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import ListItemStyle from '../../styles/ListItemSS'
import ViewModalStyle from '../../styles/ViewModalSS'
import FormModalStyle from '../../styles/FormModalSS'
import AddressModel from '../../models/AddressModel'
import { ScrollView } from 'react-native-gesture-handler'

class AddressScreen extends Component {
    state = {
        data: [],
        viewAddressModalVisible: false,
        updateAddressModalVisible: false,
        insertAddressModalVisible: false,
        selectedItem: Object,
    }

    _getAddress = async () => {
        this.setState( {
            data: await DbAddressApi.getAddresses()
        });
    }

    _getAddressById = async (item) => {
        await DbAddressApi.getAddressById(item.id);
    }

    _insertAddress = async (item) => {
        await DbAddressApi.insertAddresses(item);
    }

    _updateAddress = async (item) => {
        await DbAddressApi.updateAddresses(item);
    }

    _deleteAddress = async (id) => {
        await DbAddressApi.deleteAddresses(id);
    }
    
    _toggleViewAddressModal = () => {
        this.setState({ viewAddressModalVisible: !this.state.viewAddressModalVisible})
    }

    _toggleEditAddressModal = () => {
        this.setState({ updateAddressModalVisible: !this.state.updateAddressModalVisible})
    }

    _toggleInsertAddressModal = () => {
        this.setState({ insertAddressModalVisible: !this.state.insertAddressModalVisible})
    }

    _onSelect = (item) => {
        this.setState({ selectedItem: item })
    }

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
                        <Text style={styles.title}>ADRESSENBOEK</Text>
                    </View>
                </View>
                <View style={styles.middle}>
                    <View style={styles.boxView}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => 
                                <Item item={item} updateFunction = {this._updateAddress} deleteFunction = {this._deleteAddress} refreshFunction = {this._getAddress} 
                                insertFunction={this._insertAddress} viewModalFunction= {this._toggleViewAddressModal} updateModalFunction= {this._toggleEditAddressModal} 
                                viewModalVisibility={this.state.viewAddressModalVisible} updateModalVisibility={this.state.updateAddressModalVisible}
                                onSelect={this._onSelect} selectedItem={this.state.selectedItem}/>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Button onPress={() => {this._toggleInsertAddressModal()}}>Handmatig toevoegen</Button>
                    {/* <Button onPress={() => {DbAddressApi.clearAddressesTable(); this._getAddress()}}>Clear Table</Button> */}
                </View>
                <InsertModal visibleState={this.state.insertAddressModalVisible} modalFunction={this._toggleInsertAddressModal} insertFunction={this._insertAddress} 
                    refreshFunction={this._getAddress}/>
            </View>
        )
    }
}
export default AddressScreen

function Item({ item, updateFunction, deleteFunction, refreshFunction, insertFunction, viewModalFunction, 
                updateModalFunction, viewModalVisibility, updateModalVisibility, onSelect, selectedItem }) {
    return (
        <View style={ListItemStyle.item}>
            <View style={ListItemStyle.itemContainerLeft}>
                <Text style={ListItemStyle.itemTextBold}>Naam: <Text style={ListItemStyle.itemText}>{item.nickname}</Text></Text>
                <Text style={ListItemStyle.itemTextBold}>Adres: <Text style={ListItemStyle.itemText}>{item.street} </Text></Text>
                <Text style={ListItemStyle.itemText}>{item.city}, {item.postalCode}</Text>
                <Text style={ListItemStyle.itemText}>{item.region}, {item.country}</Text>
            </View>
            <View style={ListItemStyle.itemContainerRightThreeButtons}> 
                <View style={ListItemStyle.itemContainerRightTop}>
                    <Button onPress={() => {onSelect(item); updateModalFunction();}} style={ListItemStyle.button}><FontAwesome name="edit" color="black" size={16}/></Button>
                    <Button onPress={() => {deleteFunction(item.id); refreshFunction()}} style={ListItemStyle.deleteBtn}><FontAwesome name="trash" color="white" size={16}/></Button>
                </View>
                <View style={ListItemStyle.itemContainerRightBottom}>
                    <Button onPress={() => {onSelect(item); viewModalFunction();}} style={ListItemStyle.button}>Bekijk</Button>
                </View>
            </View>
            <ViewModal visibleState={viewModalVisibility} modalFunction={viewModalFunction} item={selectedItem} />
            <UpdateModal visibleState={updateModalVisibility} modalFunction={updateModalFunction} updateFunction={updateFunction} item={selectedItem} refreshFunction={refreshFunction}/>
        </View>
    )
}

function ViewModal({visibleState, modalFunction, item}){
    return (
        <Modal isVisible={visibleState} style={ViewModalStyle.modal}>
            <View style={ViewModalStyle.modalViewApple}>
                <View style={ViewModalStyle.form}>
                    <View style={ViewModalStyle.row}>
                        <Text style={styles.title}>Bijnaam: </Text>
                        <Text>{item.nickname}</Text> 
                    </View>
                    <View style={ViewModalStyle.row}>
                        <Text style={styles.title}>Adres: </Text>
                        <Text> {item.street} </Text> 
                    </View>
                    <View style={ViewModalStyle.row}>
                        <Text style={styles.title}>Postcode: </Text>
                        <Text> {item.postalCode} </Text>
                    </View>
                    <View style={ViewModalStyle.row}>
                        <Text style={styles.title}>Stad: </Text>
                        <Text> {item.city} </Text> 
                    </View>
                    <View style={ViewModalStyle.row}>
                        <Text style={styles.title}>Regio: </Text>
                        <Text> {item.region} </Text>    
                    </View>               
                    <View style={ViewModalStyle.row}>
                        <Text style={styles.title}>Land: </Text>
                        <Text> {item.country} </Text> 
                    </View>
                    <Button onPress={() => {modalFunction()}} style={ViewModalStyle.button}>Close</Button>
                </View>      
            </View>
        </Modal>
    )
}

function UpdateModal({visibleState, modalFunction, updateFunction, item, refreshFunction}){
    const [nickname, setNickname] = useState(item.nickname)
    const [street, setStreet] = useState(item.street)
    const [postalCode, setPostalCode] = useState(item.postalCode)
    const [city, setCity] = useState(item.city)
    const [region, setRegion] = useState(item.region)
    const [country, setCountry] = useState(item.country)

    const formValues = {nickname, street, postalCode, city, region, country}

    const fieldsValidator = (item, fields) => {
        const completeField = new AddressModel()
        completeField.id = item.id
        for (let [key, value] of Object.entries(fields)) {
            if (value == undefined || value == '') {
                completeField[key] = item[key]
            }
            else{
                completeField[key] = value
            }
        }
        return completeField
    }
    
    return (
        <Modal isVisible={visibleState} style={FormModalStyle.modal}> 
            <View style={FormModalStyle.modalView}>
                <ScrollView>
                    <View style={FormModalStyle.form}>
                        <View style={FormModalStyle.row}>
                            <Text style={styles.title}>Bijnaam: </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setNickname(text)}
                                defaultValue={item.nickname}
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={styles.title}>Adres: </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setStreet(text)}
                                defaultValue={item.street}
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={styles.title}>Postcode: </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setPostalCode(text)}
                                defaultValue={item.postalCode}
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={styles.title}>Stad: </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setCity(text)}
                                defaultValue={item.city}
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={styles.title}>Regio: </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setRegion(text)}
                                defaultValue={item.region}
                            />    
                        </View>               
                        <View style={FormModalStyle.row}>
                            <Text style={styles.title}>Land: </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setCountry(text)}
                                defaultValue={item.country}
                            />    
                        </View>
                    </View>    
                </ScrollView>  
                <View style={FormModalStyle.btnRow}>
                    <View style={FormModalStyle.columnLeft}>
                        <Button onPress={() => {updateFunction(fieldsValidator(item, formValues)); refreshFunction(); modalFunction()}} 
                            style={FormModalStyle.button}>Opslaan</Button>
                    </View>
                    <View style={FormModalStyle.columnRight}>
                        <Button onPress={() => {modalFunction()}} style={FormModalStyle.button}>Annuleren</Button>
                    </View>                      
                </View>
            </View>
        </Modal>
    )
}

function InsertModal({visibleState, modalFunction, insertFunction, refreshFunction}){
    const [nickname, setNickname] = useState('')
    const [street, setStreet] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [region, setRegion] = useState('')
    const [country, setCountry] = useState('')

    const formValues = {nickname, address: street, postalCode, city, region, country}

    const fieldsValidator = (fields) => {
        const completeField = new AddressModel()
        for (let [key, value] of Object.entries(fields)) {
            if (value == undefined || value == '') {
                completeField[key] = ""
            }
            else{
                completeField[key] = value
            }
        }
        return completeField
    }

    return (
        <Modal isVisible={visibleState} style={FormModalStyle.modal}> 
            <View style={FormModalStyle.modalView}>
                <ScrollView>
                    <View style={FormModalStyle.form}>
                        <View style={FormModalStyle.row}>
                            <Text style={styles.title}>Bijnaam: </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setNickname(text)}
                                defaultValue=""
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={styles.title}>Adres: </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setStreet(text)}
                                defaultValue=""
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={styles.title}>Postcode: </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setPostalCode(text)}
                                defaultValue=""
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={styles.title}>Stad: </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setCity(text)}
                                defaultValue=""
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={styles.title}>Regio: </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setRegion(text)}
                                defaultValue=""
                            />    
                        </View>               
                        <View style={FormModalStyle.row}>
                            <Text style={styles.title}>Land: </Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={text => setCountry(text)}
                                defaultValue=""
                            />    
                        </View>
                    </View>
                </ScrollView>    
                <View style={FormModalStyle.btnRow}>
                    <View style={FormModalStyle.columnLeft}>
                        <Button onPress={() => {insertFunction(fieldsValidator(formValues)); refreshFunction(); modalFunction()}} 
                            style={FormModalStyle.button}>Save</Button>
                    </View>
                    <View style={FormModalStyle.columnRight}>
                        <Button onPress={() => {modalFunction()}} style={FormModalStyle.button}>Cancel</Button>
                    </View>                      
                </View>  
            </View>
        </Modal>
    )
}

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
    centered:{
        alignItems: 'center',
        justifyContent: 'center',
    }
})