import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TextInput } from 'react-native'
import { Button } from 'react-native-paper';
import GenericScreenStyle from '../../styles/GenericScreenSS'
import FormStyle from '../../styles/FormSS'
// import Excel from 'exceljs'
import XLSX, { writeFile } from 'xlsx'
import * as FileSystem from 'expo-file-system';

const output = str => str;

const DocDir = FileSystem.documentDirectory
const file = DocDir + "test.xlsx"

class ExportToExcel extends Component {
    state = {
        emailAddress: ""
    }

    _excelWriter = async () => {
        var data = [{"Name:":"Test"}]
        var filedir = 'C:/Users/Shervin/Documents/GITHUB projects/CimKmApp/components/personal/kmreg.xlsx'
        var filename = './kmreg.xlsx'

        const ws = XLSX.utils.json_to_sheet(data)

        /* Build a new workbook */
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS")

        /* Write the file */
        const wboutput = XLSX.write(wb, {type:'binary', bookType:'xlsx'})

        // console.log(wboutput)

        // FileSystem.writeAsStringAsync(file, "test").then((res) => {
        //     alert("Export Succes")
        // }).catch((err) => {alert("Export Failed, ", "Error: " + err.message)})

        writeFile(file, output(wboutput), 'ascii').then((res) => {
            alert("Export Succes")
        }).catch((err) => {alert("Export Failed, ", "Error: " + err.message)})
        
    }

    _ExcelReader = async () => {
        console.log(FileSystem.readAsStringAsync(file))
        // console.log(FileSystem.getInfoAsync(file))
    }

    componentDidMount = () => {
        // console.log(DocDir)
        this._excelWriter()
        // this._ExcelReader()
    }
    
    componentDidUpdate = () => {

    }

    componentWillUnmount = () => {

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
                    <View style={GenericScreenStyle.centered}>
                        <Text style={GenericScreenStyle.bigTitle}> Kies een maand </Text>
                    </View>
                    <View style={styles.top}>
                        <TextInput style={styles.textInput}></TextInput>
                    </View>
                    <View style={styles.bottom}>
                        <View style={FormStyle.infoBox}>
                            <View style={FormStyle.form}>
                                <View style={FormStyle.row}>
                                    <Text style={GenericScreenStyle.smallTitle}> Emailadres: </Text>
                                    <TextInput style={FormStyle.textInput} onChangeText={text => set(text)} defaultValue={this.state.emailAddress}/>
                                </View>
                            </View>
                            <Button onPress={() => this._excelWriter()}>Verstuur</Button>
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
    top: {
        flex: .5,
        alignItems: "center"
    },
    bottom: {
        flex: 8,
        padding: '5%',
    },
    textInput: {
        flex: 1,
        backgroundColor: "grey",
        height: 16,
        width: '90%',
    }
})