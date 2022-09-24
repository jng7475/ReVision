import { Camera, CameraType } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { Text, View, Dimensions, Platform } from 'react-native';
import scannerStyles from './ScannerStyles';

const Scanner = ({ camera, setCamera, flashMode, cameraType }) => {
    //  camera permissions
    const [hasCameraPermission, setHasCameraPermission] = useState(null);

    // Screen Ratio and image padding
    const [imagePadding, setImagePadding] = useState(0);
    const [ratio, setRatio] = useState('4:3'); // default is 4:3
    const { height, width } = Dimensions.get('window');
    const screenRatio = height / width;
    const [isRatioSet, setIsRatioSet] = useState(false);

    // on screen  load, ask for permission to use the camera
    useEffect(() => {
        async function getCameraStatus() {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status == 'granted');
        }
        getCameraStatus();
    }, []);

    // set the camera ratio and padding.
    // this code assumes a portrait mode screen
    const prepareRatio = async () => {
        let desiredRatio = '4:3'; // Start with the system default
        // This issue only affects Android
        if (Platform.OS === 'android') {
            const ratios = await camera.getSupportedRatiosAsync();

            // Calculate the width/height of each of the supported camera ratios
            // These width/height are measured in landscape mode
            // find the ratio that is closest to the screen ratio without going over
            let distances = {};
            let realRatios = {};
            let minDistance = null;
            for (const ratio of ratios) {
                const parts = ratio.split(':');
                const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
                realRatios[ratio] = realRatio;
                // ratio can't be taller than screen, so we don't want an abs()
                const distance = screenRatio - realRatio;
                distances[ratio] = realRatio;
                if (minDistance == null) {
                    minDistance = ratio;
                } else {
                    if (distance >= 0 && distance < distances[minDistance]) {
                        minDistance = ratio;
                    }
                }
            }
            // set the best match
            desiredRatio = minDistance;
            //  calculate the difference between the camera width and the screen height
            const remainder = Math.floor(
                (height - realRatios[desiredRatio] * width) / 2
            );
            // set the preview padding and preview ratio
            setImagePadding(remainder);
            setRatio(desiredRatio);
            // Set a flag so we don't do this
            // calculation each time the screen refreshes
            setIsRatioSet(true);
        }
    };

    // the camera must be loaded in order to access the supported ratios
    const setCameraReady = async () => {
        if (!isRatioSet) {
            await prepareRatio();
        }
    };

    if (hasCameraPermission === null) {
        return (
            <View style={scannerStyles.information}>
                <Text>Waiting for camera permissions</Text>
            </View>
        );
    } else if (hasCameraPermission === false) {
        return (
            <View style={scannerStyles.information}>
                <Text>No access to camera</Text>
            </View>
        );
    } else {
        return (
            <Camera
                style={[scannerStyles.cameraPreview]}
                type={cameraType}
                onCameraReady={setCameraReady}
                flashMode={flashMode}
                ratio={ratio}
                ref={(ref) => {
                    setCamera(ref);
                }}
            ></Camera>
        );
    }
};

export default Scanner;
