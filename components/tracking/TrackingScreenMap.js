import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import { Button } from 'react-native-paper'
import GenericScreenStyle from '../../styles/GenericScreenSS'
import * as geolib from 'geolib'

class HomeScreenMap extends Component {
    state = {
        watchID: Number,
        locations: [],
        isNavigating: false,
        navigationTracker: null,
        initialLocation: null,
        endLocation: null,
        region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025
        },
        currentAddress: {
            city: '',
            country: '',
            isoCountryCode: '',
            name: '',
            postalCode: '',
            region: '',
            street: ''
        },
        startBtnVisibilty: true,
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

        this.state.endLocation = await this._getCurrentPosition()
        console.log('EndLoc: ')
        console.log(this.state.endLocation)

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

    _getCurrentAddress = async (lat, long) => {
        let location = {
            latitude: lat,
            longitude: long
        }
        let address = await Location.reverseGeocodeAsync(location)
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
            this._getCurrentAddress(position.coords.latitude, position.coords.longitude)
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
                    let dist = geolib.getDistance(startLocation, nextLocation)
                    distance += dist;
                }
            }
        }

        let optimalDistance = geolib.getDistance(this.state.initialLocation, this.state.endLocation)

        console.log('optimal: ');
        console.log(optimalDistance);
        console.log('Distance: ');
        console.log(distance);
        console.log('InitialLoc: ');
        console.log(this.state.initialLocation);

        await this._getCurrentAddress(this.state.initialLocation.latitude, this.state.initialLocation.longitude)
        console.log('Cur address: ' );
        console.log(this.state.currentAddress);

        this.state.locations = [];
        this.state.initialLocation = null;
        this.state.endLocation = null;
    }

    componentDidMount = () => {
        this._getRegion()
    }
    
    componentDidUpdate = () => {
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
                <Button style={styles.redBtn} title='Stop' onPress={() => {this._stopTracker();this._toggleStartBtn()}}><Text style={styles.white}>Stop</Text></Button>
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
                            (
                                startView()
                            )
                            :
                            (
                                stopView()
                            )
                        }
                    </View>
                </View>
        )
    }
}
export default HomeScreenMap

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