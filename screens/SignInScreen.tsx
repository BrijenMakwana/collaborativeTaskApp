import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, Image, View } from 'react-native';
import UIButton from '../components/UIElements/UIButton';
import UITextInput from '../components/UIElements/UITextInput';
import useColorScheme from '../hooks/useColorScheme';

const SignInScreen = () => {
    const navigation = useNavigation();

    const signUp = () =>{
        navigation.navigate("SignUp");
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('/Users/brijenmakwana/collaborativeTaskApp/assets/images/TaskBri.png')}
                resizeMode= "contain"
            />
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
    },
    logo:{
        width: "70%",
        height: "10%",
        marginVertical: 20
    }
   
})
