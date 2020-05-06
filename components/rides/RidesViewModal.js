import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import * as DbRidesApi from '../../database/DbRidesApi'
import { Button } from 'react-native-paper'
import Modal from 'react-native-modal'
import GLOBAL from '../Global'

function toggleModal () {
    console.log('before: '+GLOBAL.RVM_Visibility)
    GLOBAL.RVM_Visibility = !GLOBAL.RVM_Visibility
    console.log('after: '+GLOBAL.RVM_Visibility)
    RidesViewModal(GLOBAL.RVM_Visibility)
}

export function RidesViewModal (visibility) {
    
    var visible = visibility['visibility']
    console.log('inside: '+ visibility)
    return (
        <Modal isVisible={visible}>
            <View style={styles.modalView}>
                <Text>Hello!</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeText(text)}
                    value="placeholder"
                />                  
                <Button onPress={toggleModal}>Close</Button>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create ({
    modalView: {
        backgroundColor: 'white', 
        padding: '5%', 
        borderWidth: 2, 
        borderColor: 'red',
        alignItems: 'center',
        // justifyContent: 'center',
        // height: '20%',
    }, 
})