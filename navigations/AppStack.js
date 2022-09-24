import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraPage from '../screens/Camera/CameraPage';
import News from '../screens/News';
import StoreIndex from '../screens/Store/StoreIndex';
import Leaderboard from '../screens/Leaderboard';
import Profile from '../screens/Profile/ProfileIndex';

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
                component={StoreIndex}
                options={{
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name='Camera'
                component={CameraPage}
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
