import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

export type CheckBoxProps = {
    isChecked: boolean;
    onPress: () => void;
}

const CheckBox = (props: CheckBoxProps) => {
    
    const colorScheme = useColorScheme();

    // checkbox icon based on isChecked
    const checkBoxName = props.isChecked ? "checkbox-marked-outline" : "checkbox-blank-outline";

    return (
        <Pressable onPress={props.onPress}>
            {/* checkbox icon */}
            <MaterialCommunityIcons 
                name={checkBoxName} 
                size={24} 
                color={props.isChecked ? Colors[colorScheme].seperator : Colors[colorScheme].tint
            } 
            />
        </Pressable>
    )
}

export default CheckBox

const styles = StyleSheet.create({})
