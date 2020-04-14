import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import CustomIcon from '../components/CustomIcon'
import HomeScreen from '../screens/Home'
import TrackingScreen from '../screens/Tracking'
import RidesScreen from '../screens/Rides'
import AddressesScreen from '../screens/Addresses'
import PersonalScreen from '../screens/Personal'

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator 
        screenOptions={{
            headerShown: false,
        }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen}/>
      <HomeStack.Screen name="Tracking" component={TrackingScreen} />
    </HomeStack.Navigator>
  );
}

export default function AppNavigator() {
    return(
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName="Home"
                activeColor="#e91e63"
                labelStyle={{ fontSize: 12 }}
                barStyle={{ backgroundColor: 'lightgreen'}}
                screenOptions= {{}}
                // screenOptions={({ route }) => ({
                //     tabBarLabel: route.name,
                //     tabBarIcon: ({ color, size }) => {
                //         if (route.name === 'Addresses') {
                //             console.log('ROUTE', route);
                //             return <CustomIcon name="folder-home" color={color} size={size} />
                //         }
                //         else {
                //             return <MaterialCommunityIcons name="home" color={color} size={size} />
                //         }
                //     },
                // })}
            >
                <Tab.Screen 
                    name="Home" 
                    component={HomeStackScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
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
