import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    modal: {
        marginBottom: '24%'
    },
    form: {
        flex: 1,
    },
    row:{
        padding: '1%',
    },
    formRow:{
        flexDirection: "row",
    },
    columnLeft: {
        flex: 1,
    },
    columnRight: {
        flex: 1,
    },
    modalView: {
        backgroundColor: 'white', 
        paddingHorizontal: '3%',
        paddingTop: '3%',
        borderWidth: 2, 
        height: '55%',
        width: '100%',
    }, 
    modalViewAndroid: {
        backgroundColor: 'white', 
        paddingHorizontal: '3%',
        paddingTop: '3%',
        borderWidth: 2, 
        height: '90%',
        width: '100%',
    }, 
    button: {
        justifyContent: 'flex-end',
        // padding: '1%'
    },
    datePicker: {
        width: '100%',
    },
    textInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1
    },
    textInputMultiline: {
        height: 80, 
        borderColor: 'gray', 
        borderWidth: 1
    }
});