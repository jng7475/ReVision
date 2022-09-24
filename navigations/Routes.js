import React, { useContext, useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import auth from 'firebase/auth';
import { AuthContext } from './AuthProvider';
import { auth } from '../firebase';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Routes = () => {
    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = useCallback(
        (user) => {
            setUser(user);
            if (initializing) {
                setInitializing(false);
            }
        },
        [initializing, setUser]
    );

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [onAuthStateChanged]);

    if (initializing) {
        return null;
    }
    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
            {/* <AppStack /> */}
            {/* <AuthStack /> */}
        </NavigationContainer>
    );
};

export default Routes;
