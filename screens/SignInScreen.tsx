import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import UIButton from '../components/UIElements/UIButton';
import UITextInput from '../components/UIElements/UITextInput';

const SignInScreen = () => {
    const navigation = useNavigation();

    const signUp = () =>{
        navigation.navigate("SignUp");
    }

    return (
        <View style={styles.container}>
            <UITextInput placeholder="Email" secure={false}/>
            <UITextInput placeholder="Password" secure={true}/>
           
            <UIButton title="Login" onPress={()=>console.warn("login")} type="solid"/>
            <UIButton title="Sign Up" onPress={signUp} type="outline"/>
        </View>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
   
})
