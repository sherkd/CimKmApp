import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TextInput, Alert } from 'react-native'
import { Button } from 'react-native-paper'
import Modal from 'react-native-modal'
import RidesViewModalStyle from '../styles/RidesViewModalSS'

export default function ViewModal({visibleState, modalFunction, item}){
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