import { StyleSheet, Text, View,Image } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export type EmptyListProps = {
    text: string;
}

const EmptyList = (props: EmptyListProps ) => {
    const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
        <Image 
            source={require("../assets/images/empty.png")}
            style={styles.image}
            resizeMode="contain"
        />
        <Text 
            style={[styles.text,{
            color: Colors[colorScheme].tint
                }]}
        >
            {props.text}
        </Text>
  </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        justifyContent:"center"
    },
    image:{
        height: 150,
        width: 150
    },
    text:{
        fontSize: 17,
        fontWeight: "500"
    }
});
