import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import HomeScreen from '../screens/home.js'
import RidesScreen from '../screens/rides.js'
import AddressesScreen from '../screens/addresses.js'
import PersonalScreen from '../screens/personal.js'

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigator() {
    return(
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName="Home"
                activeColor="#e91e63"
                labelStyle={{ fontSize: 12 }}
                barStyle={{ backgroundColor: 'silver'}}
                
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
                            <MaterialCommunityIcons name="book" color={color} size={20} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Personal" 
                    component={PersonalScreen} 
                    options={{
                        tabBarLabel: 'Personal',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="car" color={color} size={20} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    ) 
}