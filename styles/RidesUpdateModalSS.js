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
    btnRow:{
        flexDirection: "row",
        justifyContent: 'center',
    },
    columnLeft: {
        flex: 1,
        // alignItems: 'flex-start',
        // justifyContent: 'center',
    },
    columnRight: {
        flex: 1,
        // alignItems: 'flex-end',
        // justifyContent: 'center',
    },
    modalView: {
        backgroundColor: 'white', 
        padding: '5%', 
        borderWidth: 2, 
        borderColor: 'black',
        // alignItems: 'center',
        // justifyContent: 'center',
        height: '85%',
        width: '101%'
    }, 
    button: {
        justifyContent: 'flex-end',
        // padding: '1%'
    }
});