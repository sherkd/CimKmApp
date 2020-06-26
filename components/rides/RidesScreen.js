import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TextInput, Alert, Platform } from 'react-native'
import * as DbRidesApi from '../rides/DbRidesApi'
import { Button } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import GenericScreenStyle from '../../styles/GenericScreenSS'
import ListItemStyle from '../../styles/ListItemSS'
import ViewModalStyle from '../../styles/ViewModalSS'
import FormModalStyle from '../../styles/FormModalSS'
import RidesModel from '../../models/RidesModel'
import { ScrollView } from 'react-native-gesture-handler'
import DatePicker from 'react-native-datepicker'
import RNDatePicker from '@react-native-community/datetimepicker' 
import { format, addDays, parse } from 'date-fns';
import { Dropdown } from 'react-native-material-dropdown';

class RidesScreen extends Component {
    state = {
        data: [],
        viewRideModalVisible: false,
        updateRideModalVisible: false,
        insertRideModalVisible: false,
        selectedItem: Object,
    }

    _getRides = async () => {
        this.setState( {
            data: await DbRidesApi.getRides()
        })
    }

    _insertRide = async (item) => {
        await DbRidesApi.insertRides(item);
    }

    _updateRide = async (item) => {
        await DbRidesApi.updateRides(item);
    }

