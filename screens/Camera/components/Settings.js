import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Settings = ({
    flashMode,
    __handleFlashMode,
    cameraType,
    __switchCamera,
}) => {
    return (
        <View
            style={{
                position: 'absolute',
                top: 10,
                right: 15,
                justifyContent: 'space-between',
                // borderRadius: '50%',
                backgroundColor: '#fff',
                height: 100,
                width: 30,
                opacity: 0.5,
            }}
        >
            <TouchableOpacity onPress={__handleFlashMode}>
                <Text
                    style={{
                        fontSize: 25,
                        backgroundColor: flashMode === 'off' ? '#fff' : '#000',
                        opacity: flashMode === 'off' ? 0.5 : 1,
                    }}
                >
                    ⚡️
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={__switchCamera}
                style={{
                    fontSize: 25,
                    backgroundColor: flashMode === 'off' ? '#fff' : '#000',
                    opacity: flashMode === 'off' ? 0.5 : 1,
                }}
            >
                <Text
                    style={{
                        fontSize: 25,
                    }}
                >
                    {cameraType === 'front' ? '?' : '?'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Settings;
