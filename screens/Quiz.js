import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setUserPoints } from '../api/setUserPoints';
import { auth, db } from '../firebase';

const Quiz = ({ answer, navigation }) => {
    const [points, setPoints] = useState(0);
    useEffect(() => {
        const setPoints = async () => {
            await setUserPoints(points);
        };
        setPoints();
    }, [points]);
    useEffect(() => {
        const userID = auth.currentUser.uid;
        const getUserInfo = async () => {
            const documentSnapshot = await db
                .collection('users')
                .doc(userID)
                .get();
            const data = await documentSnapshot.data();
            setPoints(data.points);
        };
        getUserInfo();
    }, []);
    const handleRecyclePress = () => {
        answer === true ? handleResult(true) : handleResult(false);
    };
    const handleTrashPress = () => {
        answer !== true ? handleResult(true) : handleResult(false);
    };
    const handleResult = (result) => {
        if (result) {
            alert('You are correct! You received 1 point!');
            setPoints((prev) => prev + 1);

            // setUserPoints(points);
        } else {
            alert('You are incorrect! Better luck next time!');
            setPoints((prev) => prev - 1);
        }
        navigation.navigate('Store');
    };
    return (
        <View style={styles.container}>
            <Text>What do you think this item is?</Text>
            <TouchableOpacity
                onPress={handleRecyclePress}
                style={styles.recycleButton}
            >
                <Text>Recycleable</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTrashPress}>
                <Text>Trash</Text>
            </TouchableOpacity>
        </View>
    );
};
export default Quiz;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F3F3',
        flex: 1,
    },
    recycleButton: {
        width: 100,
        height: 150,
        borderColor: 'black',
    },
});
