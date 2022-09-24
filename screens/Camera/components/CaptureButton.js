import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Camera, CameraType } from 'expo-camera';

const CaptureButton = ({ setCapturedImage, setPreviewVisible, camera }) => {
    // const [flashMode, setFlashMode] = React.useState('off');
    const __takePicture = async () => {
        let options = {
            result: 'base64',
        };
        const photo = await camera.takePictureAsync(options);
        // console.log(photo);
        setPreviewVisible(true);
        setCapturedImage(photo);
    };

    // const __handleFlashMode = () => {
    //     if (flashMode === 'on') {
    //         setFlashMode('off');
    //     } else if (flashMode === 'off') {
    //         setFlashMode('on');
    //     } else {
    //         setFlashMode('auto');
    //     }
    // };
    return (
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                flex: 1,
                width: '100%',
                padding: 20,
                justifyContent: 'space-between',
            }}
        >
            <View
                style={{
                    alignSelf: 'center',
                    flex: 1,
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={__takePicture}
                    style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff',
                    }}
                />
            </View>
        </View>
    );
};

export default CaptureButton;
