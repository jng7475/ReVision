import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraPage from '../screens/Camera/CameraPage';
import Quiz from '../screens/Quiz';
import StoreIndex from '../screens/Store/StoreIndex';
import Leaderboard from '../screens/Leaderboard';
import Profile from '../screens/Profile/ProfileIndex';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

// Screens Tab for App
const AppStack = () => {
    return (
        <Tab.Navigator
            initialRouteName='Camera'
            screenOptions={{ tabBarHideOnKeyboard: true }}
        >
            <Tab.Screen
                name='Store'
                component={StoreIndex}
                options={{
                    headerShown: false,
                    tabBarIcon: (tabInfo) => {
                        return (
                            <MaterialCommunityIcons
                                name='storefront-outline'
                                size={24}
                                color={tabInfo.focused ? '#006600' : '#8e8e93'}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name='Camera'
                component={CameraPage}
                options={{
                    headerShown: false,
                    tabBarIcon: (tabInfo) => {
                        return (
                            <MaterialCommunityIcons
                                name='camera'
                                size={24}
                                color={tabInfo.focused ? '#006600' : '#8e8e93'}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: (tabInfo) => {
                        return (
                            <MaterialCommunityIcons
                                name='face-man-profile'
                                size={24}
                                color={tabInfo.focused ? '#006600' : '#8e8e93'}
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default AppStack;
