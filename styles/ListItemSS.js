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
    itemContainerRightFourButtons: {
        borderWidth: 2,
        borderColor: 'blue'
    },
    itemContainerRightThreeButtons: {
        flex: 3,
        borderWidth: 2,
        borderColor: 'blue'
    },
    itemContainerRightTop: {
        flexDirection: 'row',
    },
    itemContainerRightBottom: {
        flexDirection: 'row',
    },
    itemTextBold: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    itemText: {
        fontSize: 13,
    },
    iconBtn: {
        backgroundColor: 'lightgreen',
        margin: 2.5,
    },
    button: {
        backgroundColor: 'lightgreen',
        margin: 2.5,
        flex: 1,
    },
    deleteBtn: {
        backgroundColor: 'red',
        margin: 2.5,
    },
});