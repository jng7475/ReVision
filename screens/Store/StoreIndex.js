import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    Image,
    ScrollView,
    Touchable,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Counter from 'react-native-counters';
import { getUserPoints } from '../../api/getUserPoints';
import { auth, db } from '../../firebase';
import { setUserPoints } from '../../api/setUserPoints';

const Store = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [points, setPoints] = useState(0);
    const [item, setItem] = useState([]);
    useEffect(() => {
        const setPoints = async () => {
            await setUserPoints(points);
        };
        setPoints();
    }, [points]);
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
            setPoints(data.points);
        };
        getUserInfo();
    }, []);
    const handledPress = (item) => {
        setModalVisible(true);
        setItem((current) => [...current, item]);
    };
    const handleRedeem = () => {
        setModalVisible(!modalVisible);
        setPoints((prev) => prev - 1);
    };

    return (
        <View style={styles.giftCard}>
            <Text style={{ marginTop: 50, fontSize: 50 }}>Gift Cards</Text>
            <Text style={{ marginTop: 50, fontSize: 50 }}>{points} Points</Text>
            {/* <Text style={{ marginTop: 50, fontSize: 50 }}>One per day</Text> */}
            <ScrollView>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Redeem Failed');
                        setModalVisible(!modalVisible);
                        setItem([...item.slice(0, item.length)]);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {/* <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <Text>-</Text>
                            </TouchableOpacity> */}
                            <Text style={styles.modalText}>
                                You can only redeem this once per day
                            </Text>
                            {/* <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <Text>-</Text>
                            </TouchableOpacity> */}
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => handleRedeem()}
                            >
                                <Text style={styles.textStyle}>Redeem</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => handledPress('Google')}
                                    disabled={
                                        item.includes('Google') === true
                                            ? true
                                            : false
                                    }
                                >
                                    <Image
                                        style={styles.giftCardStyle}
                                        resizeMode='contain'
                                        source={require('../../assets/Noogler.jpeg')}
                                    />
                                    <Text style={styles.modalText}>
                                        {' '}
                                        Nooglers Gift Cards
                                    </Text>
                                </Pressable>
                            </View>

                            <View>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => handledPress('Starbucks')}
                                    disabled={
                                        item.includes('Starbucks')
                                            ? true
                                            : false
                                    }
                                >
                                    <Image
                                        style={styles.giftCardStyle}
                                        resizeMode='contain'
                                        source={require('../../assets/SBGift.jpeg')}
                                    />
                                    <Text style={styles.modalText}>
                                        StarBucks Gift Cards
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => handledPress('Nike')}
                                    disabled={
                                        item.includes('Nike') ? true : false
                                    }
                                >
                                    <Image
                                        style={styles.giftCardStyle}
                                        resizeMode='contain'
                                        source={require('../../assets/nikeLogo.jpeg')}
                                    />
                                    <Text style={styles.modalText}>
                                        Nike Gift Cards
                                    </Text>
                                </Pressable>
                            </View>

                            <View>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => handledPress('Apple')}
                                    disabled={
                                        item.includes('Apple') ? true : false
                                    }
                                >
                                    <Image
                                        style={styles.giftCardStyle}
                                        resizeMode='contain'
                                        source={require('../../assets/AppleLogo.png')}
                                    />
                                    <Text style={styles.modalText}>
                                        Apple Gift Cards
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    giftCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    giftCardStyle: {
        justifyContent: 'center',
        aspectRatio: 2,
        alignItems: 'center',
        flex: 1,
        height: 100,
        borderRadius: 10,
    },
    modalView: {
        margin: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        display: 'flex',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: 100,
        marginBottom: -50,
        width: '100%',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default Store;
