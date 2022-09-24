import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    Image,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Counter from 'react-native-counters';

const Store = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.giftCard}>
            <Text style={{ marginTop: 50, fontSize: 50 }}>Gift Cards</Text>
            <ScrollView>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                <Counter start={1} />
                            </Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Redeem</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'col' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Pressable
                                    style={[styles.button, styles.buttonOpen]}
                                    onPress={() => setModalVisible(true)}
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
                                    onPress={() => setModalVisible(true)}
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
                                    onPress={() => setModalVisible(true)}
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
                                    onPress={() => setModalVisible(true)}
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
