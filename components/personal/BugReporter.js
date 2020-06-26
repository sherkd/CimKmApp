import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TextInput } from 'react-native'
import { Button } from 'react-native-paper';
import GenericScreenStyle from '../../styles/GenericScreenSS'
import FormStyle from '../../styles/FormSS'
import { Dropdown } from 'react-native-material-dropdown';
import * as MailComposer from 'expo-mail-composer';


class ExportToExcel extends Component {
    state = {
        
    }

    _sendEmail = async () => {
        await MailComposer.composeAsync({ subject:"Bugs/Tips" , recipients:["skriller96@hotmail.com"]})
    }

    render() {
        return (
            <View style={GenericScreenStyle.container}>
                <View style={GenericScreenStyle.top}>
                    <View style={GenericScreenStyle.titleContainer}>
                        <Text style={GenericScreenStyle.smallTitle}>BUG REPORTER</Text>
                    </View>
                </View>
                <View style={styles.middle}>
                    <View style={FormStyle.infoBox}>
                        <View style={FormStyle.form}>
                            <View style={GenericScreenStyle.centered}>
                                    <Text style={GenericScreenStyle.smallTitle}>Beschrijving</Text>
                            </View>
                            <View style={styles.description}>
                                <Text>Verstuur de developer de bugs die je vindt.</Text>
                                <Text>Indien je tips en/of feature requests hebt stuur deze dan ook mee!</Text>
                            </View>
                            <View style={FormStyle.row}>
                                <Button onPress={() => this._sendEmail()}>Verstuur via mail</Button>
                            </View>
                        </View>
                    </View>                   
                </View>
            </View>
        )
    }
}
export default ExportToExcel

const styles = StyleSheet.create ({
    middle: {
        flex: 6,
        paddingTop: '10%'
    },
    dropdown:{
        width: '50%'
    },
    description: {
        paddingTop: '1%'
    }
})