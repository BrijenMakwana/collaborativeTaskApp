import React from 'react';
import { Pressable, StyleSheet, Text, Platform } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export type UIButtonProps = {
    title: string;
    type: string;
    onPress: ()=> void;

}

const Button = (props: UIButtonProps) => {
    const colorScheme = useColorScheme();

    return (
        // styles applies according to solid or outline button type
        <Pressable 
            style={[styles.buttonContainer,{
                backgroundColor: props.type === "solid" ? Colors[colorScheme].tint : "",
                borderWidth: props.type === "solid" ? 0 : 1,
                borderColor: Colors[colorScheme].tint
            }]} 
            onPress={props.onPress}
        >
            <Text 
                style={[styles.buttonName,{
                    color: props.type === "solid" ? "#212121" : Colors[colorScheme].tint
                }]}>{props.title}</Text>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    buttonContainer:{
        padding:12,
        width: Platform.OS === 'web' ? 300 : "80%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 7
    },
    buttonName:{
        fontWeight: "500",
        fontSize: 17,
    }
})
