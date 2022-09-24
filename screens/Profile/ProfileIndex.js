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
        <View style={styles.centeredView}>
            <View>{/* <Text h4 style={{}}>@InvestorHandle</Text> */}</View>
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
    useEffect(() => {
        const userID = auth.currentUser.uid;
        console.log('asad', userID);
        const getUserInfo = async () => {
            const documentSnapshot = await db
                .collection('users')
                .doc(userID)
                .get();
            const data = await documentSnapshot.data();
            console.log('data', data);
            setUserInfo(data);
        };
        getUserInfo();
    }, []);
    console.log(userInfo);
    return (
        <ScrollView style={styles.container}>
            <ProfileCard name={userInfo} />
            <Text style={{ fontSize: 50, fontWeight: '400' }}>
                Funds Available
            </Text>
            <Text style={{ fontSize: 30 }}>$10,000</Text>
            <View>{/* <Button title='Deposit'/> */}</View>
            <View>
                {/* <Button title='Withdraw' style={{marginTop:10}}/> */}
            </View>

            {/* <Text style={{marginTop:20}}>Portfolio</Text> */}
            {/* <Image source={require('../assets/pie.png')} resizeMode={'contain'} style={{width:'100%',height:400}}/> */}

            <TouchableOpacity onPress={signOut}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>
                    Sign Out
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginHorizontal: 15,
        textAlign: 'center',
    },
});

export default ProfileScreen;
