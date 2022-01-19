import { gql, useMutation, useQuery } from '@apollo/client';
import { Entypo,MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, Pressable, View, Modal, Alert, Platform,ToastAndroid } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export type UIAvatarProps = {
    _id: string;
    projectId: string;
    onRefetch: () => void;
}

// get user graphQL query
const GET_USER = gql`
  query GetUser($_id: String!) {
      getUser(_id: $_id) {
        _id
        name
        email
        avatar
      }
    }
`;

// delete user from project mutation

const DELETE_USER_FROM_PROJECT = gql`
  mutation DeleteProject($projectId: String!, $userId: String!) {
    deleteUserFromProject(projectId: $projectId, userId: $userId)
  }`;


const UIAvatar = (props: UIAvatarProps) => {
    const colorScheme = useColorScheme();
    const [modalVisible,setModalVisible] = useState(false);

    const [userAvatar,setUserAvatar] = useState("");
    const [userName,setUserName] = useState("");
    const [userEmail,setUserEmail] = useState("");

    // get user query
    const {data,error,loading} = useQuery(GET_USER,{variables:{_id: props._id}});

    // delete user from project mutation
    const [deleteUserFromProject] = useMutation(DELETE_USER_FROM_PROJECT);
    
    useEffect(() => {
      if(error){
        Alert.alert("Error fatching user data",error.message);
      }
    }, [error])

    useEffect(() => {
      if(data){
        setUserAvatar(data.getUser.avatar);
        setUserName(data.getUser.name);
        setUserEmail(data.getUser.email);
      }
    }, [data])

    // delete user from project
    const deleteUser = () =>{
      deleteUserFromProject({variables:{
        projectId: props.projectId,
        userId: props._id
      }})
      setModalVisible(false);
      props.onRefetch();
      if(Platform.OS === "android"){
        ToastAndroid.show("User Deleted", ToastAndroid.SHORT);
      }
      
    }
    
    return (
      <View>
        <Pressable onPress={()=>setModalVisible(true)}>
          <Image
              source={{
                uri: userAvatar || "https://images.unsplash.com/photo-1511553677255-ba939e5537e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
              }}
              style={[styles.image,{
                borderColor: Colors[colorScheme].tint
              }]}
              resizeMode= "cover"
          />
        </Pressable>

        {/* modal for user information */}
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
        >
          <View style={[styles.modal,{
            backgroundColor: Colors[colorScheme].lightTint,
            borderColor: Colors[colorScheme].tint
          }]}>
            <Pressable 
              style={styles.close}
              onPress={()=>setModalVisible(false)}  
            >
              {/* close the modal */}
              <Entypo 
                name="cross" 
                size={24} 
                color={Colors[colorScheme].tint} 
              />
            </Pressable>
            <View style={styles.userInfo}>
              {/* user avatar big */}
              <Image
                source={{
                  uri: userAvatar || "https://images.unsplash.com/photo-1511553677255-ba939e5537e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                }}
                style={[styles.userAvatar,{
                  borderColor: Colors[colorScheme].tint
                }]}
                resizeMode= "cover"
              />

              {/* user name */}
              <Text style={[styles.userName,{
                color: Colors[colorScheme].text
              }]}>
                {userName}
              </Text>

              {/* user email */}
              <Text 
                style={[styles.userEmail,{
                  color: Colors[colorScheme].tint
                }]} 
                adjustsFontSizeToFit 
                numberOfLines={1}
              >
                {userEmail}
              </Text>
            </View>

            {/* delet user button */}
            <Pressable
              style={styles.delete}
              onPress={deleteUser}  
            >
              <MaterialIcons 
                name="delete" 
                size={24} 
                color={Colors[colorScheme].tint}
              />
            </Pressable>
            
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
        width: Platform.OS === "web" ? "20%" : "60%",
        height: Platform.OS === "web" ? "40%" : "35%",
        left: Platform.OS === "web" ? "40%" : 80,
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
        flex: 1,
        
      },
    userInfo: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      },
    close:{
        alignSelf: "flex-end",
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
        padding: 4
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
        fontWeight: "bold",
        marginTop: 20,
        width: "100%",
        textAlign: "center"
      },
    userEmail:{
        fontSize: 17,
        fontWeight: "400",
        marginTop: 10,
        width: "100%",
        textAlign: "center"
      },
      delete:{
        alignSelf: "center",
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        

      }
})
