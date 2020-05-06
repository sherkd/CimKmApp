import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    item: {
        flexDirection: "row",
        backgroundColor: 'silver',
        borderWidth: 2,
        padding: 10,
        margin: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    itemContainerLeft: {
        flex: 4,
        borderWidth: 2,
        borderColor: 'yellow'
    },
    itemContainerRight: {
        // flex: 4,
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'blue'
    },
    itemContainerRightTop: {
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'red'
    },
    itemContainerRightBottom: {
        // borderWidth: 1,
        // borderColor: 'green'
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    itemText: {
        fontSize: 13,
    },
    button: {
        backgroundColor: 'lightgreen',
        margin: 2.5,
    },
    deleteBtn: {
        backgroundColor: 'red',
        margin: 2.5,
    },
});