import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput} from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import { Button } from 'react-native-paper'
import GenericScreenStyle from '../../styles/GenericScreenSS'
import ViewModalStyle from '../../styles/ViewModalSS'
import FormModalStyle from '../../styles/FormModalSS'
import { Dropdown } from 'react-native-material-dropdown';
import * as geolib from 'geolib'
import Modal from 'react-native-modal'
import RidesModel from '../../models/RidesModel'
import { format } from 'date-fns';
import * as DbRidesApi from '../rides/DbRidesApi'

class TrackingScreenMap extends Component {
    state = {
        watchID: Number,
        locations: [],
        isNavigating: false,
        navigationTracker: null,
        initialLocation: null,
        finalLocation: null,
        rideDistance: 'Afstand Ophalen...',
        optimalDistance: 'Afstand Ophalen...',
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025
        },
        initialAddress: {
            name: 'Adres Ophalen...',
            postalCode: 'Postcode Ophalen...',
        },
        currentAddress: {
            name: 'Adres Ophalen...',
            postalCode: 'Postcode Ophalen...',
        },
        finalAddress: {
            name: 'Adres Ophalen...',
            postalCode: 'Postcode Ophalen...',
        },
        startBtnVisibilty: true,
        modalVisibility: false,
    }

    _insertRide = async (ride) => {
        await DbRidesApi.insertRides(ride);
    }

    _toggleStartBtn = async () =>{
        this.setState({startBtnVisibilty: !this.state.startBtnVisibilty})
    }

    _startTracker = async () => {
        this.state.isNavigating = true;
        this._startNavigation();
    }

    _stopTracker = async () => {
        this.state.isNavigating = false;
        this.state.navigationTracker = null;

        this.state.finalLocation = await this._getCurrentPosition()

        await this._getCurrentAddress(this.state.finalLocation)
        this.setState({finalAddress: this.state.currentAddress})

        this._calculateDistance();
    }

    _getCurrentPosition = async () => {
        let location = await Location.getCurrentPositionAsync({
            accuracy: 6,
            timeout: 1000
        });

        let position = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }

        return position
    }

    _getCurrentAddress = async (position) => {
        let address = await Location.reverseGeocodeAsync(position)
        let currentAddress = {
            city: address[0].city,
            country: address[0].country,
            isoCountryCode: address[0].isoCountryCode,
            name: address[0].name,
            postalCode: address[0].postalCode,
            region: address[0].region,
            street: address[0].street
        } 
        this.setState({ currentAddress })
    }

    _getRegion = () => {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            this.setState({ 
                region:{
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0025,
                    longitudeDelta: 0.0025,
                }
            })
            this._getCurrentAddress(position.coords)
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 0, distanceFilter:2})
        
    }

    _startNavigation = async () => {   
        this.state.isNavigating = true;
        this.state.initialLocation = await this._getCurrentPosition()

        this._startTimeout();
    }

    _startTimeout = async () => {
        this.state.navigationTracker = setTimeout(async function(_self){
            if (_self.state.isNavigating){
                let location = await Location.getCurrentPositionAsync({
                    accuracy: 6,
                    timeout: 1000
                })
                _self.state.locations.push({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                })
                _self._startTimeout();
            }
        }, 1000, this);
    }

    _calculateDistance = async () => {
        let locations = this.state.locations;
        console.log('locs: ')
        console.log(locations)
        let distance = 0;
        for (let i = 0; i < locations.length; i++) {
            if (locations.length >= i+1) {
                let startLocation = locations[i];
                let nextLocation = locations[i+1];
                if (typeof startLocation != 'undefined' && typeof nextLocation != 'undefined') {
                    let dist = geolib.getPreciseDistance(startLocation, nextLocation, 1)
                    distance += dist;
                }
            }
        }
        this.state.rideDistance = distance / 1000

        // let optimalDistance = geolib.getDistance(this.state.initialLocation, this.state.finalLocation)
        // this.state.optimalDistance = optimalDistance
        this.state.optimalDistance = geolib.getPreciseDistance(this.state.initialLocation, this.state.finalLocation, 1)

        await this._getCurrentAddress(this.state.initialLocation)
        this.setState({initialAddress: this.state.currentAddress})

        this.state.locations = [];
        this.state.initialLocation = null;
        this.state.finalLocation = null;
    }

    _toggleModal = () => {
        this.setState({ modalVisibility: !this.state.modalVisibility})
    }

    componentDidMount = () => {
        this._getRegion()
    }

    componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID)
    }

    render() {    
        const startView = () => {
            return (
                <Button style={styles.greenBtn} title='Start' onPress={() => {this._startTracker(); this._toggleStartBtn()}}>Start</Button>
            )
        }
        const stopView = () => {
            return(
                <Button style={styles.redBtn} title='Stop' onPress={() => {this._stopTracker(); this._toggleModal();this._toggleStartBtn()}}><Text style={styles.white}>Stop</Text></Button>
            )
        }

        return(
            <View style={GenericScreenStyle.full}>
                <View style={styles.top}>
                    <MapView style={styles.mapStyle} provider={PROVIDER_GOOGLE} showsUserLocation followsUserLocation loadingEnabled showsTraffic region={this.state.region}/>                     
                </View>
                <View style={styles.middle}>
                    <Text>{this.state.currentAddress.name}, {this.state.currentAddress.postalCode}</Text>
                </View>
                <View style={styles.bottom}> 
                    {this.state.startBtnVisibilty ? 
                        (startView())
                        :
                        (stopView())
                    }
                </View>
                <FinishNavigationModal visibleState={this.state.modalVisibility} modalFunction={this._toggleModal} initialAddress={this.state.initialAddress} 
                    finalAddress={this.state.finalAddress} distance={this.state.rideDistance} optimalDistance={this.state.optimalDistance}
                    insertFunction={this._insertRide}/>
            </View>
        )
    }
}
export default TrackingScreenMap


