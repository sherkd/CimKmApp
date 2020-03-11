import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class HomeScreenMap extends Component {
    state = {
        watchID: Number,
        errorMessage: '',
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
        }
    }
    
    _askPermission = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);   
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
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

   componentDidMount = () => {
        this._askPermission()
        this.watchID = navigator.geolocation.watchPosition((position) => {
            this.setState({ 
                region:{
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0025,
                    longitudeDelta: 0.0025,
                }
            })
            // this._getCurrentAddress(position.coords.latitude, position.coords.longitude)
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 1000, maximumAge: 0, distanceFilter:2})
    }
    
    componentDidUpdate = () => {
        // this._getCurrentAddress(this.state.region["latitude"], this.state.region["longitude"])
    }

    componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID)
    }
   
    render() {
        return (
            <View style={styles.upperView}>
                <MapView style={styles.mapStyleSmall} provider={PROVIDER_GOOGLE} showsUserLocation followsUserLocation loadingEnabled showsTraffic region={this.state.region}/>
                {/* <MapView style={styles.mapStyleSmall} showsUserLocation followsUserLocation loadingEnabled showsTraffic region={this.state.region} /> */}
            </View>
        )
    }
}
export default HomeScreenMap

const styles = StyleSheet.create ({
    mapStyleSmall: {
        width: screenWidth,
        height: screenHeight,
    },
    upperView:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
})