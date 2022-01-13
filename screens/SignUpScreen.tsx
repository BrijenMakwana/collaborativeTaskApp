import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import UIButton from '../components/UIElements/UIButton';
import UITextInput from '../components/UIElements/UITextInput';

import { useMutation,gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SIGN_UP_MUTATION =gql`
    mutation signUp($name: String!
        $email: String!
        $password: String!
        $avatar: String
        ) {
    signUp(input: {
        name: $name,
        email: $email,
        password: $password,
        avatar: $avatar
    }) {
        token
        user {
        _id
        name
        email
        avatar
        }
    }
    }
    `
;


const SignUpScreen = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [avatar,setAvatar] = useState("");

    const navigation = useNavigation();

    // mutation[0]: function to trigger the mutation
    // mutation[1]: result object {data ,error ,loading}

    const [signUp,{ data , error , loading }] = useMutation(SIGN_UP_MUTATION);

    if(error){
        Alert.alert("Error signing up, please try again!!")
    }
    
    if(data){
        // save token

        try{
            AsyncStorage.setItem('token', data.signUp.token).then(()=>{
                // navigate project screen
                navigation.reset(
                   {
                     index: 0,
                     routes:[{name: "Project"}]
                   }
                 )
           })
        }catch(e){
            
        }
        
          
        //console.log(data);
       
    }

    const onSubmit = () =>{
        // submit
        signUp({variables:{ name, email, password, avatar}})
    }

    return (
        <View style={styles.container}>
            <UITextInput 
                placeholder="Name" 
                secure={false} 
                value={name} 
                onChangeText={(text)=>setName(text)}
            />
            <UITextInput 
                placeholder="Email" 
                secure={false} 
                value={email} 
                onChangeText={(text)=>setEmail(text)}
            />
            <UITextInput 
                placeholder="Password" 
                secure={true} 
                value={password} 
                onChangeText={(text)=>setPassword(text)}
            />
            <UITextInput 
                placeholder="Avatar" 
                secure={false} 
                value={avatar} 
                onChangeText={(text)=>setAvatar(text)}
            />
            {loading && <ActivityIndicator/>}
            <UIButton title="Sign Up" onPress={onSubmit} type="outline"/>
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
