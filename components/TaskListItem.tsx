import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CheckBox from './CheckBox';

export type TaskListItemProps ={
    taskListItem:{
        _id: string;
        content: string;
        isCompleted: boolean;
    },
    onSubmit: () => void;
   
}

const UPDATE_TASKLIST = gql`
    mutation UpdateTaskList($_id: String!, $isCompleted: Boolean, $content: String) {
        updateTaskList(_id: $_id, isCompleted: $isCompleted, content: $content) {
            _id
            content
            isCompleted
    }
  }
  `;

// delete tasklist

const DELETE_TASKLIST = gql`
    mutation DeleteTaskList($_id: String!) {
    deleteTaskList(_id: $_id)
    }`;




const TaskListItem = (props: TaskListItemProps ) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [isCompleted,setIsCompleted] = useState(props.taskListItem.isCompleted);
    const [content, setContent] = useState(props.taskListItem.content);

    // mutation for update task
    const [updateTaskList,{ data, error,loading}] = useMutation(UPDATE_TASKLIST);

    // mutation for deleting a tasklist
    const [deleteTaskList,{data: deleteData}] = useMutation(DELETE_TASKLIST);

    
    // update a task whenever content change
    useEffect(() => {
        updateTaskList({variables:{
            _id: props.taskListItem._id,
            isCompleted,
            content
        }})
    
        
       
    }, [content])

     // update isCompleted of a task whenever user check/uncheck checkbox
    useEffect(() => {
        updateTaskList({variables:{
            _id: props.taskListItem._id,
            isCompleted,
            content
        }})
    }, [isCompleted])

   
     // remove task when click on Backspace while content is null
     const removeTask = ({nativeEvent}) =>{

        if(nativeEvent.key === "Backspace" && content === ""){
            console.warn("removed");
            deleteTaskList({
                variables:{
                    _id: props.taskListItem._id
                }
            });
            //navigation.navigate("Project");
        }
    }


    return (
        <Pressable 
            style={styles.container}
            onLongPress={()=>console.warn("long press")}
        >
            {/* checkbox */}
            <CheckBox isChecked={isCompleted} onPress={()=>setIsCompleted(!isCompleted)}/>

            {/* text input for tasks */}
            <TextInput
                placeholder='new task'
                placeholderTextColor="grey"
                style={[
                    styles.input,
                    {
                        color: isCompleted ? Colors[colorScheme].seperator : Colors[colorScheme].text,
                        textDecorationLine: isCompleted ? "line-through" : "none"
                    }
                ]}
                blurOnSubmit = {true}
                value={content}
                onChangeText={(text)=>setContent(text)}
                onSubmitEditing={props.onSubmit}
                multiline
                onKeyPress={removeTask}
            />
        </Pressable>
            
    )
}

export default TaskListItem

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        width: "100%",
        padding: 5,
        marginVertical: 4,
        alignItems: "center",
    },
    input:{
        flex: 1,
        marginLeft: 10,
        fontSize: 18,
        maxWidth: "100%"
        
    }
})
