import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setUserPoints } from '../api/setUserPoints';
import { auth, db } from '../firebase';

const Quiz = ({
    answer,
    navigation,
    setConfirm,
    setPreviewVisible,
    setCapturedImage,
}) => {
    const [points, setPoints] = useState(null);
    useEffect(() => {
        if (points !== null) {
            const setFirebasePoints = async () => {
                await setUserPoints(points);
            };
            setFirebasePoints();
        }
    }, [points]);
    useEffect(() => {
        const userID = auth.currentUser.uid;
        const getUserInfo = async () => {
            const documentSnapshot = await db
                .collection('users')
                .doc(userID)
                .get();
            const data = await documentSnapshot.data();
            // console.log(data);
            setPoints(data.points);
        };
        getUserInfo();
    }, []);
    console.log('aa', answer);
    const handleRecyclePress = () => {
        console.log('true chosen');
        console.log(typeof answer);
        answer === 'true' ? console.log('llll') : console.log('aaaaaxx');
        answer === 'true' ? handleResult(true) : handleResult(false);
    };
    const handleTrashPress = () => {
        console.log('false chosen');

        answer !== 'true' ? handleResult(true) : handleResult(false);
    };
    const handleResult = (result) => {
        console.log('rrr', result);
        if (result) {
            alert('You are correct! You received 1 point!');
            setPoints((prev) => prev + 1);
            const test = points + 1;
            // console.log('ttt', test);
            const setFirebasePoints = async () => {
                await setUserPoints(test);
            };
            setFirebasePoints();
            // setUserPoints(points);
        } else {
            alert('You are incorrect! Better luck next time!');
        }
        navigation.navigate('Store');
        setConfirm(false);
        setPreviewVisible(false);
        setCapturedImage(null);
    };
    return (
        <View style={[styles.card, styles.shadowProp]}>
            <Text style={styles.heading}>What do you think this item is?</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={handleRecyclePress}
                    style={styles.recycleButton}
                >
                    <View style={[styles.card, styles.shadowProp]}>
                        <Text style={{ textAlign: 'center' }}>Recyclable</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.recycleButton}
                    onPress={handleTrashPress}
                >
                    <View style={[styles.card, styles.shadowProp]}>
                        <Text style={{ textAlign: 'center' }}>Trash</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Quiz;

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 13,
        textAlign: 'center',
        marginTop: 50,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 55,
        paddingHorizontal: 5,
        textAlign: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        marginVertical: 10,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    recycleButton: {
        width: 100,
        height: 150,
        borderColor: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        width: 120,
        marginLeft: 60,
    },
});
