import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

export type ProjectItemProps = {
    project:{
        _id: string;
        title: string;
        createdAt: string;
        
    }
}

const ProjectItem = (props: ProjectItemProps) => {
    const colorScheme = useColorScheme();

    const [title, setTitle] = useState(props.project.title);

    const navigation = useNavigation();

    const goToTaskLists = () =>{
        navigation.navigate("TaskList",{
            projectId: props.project._id
        })
    }
    console.log(props.project._id);
    return (
        <Pressable style={styles.container} onPress={goToTaskLists}>
            {/* file icon */}
            <View 
                style={[styles.iconContainer,{
                backgroundColor: Colors[colorScheme].tint
            }]}>
                <Ionicons name="md-document-outline" size={24} color="#212121" />
            </View>

            {/* project content */}
            <View  
                style={[styles.projectContent,{
                    borderBottomColor: Colors[colorScheme].seperator,
            }]}
            >
                <TextInput 
                    style={[styles.projectTitle,{
                        color: Colors[colorScheme].text
                    }]}

                    placeholder="add project title"
                    value={title}
                    onChangeText={(text)=>setTitle(text)}
                    numberOfLines={1}
                    
                />
                <Text 
                    style={[styles.time,{
                        color: Colors[colorScheme].tint
                    }]}
                >
                    {moment(props.project.createdAt).startOf('hour').fromNow()}
                </Text>
            </View>
            
        </Pressable>
    )
}

export default ProjectItem

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginTop : 5,
        width: "100%",
       
    },
    iconContainer:{
        padding: 10,
        borderRadius: 10,
       
    },
    projectContent:{
        flex: 1,
        flexDirection: "row",
        marginLeft: 15,
        borderBottomWidth: 1,
        justifyContent: "space-between",
        alignItems: "center",
    },
    projectTitle:{
        fontSize: 20,
        textTransform: "capitalize"
    },
    time:{
        fontSize: 15,
    }
})
