import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import CustomIcon from '../components/routes/CustomIcon'
import HomeScreen from '../views/Home'
import TrackingScreen from '../views/Tracking'
import RidesScreen from '../views/Rides'
import AddressesScreen from '../views/Addresses'
import PersonalScreen from '../views/Personal'
import PersonalInfoScreen from '../views/PersonalInfo'
import ExportScreen from '../views/PersonalExport'
import BugReporterScreen from '../views/PersonalBugReporter'

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const PersonalStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen}/>
      <HomeStack.Screen name="Tracking" component={TrackingScreen} />
    </HomeStack.Navigator>
  );
}

function PersonalStackScreen() {
    return (
      <PersonalStack.Navigator screenOptions={{ headerShown: false  }}>
        <PersonalStack.Screen name="Persoonlijk Home" component={PersonalScreen}/>
        <PersonalStack.Screen name="Persoonlijk Info" component={PersonalInfoScreen} />
        <PersonalStack.Screen name="ExportToExcel" component={ExportScreen} />
        <PersonalStack.Screen name="BugReporter" component={BugReporterScreen} />
      </PersonalStack.Navigator>
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
            >
                <Tab.Screen 
                    name="Home" 
                    component={HomeStackScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={20} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Rides" 
                    component={RidesScreen} 
                    options={{
                        tabBarLabel: 'Ritten',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="car" color={color} size={20} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Addresses" 
                    component={AddressesScreen} 
                    options={{
                        tabBarLabel: 'Adressen',
                        tabBarIcon: ({ color }) => (
                            <CustomIcon name="folder-home" color={color} size={20} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Personal" 
                    component={PersonalStackScreen} 
                    options={{
                        tabBarLabel: 'Persoonlijk',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account" color={color} size={20} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    ) 
}
