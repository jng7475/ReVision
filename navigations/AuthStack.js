import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../screens/Login/LoginPage';
import SignUpPage from '../screens/SignUp/SignUpPage';

const Stack = createNativeStackNavigator();

// Screens Stack for authentication
const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Login'
                component={LoginPage}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='SignUp'
                component={SignUpPage}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;