    _copyRide = async (item) => {
        var oldDate = parse(item.date, 'dd-MM-yyyy', new Date())
        var newDate = addDays(oldDate, 1)
        item.date = format(newDate, 'dd-MM-yyyy')
        await DbRidesApi.insertRides(item);
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

    _toggleInsertRideModal = () => {
        this.setState({ insertRideModalVisible: !this.state.insertRideModalVisible})
    }

    _onSelect = (item) => {
        this.setState({ selectedItem: item })
    }

    componentDidMount = () => {
        DbRidesApi.createRidesTable()
        this._getRides()
    }

    componentDidUpdate = () => {
        this._getRides()
    }
   
    render() {
        return (
            <View style={GenericScreenStyle.full}>
                <View style={GenericScreenStyle.top}>
                    <View style={GenericScreenStyle.titleContainer}>
                        <Text style={GenericScreenStyle.smallTitle}>RITTEN</Text>
                    </View>
                </View>
                <View style={GenericScreenStyle.middle}>
                    <View style={GenericScreenStyle.boxView}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => 
                                <Item item={item} updateFunction = {this._updateRide} deleteFunction = {this._deleteRide} refreshFunction = {this._getRides} 
                                viewModalFunction= {this._toggleViewRideModal} updateModalFunction= {this._toggleEditRideModal} 
                                viewModalVisibility={this.state.viewRideModalVisible} updateModalVisibility={this.state.updateRideModalVisible}
                                onSelect={this._onSelect} selectedItem={this.state.selectedItem} copyFunction= {this._copyRide}/>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                <View style={GenericScreenStyle.bottom}>
                    <Button onPress={() => {this._toggleInsertRideModal()}}>Handmatig toevoegen</Button>
                    {/* <Button onPress={() => {DbRidesApi.clearRidesTable(); this._getRides()}}>Clear Table</Button> */}
                    {/* <Button onPress={() => {DbRidesApi.dropRidesTable(); this._getRides()}}>Drop Table</Button> */}
                </View>
                <InsertModal visibleState={this.state.insertRideModalVisible} modalFunction={this._toggleInsertRideModal} insertFunction={this._insertRide} 
                    refreshFunction={this._getRides}/>
            </View>
        )
    }
}
export default RidesScreen


function Item({ item, updateFunction, deleteFunction, refreshFunction, viewModalFunction, 
                updateModalFunction, viewModalVisibility, updateModalVisibility, onSelect, selectedItem, copyFunction}) {
    return (
        <View style={ListItemStyle.item}>
            <View style={ListItemStyle.itemContainerLeft}>
                <Text style={ListItemStyle.itemTextBold}>Van <Text style={ListItemStyle.itemText}>{item.fromAddress}</Text></Text>
                <Text style={ListItemStyle.itemTextBold}>Naar <Text style={ListItemStyle.itemText}>{item.toAddress}</Text></Text>
                <Text style={ListItemStyle.itemText}>Afstand: {item.distance}</Text>
                <Text style={ListItemStyle.itemText}>Datum: {item.date}</Text>
            </View>
            <View> 
                <View style={ListItemStyle.itemContainerRightTop}>
                    <Button onPress={() => {onSelect(item); updateModalFunction();}} style={ListItemStyle.iconBtn}><FontAwesome name="edit" color="black" size={16}/></Button>
                    <Button onPress={() => {deleteFunction(item.id); refreshFunction()}} style={ListItemStyle.deleteBtn}><FontAwesome name="trash" color="white" size={16}/></Button>
                </View>
                <View style={ListItemStyle.itemContainerRightBottom}>
                    <Button onPress={() => {copyFunction(item); refreshFunction()}} style={ListItemStyle.iconBtn}><FontAwesome name="copy" color="black" size={16}/></Button>
                    <Button onPress={() => {onSelect(item); viewModalFunction();}} style={ListItemStyle.iconBtn}><FontAwesome name="eye" color="black" size={16}/></Button>
                </View>
            </View>
            <ViewModal visibleState={viewModalVisibility} modalFunction={viewModalFunction} item={selectedItem} />
            <UpdateModal visibleState={updateModalVisibility} modalFunction={updateModalFunction} updateFunction={updateFunction} item={selectedItem} refreshFunction={refreshFunction}/>
        </View>
    )
}

function ViewModal({visibleState, modalFunction, item}){
    const form = () => {
        return (
            <View style={ViewModalStyle.form}>
                    <View style={ViewModalStyle.row}>
                        <Text style={GenericScreenStyle.smallTitle}>Datum: </Text>
                        <Text>{item.date}</Text> 
                    </View>
                    <View style={ViewModalStyle.row}>
                        <Text style={GenericScreenStyle.smallTitle}>Postcode startpunt: </Text>
                        <Text>{item.fromPostalCode} </Text> 
                    </View>
                    <View style={ViewModalStyle.row}>
                        <Text style={GenericScreenStyle.smallTitle}>Startpunt adres: </Text>
                        <Text>{item.fromAddress} </Text>
                    </View>
                    <View style={ViewModalStyle.row}>
                        <Text style={GenericScreenStyle.smallTitle}>Postcode bestemming: </Text>
                        <Text>{item.toPostalCode} </Text> 
                    </View>
                    <View style={ViewModalStyle.row}>
                        <Text style={GenericScreenStyle.smallTitle}>Bestemming adres: </Text>
                        <Text>{item.toAddress} </Text>    
                    </View>               
                    <View style={ViewModalStyle.row}>
                        <Text style={GenericScreenStyle.smallTitle}>Zakelijk doel: </Text>
                        <Text>{item.purposeType} </Text> 
                    </View>
                    <View style={ViewModalStyle.row}>
                        <Text style={GenericScreenStyle.smallTitle}>Zakelijk doel beschrijving: </Text>
                        <Text>{item.purposeReason} </Text>    
                    </View>
                    <View style={ViewModalStyle.row}>
                        <Text style={GenericScreenStyle.smallTitle}>Reden voor omweg: </Text>
                        <Text>{item.diversionReason} </Text>    
                    </View>
                    <View style={ViewModalStyle.row}>
                        <Text style={GenericScreenStyle.smallTitle}>Afstand: </Text>
                        <Text>{item.distance} </Text>
                    </View>
                    <Button onPress={() => {modalFunction()}} style={ViewModalStyle.button}>Close</Button>
                </View>      
        )
    }

    if (Platform.OS === 'ios') {
        return (
            <Modal isVisible={visibleState} style={ViewModalStyle.modal}>
                <View style={ViewModalStyle.modalViewApple}>
                    {form()}
                </View>
            </Modal>
        )
    } else {
        return (
            <Modal isVisible={visibleState} style={ViewModalStyle.modal}>
                <View style={ViewModalStyle.modalViewAndroid}>
                    {form()}
                </View>
            </Modal>
        )
    }
    
}

function UpdateModal({visibleState, modalFunction, updateFunction, item, refreshFunction}){
    const [date, setDate] = useState(item.date)
    const [fromPostalCode, setFromPostalCode] = useState(item.fromPostalCode)
    const [fromAddress, setFromAddress] = useState(item.fromAddress)
    const [toPostalCode, setToPostalCode] = useState(item.toAddress)
    const [toAddress, setToAddress] = useState(item.toPostalCode)
    const [purposeType, setPurposeType] = useState(item.purposeType)
    const [purposeReason, setPurposeReasonType] = useState(item.purposeReason)
    const [diversionReason, setDiversionReason] = useState(item.diversionReason)
    const [distance, setDistance] = useState(item.distance)
  
    const purposeTypes = [{value: 'Woon-Werk'}, {value: 'Klantbezoek'}, {value: 'Zakelijke bijeenkomst'}, {value: 'I.o.v. CIMSOLUTIONS'}, {value: 'Examen/cursus'}, {value: 'Onderhoud'}]
    const formValues = {date, distance, diversionReason, fromAddress, fromPostalCode, toAddress, toPostalCode, purposeReason, purposeType}

    const fieldsValidator = (item, fields) => {
        const completeField = new RidesModel()
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
    
    const modalContent = () => {
        return (
                <ScrollView>
                    <View style={FormModalStyle.form}>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Datum: </Text>
                              <DatePicker
                                    style={FormModalStyle.datePicker}
                                    date={date ? date : item.date}
                                    mode="date"
                                    placeholder="select date"
                                    format="DD-MM-YYYY"
                                    minDate="01-01-2019"
                                    maxDate="01-01-2030"
                                    confirmBtnText="Bevestig"
                                    cancelBtnText="Annuleer"
                                    customStyles={{
                                        dateIcon: {},
                                        dateInput: {
                                            borderColor: 'black'
                                        }
                                    }}
                                    onDateChange={(date) => setDate(date)}
                                />  
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Postcode startpunt: </Text>
                            <TextInput
                                style={FormModalStyle.textInput}
                                onChangeText={text => setFromPostalCode(text)}
                                defaultValue={item.fromPostalCode}
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Startpunt: </Text>
                            <TextInput
                                style={FormModalStyle.textInput}
                                onChangeText={text => setFromAddress(text)}
                                defaultValue={item.fromAddress}
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Postcode bestemming: </Text>
                            <TextInput
                                style={FormModalStyle.textInput}
                                onChangeText={text => setToPostalCode(text)}
                                defaultValue={item.toPostalCode}
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Bestemming: </Text>
                            <TextInput
                                style={FormModalStyle.textInput}
                                onChangeText={text => setToAddress(text)}
                                defaultValue={item.toAddress}
                            />    
                        </View>               
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Zakelijk doel: </Text>
                            <Text>Huidig doel: {item.purposeType}</Text>
                            <Dropdown 
                                label='Nieuw doel' 
                                data={purposeTypes}
                                labelFontSize={16}
                                onChangeText={text => setPurposeType(text)}
                            />
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Zakelijk doel beschrijving: </Text>
                            <TextInput
                                style={FormModalStyle.textInput}
                                onChangeText={text => setPurposeReasonType(text)}
                                defaultValue={item.purposeReason}
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Reden voor omweg: </Text>
                            <TextInput
                                style={FormModalStyle.textInput}
                                onChangeText={text => setDiversionReason(text)}
                                defaultValue={item.diversionReason}
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Afstand: </Text>
                            <TextInput
                                style={FormModalStyle.textInput}
                                onChangeText={text => setDistance(text)}
                                defaultValue={item.distance}
                            />    
                        </View>
                    </View>    
                </ScrollView>  
                
        )
    }

    if (Platform.OS === 'ios') {
        return (
            <Modal isVisible={visibleState} style={FormModalStyle.modal}>
                <View style={FormModalStyle.modalView}>
                    {modalContent()}
                
                    <View style={FormModalStyle.formRow}>
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
    } else {
        return (
            <Modal isVisible={visibleState} > 
                <View style={FormModalStyle.modalViewAndroid}>
                    {modalContent()}
                    <View style={FormModalStyle.formRow}>
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
}

function InsertModal({visibleState, modalFunction, insertFunction, refreshFunction}){
    const [date, setDate] = useState(format(new Date(), 'dd-MM-yyyy'))
    const [fromPostalCode, setFromPostalCode] = useState('')
    const [fromAddress, setFromAddress] = useState('')
    const [toPostalCode, setToPostalCode] = useState('')
    const [toAddress, setToAddress] = useState('')
    const [purposeType, setPurposeType] = useState('')
    const [purposeReason, setPurposeReasonType] = useState('')
    const [diversionReason, setDiversionReason] = useState('')
    const [distance, setDistance] = useState('')

    const purposeTypes = [{value: 'Woon-Werk'}, {value: 'Klantbezoek'}, {value: 'Zakelijke bijeenkomst'}, {value: 'I.o.v. CIMSOLUTIONS'}, {value: 'Examen/cursus'}, {value: 'Onderhoud'}]
    const formValues = {date, distance, diversionReason, fromAddress, fromPostalCode, toAddress, toPostalCode, purposeReason, purposeType}

    const fieldsValidator = (fields) => {
        const completeField = new RidesModel()
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
                            <Text style={GenericScreenStyle.smallTitle}>Datum: </Text>
                            <DatePicker
                                style={FormModalStyle.datePicker}
                                date={date}
                                mode="date"
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                minDate="01-01-2019"
                                maxDate="01-01-2030"
                                confirmBtnText="Bevestig"
                                cancelBtnText="Annuleer"
                                customStyles={{
                                    dateIcon: {},
                                    dateInput: {
                                        borderColor: 'black'
                                    }
                                }}
                                onDateChange={(date) => setDate(date)}
                            />
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Postcode startpunt: </Text>
                            <TextInput
                                style={FormModalStyle.textInput}
                                onChangeText={text => setFromPostalCode(text)}
                                defaultValue=""
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Startpunt: </Text>
                            <TextInput
                                style={FormModalStyle.textInput}
                                onChangeText={text => setFromAddress(text)}
                                defaultValue=""
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Postcode bestemming: </Text>
                            <TextInput
                                style={FormModalStyle.textInput}
                                onChangeText={text => setToPostalCode(text)}
                                defaultValue=""
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Bestemming: </Text>
                            <TextInput
                                style={FormModalStyle.textInput}
                                onChangeText={text => setToAddress(text)}
                                defaultValue=""
                            />    
                        </View>               
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Zakelijk doel: </Text>
                            <Dropdown 
                                label='Type doel' 
                                data={purposeTypes}
                                labelFontSize={16}
                                onChangeText={text => setPurposeType(text)}
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Zakelijk doel beschrijving (Optioneel): </Text>
                            <TextInput
                                style={FormModalStyle.textInput}
                                onChangeText={text => setPurposeReasonType(text)}
                                defaultValue=""
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Reden voor omweg: </Text>
                            <TextInput
                                style={FormModalStyle.textInput}
                                onChangeText={text => setDiversionReason(text)}
                                defaultValue=""
                            />    
                        </View>
                        <View style={FormModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Afstand: </Text>
                            <TextInput
                                style={FormModalStyle.textInput}
                                onChangeText={text => setDistance(text)}
                                defaultValue=""
                            />    
                        </View>
                    </View>
                </ScrollView>    
                <View style={FormModalStyle.formRow}>
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