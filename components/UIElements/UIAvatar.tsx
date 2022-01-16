import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export type UIAvatarProps = {
    uri: string;
}

const UIAvatar = (props: UIAvatarProps) => {
    const colorScheme = useColorScheme();
    
    return (
        <Image
            source={{
              uri: props.uri
            }}
            style={[styles.image,{
              borderColor: Colors[colorScheme].tint
            }]}
            resizeMode= "cover"
        />
    )
}

export default UIAvatar

const styles = StyleSheet.create({
    image:{
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 3
    
      }
})
