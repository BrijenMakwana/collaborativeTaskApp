import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View,Image } from 'react-native';
import UIButton from '../components/UIElements/UIButton';
import UITextInput from '../components/UIElements/UITextInput';

import { useMutation,gql } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

// sign up mutation
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
    const colorScheme = useColorScheme();

    // mutation[0]: function to trigger the mutation
    // mutation[1]: result object {data ,error ,loading}

    // sign up mutation
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
        
          
        
       
    }

    const onSubmit = () =>{
        // submit
        signUp({variables:{ name, email, password, avatar}})
    }

    return (
        <View style={[styles.container,{
            backgroundColor: Colors[colorScheme].background
        }]}>
            {/* register */}
            <Image
                style={styles.image}
                source={require('/Users/brijenmakwana/collaborativeTaskApp/assets/images/Register.png')}
                resizeMode= "contain"
            />
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
                placeholder="Avatar (Optional)" 
                secure={false} 
                value={avatar} 
                onChangeText={(text)=>setAvatar(text)}
            />
            {loading && <ActivityIndicator size="large" color={Colors[colorScheme].tint} style={{padding: 50}}/>}
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
    },
    image:{
        width: "70%",
        height: "12%",
        marginVertical: 20
    }
})
