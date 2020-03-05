import React from 'react'
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, FontAwesome } from 'react-native-vector-icons';
import CustomIcon from '../components/CustomIcon.js'
import HomeScreen from '../screens/Home.js'
import RidesScreen from '../screens/Rides.js'
import AddressesScreen from '../screens/Addresses.js'
import PersonalScreen from '../screens/Personal.js'

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigator() {
    return(
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName="Home"
                activeColor="#e91e63"
                labelStyle={{ fontSize: 12 }}
                barStyle={{ backgroundColor: 'lightgreen'}}
            >
                <Tab.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size=20 }) => (
                            <MaterialCommunityIcons name="home" color={color} size={20} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Rides" 
                    component={RidesScreen} 
                    options={{
                        tabBarLabel: 'Rides',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="car" color={color} size={20} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Addresses" 
                    component={AddressesScreen} 
                    options={{
                        tabBarLabel: 'Addresses',
                        tabBarIcon: ({ color, size }) => (
                            // <MaterialCommunityIcons name="folder-home" color={color} size={20} />
                            // <FontAwesome name="address-book" color={color} size={20} />
                            <CustomIcon name="folder-home" color={color} size={20} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Personal" 
                    component={PersonalScreen} 
                    options={{
                        tabBarLabel: 'Personal',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={20} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    ) 
}