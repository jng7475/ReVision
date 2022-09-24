import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
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
        <View style={[styles.card, styles.shadowProp]}>
            <Text style={styles.heading}>What do you think this item is?</Text>
          <View style={{ flexDirection: 'row' }}>
           <TouchableOpacity
                onPress={handleRecyclePress}
                style={styles.recycleButton}
            >
            <View style={[styles.card, styles.shadowProp]}>
                <Text style={{textAlign:"center"}}>Recyclable</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.recycleButton} onPress={handleTrashPress}>
            <View style={[styles.card, styles.shadowProp]} >
                <Text style={{textAlign:"center"}}>Trash</Text>
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
        marginTop:50
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 55,
        paddingHorizontal: 5,
        textAlign:"center",
        justifyContent:"center",
        width: '100%',
        height: "100%"
,        marginVertical: 10,
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
        textAlign:"center",
        justifyContent:"center",
        width:120,
        marginLeft: 60
    },
});
