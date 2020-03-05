import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps'

export default class HomeScreenMap extends Component {
    state = {
        location: null,
        errorMessage: null,
    }

    componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
          this._getLocationAsync();
        }
    }
    
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);   
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    render(){
        let locationText = 'Waiting..';
        if (this.state.errorMessage) {
            locationText = this.state.errorMessage;
        } else if (this.state.location) {
            locationText = JSON.stringify(this.state.location);
        }

        return (
            <View>
                {/* <Text>{locationText}</Text> */}
                <MapView style={styles.mapStyleSmall} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    mapStyleBig: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    mapStyleSmall: {
        width: 360,
        height: 300,
      }
  });