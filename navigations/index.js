import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

const NavigationProvider = () => {
    return <AuthProvider children={<Routes />} />;
    // return <Routes />;
};

export default NavigationProvider;
