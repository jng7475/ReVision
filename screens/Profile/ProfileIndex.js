import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    Container,
    StyleSheet,
    Image,
    PixelRatio,
    Pressable,
    ScrollView,
    Row,
    TouchableOpacity,
} from 'react-native';
// import { Input,Icon,Button,Text } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons'; //packages
import { AuthContext } from '../../navigations/AuthProvider';
import { auth, db } from '../../firebase';

function ProfileCard({ name }) {
    return (
        <View style={[styles.card, styles.shadowProp]}>
            <Text style={styles.heading}>Profile</Text>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Ionicons
                    name={'person-circle'}
                    size={200}
                    color={'grey'}
                    style={{ alignContent: 'center', textAlign: 'center' }}
                />
                <Pressable>
                    {({ pressed }) => (
                        <Text style={{ fontSize: 20 }}>
                            {name !== null ? name.userDetails.name : 'User'}
                        </Text>
                    )}
                </Pressable>
            </View>
        </View>
    );
}

function ProfileScreen() {
    const { signOut } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);
    const [points, setPoints] = useState(0);
    useEffect(() => {
        const userID = auth.currentUser.uid;
        const getUserInfo = async () => {
            const documentSnapshot = await db
                .collection('users')
                .doc(userID)
                .get();
            const data = await documentSnapshot.data();
            console.log(data);
            setPoints(data.points);
        };
        getUserInfo();
    }, []);
    return (
        <ScrollView style={[styles.card, styles.shadowProp]}>
            <ProfileCard name={userInfo} />
            <Text
                style={{
                    fontSize: 30,
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                Credits Available
            </Text>
            <Text style={{ fontSize: 30, textAlign: 'center' }}>{points}</Text>
            <View>{/* <Button title='Deposit'/> */}</View>
            <View>
                {/* <Button title='Withdraw' style={{marginTop:10}}/> */}
            </View>

            {/* <Text style={{marginTop:20}}>Portfolio</Text> */}
            {/* <Image source={require('../assets/pie.png')} resizeMode={'contain'} style={{width:'100%',height:400}}/> */}

            <TouchableOpacity onPress={signOut}>
                <Text style={[styles.card_1, styles.shadowProp_1]}>
                    Sign Out
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 13,
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 55,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: 10,
    },
    card_1: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: '100%',
        marginVertical: 10,
        textAlign: 'center',
        marginTop: 120,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    shadowProp_1: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});

export default ProfileScreen;
