import React, { useContext, useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import auth from '@react-native-firebase/auth';
// import { AuthContext } from './AuthProvider';

import AppStack from './AppStack';

const Routes = () => {
    // const { user, setUser } = useContext(AuthContext);
    // const [initializing, setInitializing] = useState(true);

    // const onAuthStateChanged = useCallback(
    //   user => {
    //     setUser(user);
    //     if (initializing) {
    //       setInitializing(false);
    //     }
    //   },
    //   [initializing, setUser],
    // );

    // useEffect(() => {
    //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //   return subscriber;
    // }, [onAuthStateChanged]);

    // if (initializing) {
    //   return null;
    // }

    return (
        <NavigationContainer>
            {/* {user ? <AppNavigation user={user} /> : <AuthStack />} */}
            <AppStack />
        </NavigationContainer>
    );
};

export default Routes;
