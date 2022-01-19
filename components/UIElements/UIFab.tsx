import { Entypo } from '@expo/vector-icons';
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme';

export type UIFabProps = {
    onPress: () => void;
}

const UIFab = (props: UIFabProps ) => {
    const colorScheme = useColorScheme(); 
    return (
        <Pressable 
        style={[styles.fab,{
          backgroundColor: Colors[colorScheme].tint
        }]}
        onPress={props.onPress}
      >
        <Entypo name="plus" size={28} color={Colors[colorScheme].background}/>
      </Pressable>
    )
}

export default UIFab

const styles = StyleSheet.create({
    fab:{
        height: 50,
        width: 50,
        position: "absolute",
        bottom: 60,
        right: 25,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center"
      },
})
