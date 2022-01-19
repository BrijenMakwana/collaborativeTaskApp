import React, { useEffect, useState } from 'react'
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

import { gql, useMutation } from '@apollo/client';

export type ProjectItemProps = {
    project:{
        _id: string;
        title: string;
        createdAt: string;
        
    }
    onRefetch: () => void;
}

// update project mutation
const UPDATE_PROJECT_MUTATION = gql`
    mutation UpdateProject($_id: String!, $title: String!) {
        updateProject(_id: $_id, title: $title) {
        _id
        title
        createdAt
        }
    }
    `;

// delete project mutation

const DELETE_PROJECT = gql`
    mutation DeleteProject($_id: String!) {
        deleteProject(_id: $_id)
    }
    `;

const ProjectItem = (props: ProjectItemProps) => {
    const colorScheme = useColorScheme();

    const [title, setTitle] = useState(props.project.title);

    // update project mutation
    const [updateProject] = useMutation(UPDATE_PROJECT_MUTATION);

    // delete project mutation
    const [deleteProject] = useMutation(DELETE_PROJECT);

    const navigation = useNavigation();

    // update project title whenever title changes
    useEffect(() => {
        updateProject({
            variables:{
               _id: props.project._id,
                title
            }
        });
       
    }, [title])

    // navigate to taskliist screen and passing project id to fetch tasklists under that project
    const goToTaskLists = () =>{
        navigation.navigate("TaskList",{
            projectId: props.project._id
        })
    }

    // delete project
    const deleteThisProject = () =>{

        Alert.alert("Warning","Are you sure you want to delete this project",[
            {
                text: "Yes",
                onPress: () =>{
                    deleteProject({variables:{
                        _id: props.project._id
                    }})
                    props.onRefetch();
            
                    // toast message only in Android
                    if(Platform.OS === "android"){
                        ToastAndroid.show("Project Deleted", ToastAndroid.SHORT);
                    }
                }
            },
            {
                text: "Cancel",
                onPress: () => {}
            }
        ])
        
    }
   
    return (
        <View style={styles.container} >
            {/* file icon */}
            <Pressable 
                style={[styles.iconContainer,{
                    backgroundColor: Colors[colorScheme].tint
                    }]
                }
                onPress={goToTaskLists}
                onLongPress={deleteThisProject}
            >
                <Ionicons name="md-document-outline" size={24} color="#212121" />
            </Pressable>

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
                    placeholderTextColor="grey"
                    value={title}
                    onChangeText={(text)=>setTitle(text)}
                    numberOfLines={1}
                    multiline
                    blurOnSubmit={true}
                    
                />
                <Text 
                    style={[styles.time,{
                        color: Colors[colorScheme].tint
                    }]}
                >
                    {moment(props.project.createdAt).startOf('hour').fromNow()}
                </Text>
            </View>
            
        </View>
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
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
       
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
        textTransform: "capitalize",
        flex: 1,
        height: "100%",
        textAlignVertical: "center"
    },
    time:{
        fontSize: 15,
        marginLeft: 10,
       
       
    }
})
