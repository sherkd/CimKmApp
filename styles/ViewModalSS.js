import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    modal: {
        marginBottom: '10%'
    },
    form: {
        flex: 1,
    },
    row:{
        padding: '1%',
    },
    columnLeft: {
        // alignItems: 'center',
        justifyContent: 'center',
    },
    columnRight: {
        // alignItems: 'center',
        justifyContent: 'center',
    },
    modalViewApple: {
        backgroundColor: 'white', 
        padding: '5%',
        borderWidth: 2, 
        height: '65%',
        width: '100%'
    },
    modalViewAndroid: {
        backgroundColor: 'white', 
        padding: '5%',
        borderWidth: 2, 
        height: '90%',
        width: '100%'
    }, 
    button: {
        justifyContent: 'flex-end',
        // padding: '1%'
    }
});