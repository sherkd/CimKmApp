import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TextInput, Alert } from 'react-native'
import * as DbRidesApi from '../../database/DbRidesApi'
import { Button } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import RidesItemStyle from '../../styles/RidesItemSS'
import RidesViewModalStyle from '../../styles/RidesViewModalSS'
import RidesUpdateModalStyle from '../../styles/RidesUpdateModalSS'

class RidesScreen extends Component {
    state = {
        data: [],
        viewRideModalVisible: false,
        updateRideModalVisible: false,
    }

    _getRides = async () => {
        this.setState( {
            data: await DbRidesApi.getRides()
        });
    }

    _updateRide = async (item) => {
        // console.log(item);
        await DbRidesApi.updateRides(item.id);
    }

    _deleteRide = async (id) => {
        await DbRidesApi.deleteRide(id);
    }

    _toggleViewRideModal = () => {
        this.setState({ viewRideModalVisible: !this.state.viewRideModalVisible})
    }

    _toggleEditRideModal = () => {
        this.setState({ updateRideModalVisible: !this.state.updateRideModalVisible})
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
                                <Item item={item} updateFunction = {this._updateRide} deleteFunction = {this._deleteRide} refreshFunction = {this._getRides} 
                                viewModalFunction= {this._toggleViewRideModal} updateModalFunction= {this._toggleEditRideModal} 
                                viewModalVisibility={this.state.viewRideModalVisible} updateModalVisibility={this.state.updateRideModalVisible}/>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Button onPress={() => {DbRidesApi.insertRides('a','a','a','a','a','a','a','a','a'); this._getRides()}}>Insert Table</Button>
                    <Button onPress={() => {DbRidesApi.clearRidesTable(); this._getRides()}}>Clear Table</Button>
                </View>
                {/* <ViewModal visibleState={this.state.isModalVisible} modalFunction={this._toggleModal} item={this.state.selectedItem} /> */}
            </View>
        )
    }
}
export default RidesScreen


function Item({ item, updateFunction, deleteFunction, refreshFunction, viewModalFunction, updateModalFunction, viewModalVisibility, updateModalVisibility }) {
    return (
        <View style={RidesItemStyle.item}>
            <View style={RidesItemStyle.itemContainerLeft}>
                <Text style={RidesItemStyle.itemTitle}>Van {item.fromAddress}</Text>
                <Text style={RidesItemStyle.itemTitle}>Naar {item.toAddress}</Text>
                <Text style={RidesItemStyle.itemText}>Afstand: {item.distance}</Text>
            </View>
            <View style={RidesItemStyle.itemContainerRight}> 
                <View style={RidesItemStyle.itemContainerRightTop}>
                    <Button onPress={() => {updateModalFunction(); refreshFunction()}} style={RidesItemStyle.button}><FontAwesome name="edit" color="black" size="16"/></Button>
                    <Button onPress={() => {deleteFunction(item.id); refreshFunction()}} style={RidesItemStyle.deleteBtn}><FontAwesome name="trash" color="white" size="16"/></Button>
                </View>
                <View style={RidesItemStyle.itemContainerRightBottom}>
                    <Button onPress={() => {viewModalFunction()}} style={RidesItemStyle.button}><Text style={RidesItemStyle.itemText}>Bekijk</Text></Button>
                </View>
            </View>
            <ViewModal visibleState={viewModalVisibility} modalFunction={viewModalFunction} item={item} />
            <UpdateModal visibleState={updateModalVisibility} modalFunction={updateModalFunction} updateFunction={updateFunction} item={item} />
        </View>
    )
}

