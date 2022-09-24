import React, {useState} from "react";
import { View, Text, Container, StyleSheet,Image, PixelRatio, Pressable, ScrollView, Row} from "react-native";
// import { Input,Icon,Button,Text } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';//packages

function ProfileCard(){
  return (
    <View style={styles.centeredView}>
        <View>
          {/* <Text h4 style={{}}>@InvestorHandle</Text> */}
          
        </View>
        <View style={{justifyContent:"center", alignItems:"center", textAlign:"center"}}>
          <Ionicons name={'person-circle'} size={200} color={'grey'} style={{alignContent:"center", textAlign:"center"}}/>
          <Pressable >
            {({ pressed }) => (
              <Text style={{fontSize:"20px"}}>
                {pressed ? "It's Tri Pham" : "Profile's Name"}
              </Text>
            )}
          </Pressable>

        
        </View>
    
    </View>
    
  );
}

function ProfileScreen() {
    return (
      <ScrollView style={styles.container}>
        <ProfileCard />
          <Text style={{fontSize:"50px", fontWeight:"400"}}>Funds Available</Text>
          <Text style={{fontSize:"30px"}}>$10,000</Text>
        <View>
          {/* <Button title='Deposit'/> */}
        </View>
        <View>
          {/* <Button title='Withdraw' style={{marginTop:10}}/> */}
        </View>

          {/* <Text style={{marginTop:20}}>Portfolio</Text> */}
          {/* <Image source={require('../assets/pie.png')} resizeMode={'contain'} style={{width:'100%',height:400}}/> */}

        <Pressable >
            
            <Text style={{fontSize:"20px", textAlign:"center", }}>
          Sign Out
            </Text>
   
        </Pressable>

      </ScrollView>
      
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
      marginHorizontal: 15,
      textAlign:"center",
    },
  });

export default ProfileScreen;
