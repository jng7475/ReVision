import { Camera, CameraType } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import Scanner from './components/Scanner';
import styles from './styles';
import CaptureButton from './components/CaptureButton';
import CameraPreview from './components/CameraPreview';
import Settings from './components/Settings';

export default function CameraPage({ navigation }) {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [camera, setCamera] = useState(null);
    const [flashMode, setFlashMode] = React.useState('off');
    const [cameraType, setCameraType] = React.useState(
        Camera.Constants.Type.back
    );
    const isFocused = useIsFocused();

    const __handleFlashMode = () => {
        if (flashMode === 'on') {
            setFlashMode('off');
        } else if (flashMode === 'off') {
            setFlashMode('on');
        } else {
            setFlashMode('auto');
        }
    };

    const __switchCamera = () => {
        if (cameraType === 'back') {
            setCameraType('front');
        } else {
            setCameraType('back');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {previewVisible && capturedImage ? (
                <CameraPreview
                    photo={capturedImage}
                    setPreviewVisible={setPreviewVisible}
                    setCapturedImage={setCapturedImage}
                    navigation={navigation}
                />
            ) : (
                <View style={styles.container}>
                    {isFocused && (
                        <Scanner
                            camera={camera}
                            setCamera={setCamera}
                            flashMode={flashMode}
                            cameraType={cameraType}
                        />
                    )}
                    <Settings
                        flashMode={flashMode}
                        __handleFlashMode={__handleFlashMode}
                        cameraType={cameraType}
                        __switchCamera={__switchCamera}
                    />
                    <CaptureButton
                        setPreviewVisible={setPreviewVisible}
                        setCapturedImage={setCapturedImage}
                        camera={camera}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}