function ViewModal({visibleState, modalFunction, item}){
    return (
        <Modal isVisible={visibleState}>
            <View style={RidesViewModalStyle.modalView}>
                <View style={RidesViewModalStyle.full}>
                    <View style={RidesViewModalStyle.row}>
                        <Text style={styles.title}>Datum: </Text>
                        <Text>{item.date}</Text> 
                    </View>
                    <View style={RidesViewModalStyle.row}>
                        <Text style={styles.title}>Postcode startpunt: </Text>
                        <Text> {item.fromPostalCode} </Text> 
                    </View>
                    <View style={RidesViewModalStyle.row}>
                        <Text style={styles.title}>Startpunt adres: </Text>
                        <Text> {item.fromAddress}  </Text>
                    </View>
                    <View style={RidesViewModalStyle.row}>
                        <Text style={styles.title}>Postcode bestemming: </Text>
                        <Text> {item.toPostalCode}  </Text> 
                    </View>
                    <View style={RidesViewModalStyle.row}>
                        <Text style={styles.title}>Bestemming adres: </Text>
                        <Text> {item.toAddress}  </Text>    
                    </View>               
                    <View style={RidesViewModalStyle.row}>
                        <Text style={styles.title}>Zakelijk doel: </Text>
                        <Text> {item.purposeType} </Text> 
                    </View>
                    <View style={RidesViewModalStyle.row}>
                        <Text style={styles.title}>Zakelijk doel beschrijving: </Text>
                        <Text> {item.purposeReason} </Text>    
                    </View>
                    <View style={RidesViewModalStyle.row}>
                        <Text style={styles.title}>Reden voor omweg: </Text>
                        <Text> {item.diversionReason} </Text>    
                    </View>
                    <View style={RidesViewModalStyle.row}>
                        <Text style={styles.title}>Afstand: </Text>
                        <Text> {item.distance} </Text>
                    </View>
                    <Button onPress={() => {modalFunction()}} style={RidesViewModalStyle.button}>Close</Button>
                </View>      
            </View>
        </Modal>
    )
}

function UpdateModal({visibleState, modalFunction, updateFunction, item}){
    const [dateValue, setDateValue] = React.useState(item.date)
    const [fromPostalCode, setFromPostalCodeValue] = React.useState(item.fromPostalCode)
    const [fromAddress, setFromAddressValue] = React.useState(item.fromAddress)
    var newItem = {
        date : "",
        fromPostalCode : "",
        fromAddress : "",
        toPostalCode : "",
        toAddress : "",
        purposeType : "",
        purposeReason : "",
        diversionReason : "",
        distance : ""
    }  
    return (
        <Modal isVisible={visibleState}>
            <View style={RidesUpdateModalStyle.modalView}>
                <View style={RidesUpdateModalStyle.full}>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Datum: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            defaultValue={item.date}
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Postcode startpunt: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            defaultValue={item.fromPostalCode}
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Startpunt: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            defaultValue={item.fromAddress}
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Postcode bestemming: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            defaultValue={item.toPostalCode}
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Bestemming: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            defaultValue={item.toAddress}
                        />    
                    </View>               
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Zakelijk doel: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            defaultValue={item.purposeType}
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Zakelijk doel beschrijving (Optioneel): </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            defaultValue={item.purposeReason}
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Reden voor omweg: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            defaultValue={item.diversionReason}
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Afstand: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            defaultValue={item.distance}
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.btnRow}>
                        <View style={RidesUpdateModalStyle.columnLeft}>
                            <Button onPress={() => {modalFunction()}} style={RidesUpdateModalStyle.button}>Save</Button>
                        </View>
                        <View style={RidesUpdateModalStyle.columnRight}>
                            <Button onPress={() => {modalFunction()}} style={RidesUpdateModalStyle.button}>Cancel</Button>
                        </View>                      
                    </View>
                </View>      
            </View>
        </Modal>
    )
}

function InsertModal({visibleState, modalFunction}){
    return (
        <Modal isVisible={visibleState}>
            <View style={RidesUpdateModalStyle.modalView}>
                <View style={RidesUpdateModalStyle.full}>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Datum: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            value=""
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Postcode startpunt: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            value=""
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Startpunt: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            value=""
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Postcode bestemming: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            value=""
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Bestemming: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            value=""
                        />    
                    </View>               
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Zakelijk doel: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            value=""
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Zakelijk doel beschrijving (Optioneel): </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            value=""
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Reden voor omweg: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            value=""
                        />    
                    </View>
                    <View style={RidesUpdateModalStyle.row}>
                        <Text style={styles.title}>Afstand: </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => onChangeText(text)}
                            value=""
                        />    
                    </View>
                    <Button onPress={() => {modalFunction()}} style={RidesUpdateModalStyle.button}>Close</Button>
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
})