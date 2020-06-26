import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TextInput } from 'react-native'
import { Button } from 'react-native-paper';
import GenericScreenStyle from '../../styles/GenericScreenSS'
import FormStyle from '../../styles/FormSS'
import XLSX from 'xlsx'
import * as DbRidesApi from '../rides/DbRidesApi'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Dropdown } from 'react-native-material-dropdown';
import * as MailComposer from 'expo-mail-composer';

const CacheDir = FileSystem.cacheDirectory

class ExportToExcel extends Component {
    state = {
        emailAddress: '',
        monthArray: [
            {value: 'Januari'},
            {value: 'Februari'},
            {value: 'Maart'},
            {value: 'April'},
            {value: 'Mei'},
            {value: 'Juni'},
            {value: 'Juli'},
            {value: 'Augustus'},
            {value: 'September'},
            {value: 'Oktober'},
            {value: 'November'},
            {value: 'December'}],
        chosenMonth: {}
    }

    _excelWriter = async (isMail, month) => {
        var data = await this._getRidesByMonth(month.index)
        if (!data.length > 0) {
            return alert('Geen ritten gevonden in die maand')
        }
        const fileName = 'km-reg-' + month.item + '.xlsx'
        const uri = CacheDir + fileName;

        var ws = XLSX.utils.json_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Km registratie " + month.item);
        const wbout = XLSX.write(wb, {
          type: 'base64',
          bookType: "xlsx"
        });

        await FileSystem.writeAsStringAsync(uri, wbout, {
          encoding: FileSystem.EncodingType.Base64
        });    
        
        if (isMail) {
            this._sendEmail(uri, month.item)
        } else {
            await Sharing.shareAsync(uri, {
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                dialogTitle: 'Km Registratie',
                UTI: 'com.microsoft.excel.xlsx'
            });
        }
    }

    _sendEmail = async (uri, month) => {
        await MailComposer.composeAsync({ subject:"Km Registratie " + month, attachments:[uri]} )
    }

    _getRidesByMonth = async (month) => {
        if (month === null) {
            return alert('Kies eerst een maand')
        }
        return await DbRidesApi.getRideByMonth(month)
    }

    render() {
        return (
            <View style={GenericScreenStyle.container}>
                <View style={GenericScreenStyle.top}>
                    <View style={GenericScreenStyle.titleContainer}>
                        <Text style={GenericScreenStyle.smallTitle}>EXPORTEREN</Text>
                    </View>
                </View>
                <View style={styles.middle}>
                    <View style={FormStyle.infoBox}>
                        <View style={FormStyle.form}>
                            <View style={GenericScreenStyle.centered}>
                                    <Text style={GenericScreenStyle.smallTitle}>Beschrijving</Text>
                            </View>
                            <View style={styles.description}>
                                <Text>Kies een maand van de ritten die je wilt exporteren.</Text>
                                <Text>Je kan je ritten exporteren via de mail of met een andere app op je mobiel.</Text>
                            </View>
                            <View style={FormStyle.row}>
                                <View style={styles.dropdown}>
                                    <Dropdown 
                                            label='Kies een maand' 
                                            data={this.state.monthArray}
                                            labelFontSize={16}
                                            onChangeText={(item, index) => this.setState({chosenMonth: {item, index}})}
                                            itemCount={6}
                                    />
                                </View>
                            </View>
                            <View style={FormStyle.row}>
                                <Button onPress={() => this._excelWriter(true, this.state.chosenMonth)}>Verstuur via mail</Button>
                                <Button onPress={() => this._excelWriter(false, this.state.chosenMonth)}>Andere app</Button>
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