import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Camera from '../screens/Camera';
import News from '../screens/News';
import Store from '../screens/Store';
import Leaderboard from '../screens/Leaderboard';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

// Screens Tab for App
const AppStack = () => {
    return (
        <Tab.Navigator
            initialRouteName='Camera'
            screenOptions={{ tabBarHideOnKeyboard: true }}
        >
            <Tab.Screen
                name='News'
                component={News}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name='Store'
                component={Store}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name='Camera'
                component={Camera}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name='Leaderboard'
                component={Leaderboard}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};

export default AppStack;
