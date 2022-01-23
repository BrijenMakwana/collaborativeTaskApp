import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import UITextInput from '../components/UIElements/UITextInput';
import UIButton from '../components/UIElements/UIButton';
import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

// FORGET PASSWORD MUTATION
const FORGET_USER_PASSWORD = gql`
    mutation ForgetUserPassword($userEmail: String!, $oldPassword: String!, $newPassword: String!) {
        forgetUserPassword(userEmail: $userEmail, oldPassword: $oldPassword, newPassword: $newPassword)
    }
    `;

const ForgetPassword = () => {
    const [userEmail,setUserEmail] = useState("");
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    // FORGET PASSWORD MUTATION
    const [forgetUserPassword,{data,error,loading}] = useMutation(FORGET_USER_PASSWORD);
    
    useEffect(() => {
        if(error){
            alert(error.message);
        }
    }, [error]);
    
    useEffect(() => {
     if(data){
        navigation.navigate("SignIn");
        alert("Password is changed, login with new password");
     }

    }, [data]);
    

    const changePassword = () =>{
        forgetUserPassword({
            variables:{
                userEmail,
                oldPassword,
                newPassword
            }
        })
    }

  return (
    <View style={[styles.container,{
        backgroundColor: Colors[colorScheme].background
    }]}>
        {/* TaskBri logo */}
        <Image
            style={styles.logo}
            source={require('/Users/brijenmakwana/collaborativeTaskApp/assets/images/TaskBri.png')}
            resizeMode= "contain"
        />
        <UITextInput 
            placeholder="Email" 
            secure={false}
            value={userEmail}
            onChangeText={(text)=>setUserEmail(text)}
        />
        <UITextInput 
            placeholder="Old Password" 
            secure={true}
            value={oldPassword}
            onChangeText={(text)=>setOldPassword(text)}
        />
        <UITextInput 
            placeholder="New Password" 
            secure={true}
            value={newPassword}
            onChangeText={(text)=>setNewPassword(text)}
        />
       {loading && <ActivityIndicator size="large" color={Colors[colorScheme].tint} style={{padding: 50}}/>}
        <UIButton title="Change Password" onPress={changePassword} type="solid"/>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logo:{
        width: "70%",
        height: "12%",
        marginVertical: 20
    },
    createNewAccountText:{
        fontSize: 12,
        marginTop: 10,
        fontWeight: "500"
    }
});
