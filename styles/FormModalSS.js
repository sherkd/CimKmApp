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
    btnRow:{
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
        // padding: '2%',
        borderWidth: 2, 
        borderColor: 'black',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        height: '55%',
        width: '101%',
    }, 
    button: {
        justifyContent: 'flex-end',
        // padding: '1%'
    },
    datePicker: {
        width: '100%',
    }
});