import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import UIButton from './UIButton';
import UITextInput from './UITextInput';

export type UIPromptProps = {
    onClose: () => void;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    onPress: () => void;
}

const UIPrompt = (props: UIPromptProps ) => {

    const colorScheme = useColorScheme(); 
    //const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.modal}>
            {/* close modal */}
            <Pressable 
                style={styles.close}
                onPress={props.onClose}  
            >
                <Entypo 
                    name="cross" 
                    size={24} 
                    color={Colors[colorScheme].tint} 
                />
            </Pressable>

                {/* enter new project title */}
            <UITextInput 
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChangeText}
                secure={false}  
            />

                {/* press add to create new project */}
            <UIButton 
                title="Add"
                type="solid"
                onPress={props.onPress}
            />
        </View>
    )
}

export default UIPrompt

const styles = StyleSheet.create({
    modal: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 300,
        width: Platform.OS === "web" ? "30%" : "90%",
        height: 230,
        left: Platform.OS === "web" ? "35%" : 20,
        borderRadius: 10,
        backgroundColor: "#212121",
        flex: 1
       },
      close:{
        marginRight: 30,
        padding: 5,
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center"
      }
})
