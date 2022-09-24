import React, { createContext, useState } from 'react';
import { auth } from '../firebase';
import { postUserDetails } from '../api/signUp';

export const AuthContext = createContext();

const login = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.log('login error', error);
    }
};

const register = async (userDetails, password) => {
    try {
        await auth
            .createUserWithEmailAndPassword(userDetails.email, password)
            .then((value) => {
                // const user = {
                //   email: email,
                //   fullname: fullname,
                //   phoneNumber: phoneNumber,
                //   accountType: accountType,
                // };
                postUserDetails(userDetails);
            });
    } catch (error) {
        console.log('signup error', error);
    }
};

const signOut = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.log('login error', error);
    }
};

// Provider to provide states and functions to other modules as context
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const contextValue = {
        user,
        setUser,
        login: login,
        register: register,
        signOut: signOut,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
