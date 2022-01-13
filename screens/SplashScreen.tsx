import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'

const SplashScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        if(isAuthenticated()){
            navigation.navigate("Project");
        }else{
            navigation.navigate("SignIn");
        }
    }, []);

    const isAuthenticated = () =>{
        return true;
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
