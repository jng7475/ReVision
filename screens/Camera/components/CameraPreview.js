import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Quiz from '../../Quiz';

const CameraPreview = ({
    photo,
    setCapturedImage,
    setPreviewVisible,
    navigation,
}) => {
    const [val, setVal] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const handleConfirm = async (uri) => {
        var data = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        }).then(async (res) => {
            // console.log('res', res);
            // ß
            // console.log(content);
            // console.log({
            //     percentage: content.confidence[0][0],
            //     recyclable: content.recyclable,
            // });
            // navigation.navigate('Quiz', {
            //     percentage: content.confidence[0][0],
            //     recyclable: content.recyclable,
            // });
            setVal(true);
            setConfirmed(true);
            // return res;
        });
        // console.log(data);
    };
    const handleRetake = () => {
        setCapturedImage(null);
        setPreviewVisible(false);
    };
    // console.log(val);
    return confirmed ? (
        <Quiz answer={val} navigation={navigation} />
    ) : (
        <View
            style={{
                backgroundColor: 'transparent',
                flex: 1,
                width: '100%',
                height: '100%',
            }}
        >
            <ImageBackground
                source={{ uri: photo && photo.uri }}
                style={{
                    flex: 1,
                }}
            />
            <TouchableOpacity
                onPress={handleRetake}
                style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    width: 100,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: '#7EC4CF',
                    opacity: 0.7,
                }}
            >
                <Text
                    style={{
                        color: '#000',
                    }}
                >
                    Retake
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleConfirm(photo.uri)}
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    width: 100,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: '#7EC4CF',
                    opacity: 0.7,
                }}
            >
                <Text
                    style={{
                        color: '#000',
                    }}
                >
                    Confirm
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default CameraPreview;
