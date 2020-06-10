import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import { Button } from 'react-native-paper'
import GenericScreenStyle from '../../styles/GenericScreenSS'

class HomeScreenMap extends Component {
    state = {
        watchID: Number,
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

    _toggleStartBtn = () =>{
        this.setState({startBtnVisibilty: !this.state.startBtnVisibilty})
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
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 0, distanceFilter:2})
    }

    _LocationTest = async () => {
        
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
                    <Button style={styles.greenBtn} title='Start' onPress={() => {this._getCurrentAddress(this.state.region.latitude, this.state.region.longitude); this._toggleStartBtn()}}>Start</Button>
            )
        }
        const stopView = () => {
            return(
                    <Button style={styles.redBtn} title='Stop' onPress={() => this._toggleStartBtn()}><Text style={styles.white}>Stop</Text></Button>
            )
        }

        if (this.state.startBtnVisibilty) {
            return (
                <View style={GenericScreenStyle.full}>
                    <View style={styles.top}>
                        <MapView style={styles.mapStyle} provider={PROVIDER_GOOGLE} showsUserLocation followsUserLocation loadingEnabled showsTraffic region={this.state.region}/>  
                    </View>
                    <View style={GenericScreenStyle.bottom}> 
                        {startView()}
                    </View>
                </View>
            )
        } else {
            return (
                <View style={GenericScreenStyle.full}>
                    <View style={styles.top}>
                        <MapView style={styles.mapStyle} provider={PROVIDER_GOOGLE} showsUserLocation followsUserLocation loadingEnabled showsTraffic region={this.state.region}/>  
                    </View>
                    <View style={GenericScreenStyle.bottom}>
                        <Text>{this.state.currentAddress.name}</Text>
                        {stopView()}
                    </View>
                </View>
            )
        }
    }
}
export default HomeScreenMap

const styles = StyleSheet.create ({
    mapStyle: {
        width: '100%',
        height: '100%',
    },
    top:{
        flex: 10,
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