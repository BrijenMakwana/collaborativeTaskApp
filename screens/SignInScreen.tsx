import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, Image, View, Alert, ActivityIndicator } from 'react-native';
import UIButton from '../components/UIElements/UIButton';
import UITextInput from '../components/UIElements/UITextInput';
import useColorScheme from '../hooks/useColorScheme';

import { useMutation,gql } from '@apollo/client';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';

// sign in mutation
const SIGN_IN_MUTATION =gql`
mutation signIn($email: String!,$password: String!) {
    signIn(input: {
      email: $email,
      password: $password
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

const SignInScreen = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigation = useNavigation();
    const colorScheme = useColorScheme();

    const signUp = () =>{
        navigation.navigate("SignUp");
    }

     // mutation[0]: function to trigger the mutation
    // mutation[1]: result object {data ,error ,loading}

    // sign in mutation
    const [signIn,{ data , error , loading }] = useMutation(SIGN_IN_MUTATION);

    

    useEffect(() => {
        if(error){
            Alert.alert("Invalid credentials, try again!!")
            
        }
    }, [error])
    
    if(data){
        // save token
        try{
            AsyncStorage.setItem('token', data.signIn.token).then(()=>{
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
        signIn({variables:{ email , password }})
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
                value={email}
                onChangeText={(text)=>setEmail(text)}
            />
            <UITextInput 
                placeholder="Password" 
                secure={true}
                value={password}
                onChangeText={(text)=>setPassword(text)}
            />
           {loading && <ActivityIndicator size="large" color={Colors[colorScheme].tint} style={{padding: 50}}/>}
            <UIButton title="Login" onPress={onSubmit} type="solid"/>
            
            <UIButton title="Sign Up" onPress={signUp} type="outline"/>
            <Text style={[styles.createNewAccountText,{
                color: Colors[colorScheme].tint
                }]}
            >
                Sign up if you don't have a account
            </Text>
        </View>
    )
}

export default SignInScreen

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
   
})
