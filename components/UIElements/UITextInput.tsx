import React from 'react';
import { StyleSheet, Text, TextInput, View, Platform } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';


export type UITextInputProps = {
    placeholder: string;
    secure: boolean;
    value: string;
    onChangeText: (text:string)=>void
}

const UITextInput = (props: UITextInputProps) => {
    const colorScheme = useColorScheme();

    return (
        <View style={[styles.container,{
            borderBottomColor: Colors[colorScheme].tint
        }]}>
            <TextInput 
                style={styles.input}
                placeholder={props.placeholder}
                secureTextEntry={props.secure}
                value={props.value}
                onChangeText={props.onChangeText}
            />
        </View>
        
    )
}

export default UITextInput

const styles = StyleSheet.create({
    container:{
        marginTop: 10,
        width: Platform.OS === 'web' ? "15%" : "80%",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderBottomWidth: 1,
    },
    input:{
        padding: 10,
        color: "white",
        fontSize: 17,
        width: "100%"
        
    },
})
