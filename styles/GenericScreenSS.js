import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeAreaViewContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    full:{
        flex: 1,
        // alignItems: 'center',
    },
    container: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'black',
        width: '100%',
    },
    top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middle:{
        flex: 6,
    },
    bottom: {
        flex: 1,
        justifyContent: 'center',
    },
    boxView: {
        flex: 1,
        borderWidth: 2,
        backgroundColor: 'gray',
    },
    titleContainer: {
        borderWidth: 2,
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        height: '70%',
    },
    smallTitle: {
        fontSize: 16,
        fontWeight: "bold",    
    },
    mediumTitle: {
        fontSize: 18,
        fontWeight: "bold",    
    },
    bigTitle: {
        fontSize: 20,
        fontWeight: "bold",    
    },
    centered:{
        alignItems: 'center',
        justifyContent: 'center',
    }
});