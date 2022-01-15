import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {

        const checkUser = async () =>{
            if(await isAuthenticated()){
                navigation.reset(
                    {
                      index: 0,
                      routes:[{name: "Project"}]
                    }
                  )
            }else{
                navigation.reset(
                    {
                      index: 0,
                      routes:[{name: "SignIn"}]
                    }
                  )
            }
        } 
        checkUser();
    }, []);

    const isAuthenticated = async() =>{
        const token = await AsyncStorage.getItem('token');
        console.log(token,"token");
        return !!token;
    }
    return (
        <View style={styles.ccontainer}>
            <ActivityIndicator/>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    ccontainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"

    }
})
