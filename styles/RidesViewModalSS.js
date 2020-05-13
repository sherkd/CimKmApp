import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    full: {
        flex: 1,
        // justifyContent: 'center',
    },
    row:{
        padding: '1%',
        // margin: '1%'
    },
    columnLeft: {
        // alignItems: 'center',
        justifyContent: 'center',
    },
    columnRight: {
        // alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        backgroundColor: 'white', 
        padding: '7.5%',
        borderWidth: 2, 
        borderColor: 'black',
        // alignItems: 'center',
        // justifyContent: 'center',
        height: '60%',
        width: '100%'
    }, 
    button: {
        justifyContent: 'flex-end',
        // padding: '1%'
    }
});