import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, SectionList } from 'react-native'
import { Button } from 'react-native-paper';

const DATA = [
    {
      id: '1',
      title: 'Thuis',
      date: 'Gisteren',
      address: 'Weststraat 1'
    },
    {
      id: '2',
      title: 'Werk',
      date: 'Gisteren',
      address: 'Ooststraat 3'
    },
    {
      id: '3',
      title: 'Klant',
      date: '10 Maart 2020',
      address: 'Noordstraat 2'
    },
    {
      id: '4',
      title: 'Werk',
      date: '10 Maart 2020',
      address: 'Weststraat 1'
    },
    {
      id: '5',
      title: 'Thuis',
      date: '10 Maart 2020',
      address: 'Ooststraat 3'
    },
    
  ];

function Item({ title, date, address }) {
    return (
        <View style={styles.item}>
            <View style={styles.itemContainerLeft}>
                <Text style={styles.itemTitle}>Naar {title}</Text>
                <Text style={styles.itemText}>{date}</Text>
                <Text style={styles.itemText}>{address}</Text>
            </View>
            <View style={styles.itemContainerRight}> 
                <Button style={styles.button} title='START'><Text style={styles.itemText}>START</Text></Button>
            </View>
        </View>
    );
}

class HomeScreenQuickStart extends Component {
    state = {
        
    }

   componentDidMount = () => {

    }
    
    componentDidUpdate = () => {

    }

    componentWillUnmount = () => {

    }
   
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.centered}>
                    <Text style={styles.title}>Laatste bestemmingen</Text>
                </View>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => <Item title={item.title} date={item.date} address={item.address} />}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}
export default HomeScreenQuickStart

const styles = StyleSheet.create ({
    container: {
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'gray',
    },
    item: {
        flexDirection: "row",
        backgroundColor: 'silver',
        padding: 10,
        marginVertical: 4,
        marginHorizontal: 16,
        borderWidth: 2,
    },
    itemContainerLeft: {
        flex: 3,
    },
    itemContainerRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    itemText: {
        fontSize: 13,
    },
    title: {
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: 5,
        fontSize: 16,
        fontWeight: "bold",
        color: 'lightgray'
    },
    button: {
        backgroundColor: 'lightgreen',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
    },
    centered:{
        alignItems: 'center',
        justifyContent: 'center',
    }
})