import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, Image, Pressable, View, Modal } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export type UIAvatarProps = {
    uri: string;
    name: string;
    email: string;
}

const UIAvatar = (props: UIAvatarProps) => {
    const colorScheme = useColorScheme();
    const [modalVisible,setModalVisible] = useState(false);
    
    return (
      <View>
        <Pressable onPress={()=>setModalVisible(true)}>
          <Image
              source={{
                uri: props.uri
              }}
              style={[styles.image,{
                borderColor: Colors[colorScheme].tint
              }]}
              resizeMode= "cover"
          />
        </Pressable>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
        >
          <View style={styles.modal}>
            <Pressable 
              style={styles.close}
              onPress={()=>setModalVisible(false)}  
            >
              <Entypo 
                name="cross" 
                size={24} 
                color={Colors[colorScheme].tint} 
              />
            </Pressable>
            <View style={styles.userInfo}>
              <Image
                source={{
                  uri: props.uri
                }}
                style={[styles.userAvatar,{
                  borderColor: Colors[colorScheme].tint
                }]}
                resizeMode= "cover"
              />
              <Text style={styles.userName}>
                {props.name}
              </Text>
              <Text 
                style={[styles.userEmail,{
                  color: Colors[colorScheme].tint
                }]} 
                adjustsFontSizeToFit 
                numberOfLines={1}
              >
                {props.email}
              </Text>
            </View>
            
            
          </View>
      </Modal>
      </View>
    )
}

export default UIAvatar

const styles = StyleSheet.create({
    image:{
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 3
    
      },
    modal:{
        position: "absolute",
        bottom: 300,
        width: "60%",
        height: "30%",
        left: 80,
        borderRadius: 10,
        backgroundColor: "#212121",
        padding: 10,
        flex: 1,
        
      },
    userInfo: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        flex: 1
      },
    close:{
        alignSelf: "flex-end",
      },
    userAvatar:{
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
      },
    userName:{
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        marginTop: 20,
        width: "100%",
        textAlign: "center"
      },
    userEmail:{
        fontSize: 17,
        color: "#fff",
        fontWeight: "400",
        marginTop: 10,
        width: "100%",
        textAlign: "center"
      }
})