function FinishNavigationModal ({visibleState, modalFunction, initialAddress, finalAddress, distance, optimalDistance, insertFunction}) {
    const [purposeType, setPurposeType] = useState('')
    const [purposeReason, setPurposeReason] = useState('')
    const [diversionReason, setDiversionReason] = useState('')
    const purposeTypes = [{value: 'Woon-Werk'}, {value: 'Klantbezoek'}, {value: 'Zakelijke bijeenkomst'}, {value: 'I.o.v. CIMSOLUTIONS'}, {value: 'Examen/cursus'}, {value: 'Onderhoud'}]

    const SaveRide = () => {
        const Ride = new RidesModel(0, format(new Date(), 'dd-MM-yyyy').toString(), distance.toString(), diversionReason, initialAddress.name, initialAddress.postalCode, finalAddress.name, finalAddress.postalCode,
        purposeReason, purposeType)
        insertFunction(Ride)
    }

    return (
        <Modal isVisible={visibleState} style={ViewModalStyle.modal}>
            <View style={FormModalStyle.modalView}>
                <View style={GenericScreenStyle.centered}>
                    <Text style={GenericScreenStyle.smallTitle}>Rit Informatie</Text>
                </View>
                <ScrollView>
                    <View style={ViewModalStyle.form}>
                        <View style={ViewModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Van: </Text>
                            <Text>{initialAddress.name}</Text> 
                            
                        </View>
                        <View style={ViewModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Naar: </Text>
                            <Text>{finalAddress.name}</Text> 
                        </View>  
                        <View style={ViewModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Afstand: </Text>
                            <Text>Gereden afstand: {distance} Kilometer</Text>
                            {/* <Text>Optimale afstand: {optimalDistance}</Text> */}
                        </View>    
                        <View style={ViewModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Zakelijk Doel: </Text>
                            <Dropdown 
                                label='Type doel' 
                                data={purposeTypes}
                                labelFontSize={16}
                                onChangeText={text => setPurposeType(text)}
                            />
                            <Text>Beschrijving:</Text> 
                            <TextInput
                                style={FormModalStyle.textInputMultiline}
                                onChangeText={text => setPurposeReason(text)}
                                defaultValue={purposeReason}
                                multiline={true}
                            />    
                        </View>  
                        <View style={ViewModalStyle.row}>
                            <Text style={GenericScreenStyle.smallTitle}>Omweg: </Text>
                            <Text>Beredenering:</Text> 
                            <TextInput
                                style={FormModalStyle.textInputMultiline}
                                onChangeText={text => setDiversionReason(text)}
                                defaultValue={diversionReason}
                                multiline={true}
                            />    
                        </View>    
                    </View>
                </ScrollView>
                <View style={FormModalStyle.formRow}>
                    <View style={FormModalStyle.columnLeft}>
                        {distance ? 
                            (<View/>)
                            :
                            (<Button onPress={() => {SaveRide(); modalFunction()}} style={FormModalStyle.button}>Opslaan</Button>)
                        }
                    </View>
                    <View style={FormModalStyle.columnRight}>
                        <Button onPress={() => {modalFunction()}} style={FormModalStyle.button}>Verwijderen</Button>
                    </View>                      
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create ({
    mapStyle: {
        width: '100%',
        height: '100%',
    },
    top:{
        flex: 12,
    },
    middle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom:{
        flex: 1,
        justifyContent: 'center',
        paddingBottom: '5%',
        alignItems: 'center',
    },
    btnRow:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    greenBtn:{
        backgroundColor: 'lightgreen',
        width: '50%'
    },
    redBtn: {
        backgroundColor: 'red',
        width: '50%',
    },
    white:{
        color:'white'
    }
})