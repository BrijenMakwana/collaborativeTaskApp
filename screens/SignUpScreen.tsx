import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import UIButton from '../components/UIElements/UIButton';
import UITextInput from '../components/UIElements/UITextInput';

const SignUpScreen = () => {
    return (
        <View style={styles.container}>
            <UITextInput placeholder="Name" secure={false}/>
            <UITextInput placeholder="Email" secure={false}/>
            <UITextInput placeholder="Password" secure={true}/>
            <UIButton title="Sign Up" onPress={()=>console.warn("Sign Up")} type="outline"/>
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
