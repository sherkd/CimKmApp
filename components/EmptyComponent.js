import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class EmptyComponent extends Component {
    state = {

    }

    componentDidMount = () => {

    }
    
    componentDidUpdate = () => {

    }

    componentWillUnmount = () => {

    }
   
    render() {
        return (
            <View>
                
            </View>
        )
    }
}
export default EmptyComponent

const styles = StyleSheet.create ({

})