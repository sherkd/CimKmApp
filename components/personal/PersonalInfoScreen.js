import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, SectionList } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import FormStyle from '../../styles/FormSS'
import GenericScreenStyle from '../../styles/GenericScreenSS'
import { ScrollView } from 'react-native-gesture-handler';
import * as DbPersonalApi from '../personal/DbPersonalApi'
import * as DbCarApi from '../personal/DbCarApi'

class PersonalInfoScreen extends Component {
    state = {
        currentEmailAddress: "Leeg",
        cars: []
    }

    _getEmailAddress = async () => {
        this.setState( {
            currentEmailAddress: await DbPersonalApi.getEmailAddress()
        });
    }

    _insertEmailAddress = async (emailAddress) => {
        await DbPersonalApi.insertEmailAddress(emailAddress);
    }

    _createDefaultEmailAddress = async () => {

    }

    _getCars = async () => {
        this.setState( {
            cars: await DbCarApi.getCars()
        });
    }

    componentDidMount = () => {
        // DbPersonalApi.dropUserTable()
        // DbPersonalApi.createUserTable()
        // this._insertEmailAddress("TEST@MAIL.COM")
        // this._getEmailAddress()
        // this._createDefaultEmailAddress()
        // DbCarApi.dropCarsTable()
        DbCarApi.createCarTable()
        this._getCars()
    }
    
    componentDidUpdate = () => {

    }

    componentWillUnmount = () => {

    }
   
    render() {
        return (
            <View style={GenericScreenStyle.container}>
                <View style={styles.top}>
                    <View style={GenericScreenStyle.titleContainer}>
                        <Text style={GenericScreenStyle.smallTitle}>PERSOONLIJKE</Text>
                        <Text style={GenericScreenStyle.smallTitle}>INFO</Text>
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.bottom}>
                        <View style={styles.bottomHalf}>
                            <View style={GenericScreenStyle.centered}>
                                <Text style={GenericScreenStyle.bigTitle}> Persoonlijke Details </Text>
                            </View>
                            <View style={FormStyle.infoBox}>
                                <View style={FormStyle.form}>
                                    <View style={FormStyle.row}>
                                        <Text style={GenericScreenStyle.smallTitle}> Emailadres: </Text>
                                        <TextInput style={FormStyle.textInput} onChangeText={text => set(text)} defaultValue={this.state.currentEmailAddress} disabled={true}/>
                                    </View>
                                </View>
                                <Button>Wijzig</Button>
                            </View>
                        </View>
                        <View style={styles.bottomHalf}>
                            <View style={GenericScreenStyle.centered}>
                                <Text style={GenericScreenStyle.bigTitle}> Details auto </Text>
                            </View>
                            <View style={FormStyle.infoBox}>
                                <View style={FormStyle.form}>
                                    <View style={FormStyle.row}>
                                        <Text style={GenericScreenStyle.smallTitle}> Kenteken: </Text>
                                        <TextInput style={FormStyle.textInput} onChangeText={text => set(text)} defaultValue="" disabled={true}/>
                                    </View>
                                    <View style={FormStyle.row}>
                                        <Text style={GenericScreenStyle.smallTitle}> Brandstof: </Text>
                                        <TextInput style={FormStyle.textInput} onChangeText={text => set(text)} defaultValue="" disabled={true}/>                   
                                    </View>
                                    <View style={FormStyle.row}>
                                        <Text style={GenericScreenStyle.smallTitle}> KM-stand (begin): </Text>
                                        <TextInput style={FormStyle.textInput} onChangeText={text => set(text)} defaultValue="" disabled={true}/>                   
                                    </View>
                                    <View style={FormStyle.row}>
                                        <Text style={GenericScreenStyle.smallTitle}> KM-stand (eind): </Text>
                                        <TextInput style={FormStyle.textInput} onChangeText={text => set(text)} defaultValue="" disabled={true}/>                   
                                    </View>
                                    <View style={FormStyle.row}>
                                        <Text style={GenericScreenStyle.smallTitle}> Remarks: </Text>
                                        <TextInput style={FormStyle.textInput} onChangeText={text => set(text)} defaultValue="" disabled={true}/>        
                                    </View>
                                </View>
                                <Button>Wijzig</Button>
                            </View>
                        </View>                     
                        <View style={styles.bottomHalf}>
                            <View style={GenericScreenStyle.centered}>
                                <Text style={GenericScreenStyle.bigTitle}> Details lease auto </Text>
                            </View>
                            <View style={FormStyle.infoBox}>
                                <View style={FormStyle.form}>
                                    <View style={FormStyle.row}>
                                        <Text style={GenericScreenStyle.smallTitle}> Kenteken: </Text>
                                        <TextInput style={FormStyle.textInput} onChangeText={text => set(text)} defaultValue="" disabled={true}/>
                                    </View>
                                    <View style={FormStyle.row}>
                                        <Text style={GenericScreenStyle.smallTitle}> KM-stand (begin): </Text>
                                        <TextInput style={FormStyle.textInput} onChangeText={text => set(text)} defaultValue="" disabled={true}/>                   
                                    </View>
                                    <View style={FormStyle.row}>
                                        <Text style={GenericScreenStyle.smallTitle}> KM-stand (eind): </Text>
                                        <TextInput style={FormStyle.textInput} onChangeText={text => set(text)} defaultValue="" disabled={true}/>                   
                                    </View>
                                    <View style={FormStyle.row}>
                                        <Text style={GenericScreenStyle.smallTitle}> Remarks: </Text>
                                        <TextInput style={FormStyle.textInput} onChangeText={text => set(text)} defaultValue="" disabled={true}/>        
                                    </View>
                                </View>
                                <Button>Wijzig</Button>
                            </View>
                        </View>     
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default PersonalInfoScreen


const styles = StyleSheet.create ({
    top: {
        flex: .2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        flex: 6,
    },
    bottomHalf: {
        padding: '1%',
        paddingHorizontal: '4%'
    },
    scrollView: {
        flex: 1,
    }
})